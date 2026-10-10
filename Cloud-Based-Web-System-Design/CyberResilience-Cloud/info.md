# CyberResilience Cloud · Service Information

**Application:** https://taheramine.org/msc/cyberresilience-cloud/  
**Health endpoint:** https://taheramine.org/msc/cyberresilience-cloud/api/health.php  
**Repository path:** `Cloud-Based-Web-System-Design/CyberResilience-Cloud/`  
**Runtime:** PHP 8.1+, HTML, CSS, JavaScript  
**Assessment state:** Stateless; no application-managed user accounts or assessment history  
**Scoring API:** `POST /api/score.php`  
**Health API:** `GET /api/health.php`  
**Automated checks:** `php tests/test_scoring.php`; `.github/workflows/cyberresilience-php-ci.yml`

## Operational characteristics

A full assessment consists of 18 integer answers from 0 to 4. Server-side validation rejects malformed, incomplete, duplicated, and unknown responses. Each of the six domains produces a score between 0 and 100. The overall readiness indicator aggregates domain scores, and the three lowest-scoring domains determine the initial prioritized actions.

The application is deployed as a standalone directory under the website's HTTPS origin, reducing cross-origin complexity. Its current hosting model does not provide a claim of automatic elastic scaling. The optional container setup is documented separately as a portability option, not as an already-operational production service.

*The two public URLs are project publication addresses. This document is not an uptime certificate or a record of an independently witnessed HTTP request.*
