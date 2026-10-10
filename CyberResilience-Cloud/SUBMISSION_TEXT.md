# GoMyCode checkpoint — submission text (COMPLETE THE BRACKETED FIELDS FIRST)

**Project:** CyberResilience Cloud — MSc Software Engineering, Cloud-Based Web System Design checkpoint.

**Problem / solution:** A privacy-aware web application that turns an 18-question, six-function NIST CSF 2.0-inspired cybersecurity readiness self-assessment into a normalized readiness snapshot and three actionable improvement recommendations. It is an indicative self-report tool, not formal compliance verification or certification.

**Research:** NIST CSWP 29 (CSF 2.0), NIST SP 1300 (Small Business Quick-Start Guide), CISA Cross-Sector Cybersecurity Performance Goals, and OWASP ASVS 5.0. References and their design consequences appear in the attached report.

**Architecture:** HTML/CSS/JavaScript client; PHP 8.1+ validation/scoring/health endpoints; Apache/LiteSpeed hosting; documented optional MySQL model not connected to the current stateless demonstration; scoped CSP/security headers; GitHub Actions unit-test workflow. Architecture and data-flow diagrams are attached in `docs/diagrams/`.

**Platform and working public application link:** [PASTE ACTUAL WORKING URL AFTER VERIFICATION]

**Health endpoint:** [PASTE VERIFIED HEALTH URL]

**GitHub source repository and project directory:** [PASTE ACTUAL COMMIT LINK INTO MrTaherAmine/MSc-CS-SWE]

**CI/tests:** Nine PHP scoring scenarios pass locally; [PASTE VERIFIED GITHUB ACTIONS RUN URL OR EXPLAIN IF NOT RUN].

**Deployment verification:** [PASTE ACTUAL DATE AND RESULTS FOR HOME PAGE, API, SCORE, PRINT; ATTACH SCREENSHOTS].

**Professional report:** `docs/report/CyberResilience_Cloud_MSc_Professional_Report.pdf` (3,244 words; includes implementation, research, architecture, evaluation, limitations and references).

**Presentation / 10-minute demo:** [PASTE WATCHABLE RECORDING LINK]. The script and editable slides are included in `docs/presentation/`.

**Submission evidence:** [UPLOAD PDF FILE AS A REAL ATTACHMENT, NOT ONLY ITS FILENAME; ATTACH DIAGRAMS OR INCLUDE IN PDF; PROVIDE CLICKABLE PUBLIC LINKS].

**Notes:** cPanel shared hosting offers public hosting but is not elastic PaaS; if the rubric requires Render/Vercel/AWS/Azure/GCP explicitly, deploy the provided Dockerfile to Render and record the verified Render URL as the evaluated cloud URL.
