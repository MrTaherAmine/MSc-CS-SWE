/*
Checkpoint: Decision Making and Recursive Algorithms

Implemented tasks:

Decision Making:
1. Leap Year Checker
2. Ticket Pricing
3. Weather Clothing Adviser

Recursion:
1. Fibonacci Sequence
2. Palindrome Checker
3. Power Function

Run:
node index.js
*/

// =====================================
// DECISION MAKING TASK 1: LEAP YEAR
// =====================================

function isLeapYear(year) {
  if (year <= 0) {
    throw new Error("Year must be a positive number.");
  }

  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

// =====================================
// DECISION MAKING TASK 2: TICKET PRICING
// =====================================

function getMovieTicketPrice(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative.");
  }

  if (age <= 12) {
    return 10;
  } else if (age >= 13 && age <= 17) {
    return 15;
  } else {
    return 20;
  }
}

// =====================================
// DECISION MAKING TASK 3: WEATHER CLOTHING ADVISER
// Uses if-else and switch-style decision logic
// =====================================

function getWeatherClothingAdvice(temperature, isRaining) {
  let temperatureCategory;

  if (temperature < 10) {
    temperatureCategory = "cold";
  } else if (temperature >= 10 && temperature <= 25) {
    temperatureCategory = "mild";
  } else {
    temperatureCategory = "hot";
  }

  let advice;

  switch (temperatureCategory) {
    case "cold":
      advice = "Wear a warm coat";
      break;
    case "mild":
      advice = "Wear a light jacket";
      break;
    case "hot":
      advice = "Wear light clothes";
      break;
    default:
      advice = "Wear comfortable clothes";
  }

  if (isRaining) {
    advice += " and take an umbrella";
  }

  return advice + ".";
}

// =====================================
// RECURSION TASK 1: FIBONACCI SEQUENCE
// =====================================

function fibonacci(n) {
  if (n < 0) {
    throw new Error("Fibonacci input must be 0 or greater.");
  }

  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

// =====================================
// RECURSION TASK 2: PALINDROME CHECKER
// Ignores spaces, punctuation, and capitalization
// =====================================

function cleanString(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isPalindromeRecursive(text) {
  const cleanedText = cleanString(text);

  function checkPalindrome(str, left, right) {
    if (left >= right) {
      return true;
    }

    if (str[left] !== str[right]) {
      return false;
    }

    return checkPalindrome(str, left + 1, right - 1);
  }

  return checkPalindrome(cleanedText, 0, cleanedText.length - 1);
}

// =====================================
// RECURSION TASK 3: POWER FUNCTION
// =====================================

function power(base, exponent) {
  if (exponent < 0) {
    return 1 / power(base, -exponent);
  }

  if (exponent === 0) {
    return 1;
  }

  return base * power(base, exponent - 1);
}

// =====================================
// TESTING / DEMONSTRATION
// =====================================

function runDecisionMakingTests() {
  console.log("\n===== DECISION MAKING TESTS =====\n");

  const years = [2024, 2023, 1900, 2000];

  for (const year of years) {
    console.log(`${year} is leap year: ${isLeapYear(year)}`);
  }

  const ages = [8, 15, 25];

  for (const age of ages) {
    console.log(`Age ${age} ticket price: $${getMovieTicketPrice(age)}`);
  }

  console.log(getWeatherClothingAdvice(5, true));
  console.log(getWeatherClothingAdvice(18, false));
  console.log(getWeatherClothingAdvice(32, true));
}

function runRecursionTests() {
  console.log("\n===== RECURSION TESTS =====\n");

  console.log("Fibonacci(0):", fibonacci(0));
  console.log("Fibonacci(1):", fibonacci(1));
  console.log("Fibonacci(6):", fibonacci(6));
  console.log("Fibonacci(8):", fibonacci(8));

  console.log('"madam" is palindrome:', isPalindromeRecursive("madam"));
  console.log('"A man, a plan, a canal: Panama" is palindrome:', isPalindromeRecursive("A man, a plan, a canal: Panama"));
  console.log('"hello" is palindrome:', isPalindromeRecursive("hello"));

  console.log("2^3:", power(2, 3));
  console.log("5^0:", power(5, 0));
  console.log("2^-2:", power(2, -2));
}

function printComplexityAnalysis() {
  console.log("\n===== COMPLEXITY ANALYSIS =====\n");

  console.log("Leap Year Checker: O(1)");
  console.log("Ticket Pricing: O(1)");
  console.log("Weather Clothing Adviser: O(1)");
  console.log("Fibonacci Recursive: O(2^n)");
  console.log("Palindrome Recursive: O(n)");
  console.log("Power Recursive: O(n)");
}

runDecisionMakingTests();
runRecursionTests();
printComplexityAnalysis();
