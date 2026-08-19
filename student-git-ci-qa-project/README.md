# StudyScore — Git, CI & QA Learning Project

A small JavaScript project created to demonstrate practical software engineering workflows for version control, continuous integration, and quality assurance.

## What the project does

StudyScore accepts a comma-separated list of scores and calculates:

- the average score;
- the corresponding A–F letter grade;
- a short performance message.

The application is intentionally small so the repository can focus on professional engineering practices.

## Learning Objectives Demonstrated

### Version Control
- Git repository initialization
- staging and committing
- pushing to GitHub
- feature branches
- pull requests
- merge workflows
- merge-conflict resolution

### Continuous Integration
The GitHub Actions workflow automatically runs:

```text
npm ci
npm run lint
npm test
npm run build
```

### Quality Assurance
- automated unit tests
- ESLint static analysis
- pull-request review process
- QA report
- reflection report

## Project Structure

```text
.
├── .github/workflows/ci.yml
├── docs/
│   ├── GIT_WORKFLOW.md
│   ├── QA_REPORT.md
│   └── REFLECTION.md
├── public/
│   ├── index.html
│   └── styles.css
├── scripts/
│   └── build.js
├── src/
│   ├── app.js
│   └── gradeCalculator.js
├── tests/
│   └── gradeCalculator.test.js
├── eslint.config.js
├── package.json
└── README.md
```

## Run Locally

```bash
npm install
npm run check
```

The production build is created in `dist/`.

## Commands

```bash
npm run lint
npm test
npm run build
npm run check
```

## GitHub Submission Evidence

After pushing this project, create at least one feature branch and merge it through a pull request so the repository visibly demonstrates branching and merging.

Follow the exact commands in [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md).

## QA Documentation

- [`docs/QA_REPORT.md`](docs/QA_REPORT.md)
- [`docs/REFLECTION.md`](docs/REFLECTION.md)

## Author

**Taher Amine ELHOUARI**

Master Degree Highlights — Software Engineering
