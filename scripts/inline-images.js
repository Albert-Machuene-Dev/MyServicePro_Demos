#!/usr/bin/env node

/**
 * Inline images in restaurant.json as base64 data URIs.
 * This prevents broken image paths when deploying to subfolders.
 */

const fs = require('fs')
const path = require('path')

function toBase64(filePath, mimeType) {
  const data = fs.readFileSync(filePath)
  const base64 = data.toString('base64')
  return `data:${mimeType};base64,${base64}`
}

function inlineImagesInJson(jsonPath, imagesDir) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  function walk(obj) {
    if (typeof obj === 'object' && obj !== null) {
      for (const key of Object.keys(obj)) {
        const value = obj[key]
        if (
          (key === 'image' || key === 'heroImage' || key === 'aboutImage') &&
          typeof value === 'string' &&
          !value.startsWith('data:')
        ) {
          const imagePath = path.join(imagesDir, path.basename(value))
          if (fs.existsSync(imagePath)) {
            const ext = path.extname(imagePath).toLowerCase()
            const mimeTypes = {
              '.svg': 'image/svg+xml',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.webp': 'image/webp',
              '.gif': 'image/gif',
            }
            const mimeType = mimeTypes[ext] || 'image/png'
            obj[key] = toBase64(imagePath, mimeType)
            console.log(`Inlined: ${value} -> ${obj[key].slice(0, 50)}...`)
          } else {
            console.warn(`Image not found: ${imagePath}`)
          }
        } else if (typeof value === 'object') {
          walk(value)
        }
      }
    }
  }

  walk(data)
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))
  console.log(`Updated ${jsonPath}`)
}

// Process all restaurants
const restaurantsDir = path.resolve(__dirname, '..', 'restaurants')
const restaurants = fs.readdirSync(restaurantsDir)

for (const slug of restaurants) {
  const restaurantDir = path.join(restaurantsDir, slug)
  if (!fs.statSync(restaurantDir).isDirectory()) continue

  const jsonPath = path.join(restaurantDir, 'src', 'data', 'restaurant.json')
  const imagesDir = path.join(restaurantDir, 'public', 'assets', 'images')

  if (fs.existsSync(jsonPath) && fs.existsSync(imagesDir)) {
    console.log(`\nProcessing ${slug}...`)
    inlineImagesInJson(jsonPath, imagesDir)
  }
}
