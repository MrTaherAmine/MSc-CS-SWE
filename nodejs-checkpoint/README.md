# Node.js Checkpoint

Submission for:

**Advanced Back End Development : Node.js — Node.js Checkpoint**

This repository contains one file for each exercise required by the checkpoint.

## Task 1 — Hello World

File:

```text
hello-world.js
```

Run:

```bash
npm run hello
```

Expected output:

```text
HELLO WORLD
```

---

## Task 2 — HTTP Server

File:

```text
server.js
```

The server runs on:

```text
http://localhost:3000
```

and responds with:

```html
<h1>Hello Node!!!!</h1>
```

Run:

```bash
npm run server
```

---

## Task 3 — File System

Files:

```text
file-system.js
hello.txt
```

The program:

1. Creates `welcome.txt`.
2. Writes:

```text
Hello Node
```

3. Reads `hello.txt`.
4. Prints its content to the console.

Run:

```bash
npm run files
```

`welcome.txt` is generated when the script runs.

---

## Task 4 — Password Generator

File:

```text
password-generator.js
```

Dependency:

```text
generate-password
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run password
```

The script generates and prints a random password.

---

## Task 5 — Email Sender

File:

```text
email-sender.js
```

Dependency:

```text
nodemailer
```

The file intentionally contains **no personal credentials**.

Set these environment variables before testing:

```text
EMAIL_USER
EMAIL_APP_PASSWORD
EMAIL_TO
```

### Windows PowerShell

```powershell
$env:EMAIL_USER="your_email@gmail.com"
$env:EMAIL_APP_PASSWORD="your_app_password"
$env:EMAIL_TO="your_email@gmail.com"
npm run email
```

### macOS / Linux

```bash
export EMAIL_USER="your_email@gmail.com"
export EMAIL_APP_PASSWORD="your_app_password"
export EMAIL_TO="your_email@gmail.com"
npm run email
```

Use a Gmail App Password instead of your normal Gmail account password.

---

## Install

```bash
npm install
```

## Project Structure

```text
nodejs-checkpoint/
├── .env.example
├── .gitignore
├── email-sender.js
├── file-system.js
├── hello-world.js
├── hello.txt
├── package.json
├── password-generator.js
├── README.md
└── server.js
```

## Security

The checkpoint specifically warns not to upload personal information to GitHub.

For that reason:

- no real Gmail address is hardcoded;
- no Gmail password is hardcoded;
- no app password is hardcoded;
- `.env` is ignored by Git.

## Author

Taher Amine ELHOUARI
