// Task 2 - Import and use the local module
const { generateReport } = require("./reportGenerator");

const studentName = "Taher";
const scores = [14, 12, 16, 9, 15];

const report = generateReport(studentName, scores);

console.log("=== Student Report ===");
console.log(report);
