# MyServicePro Demo Websites

A collection of modern, mobile-first demo websites for Cape Town restaurants and local businesses. Each demo is built to show business owners what their brand could look like with a MyServicePro subscription.

## Structure

```
MyServicePro_Demos/
├── scripts/                        # Reusable automation scripts
├── templates/                      # Base template for all demos
│   └── restaurant-demo-template/
├── docs/                           # Sales docs, pitch scripts, pricing
└── restaurants/                    # One sub-project per business
    ├── cattle-baron-tyger-waterfront/
    └── ...
```

## Quick Start

### 1. Create a New Restaurant Demo

```bash
node scripts/create-restaurant.js --name "Restaurant Name"
```

This scaffolds a new project under `restaurants/restaurant-name/`.

### 2. Add Assets

Place images and videos into:

```
restaurants/<slug>/public/assets/images/
restaurants/<slug>/public/assets/videos/
```

### 3. Customize Content

Edit:

```
restaurants/<slug>/src/data/restaurant.json
```

### 4. Preview

```bash
cd restaurants/<slug>
npm install
npm run dev
```

### 5. Build

```bash
npm run build
```

### 6. Deploy All Demos

```bash
node scripts/deploy-all.js
```

This builds every restaurant demo and generates a combined `deploy/` folder with a root index page.

## GitHub Pages Deployment

See `docs/github-setup.md` for step-by-step instructions to push to GitHub and enable automatic GitHub Pages deployment.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Sales Packages

See `docs/pricing-packages.md`.

## License

Proprietary — MyServicePro.
