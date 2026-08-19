# Phase 7 Completion Checklist

## Objective

- [x] Prepare BookSphere for a tested production deployment.

## Instruction 1 — Choose a hosting provider

- [x] Render selected for the Node/Express/React web service.
- [x] MongoDB Atlas selected for the managed production database.
- [x] Frankfurt selected as the Render region.
- [x] Provider decision documented.

## Instruction 2 — Set up and configure the server

- [x] Render Blueprint created.
- [x] Production build and start commands configured.
- [x] Environment variables and secret handling configured.
- [x] Express configured to serve React and handle SPA routes.
- [x] Health check, graceful shutdown, proxy trust, caching, and security headers added.
- [x] MongoDB connection pooling and timeout settings added.

## Instruction 3 — Deploy the website

- [x] One-click Blueprint deployment workflow created.
- [x] GitHub automatic deployment gate configured.
- [x] Public repository URL documented.
- [ ] Repository owner must authorize GitHub/Render and provide `MONGODB_URI`.
- [ ] Record the final `onrender.com` production URL after provisioning.

## Instruction 4 — Test thoroughly

- [x] Server tests pass (10/10).
- [x] React production build passes.
- [x] Deployment verification passes (17/17).
- [x] Production root and SPA fallback responses tested locally.
- [x] Health failure behavior and security headers tested locally.
- [ ] Complete the live production smoke test after provisioning.

## Submission

- [x] Phase 7 report completed.
- [x] Deployment guide completed.
- [x] Repository is safe to publish without local secrets.
- [ ] Submit the public GitHub repository link and live Render URL.
