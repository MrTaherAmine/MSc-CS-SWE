# Building Your First Node.js Application

Submission for:

**Backend Development : Building your first Node.js Application**

This project demonstrates the three module categories required by the checkpoint:

1. Built-in module
2. Local module
3. Third-party module

---

## Task 1 - Built-in Module (`fs`)

Files:

```text
message.txt
readFile.js
```

`message.txt` contains:

```text
Hello from the file system module!
```

`readFile.js` loads Node.js's built-in `fs` module:

```js
const fs = require("fs");
```

and reads the file with:

```js
fs.readFileSync("message.txt", "utf8");
```

Run:

```bash
npm run read
```

or:

```bash
node readFile.js
```

Expected output:

```text
Hello from the file system module!
```

---

## Task 2 - Local Module

Files:

```text
reportGenerator.js
main.js
```

`reportGenerator.js` exports:

```js
generateReport(name, scores)
```

The function:

- accepts a student name;
- accepts an array of scores;
- calculates the average;
- returns `PASS` when average >= 10;
- otherwise returns `FAIL`.

`main.js` imports the module using:

```js
const { generateReport } = require("./reportGenerator");
```

Run:

```bash
npm run report
```

or:

```bash
node main.js
```

---

## Task 3 - Third-Party Module (`nodemailer`)

Install dependencies:

```bash
npm install
```

The project includes:

```text
emailSender.js
```

It uses Nodemailer to create a Gmail SMTP transporter and send an email.

### Security

Real email credentials are intentionally **not included** in this repository.

Do not commit Gmail passwords or app passwords to GitHub.

Before running, set these environment variables:

```text
EMAIL_USER
EMAIL_APP_PASSWORD
EMAIL_TO
```

### Windows PowerShell example

```powershell
$env:EMAIL_USER="your_email@gmail.com"
$env:EMAIL_APP_PASSWORD="your_app_password"
$env:EMAIL_TO="recipient@example.com"
node emailSender.js
```

### macOS / Linux example

```bash
export EMAIL_USER="your_email@gmail.com"
export EMAIL_APP_PASSWORD="your_app_password"
export EMAIL_TO="recipient@example.com"
node emailSender.js
```

Then run:

```bash
npm run email
```

If Gmail is used, use a Google App Password rather than placing your normal account password in code.

---

## Project Structure

```text
first-nodejs-application/
├── .env.example
├── .gitignore
├── emailSender.js
├── main.js
├── message.txt
├── package.json
├── readFile.js
├── reportGenerator.js
└── README.md
```

## Install

```bash
npm install
```

## Author

Taher Amine ELHOUARI
