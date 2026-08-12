import instaloader
import os
import shutil

# Categories based on the menu and general restaurant vibe
CATEGORIES = {
    "breakfast": ["breakfast", "eggs", "benedict", "florentine", "toast", "morning", "jonkershuis", "shakshuka"],
    "seafood": ["seafood", "fish", "oyster", "prawn", "calamari", "squid", "kingklip", "catch of the day", "salmon", "platter", "paella"],
    "meat_mains": ["beef", "fillet", "lamb", "steak", "pork belly", "curry"],
    "dessert": ["dessert", "chocolate", "cake", "panna cotta", "sweet"],
    "view_interior": ["view", "ocean", "sunset", "table mountain", "ambiance", "restaurant", "dining", "patio", "deck"]
}

def categorize_post(caption):
    if not caption:
        return "uncategorized"
    
    caption_lower = caption.lower()
    for category, keywords in CATEGORIES.items():
        if any(keyword in caption_lower for keyword in keywords):
            return category
            
    return "uncategorized"

def download_images():
    output_dir = r"C:\Users\alber\PycharmProjects\MyServicePro_Demos\on_the_rocks_social_images"
    os.makedirs(output_dir, exist_ok=True)
    
    for cat in CATEGORIES.keys():
        os.makedirs(os.path.join(output_dir, cat), exist_ok=True)
    os.makedirs(os.path.join(output_dir, "uncategorized"), exist_ok=True)
    
    # Initialize Instaloader
    L = instaloader.Instaloader(
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        dirname_pattern=output_dir + "/temp"
    )
    
    profile_name = "ontherocks_rest"
    print(f"Fetching profile: {profile_name}")
    
    try:
        profile = instaloader.Profile.from_username(L.context, profile_name)
    except Exception as e:
        print(f"Error fetching profile: {e}")
        return

    print("Fetching posts...")
    count = 0
    max_posts = 40 # Limit to prevent taking too long
    
    for post in profile.get_posts():
        if count >= max_posts:
            break
            
        print(f"Processing post {count + 1}...")
        caption = post.caption or ""
        category = categorize_post(caption)
        
        # Download the post
        L.download_post(post, target=profile_name)
        count += 1
        
    print("Organizing downloaded images...")
    # Move files from temp to categorized folders
    temp_dir = os.path.join(output_dir, profile_name)
    if os.path.exists(temp_dir):
        for filename in os.listdir(temp_dir):
            if filename.endswith(".jpg"):
                # find the corresponding txt file to read caption
                base_name = os.path.splitext(filename)[0]
                txt_file = os.path.join(temp_dir, base_name + ".txt")
                
                category = "uncategorized"
                if os.path.exists(txt_file):
                    with open(txt_file, 'r', encoding='utf-8') as f:
                        caption = f.read()
                        category = categorize_post(caption)
                
                # move the image
                src_path = os.path.join(temp_dir, filename)
                dest_path = os.path.join(output_dir, category, filename)
                shutil.move(src_path, dest_path)
                
                # copy the caption as well just in case
                if os.path.exists(txt_file):
                    shutil.move(txt_file, os.path.join(output_dir, category, base_name + ".txt"))
                    
        # clean up the rest
        shutil.rmtree(temp_dir, ignore_errors=True)
        
    print("Done!")

if __name__ == "__main__":
    download_images()
