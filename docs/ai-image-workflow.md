# AI Food Image Workflow

## Goal
Turn low-quality or missing food photos into beautiful, appetizing demo images.

## Recommended Budget Stack

| Step | Tool | Cost |
|------|------|------|
| Enhance real food photos | FoodShot AI Starter | ~$10–15/month |
| Generate missing dishes | Fal.ai FLUX Schnell or Replicate | ~$0.003/image |
| Upscale if needed | Upscayl (free) or Clipdrop | Free / $7/month |
| **Total** | | **Under ~$40/month** |

## Food-Specific Tools
- **FoodShot AI** — best overall, 200+ food styles
- **MenuPhotoAI / MenuCapture** — conservative, keeps dish realistic
- **FoodPhoto.ai** — budget-friendly, delivery-spec exports

## General Generation APIs
- **OpenAI GPT Image 2** — best photorealism
- **Fal.ai / Replicate FLUX Schnell** — cheapest
- **Adobe Firefly** — safest commercially

## Prompt Template

```
Professional food photography, [dish name], plated elegantly on a white ceramic plate, 
steam rising, shallow depth of field, warm ambient restaurant lighting, 
wooden table surface, garnish, appetizing, 4K, photorealistic, 
shot from 45-degree angle
```

## Example Prompts

### Steak
```
Professional food photography, 300g flame-grilled sirloin steak, medium rare, 
juicy, charred grill marks, rosemary sprig, garlic butter melting on top, 
white ceramic plate, warm restaurant lighting, wooden table, appetizing, 4K, photorealistic
```

### Seafood
```
Professional food photography, grilled lobster tail with lemon butter, 
fresh herbs, seaside restaurant setting, golden hour lighting, 
white plate, gourmet plating, appetizing, 4K, photorealistic
```

### Burger
```
Professional food photography, gourmet Wagyu beef burger with melted cheese, 
caramelized onions, brioche bun, sesame seeds, rustic wooden board, 
warm ambient light, appetizing, 4K, photorealistic
```

## Workflow
1. Screenshot or save the restaurant's best Instagram food posts.
2. Run them through FoodShot AI or an upscaler if quality is poor.
3. For missing dishes, generate images using the prompt template.
4. Save final images to `restaurants/<slug>/src/assets/images/`.
5. Update `restaurant.json` menu items with the correct image paths.
