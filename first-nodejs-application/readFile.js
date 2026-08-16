// Task 1 - Built-in module: fs
const fs = require("fs");

// Read the content of message.txt synchronously using Node.js built-in fs module.
const message = fs.readFileSync("message.txt", "utf8");

// Print the file content to the terminal.
console.log(message);
