/**
 * A storage node in the simulated distributed system.
 *
 * Each node owns a simple in-memory Map. The public DistributedKeyValueStore
 * hides these individual nodes from application users.
 */
class StorageNode {
  constructor(id) {
    this.id = id;
    this.data = new Map();
    this.online = true;
  }

  put(key, value) {
    if (!this.online) {
      throw new Error(`Node ${this.id} is offline.`);
    }

    this.data.set(key, value);
  }

  get(key) {
    if (!this.online) {
      throw new Error(`Node ${this.id} is offline.`);
    }

    return this.data.get(key);
  }

  delete(key) {
    if (!this.online) {
      throw new Error(`Node ${this.id} is offline.`);
    }

    return this.data.delete(key);
  }

  entries() {
    return Array.from(this.data.entries());
  }

  clear() {
    this.data.clear();
  }
}

module.exports = StorageNode;
