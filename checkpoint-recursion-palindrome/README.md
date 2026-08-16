# Checkpoint Recursion — Is Palindrome

Submission for:

**Low level design : Introduction to Low-Level Design — Checkpoint Recursion**

## Objective

Test whether a word is a palindrome using recursion.

A palindrome can be read in the same way from left to right and right to left.

Examples:

```text
gag
kayak
php
radar
```

## Recursive logic

The algorithm follows the checkpoint instructions exactly:

1. Compare the characters at both ends of the word.
2. If they are different, return `false`.
3. If they are equal, recursively test the rest of the word.
4. Stop when the remaining word:
   - is empty; or
   - contains only one character.

Those stop conditions return `true`.

## JavaScript implementation

```js
function isPalindrome(word) {
  const normalizedWord = String(word).toLowerCase();

  if (normalizedWord.length <= 1) {
    return true;
  }

  if (normalizedWord[0] !== normalizedWord[normalizedWord.length - 1]) {
    return false;
  }

  return isPalindrome(normalizedWord.slice(1, -1));
}
```

## Examples

```text
"gag"   -> true
"kayak" -> true
"php"   -> true
"radar" -> true
"hello" -> false
"a"     -> true
""      -> true
```

## Project structure

```text
checkpoint-recursion-palindrome/
├── src/
│   └── palindrome.js
├── tests/
│   └── palindrome.test.js
├── .gitignore
├── package.json
└── README.md
```

## Run

```bash
npm start
```

## Test

```bash
npm test
```

## Author

Taher Amine ELHOUARI
