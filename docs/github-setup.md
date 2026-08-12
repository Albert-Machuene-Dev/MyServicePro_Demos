# GitHub Setup Guide

## 1. Create a GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `MyServicePro_Demos`
3. Make it **Public** (so GitHub Pages works on free plan)
4. Do **not** initialize with README, .gitignore, or license — we already have those locally.
5. Click **Create repository**.

## 2. Push Your Local Repo

Replace `<your-username>` with your actual GitHub username.

```bash
cd C:\Users\alber\PycharmProjects\MyServicePro_Demos
git remote add origin https://github.com/<your-username>/MyServicePro_Demos.git
git push -u origin main
```

## 3. Enable GitHub Pages

1. On your GitHub repo, go to **Settings** → **Pages**.
2. Under **Build and deployment**:
   - Source: **GitHub Actions**
3. The workflow file `.github/workflows/deploy.yml` is already in your repo. It will run automatically on the next push to `main`.

## 4. Your Live URL

After the first successful deployment, your demos will be live at:

```
https://<your-username>.github.io/MyServicePro_Demos/
```

Your first demo will be at:

```
https://<your-username>.github.io/MyServicePro_Demos/cattle-baron-tyger-waterfront/
```

## 5. Add a New Demo and Deploy

```bash
node scripts/create-restaurant.js --name "Restaurant Name"
# Edit content and replace images, then:
git add -A
git commit -m "Add demo for Restaurant Name"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy all demos.

## 6. Local Deploy Test (Optional)

To build all demos locally without deploying:

```bash
node scripts/deploy-all.js
```

The output is placed in `deploy/`.
