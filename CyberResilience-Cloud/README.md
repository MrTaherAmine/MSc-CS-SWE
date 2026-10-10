# CyberResilience Cloud · MSc Software Engineering

**Cloud-Based Web System Design checkpoint** · Research-informed cybersecurity readiness web application. Author: Taher Amine ELHOUARI.

## Implemented

18 prompts grouped into six NIST CSF 2.0 functions; HTML/CSS/JavaScript assessment frontend; PHP 8.1+ same-origin scoring and health APIs; transparent scores and three actionable priorities; no assessment answer database, login, or cookies in app code; print-ready results; security headers and automated scoring tests.

The scale and maturity bands are project-defined interpretations, **not official NIST CSF Tiers, conformity verification, or a certification**.

## Run & test locally

```sh
php -v
php tests/test_scoring.php
php -S 127.0.0.1:8000 -t web
```

Open http://127.0.0.1:8000/ to use the assessment, http://127.0.0.1:8000/api/health.php for health, or use sample responses. Static HTML is not sufficient without PHP: the scoring endpoint is real server-side code.

## Publish at TaherAmine.org

Upload the **contents of `web/`** to `/public_html/msc/cyberresilience-cloud/` on the existing cPanel/Apache/LiteSpeed hosting, or upload and extract the standalone `WEBSITE_UPLOAD_TO_PUBLIC_HTML.zip` package at `/public_html/`. Do **not** replace the site's existing `index.html`, root `.htaccess` or Astro distribution. Choose PHP 8.1 or later for the folder. See `docs/DEPLOYMENT.md`.

Target public URL: https://taheramine.org/msc/cyberresilience-cloud/
Health URL: https://taheramine.org/msc/cyberresilience-cloud/api/health.php

These are *target paths only*, **not verified production URLs** until tested after upload.

## Evidence checklist

- Actual public URL responds with page and styling; screenshot it.
- `api/health.php` returns `status: ok`; screenshot it.
- Browser test: fill sample answers → calculate readiness → view priorities → print.
- `php tests/test_scoring.php` passes; capture output.
- Attach `docs/report/` report and `docs/diagrams/architecture.png`; record the 10-minute demo, add URL to `info.md`.
- Publish source to `MrTaherAmine/MSc-CS-SWE`, under `Cloud-Based-Web-System-Design/CyberResilience-Cloud/`.

See `docs/DEPLOYMENT.md` and `info.md`. There is no persistence database in the deployed academic demo; `docs/future-db-schema.sql` describes an optional future feature only.

## Public cloud platform alternative

For a strict AWS/Azure/GCP/Render/Vercel rubric, `Dockerfile` and `docs/RENDER_OPTIONAL.md` provide a secondary deployment path to Render. Conventional cPanel hosting is not equivalent to elastic PaaS; see the academic report for this distinction.
