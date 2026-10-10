# CyberResilience Cloud - 10-Minute Presentation / Demo Script

**Presenter:** Taher Amine ELHOUARI  
**Checkpoint:** Master Degree Highlights - Cloud-Based Web System Design

## 0:00-0:45 - Opening

Hello, my name is Taher Amine ELHOUARI. For this Cloud-Based Web System Design project, I developed **CyberResilience Cloud**, a cloud-hosted cybersecurity decision-support application for small and medium organizations.

The real-world problem I chose is straightforward: smaller organizations are increasingly dependent on cloud services and digital systems, but they often do not have the resources to interpret large cybersecurity frameworks or decide what to improve first. My project turns that complexity into a short, structured assessment and an actionable improvement roadmap.

## 0:45-2:00 - Research and Problem Justification

The project is research-driven. I used the **NIST Cybersecurity Framework 2.0**, particularly NIST SP 1300, the Small Business Quick-Start Guide. NIST published that guide specifically to help small-to-medium organizations with modest or no cybersecurity plans get started with cybersecurity risk management.

I also used CISA's **Cross-Sector Cybersecurity Performance Goals**. CISA focuses on a limited number of high-impact actions and explicitly positions those goals as useful for smaller organizations that need to prioritize investments.

These sources influenced the core design decision: the platform should not overwhelm the user with hundreds of controls. Instead, it should measure the six NIST CSF functions - **Govern, Identify, Protect, Detect, Respond, and Recover** - and tell the user what to prioritize next.

For the security engineering of the web application itself, I also referenced **OWASP ASVS 5.0**.

## 2:00-3:10 - System Architecture

The architecture has four logical layers.

First, there is a responsive browser interface built with HTML, CSS, and JavaScript. It is lightweight and accessible, and it is served from my existing TaherAmine.org hosting under a dedicated project path.

Second, the application layer controls the assessment workflow and result presentation.

Third, I created a **PHP-based scoring API**. The scoring endpoint validates the request, checks every domain and response value, calculates the domain scores, calculates the overall score, and returns prioritized recommendations. There is also a health endpoint for deployment monitoring.

Fourth, the project includes an optional **MySQL** schema for production use. In this demonstrator, I deliberately use a **zero-retention model**, so anonymous assessment answers are not stored. If an organization later wants authenticated history and trend reporting, MySQL can be enabled for organizations, assessments, and domain scores.

The source package is prepared for the MSc GitHub repository, and GitHub Actions is configured to validate PHP syntax and scoring logic, while cPanel hosting serves the published application.

## 3:10-5:40 - Live Demo

I will now demonstrate the application.

On the home screen, the user immediately sees the purpose of the system: turning cybersecurity uncertainty into an actionable roadmap. The interface also makes the privacy model visible by showing that the public demo uses zero retention.

Scrolling to the assessment, there are **18 questions**, three for each NIST CSF function. Every question uses the same scale from 0 to 4, where zero means the practice is not in place and four means it is consistently implemented and measured.

I will answer a few questions at different levels to simulate a real organization. For example, governance may be relatively mature, protection may be moderate, while detection and incident response may be weaker.

When I click **Calculate readiness**, the answers are sent to the PHP scoring endpoint. The API validates the request and normalizes each domain to a score from 0 to 100.

The results page shows three things.

First, the **overall readiness score**.

Second, the **maturity band**. The current model uses four descriptive bands: Initial, Developing, Defined, and Adaptive. These labels are not presented as certification levels; they are an interpretation tool for improvement planning.

Third, the application shows the six domain scores individually and identifies the weakest areas. The recommendation engine then generates actions for those weak domains. This is the most important part of the project because the purpose is not simply to produce a score. The purpose is to support a decision about what should happen next.

The user can also print the result or save it as a PDF using the browser's print capability.

## 5:40-6:50 - Scoring Logic

The scoring method is deliberately transparent.

Each domain has three questions. I calculate the arithmetic mean of those three responses, divide by the maximum value of four, and multiply by 100. This produces a normalized domain score.

The overall score is the average of the six domain scores, so every NIST CSF function has equal weight.

Then I sort the domains from weakest to strongest and select the three lowest domains. Those domains drive the prioritized recommendations.

The advantage of this approach is explainability. A user can understand exactly how the result was produced, and the logic can be tested independently of the user interface.

## 6:50-7:55 - Security and Privacy

Security was built into the architecture.

The API rejects unsupported HTTP methods, validates the input structure, validates domain identifiers, and rejects answer values outside the permitted range.

Assessment responses use **no-store** caching instructions because security posture information can be sensitive.

The deployment configuration also adds browser security headers such as X-Content-Type-Options, a restrictive referrer policy, and a permissions policy that disables camera, microphone, and geolocation because the application does not need them.

Most importantly, the demonstrator does not create user accounts and does not retain anonymous assessment answers. This is a deliberate data-minimization decision. The database model exists for a future authenticated product, but it is not required to demonstrate the core system.

## 7:55-8:50 - CI/CD and Testing

The repository includes a GitHub Actions workflow. On a push or pull request touching the project directory, GitHub Actions is configured to run PHP syntax checks and nine scoring test scenarios.

The nine tests cover score boundaries, intermediate scoring, missing answers, duplicate IDs, invalid types and values, unknown IDs, prioritized recommendations, and output completeness.

Stateless processing avoids application sessions and makes the implementation portable. On shared cPanel hosting, however, practical throughput is limited by the hosting account and PHP worker capacity; elasticity is a future migration consideration, not a claim about the current host.

## 8:50-9:35 - Limitations and Future Work

This system is intentionally a concise decision-support tool, not a formal cybersecurity audit or certification platform.

Future versions could include authenticated multi-tenant organizations, historical trends, evidence uploads, role-based access control, sector-specific questions, customized weighting, detailed mappings to NIST outcomes and CISA CPGs, and executive reporting.

I would also add end-to-end browser testing, automated accessibility testing, dependency and vulnerability scanning, observability, and infrastructure-as-code for a full production environment.

## 9:35-10:00 - Conclusion

In conclusion, CyberResilience Cloud demonstrates the complete lifecycle required by this checkpoint: identifying and researching a real problem, designing a cloud architecture, developing the application, applying security and scalability principles, implementing CI and testing, and packaging it for public web hosting. An optional Render container deployment configuration is also provided if the checkpoint requires a specifically named public cloud platform.

The central idea is simple: cybersecurity maturity should not end with a score. A useful system should help an organization decide what to improve next, assign ownership, and measure progress over time.

Thank you.


**Updated verification note (10 October 2026):** Nine local PHP scoring tests passed and the local browser assets and HTTP API responded correctly. Do not say the public Namecheap cPanel deployment or GitHub CI is live until independently checked. The final demo must be recorded; this script is not itself a video.


### Evidence reminder
Show the live domain and the JSON health URL on-screen, and display a successful GitHub Actions job if available. The demo recording itself must be performed; do not claim this text file is a recorded video.
