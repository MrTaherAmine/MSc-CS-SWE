# CyberResilience Cloud

A privacy-aware cybersecurity readiness assessment web application for smaller organizations. The application translates 18 self-assessment responses across the six functions of **NIST Cybersecurity Framework (CSF) 2.0** into normalized readiness scores and three prioritized improvement recommendations.

**Application:** https://taheramine.org/msc/cyberresilience-cloud/  
**Health endpoint:** https://taheramine.org/msc/cyberresilience-cloud/api/health.php

## Features

- Browser-based 18-question assessment organized into Govern, Identify, Protect, Detect, Respond, and Recover.
- PHP scoring API with strict allowlisted request validation and deterministic recommendation ranking.
- Explainable scores, project-defined readiness bands, and print-ready results.
- Same-origin frontend and backend; no application-managed assessment storage or authentication.
- Responsive interface, server-side error handling, browser security headers, and automated tests.

## Architecture

| Component | Implementation | Responsibility |
| --- | --- | --- |
| Presentation | HTML, CSS, JavaScript | Questionnaire and results display |
| Application API | PHP 8.1+ | JSON validation, scoring, health checks |
| Hosting | HTTPS website hosting with PHP | Static asset delivery and API execution |
| Data storage | None for this version | Stateless calculations; no saved assessment history |
| CI | GitHub Actions | PHP syntax and scoring tests |

The production-oriented relational schema in `docs/future-db-schema.sql` is an **architectural extension**, not a connected production database. Diagrams and data-flow notes are available under `docs/`.

## Local development

Requirements: PHP 8.1+.

```bash
php tests/test_scoring.php
php -S 127.0.0.1:8000 -t web
```

Open `http://127.0.0.1:8000/`; API health is at `http://127.0.0.1:8000/api/health.php`.

## Deployment

The `web/` directory is the document root of the deployed PHP web application, installed under `/msc/cyberresilience-cloud/` on the project website. A `Dockerfile` is supplied as a portable alternative for container-capable hosting; its presence does not represent a second live deployment. See `docs/ARCHITECTURE.md` for deployment design and limitations.

## Security and scope

Scoring is based on self-reported information and does **not** provide an independent security assessment, certification, regulatory determination, or official NIST maturity rating. The readiness bands and questions are project-defined educational instruments. No assessment records are stored by application code, although hosting and network providers may maintain access logs. Public demo requests must not include sensitive organization-specific information.

## References

- [NIST Cybersecurity Framework 2.0 (CSWP 29)](https://doi.org/10.6028/NIST.CSWP.29)
- [NIST Small Business Quick-Start Guide (SP 1300)](https://doi.org/10.6028/NIST.SP.1300)
- [CISA Cybersecurity Performance Goals](https://www.cisa.gov/cybersecurity-performance-goals)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)

**Author:** Taher Amine ELHOUARI
