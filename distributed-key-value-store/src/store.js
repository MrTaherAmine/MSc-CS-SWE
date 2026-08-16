const { hashToUInt32 } = require("./hash");
const LRUCache = require("./cache");
const StorageNode = require("./node");

/**
 * Distributed key-value store simulation.
 *
 * Features:
 * - consistent hashing ring;
 * - virtual nodes for a better key distribution;
 * - node join and leave;
 * - minimal key movement during membership changes;
 * - LRU client-facing cache;
 * - limited availability when nodes fail;
 * - transparent put/get/delete API.
 */
class DistributedKeyValueStore {
  constructor({
    virtualNodes = 32,
    cacheCapacity = 4
  } = {}) {
    this.virtualNodes = virtualNodes;
    this.cache = new LRUCache(cacheCapacity);

    // Physical node id -> StorageNode instance.
    this.nodes = new Map();

    // Consistent-hash ring entries:
    // { hash, nodeId, token }
    this.ring = [];

    // Metrics help demonstrate cache behavior and node availability.
    this.metrics = {
      cacheHits: 0,
      cacheMisses: 0,
      reads: 0,
      writes: 0,
      deletes: 0
    };
  }

  /**
   * Add a physical node and its virtual-node positions to the ring.
   *
   * Existing keys are snapshotted, the ring is rebuilt, and only keys whose
   * new owner changes are moved.
   */
  addNode(nodeId) {
    if (this.nodes.has(nodeId)) {
      throw new Error(`Node ${nodeId} already exists.`);
    }

    const oldPlacement = this.keyPlacement();

    this.nodes.set(nodeId, new StorageNode(nodeId));
    this.rebuildRing();

    const moved = this.rebalance(oldPlacement);

    return {
      action: "join",
      nodeId,
      movedKeys: moved
    };
  }

  /**
   * Remove a node from the cluster.
   *
   * Data is first collected, then the node is removed, the ring is rebuilt,
   * and affected keys are assigned to their new owners.
   */
  removeNode(nodeId) {
    const node = this.nodes.get(nodeId);

    if (!node) {
      throw new Error(`Node ${nodeId} does not exist.`);
    }

    const allData = this.collectAllData();

    this.nodes.delete(nodeId);
    this.rebuildRing();

    if (this.nodes.size === 0) {
      this.cache.clear();

      return {
        action: "leave",
        nodeId,
        movedKeys: allData.size
      };
    }

    // Clear remaining node storage and place all keys according to the new ring.
    for (const remainingNode of this.nodes.values()) {
      remainingNode.clear();
    }

    let moved = 0;

    for (const [key, value] of allData.entries()) {
      const owner = this.getOwnerNode(key);
      owner.data.set(key, value);
      moved += 1;
    }

    this.cache.clear();

    return {
      action: "leave",
      nodeId,
      movedKeys: moved
    };
  }

  /**
   * Simulate a node failure.
   */
  failNode(nodeId) {
    const node = this.nodes.get(nodeId);

    if (!node) {
      throw new Error(`Node ${nodeId} does not exist.`);
    }

    node.online = false;
    return node;
  }

  /**
   * Restore a previously failed node.
   */
  recoverNode(nodeId) {
    const node = this.nodes.get(nodeId);

    if (!node) {
      throw new Error(`Node ${nodeId} does not exist.`);
    }

    node.online = true;
    return node;
  }

  /**
   * Public transparent API: caller only provides a key and value.
   * Node selection happens internally.
   */
  put(key, value) {
    const node = this.getOwnerNode(key);

    if (!node.online) {
      throw new Error(
        `Limited availability: owner node ${node.id} for key "${key}" is offline.`
      );
    }

    node.put(key, value);
    this.cache.set(key, value);
    this.metrics.writes += 1;

    return {
      key,
      storedOn: node.id
    };
  }

  /**
   * Public transparent read API.
   *
   * Cache is checked first. If not cached, the consistent-hash ring determines
   * the owner node. When the owner node has failed, only cached data remains
   * available in this basic design.
   */
  get(key) {
    this.metrics.reads += 1;

    const cached = this.cache.get(key);

    if (cached !== undefined) {
      this.metrics.cacheHits += 1;

      return {
        value: cached,
        source: "cache"
      };
    }

    this.metrics.cacheMisses += 1;

    const node = this.getOwnerNode(key);

    if (!node.online) {
      return {
        value: undefined,
        source: "unavailable",
        message:
          `Limited availability: owner node ${node.id} is offline and "${key}" is not cached.`
      };
    }

    const value = node.get(key);

    if (value !== undefined) {
      this.cache.set(key, value);
    }

    return {
      value,
      source: `node:${node.id}`
    };
  }

  delete(key) {
    const node = this.getOwnerNode(key);

    if (!node.online) {
      throw new Error(
        `Limited availability: owner node ${node.id} for key "${key}" is offline.`
      );
    }

    const deleted = node.delete(key);
    this.cache.delete(key);
    this.metrics.deletes += 1;

    return deleted;
  }

  /**
   * Find the physical node responsible for a key.
   */
  getOwnerNode(key) {
    if (this.ring.length === 0) {
      throw new Error("No storage nodes are available.");
    }

    const keyHash = hashToUInt32(key);

    // Find the first token clockwise whose hash >= key hash.
    let low = 0;
    let high = this.ring.length - 1;
    let answer = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (this.ring[mid].hash >= keyHash) {
        answer = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    // Wrap around to the first ring position if needed.
    const ringEntry =
      answer === -1
        ? this.ring[0]
        : this.ring[answer];

    return this.nodes.get(ringEntry.nodeId);
  }

  /**
   * Rebuild the hash ring from all physical nodes.
   */
  rebuildRing() {
    const ring = [];

    for (const nodeId of this.nodes.keys()) {
      for (let index = 0; index < this.virtualNodes; index += 1) {
        const token = `${nodeId}#${index}`;

        ring.push({
          hash: hashToUInt32(token),
          nodeId,
          token
        });
      }
    }

    ring.sort((a, b) => a.hash - b.hash);
    this.ring = ring;
  }

  /**
   * Return key -> owner mapping for all currently stored keys.
   */
  keyPlacement() {
    const placement = new Map();

    for (const [nodeId, node] of this.nodes.entries()) {
      for (const [key] of node.entries()) {
        placement.set(key, nodeId);
      }
    }

    return placement;
  }

  /**
   * Return every key/value pair from the cluster.
   */
  collectAllData() {
    const allData = new Map();

    for (const node of this.nodes.values()) {
      for (const [key, value] of node.entries()) {
        allData.set(key, value);
      }
    }

    return allData;
  }

  /**
   * Rebalance after a node joins.
   *
   * The method compares old and new ownership and only moves keys whose
   * consistent-hash owner changed.
   */
  rebalance(oldPlacement) {
    const allData = this.collectAllData();
    let moved = 0;

    for (const [key, value] of allData.entries()) {
      const oldOwnerId = oldPlacement.get(key);
      const newOwner = this.getOwnerNode(key);

      if (oldOwnerId !== newOwner.id) {
        const oldOwner = this.nodes.get(oldOwnerId);

        if (oldOwner) {
          oldOwner.data.delete(key);
        }

        newOwner.data.set(key, value);
        moved += 1;
      }
    }

    this.cache.clear();
    return moved;
  }

  /**
   * Human-readable placement summary for demonstration.
   */
  distribution() {
    const result = {};

    for (const [nodeId, node] of this.nodes.entries()) {
      result[nodeId] = {
        online: node.online,
        keys: node.entries().map(([key]) => key)
      };
    }

    return result;
  }

  cacheSnapshot() {
    return this.cache.snapshot();
  }
}

module.exports = DistributedKeyValueStore;
