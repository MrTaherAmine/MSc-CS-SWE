// Task 3: Use Node.js File System module.
const fs = require("fs");

// First: create welcome.txt containing "Hello Node".
fs.writeFileSync("welcome.txt", "Hello Node\n", "utf8");
console.log('Created "welcome.txt" with content: Hello Node');

// Second: read and display the content of hello.txt.
try {
  const data = fs.readFileSync("hello.txt", "utf8");
  console.log("\nContent of hello.txt:");
  console.log(data);
} catch (error) {
  console.error("Unable to read hello.txt:", error.message);
}
