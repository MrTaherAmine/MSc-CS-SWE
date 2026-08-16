// Task 5: Send an email using Nodemailer.
//
// IMPORTANT:
// Personal credentials are NOT stored in this file.
// Set environment variables before running.

const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
  console.error(
    [
      "Missing email configuration.",
      "Set EMAIL_USER and EMAIL_APP_PASSWORD before running this file.",
      "Optionally set EMAIL_TO; otherwise the email is sent to EMAIL_USER."
    ].join("\n")
  );
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD
  }
});

const mailOptions = {
  from: EMAIL_USER,
  to: EMAIL_TO,
  subject: "Node.js Checkpoint Test Email",
  text: "Hello! This email was sent from my Node.js checkpoint using Nodemailer."
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Email sending failed:");
    console.error(error.message);
    return;
  }

  console.log("Email sent successfully.");
  console.log("Message ID:", info.messageId);
});
