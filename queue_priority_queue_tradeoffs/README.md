# Queue and Priority Queue Implementation Variations

## Description

This checkpoint implements different variations of queues and priority queues to compare their trade-offs.

Implemented data structures:

1. Array-based Queue
2. Linked List-based Queue
3. Min-Heap-based Priority Queue
4. Ordered Array-based Priority Queue

The implementation is written in JavaScript.

---

## 1. Array-based Queue

This queue uses a fixed-size array and circular indexing.

### Operations

- `enqueue(element)`
- `dequeue()`
- `peek()`
- `isEmpty()`

### Complexity

| Operation | Time Complexity |
|---|---|
| Enqueue | O(1) |
| Dequeue | O(1) |
| Peek | O(1) |
| isEmpty | O(1) |

### Trade-off

The array-based queue is fast, but it has a fixed capacity. It can also waste memory if the array is not fully used.

---

## 2. Linked List-based Queue

This queue uses a singly linked list with front and rear pointers.

### Operations

- `enqueue(element)`
- `dequeue()`
- `peek()`
- `isEmpty()`

### Complexity

| Operation | Time Complexity |
|---|---|
| Enqueue | O(1) |
| Dequeue | O(1) |
| Peek | O(1) |
| isEmpty | O(1) |

### Trade-off

The linked list-based queue is dynamic and can grow or shrink. However, it uses extra memory because each node stores a pointer.

---

## 3. Min-Heap-based Priority Queue

This priority queue uses a min-heap. The element with the smallest priority value is processed first.

### Operations

- `insert(element)`
- `extractMin()`
- `peekMin()`
- `isEmpty()`

### Complexity

| Operation | Time Complexity |
|---|---|
| Insert | O(log n) |
| Extract Min | O(log n) |
| Peek Min | O(1) |
| isEmpty | O(1) |

### Trade-off

The min-heap priority queue is efficient and scalable. It is usually better for large priority queues.

---

## 4. Ordered Array-based Priority Queue

This priority queue keeps the array sorted by priority.

### Operations

- `insert(element)`
- `extractMin()`
- `peekMin()`
- `isEmpty()`

### Complexity

| Operation | Time Complexity |
|---|---|
| Insert | O(n) |
| Extract Min | O(1) |
| Peek Min | O(1) |
| isEmpty | O(1) |

### Trade-off

The ordered array priority queue is simple and has fast extraction, but insertion is slower because the correct position must be found and elements may need to be shifted.

---

## Edge Cases Handled

The program handles:

- Dequeue from an empty queue
- Peek from an empty queue
- Inserting into a full fixed-size array queue
- Extracting minimum from an empty priority queue
- Peeking minimum from an empty priority queue

---

## How to Run

Make sure Node.js is installed.

Then run:

```bash
node index.js
```

---

## Files

- `index.js`: Main implementation and tests
- `README.md`: Explanation and trade-off analysis

---

## Author

Taher Amine ELHOUARI
