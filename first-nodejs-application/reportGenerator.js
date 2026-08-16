// Task 2 - Local module

function generateReport(name, scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    return `Student: ${name}\nAverage Score: N/A\nStatus: No scores provided`;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  const average = total / scores.length;
  const status = average >= 10 ? "PASS" : "FAIL";

  return [
    `Student: ${name}`,
    `Scores: ${scores.join(", ")}`,
    `Average Score: ${average.toFixed(2)}`,
    `Status: ${status}`
  ].join("\n");
}

module.exports = {
  generateReport
};
