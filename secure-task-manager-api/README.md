# Secure Task Manager API

Submission for:

**Backend Development : Advanced Node.js and Express.js — Secure Task Manager API**

## Overview

This project implements a secure Task Manager REST API with:

- JWT signup/login
- Google OAuth through Passport.js
- JWT in an HTTP-only cookie
- protected private routes
- per-user task ownership
- Helmet security headers
- request sanitization
- login rate limiting
- reusable `AppError`
- centralized error middleware
- reusable `catchAsync()` helper

The checkpoint focuses on backend architecture and security rather than persistence, so this version uses **in-memory stores**. Data resets whenever the server restarts.

---

# Authentication

## Local signup

```text
POST /auth/signup
```

Example:

```json
{
  "email": "student@example.com",
  "password": "StrongPass123!",
  "displayName": "Student"
}
```

Passwords are hashed using `bcryptjs`.

## Local login

```text
POST /auth/login
```

Example:

```json
{
  "email": "student@example.com",
  "password": "StrongPass123!"
}
```

The login route is protected with basic rate limiting.

## JWT Cookie

After successful signup/login, the API stores the JWT in a cookie named:

```text
jwt
```

Cookie properties include:

```text
httpOnly: true
sameSite: lax
secure: true in production / HTTPS
```

For normal local HTTP development, `COOKIE_SECURE=false` is used so the browser can actually send the cookie to `localhost`.

In production HTTPS environments:

```env
COOKIE_SECURE=true
NODE_ENV=production
```

## Protected Routes

Private task routes use:

```text
verifyToken
```

The middleware:

1. reads the JWT from the HTTP-only cookie;
2. verifies the JWT signature and expiration;
3. finds the user;
4. attaches the authenticated user to `req.user`.

---

# Google OAuth

Passport.js with `passport-google-oauth20` is configured.

Routes:

```text
GET /auth/google
GET /auth/google/callback
```

Create OAuth credentials in Google Cloud and configure:

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

After successful Google authentication, the API generates the same JWT cookie used by local authentication.

If Google credentials are not configured, the rest of the API still starts, but Google login will not be usable.

---

# Task Routes

All task routes require authentication.

## Create a Task

```text
POST /tasks
```

Example:

```json
{
  "title": "Finish secure API checkpoint",
  "description": "Complete documentation and test access control."
}
```

## View My Tasks

```text
GET /tasks
```

Only tasks belonging to the currently authenticated user are returned.

## Delete My Task

```text
DELETE /tasks/:id
```

The API checks ownership before deleting.

If another user attempts to delete the task:

```text
403 Forbidden
```

---

# Security Controls

## Helmet

`helmet()` is applied globally to add security-related HTTP headers.

## XSS Sanitization

The checkpoint explicitly requests:

```text
xss-clean
```

so the package is included and applied.

> Note for real projects: `xss-clean` is deprecated. It is included here to satisfy the checkpoint requirements. For production applications, use actively maintained validation/sanitization techniques appropriate to the data and rendering context.

## Mongo Operator Sanitization

`express-mongo-sanitize` is applied to remove dangerous MongoDB-style operator keys from request input.

Even though this educational version uses an in-memory store, the middleware demonstrates the requested protection.

## Rate Limiting

The login endpoint allows a limited number of attempts within a 15-minute window.

## Password Hashing

Passwords are never stored in plaintext.

`bcryptjs` hashes local-user passwords before storage.

## Cookie Security

The JWT is not returned to browser JavaScript.

The cookie uses:

- `httpOnly`
- `sameSite=lax`
- `secure` in HTTPS/production

---

# Error Handling

## AppError

Reusable operational errors are defined in:

```text
src/utils/AppError.js
```

Example:

```js
throw new AppError("Task not found.", 404);
```

## catchAsync()

Instead of repeating `try/catch` in every asynchronous controller:

```js
router.get("/", catchAsync(list));
```

Rejected promises are forwarded to Express error handling.

## Central Error Middleware

All operational errors are formatted consistently by:

```text
src/middleware/errorHandler.js
```

---

# Project Structure

```text
secure-task-manager-api/
├── src/
│   ├── config/
│   │   └── passport.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   ├── validateTask.js
│   │   └── verifyToken.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── store/
│   │   ├── taskStore.js
│   │   └── userStore.js
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── catchAsync.js
│   │   └── token.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Run Locally

Install:

```bash
npm install
```

Set environment variables.

### macOS / Linux example

```bash
export JWT_SECRET="replace-this-with-a-long-random-secret"
export COOKIE_SECURE=false
npm start
```

### PowerShell example

```powershell
$env:JWT_SECRET="replace-this-with-a-long-random-secret"
$env:COOKIE_SECURE="false"
npm start
```

The API runs at:

```text
http://localhost:3000
```

---

# Testing with curl

Because authentication is stored in a cookie, use curl's cookie jar.

## Signup

```bash
curl -i -c cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"StrongPass123!","displayName":"Student"}' \
  http://localhost:3000/auth/signup
```

## Create Task

```bash
curl -i -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"title":"My private task","description":"Only I should access it."}' \
  http://localhost:3000/tasks
```

## View Tasks

```bash
curl -i -b cookies.txt \
  http://localhost:3000/tasks
```

## Delete Task

Replace `TASK_ID`:

```bash
curl -i -X DELETE -b cookies.txt \
  http://localhost:3000/tasks/TASK_ID
```

---

# Security / Production Note

This is an educational checkpoint implementation.

A production deployment should additionally consider:

- persistent database storage;
- CSRF protection for cookie-authenticated state-changing requests;
- email verification / password recovery;
- secret management;
- strict CORS policy when a separate frontend is used;
- HTTPS everywhere;
- audit logging;
- dependency monitoring;
- stronger schema validation.

## Author

Taher Amine ELHOUARI
