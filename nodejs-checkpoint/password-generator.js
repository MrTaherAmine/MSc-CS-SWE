// Task 4: Generate a random password using generate-password.
const generator = require("generate-password");

function generateRandomPassword() {
  const password = generator.generate({
    length: 14,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true
  });

  console.log("Generated password:", password);
  return password;
}

generateRandomPassword();
