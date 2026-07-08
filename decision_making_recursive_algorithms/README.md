# Decision Making and Recursive Algorithms Checkpoint

## Description

This project implements solutions for the checkpoint **Decision Making and Recursive Algorithms**.

It includes examples using:

- `if`
- `if-else`
- `switch`
- recursion
- base cases
- recursive calls

The project is written in JavaScript.

---

## Implemented Tasks

### Decision Making

The following decision-making tasks were implemented:

1. Leap Year Checker
2. Ticket Pricing
3. Weather Clothing Adviser

### Recursion

The following recursive tasks were implemented:

1. Fibonacci Sequence
2. Palindrome Checker
3. Power Function

---

## 1. Leap Year Checker

The function checks whether a year is a leap year.

A year is a leap year if:

- It is divisible by 4
- But not divisible by 100
- Unless it is also divisible by 400

### Example

```javascript
isLeapYear(2024); // true
isLeapYear(2023); // false
```

### Complexity

| Operation | Complexity |
|---|---|
| Leap Year Check | O(1) |

---

## 2. Ticket Pricing

The function determines the movie ticket price based on age.

Rules:

| Age Group | Price |
|---|---|
| Children age <= 12 | $10 |
| Teenagers age 13-17 | $15 |
| Adults age >= 18 | $20 |

### Example

```javascript
getMovieTicketPrice(8);  // 10
getMovieTicketPrice(15); // 15
getMovieTicketPrice(25); // 20
```

### Complexity

| Operation | Complexity |
|---|---|
| Ticket Pricing | O(1) |

---

## 3. Weather Clothing Adviser

The function gives clothing advice based on:

- Current temperature
- Whether it is raining or not

It uses both `if-else` and `switch`.

### Example

```javascript
getWeatherClothingAdvice(5, true);
// Wear a warm coat and take an umbrella.
```

### Complexity

| Operation | Complexity |
|---|---|
| Weather Advice | O(1) |

---

## 4. Fibonacci Sequence

The function recursively calculates the nth Fibonacci number.

Fibonacci sequence:

```text
0, 1, 1, 2, 3, 5, 8, 13...
```

### Formula

```text
fibonacci(n) = fibonacci(n - 1) + fibonacci(n - 2)
```

Base cases:

```text
fibonacci(0) = 0
fibonacci(1) = 1
```

### Example

```javascript
fibonacci(6); // 8
```

### Complexity

| Operation | Complexity |
|---|---|
| Fibonacci Recursive | O(2^n) |

---

## 5. Palindrome Checker

The function recursively checks whether a string is a palindrome.

It ignores:

- Spaces
- Punctuation
- Capitalization

### Example

```javascript
isPalindromeRecursive("A man, a plan, a canal: Panama");
// true
```

### Complexity

| Operation | Complexity |
|---|---|
| Palindrome Check | O(n) |

---

## 6. Power Function

The function recursively calculates a number raised to a given power.

### Formula

```text
power(base, exponent) = base * power(base, exponent - 1)
```

Base case:

```text
power(base, 0) = 1
```

### Example

```javascript
power(2, 3); // 8
```

### Complexity

| Operation | Complexity |
|---|---|
| Power Function | O(n) |

---

## Edge Cases Handled

The program handles:

- Invalid negative age
- Invalid negative year
- Fibonacci input less than 0
- Power with exponent equal to 0
- Power with negative exponent
- Palindrome strings with spaces, punctuation, and uppercase letters

---

## How to Run

Make sure Node.js is installed.

Run:

```bash
node index.js
```

---

## Files

- `index.js`: Main JavaScript implementation
- `README.md`: Project explanation and complexity analysis

---

## Author

Taher Amine ELHOUARI
