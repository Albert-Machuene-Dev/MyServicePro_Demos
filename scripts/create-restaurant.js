#!/usr/bin/env node

/**
 * MyServicePro Restaurant Demo Scaffolder
 *
 * Usage:
 *   node scripts/create-restaurant.js --name "Cattle Baron Tyger Waterfront"
 *   node scripts/create-restaurant.js --name "Restaurant Name" --email info@example.com --phone "+27..."
 */

const fs = require('fs')
const path = require('path')

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toTitleCase(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

function parseArgs() {
  const args = process.argv.slice(2)
  const result = {}
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '')
    const value = args[i + 1]
    result[key] = value
  }
  return result
}

function main() {
  const args = parseArgs()
  const rawName = args.name

  if (!rawName) {
    console.error('❌ Please provide --name "Restaurant Name"')
    process.exit(1)
  }

  const name = toTitleCase(rawName)
  const slug = toSlug(name)
  const rootDir = path.resolve(__dirname, '..')
  const templateDir = path.join(rootDir, 'templates', 'restaurant-demo-template')
  const targetDir = path.join(rootDir, 'restaurants', slug)

  if (fs.existsSync(targetDir)) {
    console.error(`❌ A demo already exists at restaurants/${slug}`)
    process.exit(1)
  }

  console.log(`\n🍽️  Creating demo for: ${name}`)
  console.log(`📁 Location: restaurants/${slug}\n`)

  // Copy template
  copyRecursive(templateDir, targetDir)

  // Update package.json
  const packagePath = path.join(targetDir, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  pkg.name = slug
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2))

  // Update restaurant.json
  const dataPath = path.join(targetDir, 'src', 'data', 'restaurant.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  data.name = name
  data.slug = slug
  data.email = args.email || data.email
  data.phone = args.phone || data.phone
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))

  // Create README for this demo
  const readmePath = path.join(targetDir, 'README.md')
  const readmeContent = `# ${name} — Demo Website

A MyServicePro demo website for **${name}**.

## Preview

\`\`\`bash
cd restaurants/${slug}
npm install
npm run dev
\`\`\`

## Customize

1. Replace placeholder images in \`src/assets/images/\`.
2. Update menu, hours, and contact info in \`src/data/restaurant.json\`.
3. Build and deploy when ready.

## Build

\`\`\`bash
npm run build
\`\`\`
`
  fs.writeFileSync(readmePath, readmeContent)

  // Create empty permission file
  const permissionPath = path.join(targetDir, 'PERMISSION.md')
  const permissionContent = `# Content Permission

**Restaurant:** ${name}
**Date:** ${new Date().toISOString().split('T')[0]}
**Permission obtained from:** 
**Method:** 
**Content allowed:** 
**Notes:** 
`
  fs.writeFileSync(permissionPath, permissionContent)

  // Update index.html title
  const indexPath = path.join(targetDir, 'index.html')
  let indexContent = fs.readFileSync(indexPath, 'utf8')
  indexContent = indexContent.replace('<title>Restaurant Demo</title>', `<title>${name} | Demo</title>`)
  fs.writeFileSync(indexPath, indexContent)

  console.log('✅ Demo created successfully!')
  console.log(`\nNext steps:`)
  console.log(`  1. cd restaurants/${slug}`)
  console.log(`  2. npm install`)
  console.log(`  3. npm run dev`)
  console.log(`  4. Edit src/data/restaurant.json with real content`)
  console.log(`  5. Replace placeholder images in src/assets/images/\n`)
}

main()
