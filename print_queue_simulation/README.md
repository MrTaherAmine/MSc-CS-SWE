# Simulating a Print Queue

## Checkpoint

**Data Structures - Practical Implementation**  
**Project:** Simulating a Print Queue

## Objective

This project simulates a shared office printer where employees send print jobs to a printer.

The printer processes jobs in the same order they are received, following the **FIFO** principle:

> First-In, First-Out

## Implemented Features

- `Queue` class
- `PrinterQueue` class
- `PrintJob` class
- Add print jobs using a name and number of pages
- Process jobs one by one
- View the next job using `peek`
- Check whether the queue is empty
- Print the current queue
- Print completed jobs
- Test scenario with multiple print jobs

## Queue Operations

| Operation | Description | Time Complexity |
|---|---|---|
| `enqueue()` | Adds a job to the end of the queue | O(1) |
| `dequeue()` | Removes the job from the front | O(n) using JavaScript array `shift()` |
| `peek()` | Views the first job without removing it | O(1) |
| `isEmpty()` | Checks whether the queue is empty | O(1) |

## Files

- `index.js` — Main implementation
- `README.md` — Documentation

## How to Run

Run the project using Node.js:

```bash
node index.js
```

## Example Behavior

1. Add several print jobs.
2. Print the current queue.
3. Process jobs one by one.
4. Add another job.
5. Continue processing until the queue is empty.

## Explanation

A queue is the correct data structure for a printer system because print jobs must be processed in the order they arrive.

For example:

1. Employee A sends a print job.
2. Employee B sends a print job.
3. Employee C sends a print job.

The printer processes Employee A first, then Employee B, then Employee C.

This is exactly how FIFO works.

## Conclusion

This checkpoint demonstrates how a queue can be used to simulate a real-world printer queue system.
