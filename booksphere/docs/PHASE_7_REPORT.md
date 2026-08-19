# Phase 7 Report — Deployment

## Overview

Phase 7 prepares BookSphere for a repeatable production deployment and adds the
operational controls needed to verify it. Render was selected as the web hosting
provider, MongoDB Atlas as the managed database, and GitHub Actions as the
continuous-integration quality gate.

## Work completed

### 1. Hosting provider selection

Render was selected because it supports Node.js/Express web services, Git-based
automatic deployments, health checks, encrypted environment variables, HTTPS,
and a declarative Blueprint. The React application and Express API are deployed
together to keep authentication cookies and API calls on the same origin.

### 2. Production server configuration

- Added a `render.yaml` Blueprint with the build, start, health-check, region,
  free plan, deployment gate, and required environment variables.
- Configured Express to serve the compiled Vite application in production.
- Added React single-page-app fallback handling for direct route refreshes.
- Changed the client API default to same-origin `/api` and added a Vite local proxy.
- Added proxy awareness, secure production cookies, static-asset caching, and
  graceful SIGTERM/SIGINT shutdown.
- Added Content Security Policy, HSTS, frame, MIME, referrer, and permissions headers.
- Increased MongoDB server-selection resilience and configured a bounded connection pool.
- Made `/api/health` return HTTP 200 only when MongoDB is connected.

### 3. Continuous integration and deployment safety

- Added GitHub Actions checks for server tests, the React production build, and
  deployment configuration validation.
- Configured Render to deploy only when linked branch checks pass.
- Added `npm run verify:deployment` as the repeatable release gate.
- Confirmed local environment files and secrets are excluded from Git.
- Configured Render to generate the JWT secret and prompt securely for the Atlas URI.

## Verification results

| Check | Result |
| --- | --- |
| Server tests | 10/10 passed |
| React production build | Passed |
| Deployment configuration and runtime checks | 17/17 passed |
| Production SPA root response | Passed |
| Direct React route fallback | Passed |
| Disconnected-database health behavior | Passed with expected HTTP 503 |
| Production security headers | Passed |
| Git diff validation | Passed |

The live HTTP 200 database health check and complete production smoke test must
be performed after the repository owner authorizes GitHub/Render and supplies the
MongoDB Atlas URI. No production secret is stored in the repository.

## Result

BookSphere is deployment-ready as a single full-stack Render service. The final
account-bound action is to provision the Blueprint from the public repository,
enter `MONGODB_URI`, and record the resulting `onrender.com` URL in the GOMYCODE
submission.
