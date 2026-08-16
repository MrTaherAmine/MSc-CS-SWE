/**
 * Tests whether a word is a palindrome using recursion.
 *
 * Processing:
 * 1. Compare the first and last characters.
 * 2. If they are different, stop and return false.
 * 3. If they are equal, recursively test the remaining inner substring.
 *
 * Stop condition:
 * - An empty word is a palindrome.
 * - A one-character word is a palindrome.
 */
function isPalindrome(word) {
  // Normalize input so comparisons are predictable.
  const normalizedWord = String(word).toLowerCase();

  // Base case: empty string or one character.
  if (normalizedWord.length <= 1) {
    return true;
  }

  // If the two end characters are different, it is not a palindrome.
  if (normalizedWord[0] !== normalizedWord[normalizedWord.length - 1]) {
    return false;
  }

  // Recursive case: test the word without its first and last characters.
  return isPalindrome(normalizedWord.slice(1, -1));
}

// Demonstration examples.
const examples = ["gag", "kayak", "php", "radar", "hello", "level", "a", ""];

for (const word of examples) {
  console.log(`${JSON.stringify(word)} -> ${isPalindrome(word)}`);
}

module.exports = isPalindrome;
