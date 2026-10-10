# Fastest no-Vercel deployment · Namecheap cPanel

## Part A. Put the app on your existing website

1. Download `WEBSITE_UPLOAD_TO_PUBLIC_HTML.zip` from the package prepared for this checkpoint.
2. Log into **Namecheap → cPanel → File Manager** and open `public_html` (take a backup or snapshot of the website first).
3. Upload **the ZIP** inside `public_html`. **Extract** it in `public_html`. This ZIP contains only `msc/cyberresilience-cloud/…` — it never overwrites root `index.html`, `.htaccess`, or existing Astro files. Delete the ZIP from hosting after extraction.
4. Confirm the files appear exactly in `public_html/msc/cyberresilience-cloud/`. Make sure hidden files are displayed, including the scoped `.htaccess`.
5. Select PHP >= 8.1 in cPanel if applicable. Default PHP should be sufficient; no Node.js runtime or database needed. PHP's JSON extension is standard.
6. Open `https://taheramine.org/msc/cyberresilience-cloud/api/health.php`, confirm `status: ok` JSON.
7. Open `https://taheramine.org/msc/cyberresilience-cloud/`, choose **Fill sample responses**, then **Calculate readiness**, then **Print / save as PDF**. Note whether the site is redirected to an unexpected path; if so examine existing root rewrites before editing anything.
8. Keep screenshots of homepage, health JSON, generated recommendations, and cPanel directory; never screenshot credentials or hosting secrets.

## Part B. Publish as new folder in the existing MSc repo

GitHub repository: `https://github.com/MrTaherAmine/MSc-CS-SWE`.

**Terminal method (Mac; no new repository created):**

```bash
# In Terminal, from a folder where you extracted GITHUB_UPLOAD_TO_REPO_ROOT.zip:
git clone https://github.com/MrTaherAmine/MSc-CS-SWE.git
cd MSc-CS-SWE
cp -R /path/to/GITHUB_UPLOAD/Cloud-Based-Web-System-Design ./
# Optionally copy the workflow provided separately at root .github/workflows, preserving existing workflows:
mkdir -p .github/workflows
cp /path/to/GITHUB_UPLOAD/.github/workflows/cyberresilience-php-ci.yml .github/workflows/
git add Cloud-Based-Web-System-Design/CyberResilience-Cloud .github/workflows/cyberresilience-php-ci.yml
git commit -m "Add CyberResilience Cloud MSc checkpoint and cPanel deployment"
git push origin main
```

Replace `/path/to/GITHUB_UPLOAD` with your extracted directory path. If you have already cloned the repo, skip `git clone` and copy into that working tree. No force-push and no changes to unrelated coursework.

**Web method:** Open the repo, enter `Cloud-Based-Web-System-Design/` (create it if necessary), then use Add file → Upload files and drop the contents of `CyberResilience-Cloud` preserving subfolders; commit changes. For complex subfolders or dotfiles, Terminal method is more reliable.

## Part C. Run tests and fill evidence

`php Cloud-Based-Web-System-Design/CyberResilience-Cloud/tests/test_scoring.php` on your Mac or hosting shell, capture results. In GitHub → Actions verify CI if workflow is added. Update `info.md` only with *actual observed* URLs, status, screenshots, commit hash and playable video link.

## Common fixes

- **404 homepage:** Wrong extraction path; check `public_html/msc/cyberresilience-cloud/index.html`.
- **App loads without CSS:** Verify `styles.css` lives beside `index.html`, with relative link `./styles.css`.
- **API 404:** Verify `api/score.php` and `api/health.php` are on the hosting server, not just local.
- **API 500:** Verify PHP version 8.1+, PHP error log and cPanel MultiPHP settings. If `Options -Indexes` or `Require all denied` is blocked by host config, inspect and adjust scoped `.htaccess` only.
- **API 403:** Check new directory/file permissions (typical 755 folders, 644 files), scoped `.htaccess`, and hosting WAF rules.
- **HTTP 200 but JSON not returned:** Check PHP execution and `Content-Type`. Do not expose scores as static JavaScript-only computations if reporting PHP as a backend.
- **Site root changes:** Do not edit or replace root site files; deploy within the intended subdirectory only.

## Strict public-cloud rubric

If the evaluator insists on one of the named public-cloud PaaS providers, see `RENDER_OPTIONAL.md` for the Docker-based Render route; cPanel is a faster public-website route but not necessarily compliant with that particular cloud-native requirement.
