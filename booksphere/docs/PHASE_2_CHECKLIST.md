# Phase 2 Requirement Checklist

| Requirement | Implementation |
|---|---|
| Registration form | `client/src/pages/RegisterPage.jsx` |
| Login form | `client/src/pages/LoginPage.jsx` |
| Password hashing | bcrypt in `server/src/controllers/authController.js` |
| Secure credential storage | only `passwordHash` is stored |
| Session management | JWT in HTTP-only cookie |
| Protected routes | backend `requireAuth` + frontend `ProtectedRoute` |
| Authorization | recommendation POST requires authentication |
| Logout | `/api/auth/logout` clears session cookie |

## Authentication API

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

## Protected API

```text
POST /api/recommendations
```

## Frontend routes

```text
/register
/login
/dashboard
```
