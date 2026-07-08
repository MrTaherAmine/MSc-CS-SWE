/*
Checkpoint: Implementation Variations and Trade-offs

Implemented:
1. Array-based Queue (fixed size)
2. Linked List-based Queue (dynamic size)
3. Min-Heap-based Priority Queue
4. Ordered Array-based Priority Queue

Run:
node index.js
*/

class ArrayQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.items = new Array(capacity);
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(element) {
    if (this.size === this.capacity) {
      throw new Error("Queue is full. Cannot enqueue new element.");
    }

    this.items[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty. Cannot dequeue.");
    }

    const removedElement = this.items[this.front];
    this.items[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.size--;

    return removedElement;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty. Cannot peek.");
    }

    return this.items[this.front];
  }

  isEmpty() {
    return this.size === 0;
  }

  print() {
    const result = [];

    for (let i = 0; i < this.size; i++) {
      const index = (this.front + i) % this.capacity;
      result.push(this.items[index]);
    }

    console.log(result.join(" <- "));
  }
}

class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(element) {
    const newNode = new QueueNode(element);

    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty. Cannot dequeue.");
    }

    const removedElement = this.front.value;
    this.front = this.front.next;
    this.size--;

    if (this.front === null) {
      this.rear = null;
    }

    return removedElement;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty. Cannot peek.");
    }

    return this.front.value;
  }

  isEmpty() {
    return this.front === null;
  }

  print() {
    const result = [];
    let current = this.front;

    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }

    console.log(result.join(" <- "));
  }
}

class MinHeapPriorityQueue {
  constructor() {
    this.heap = [];
  }

  insert(element) {
    this.heap.push(element);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty. Cannot extract minimum.");
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const minElement = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return minElement;
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty. Cannot peek minimum.");
    }

    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[parentIndex].priority <= this.heap[currentIndex].priority) {
        break;
      }

      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].priority < this.heap[smallestIndex].priority
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].priority < this.heap[smallestIndex].priority
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === currentIndex) {
        break;
      }

      this.swap(currentIndex, smallestIndex);
      currentIndex = smallestIndex;
    }
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  print() {
    console.log(
      this.heap.map((item) => `${item.value}(P:${item.priority})`).join(" | ")
    );
  }
}

class OrderedArrayPriorityQueue {
  constructor() {
    this.items = [];
  }

  insert(element) {
    let inserted = false;

    for (let i = 0; i < this.items.length; i++) {
      if (element.priority < this.items[i].priority) {
        this.items.splice(i, 0, element);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      this.items.push(element);
    }
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty. Cannot extract minimum.");
    }

    return this.items.shift();
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty. Cannot peek minimum.");
    }

    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    console.log(
      this.items.map((item) => `${item.value}(P:${item.priority})`).join(" | ")
    );
  }
}

function testArrayQueue() {
  console.log("\n===== ARRAY-BASED QUEUE TEST =====");

  const queue = new ArrayQueue(3);

  queue.enqueue("A");
  queue.enqueue("B");
  queue.enqueue("C");

  queue.print();

  console.log("Peek:", queue.peek());
  console.log("Dequeue:", queue.dequeue());

  queue.print();

  try {
    queue.enqueue("D");
    queue.enqueue("E");
  } catch (error) {
    console.log("Expected error:", error.message);
  }
}

function testLinkedListQueue() {
  console.log("\n===== LINKED LIST-BASED QUEUE TEST =====");

  const queue = new LinkedListQueue();

  queue.enqueue("A");
  queue.enqueue("B");
  queue.enqueue("C");

  queue.print();

  console.log("Peek:", queue.peek());
  console.log("Dequeue:", queue.dequeue());

  queue.print();

  console.log("Dequeue:", queue.dequeue());
  console.log("Dequeue:", queue.dequeue());

  try {
    queue.dequeue();
  } catch (error) {
    console.log("Expected error:", error.message);
  }
}

function testMinHeapPriorityQueue() {
  console.log("\n===== MIN-HEAP PRIORITY QUEUE TEST =====");

  const pq = new MinHeapPriorityQueue();

  pq.insert({ value: "Low priority task", priority: 3 });
  pq.insert({ value: "High priority task", priority: 1 });
  pq.insert({ value: "Medium priority task", priority: 2 });

  pq.print();

  console.log("Peek Min:", pq.peekMin());
  console.log("Extract Min:", pq.extractMin());

  pq.print();

  pq.extractMin();
  pq.extractMin();

  try {
    pq.extractMin();
  } catch (error) {
    console.log("Expected error:", error.message);
  }
}

function testOrderedArrayPriorityQueue() {
  console.log("\n===== ORDERED ARRAY PRIORITY QUEUE TEST =====");

  const pq = new OrderedArrayPriorityQueue();

  pq.insert({ value: "Low priority task", priority: 3 });
  pq.insert({ value: "High priority task", priority: 1 });
  pq.insert({ value: "Medium priority task", priority: 2 });

  pq.print();

  console.log("Peek Min:", pq.peekMin());
  console.log("Extract Min:", pq.extractMin());

  pq.print();

  pq.extractMin();
  pq.extractMin();

  try {
    pq.peekMin();
  } catch (error) {
    console.log("Expected error:", error.message);
  }
}

function printTradeOffAnalysis() {
  console.log("\n===== TRADE-OFF ANALYSIS =====");

  console.log(`
1. Array-based Queue:
   - Enqueue: O(1)
   - Dequeue: O(1)
   - Peek: O(1)
   - Space: O(n), fixed capacity
   - Trade-off: Fast operations, but limited size and may waste memory.

2. Linked List-based Queue:
   - Enqueue: O(1)
   - Dequeue: O(1)
   - Peek: O(1)
   - Space: O(n), dynamic
   - Trade-off: Can grow dynamically, but each node uses extra memory for pointers.

3. Min-Heap Priority Queue:
   - Insert: O(log n)
   - Extract Min: O(log n)
   - Peek Min: O(1)
   - Space: O(n)
   - Trade-off: Efficient and scalable for large priority queues.

4. Ordered Array Priority Queue:
   - Insert: O(n)
   - Extract Min: O(1)
   - Peek Min: O(1)
   - Space: O(n)
   - Trade-off: Simple and fast extraction, but insertion is slow for large datasets.
`);
}

testArrayQueue();
testLinkedListQueue();
testMinHeapPriorityQueue();
testOrderedArrayPriorityQueue();
printTradeOffAnalysis();
