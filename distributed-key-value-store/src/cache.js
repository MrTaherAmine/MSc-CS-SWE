/**
 * Small Least Recently Used (LRU) cache.
 *
 * Map preserves insertion order in JavaScript.
 * Whenever an item is read, it is removed and inserted again so it becomes
 * the most recently used entry.
 */
class LRUCache {
  constructor(capacity = 4) {
    this.capacity = capacity;
    this.items = new Map();
  }

  get(key) {
    if (!this.items.has(key)) {
      return undefined;
    }

    const value = this.items.get(key);

    // Refresh recency.
    this.items.delete(key);
    this.items.set(key, value);

    return value;
  }

  set(key, value) {
    if (this.items.has(key)) {
      this.items.delete(key);
    }

    this.items.set(key, value);

    // Evict the least recently used key if capacity is exceeded.
    if (this.items.size > this.capacity) {
      const leastRecentlyUsedKey = this.items.keys().next().value;
      this.items.delete(leastRecentlyUsedKey);
    }
  }

  delete(key) {
    this.items.delete(key);
  }

  clear() {
    this.items.clear();
  }

  snapshot() {
    return Array.from(this.items.entries()).map(([key, value]) => ({
      key,
      value
    }));
  }
}

module.exports = LRUCache;
