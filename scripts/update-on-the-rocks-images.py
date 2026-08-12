import json
from pathlib import Path

json_path = Path("restaurants/on-the-rocks/src/data/restaurant.json")
data = json.loads(json_path.read_text(encoding="utf-8"))

# Update menu item images
data["menuCategories"][0]["items"][0]["image"] = "assets/images/breakfast-florentine.jpg"
data["menuCategories"][0]["items"][1]["image"] = "assets/images/breakfast-jonkershuis.jpg"

data["menuCategories"][1]["items"][0]["image"] = "assets/images/starter-oysters.jpg"
data["menuCategories"][1]["items"][1]["image"] = "assets/images/starter-prawns.jpg"

data["menuCategories"][2]["items"][0]["image"] = "assets/images/main-curry.jpg"
data["menuCategories"][2]["items"][1]["image"] = "assets/images/main-paella.jpg"
data["menuCategories"][2]["items"][2]["image"] = "assets/images/main-beef.jpg"
data["menuCategories"][2]["items"][3]["image"] = "assets/images/main-lamb.jpg"

data["menuCategories"][3]["items"][0]["image"] = "assets/images/dessert-panna-cotta.jpg"
data["menuCategories"][3]["items"][1]["image"] = "assets/images/dessert-chocolate.jpg"

# Update gallery
data["gallery"] = [
    "assets/images/hero-ocean-view.jpg",
    "assets/images/about-deck-view.jpg",
    "assets/images/gallery-interior.jpg",
    "assets/images/gallery-cocktail.jpg",
    "assets/images/gallery-sunset-mojito.jpg",
    "assets/images/gallery-aperol.jpg",
    "assets/images/gallery-grilled-prawns.jpg",
    "assets/images/gallery-seafood-platter.jpg"
]

# Update hero and about images
data["heroImage"] = "assets/images/hero-ocean-view.jpg"
data["aboutImage"] = "assets/images/about-deck-view.jpg"

# Optional hero video background (set to actual .mp4 path when available)
if "heroVideo" not in data:
    data["heroVideo"] = ""

json_path.write_text(json.dumps(data, indent=2), encoding="utf-8")
print("Updated restaurant.json with real photo paths")
