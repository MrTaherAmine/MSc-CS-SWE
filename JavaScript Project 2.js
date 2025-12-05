// ===================================================
// JavaScript Project 2
// Problem-Solving Techniques – Part 1
// ---------------------------------------------------
// Author: Taher Amine ELHOUARI
// ===================================================

// ===============================
// 1) STRING MANIPULATION
// ===============================

// Reverse a String
function reverseString(str) {
    return str.split("").reverse().join("");
}

// Count Characters
function countCharacters(str) {
    return str.length;
}

// Capitalize Words
function capitalizeWords(sentence) {
    return sentence
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


// ===============================
// 2) ARRAY FUNCTIONS
// ===============================

// Find Maximum value
function findMax(arr) {
    return Math.max(...arr);
}

// Find Minimum value
function findMin(arr) {
    return Math.min(...arr);
}

// Sum of all array elements
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

// Filter Array (Example: keep even numbers only)
function filterArray(arr) {
    return arr.filter(num => num % 2 === 0);
}


// ===============================
// 3) MATHEMATICAL FUNCTIONS
// ===============================

// Factorial
function factorial(num) {
    if (num < 0) return "Invalid input";

    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i;
    }
    return result;
}

// Prime Number Check
function isPrime(num) {
    if (num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Fibonacci Sequence
function fibonacci(n) {
    let sequence = [];

    if (n >= 1) sequence.push(0);
    if (n >= 2) sequence.push(1);

    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    return sequence;
}


// ===============================
// 4) TESTING ALL FUNCTIONS
// ===============================

// ------ String Functions ------
console.log("---- STRING FUNCTIONS ----");
console.log("Reverse:", reverseString("JavaScript"));
console.log("Count Characters:", countCharacters("JavaScript"));
console.log("Capitalize Words:", capitalizeWords("hello world from javascript"));

// ------ Array Functions ------
console.log("\n---- ARRAY FUNCTIONS ----");
let numbers = [3, 8, 1, 6, 4, 10];
console.log("Array:", numbers);
console.log("Max:", findMax(numbers));
console.log("Min:", findMin(numbers));
console.log("Sum:", sumArray(numbers));
console.log("Filtered (Even numbers):", filterArray(numbers));

// ------ Math Functions ------
console.log("\n---- MATHEMATICAL FUNCTIONS ----");
console.log("Factorial of 5:", factorial(5));
console.log("Is 11 prime?:", isPrime(11));
console.log("Is 9 prime?:", isPrime(9));
console.log("Fibonacci (7 terms):", fibonacci(7));

