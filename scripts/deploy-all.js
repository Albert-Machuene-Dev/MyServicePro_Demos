#!/usr/bin/env node

/**
 * MyServicePro Demo Deploy Script
 *
 * Builds every restaurant demo and combines them into a single deploy folder
 * with a root index page listing all demos.
 *
 * Usage:
 *   node scripts/deploy-all.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const rootDir = path.resolve(__dirname, '..')
const restaurantsDir = path.join(rootDir, 'restaurants')
const deployDir = path.join(rootDir, 'deploy')

function getRestaurants() {
  return fs.readdirSync(restaurantsDir)
    .filter(name => {
      const fullPath = path.join(restaurantsDir, name)
      return fs.statSync(fullPath).isDirectory() &&
             fs.existsSync(path.join(fullPath, 'package.json'))
    })
    .sort()
}

function buildRestaurant(slug) {
  const projectDir = path.join(restaurantsDir, slug)
  console.log(`\n🔨 Building ${slug}...`)
  
  // Install if needed
  if (!fs.existsSync(path.join(projectDir, 'node_modules'))) {
    console.log(`  📦 Installing dependencies...`)
    execSync('npm install', { cwd: projectDir, stdio: 'inherit' })
  }
  
  // Build
  execSync('npm run build', { cwd: projectDir, stdio: 'inherit' })
}

function copyBuild(slug) {
  const sourceDir = path.join(restaurantsDir, slug, 'dist')
  const targetDir = path.join(deployDir, slug)
  
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`No dist folder found for ${slug}. Build may have failed.`)
  }
  
  // Clean target
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true })
  }
  
  // Copy
  fs.mkdirSync(targetDir, { recursive: true })
  fs.cpSync(sourceDir, targetDir, { recursive: true })
  console.log(`  ✅ Copied to deploy/${slug}`)
}

function generateIndexPage(restaurants) {
  const cards = restaurants.map(slug => {
    const dataPath = path.join(restaurantsDir, slug, 'src', 'data', 'restaurant.json')
    let name = slug
    let tagline = ''
    
    if (fs.existsSync(dataPath)) {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      name = data.name
      tagline = data.tagline || ''
    }
    
    return `
      <a href="./${slug}/" class="demo-card">
        <h2>${name}</h2>
        <p>${tagline}</p>
        <span class="view-btn">View Demo →</span>
      </a>
    `
  }).join('\n')

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyServicePro Demo Sites</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', system-ui, sans-serif;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d1818 100%);
        color: #fff;
        min-height: 100vh;
        padding: 60px 20px;
      }
      .container {
        max-width: 1000px;
        margin: 0 auto;
      }
      header {
        text-align: center;
        margin-bottom: 60px;
      }
      h1 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 3rem;
        margin-bottom: 12px;
      }
      .subtitle {
        color: #d4af37;
        font-size: 1.1rem;
      }
      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }
      .demo-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 28px;
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
      }
      .demo-card:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-4px);
        border-color: #8b0000;
      }
      .demo-card h2 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.5rem;
        margin-bottom: 8px;
        color: #f5f5dc;
      }
      .demo-card p {
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 20px;
        line-height: 1.5;
      }
      .view-btn {
        display: inline-block;
        padding: 10px 20px;
        background: #8b0000;
        color: #fff;
        border-radius: 999px;
        font-weight: 600;
        font-size: 0.9rem;
      }
      footer {
        text-align: center;
        margin-top: 80px;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>MyServicePro</h1>
        <p class="subtitle">Demo Websites for Local Restaurants</p>
      </header>
      <main class="demo-grid">
        ${cards}
      </main>
      <footer>
        <p>Demo sites built by MyServicePro. Not official restaurant websites.</p>
      </footer>
    </div>
  </body>
</html>`

  fs.writeFileSync(path.join(deployDir, 'index.html'), html)
  console.log('\n📝 Generated deploy/index.html')
}

function main() {
  console.log('🚀 MyServicePro Demo Deploy\n')
  
  // Clean deploy dir
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true })
  }
  fs.mkdirSync(deployDir, { recursive: true })
  
  const restaurants = getRestaurants()
  
  if (restaurants.length === 0) {
    console.log('⚠️  No restaurant demos found in restaurants/')
    process.exit(0)
  }
  
  console.log(`Found ${restaurants.length} demo(s): ${restaurants.join(', ')}\n`)
  
  for (const slug of restaurants) {
    buildRestaurant(slug)
    copyBuild(slug)
  }
  
  generateIndexPage(restaurants)
  
  console.log('\n✅ All demos built and ready for deployment!')
  console.log(`📁 Deploy folder: ${deployDir}`)
  console.log('\nNext steps:')
  console.log('  1. Push deploy/ to gh-pages branch, OR')
  console.log('  2. Upload deploy/ contents to your web host')
}

main()
