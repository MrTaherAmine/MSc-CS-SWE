# Secondary cloud provider route (ONLY if required by the grading rubric)

The checkpoint explicitly suggests public cloud platforms such as Render or Vercel. Publishing on conventional Namecheap shared hosting provides a real public site but **may not satisfy the cloud-native deployment part of the rubric**. As a backup, this repository includes a Dockerfile that can deploy the **same PHP application** to Render.

## How to use

1. First commit this project folder to your existing `MrTaherAmine/MSc-CS-SWE` repository.
2. In [Render Dashboard](https://dashboard.render.com), select **New → Web Service** and connect the existing MSc repository.
3. Set **Root Directory** to `Cloud-Based-Web-System-Design/CyberResilience-Cloud` and **Runtime** to Docker. Use the project `Dockerfile`, port **10000**, and a plan you have reviewed/accepted; verify any fees and free-plan restrictions before finalizing.
4. Configure **Health Check Path** `/api/health.php`.
5. After deploying, verify the assigned `*.onrender.com` URL and the API. Copy the actual URL, platform, evidence screenshots, and deployment timestamp into `info.md`.
6. You may still run the site at `taheramine.org/msc/cyberresilience-cloud/` via the cPanel package. Both are variants of the same version of the application.

**Important:** No Render service is deployed by this package. A Dockerfile is configuration, not evidence of a live URL. Changes in platform settings should be reflected in the final report and demo before claiming that Render was used for the evaluated deployment.
