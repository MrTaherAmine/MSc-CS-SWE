# Git Workflow Demonstration

Use the following sequence after creating an empty public GitHub repository.

```bash
git init
git branch -M main
git add .
git commit -m "chore: initial StudyScore project"
git remote add origin https://github.com/YOUR_USERNAME/student-git-ci-qa-project.git
git push -u origin main
```

## Demonstrate branching

```bash
git checkout -b feature/performance-message
```

Edit a file, then:

```bash
git add .
git commit -m "feat: improve performance feedback"
git push -u origin feature/performance-message
```

Open a pull request on GitHub and merge it into `main`.

## Demonstrate a merge conflict

On `main`:

```bash
git checkout main
git pull
git checkout -b feature/button-label
```

Change the button text in `public/index.html`, commit and push.

Then create another branch from main and change the same button line differently. Merge one branch first, then merge the second. Git will report a conflict.

Resolve the conflict manually, then:

```bash
git add public/index.html
git commit -m "fix: resolve button label merge conflict"
git push
```

This provides visible evidence of branch creation, pull requests, merging, and conflict resolution.
