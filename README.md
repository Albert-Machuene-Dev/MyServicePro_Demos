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
    ├── cattle-baron-tyger/
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
restaurants/<slug>/src/assets/images/
restaurants/<slug>/src/assets/videos/
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
