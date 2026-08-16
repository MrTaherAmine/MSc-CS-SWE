// Task 3 - Third-party module: nodemailer
//
// IMPORTANT:
// This file intentionally does not contain real credentials.
// Set the environment variables before running it.

const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const EMAIL_TO = process.env.EMAIL_TO;

if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !EMAIL_TO) {
  console.error(
    [
      "Missing email configuration.",
      "",
      "Set these environment variables before running:",
      "EMAIL_USER",
      "EMAIL_APP_PASSWORD",
      "EMAIL_TO"
    ].join("\n")
  );

  process.exit(1);
}

// Create an SMTP transporter using Gmail.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD
  }
});

// Define the email.
const mailOptions = {
  from: EMAIL_USER,
  to: EMAIL_TO,
  subject: "Node.js Nodemailer Checkpoint",
  text: "Hello! This email was sent from my first Node.js application using Nodemailer."
};

// Send the email.
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Email could not be sent:");
    console.error(error);
    return;
  }

  console.log("Email sent successfully.");
  console.log("Message ID:", info.messageId);
});
