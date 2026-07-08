/*
  Data Structures - Practical Implementation
  Checkpoint: Simulating a Print Queue

  Author: Taher Amine ELHOUARI
*/

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    return this.items;
  }
}

class PrintJob {
  constructor(name, pages) {
    if (!name || typeof name !== "string") {
      throw new Error("Job name must be a valid string.");
    }

    if (!Number.isInteger(pages) || pages <= 0) {
      throw new Error("Pages must be a positive integer.");
    }

    this.name = name;
    this.pages = pages;
  }
}

class PrinterQueue {
  constructor() {
    this.jobs = new Queue();
    this.completedJobs = [];
  }

  addJob(name, pages) {
    const job = new PrintJob(name, pages);
    this.jobs.enqueue(job);
    console.log(`Added print job: ${job.name} (${job.pages} pages)`);
  }

  processJob() {
    if (this.jobs.isEmpty()) {
      console.log("No print jobs to process.");
      return null;
    }

    const job = this.jobs.dequeue();
    this.completedJobs.push(job);

    console.log(`Processing: ${job.name}`);
    console.log(`Pages: ${job.pages}`);
    console.log("Status: Completed\n");

    return job;
  }

  peekNextJob() {
    const job = this.jobs.peek();

    if (!job) {
      console.log("No job is waiting.");
      return null;
    }

    console.log(`Next job: ${job.name} (${job.pages} pages)`);
    return job;
  }

  printQueue() {
    if (this.jobs.isEmpty()) {
      console.log("The print queue is empty.");
      return;
    }

    console.log("Current Print Queue:");
    this.jobs.print().forEach((job, index) => {
      console.log(`${index + 1}. ${job.name} - ${job.pages} pages`);
    });
  }

  printCompletedJobs() {
    if (this.completedJobs.length === 0) {
      console.log("No completed jobs yet.");
      return;
    }

    console.log("Completed Print Jobs:");
    this.completedJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.name} - ${job.pages} pages`);
    });
  }
}

// ----------------------
// Test the Solution
// ----------------------

const printer = new PrinterQueue();

console.log("=== Adding Print Jobs ===");
printer.addJob("Employee A - Contract Document", 5);
printer.addJob("Employee B - Monthly Report", 12);
printer.addJob("Employee C - Meeting Notes", 3);
printer.addJob("Employee D - Invoice Copy", 2);

console.log("\n=== Current Queue ===");
printer.printQueue();

console.log("\n=== Next Job ===");
printer.peekNextJob();

console.log("\n=== Processing Two Jobs ===");
printer.processJob();
printer.processJob();

console.log("=== Queue After Processing ===");
printer.printQueue();

console.log("\n=== Adding Another Job ===");
printer.addJob("Employee E - Presentation Slides", 20);

console.log("\n=== Updated Queue ===");
printer.printQueue();

console.log("\n=== Processing Remaining Jobs ===");
while (!printer.jobs.isEmpty()) {
  printer.processJob();
}

console.log("=== Final Queue ===");
printer.printQueue();

console.log("\n=== Completed Jobs ===");
printer.printCompletedJobs();
