const isPalindrome = require("../src/palindrome");

const testCases = [
  ["gag", true],
  ["kayak", true],
  ["php", true],
  ["radar", true],
  ["level", true],
  ["hello", false],
  ["world", false],
  ["a", true],
  ["", true]
];

let failed = 0;

for (const [word, expected] of testCases) {
  const actual = isPalindrome(word);

  if (actual !== expected) {
    failed += 1;
    console.error(
      `FAILED: ${JSON.stringify(word)} -> expected ${expected}, got ${actual}`
    );
  } else {
    console.log(`PASSED: ${JSON.stringify(word)} -> ${actual}`);
  }
}

if (failed > 0) {
  process.exit(1);
}

console.log("\nAll palindrome tests passed.");
