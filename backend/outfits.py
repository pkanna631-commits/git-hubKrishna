"""
Outfit Recommendation Generator Engine
Produces tailored fashion combinations across 10 core categories:
- Casual
- Smart Casual
- Formal
- Party
- Streetwear
- Traditional / Ethnic
- Wedding / Special Occasion
- College / Student
- Summer
- Winter
Matches palette recommendations, styling tips, shoe pairings, and accessory sets.
"""

from typing import Dict, List, Any

class OutfitGenerator:
    """
    Generates tailored outfits based on skin tone and undertone analysis.
    Supports 10 lifestyle categories with guaranteed non-null fields.
    """

    @classmethod
    def generate(
        cls,
        tone_code: str = "medium",
        undertone_code: str = "warm",
        image_base64: str = None
    ) -> Dict[str, Any]:
        is_warm = undertone_code == "warm"
        is_cool = undertone_code == "cool"
        
        # 1. CASUAL
        casual = {
            "category": "Casual",
            "title": "Weekend Resort & Elevated Casual",
            "vibe": "Relaxed yet polished everyday aesthetic",
            "match_score": "98% Match",
            "top": {
                "item": "Linen Overshirt in Camel / Sand" if is_warm else "Textured Cotton Oxford in Crisp White",
                "color_name": "Warm Sand" if is_warm else "Crisp White",
                "color_hex": "#C19A6B" if is_warm else "#FFFFFF",
                "material": "100% Breathable Linen or Heavyweight Cotton",
                "fit": "Relaxed Modern Fit"
            },
            "bottom": {
                "item": "Tapered Chino Trousers or Raw Indigo Denim",
                "color_name": "Deep Navy / Olive",
                "color_hex": "#1B2A4A",
                "fit": "Slim-Tapered Cut"
            },
            "footwear": {
                "item": "Minimalist Low-Top Leather Sneakers or Loafers",
                "color_name": "Off-White / Tan Brown",
                "color_hex": "#F5F5DC"
            },
            "accessories": [
                {"name": "Brushed Leather Watch", "type": "Wristwear", "detail": "Cognac brown leather strap with brushed silver dial"},
                {"name": "Polarized Acetate Sunglasses", "type": "Eyewear", "detail": "Classic Tortoiseshell or Matt Black frames"},
                {"name": "Woven Leather Belt", "type": "Belt", "detail": "Matches footwear tone perfectly"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Full body standing portrait of model in linen overshirt, tapered chinos, and minimalist sneakers, complete head-to-toe view with face and footwear, 8k resolution",
            "style_tips": "Roll the sleeves up to the mid-forearm. Tuck the front loosely into chinos for an effortless French tuck look."
        }

        # 2. SMART CASUAL
        smart_casual = {
            "category": "Smart Casual",
            "title": "Executive Lounge & Riviera Polish",
            "vibe": "Refined elegance bridging formal and casual",
            "match_score": "99% Fit",
            "top": {
                "item": "Knit Polo Shirt or Tailored Mandarin Collar Shirt",
                "color_name": "Warm Olive" if is_warm else "Slate Blue",
                "color_hex": "#556B2F" if is_warm else "#4682B4",
                "material": "Fine Gauge Mercerized Cotton",
                "fit": "Tailored Slim Fit"
            },
            "bottom": {
                "item": "Flat-Front Cotton Stretch Chinos",
                "color_name": "Khaki Beige",
                "color_hex": "#C5A059",
                "fit": "Clean Tailored Break"
            },
            "footwear": {
                "item": "Suede Penny Loafers or Driving Moccasins",
                "color_name": "Espresso Suede",
                "color_hex": "#3B2F2F"
            },
            "accessories": [
                {"name": "Minimalist Gold Mesh Watch", "type": "Wristwear", "detail": "Champagne dial with ultra-thin bezel"},
                {"name": "Braided Leather Bracelet", "type": "Jewelry", "detail": "Subtle metallic clasp accent"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Executive lounge fashion photo of model in warm olive knit polo shirt and beige chinos with suede loafers, studio lighting, 8k",
            "style_tips": "Pair with a unstructured linen blazer for evening dining."
        }

        # 3. FORMAL
        formal = {
            "category": "Formal",
            "title": "Boardroom Elegance & Modern Tailoring",
            "vibe": "Commanding, sleek, executive authority",
            "match_score": "99% Flattering Contrast",
            "top": {
                "item": "Tailored Single-Breasted Blazer over Italian Dress Shirt",
                "color_name": "Rich Chocolate & Cream" if is_warm else "Midnight Navy & Crisp White",
                "color_hex": "#3B2F2F" if is_warm else "#0A1128",
                "material": "Super 120s Wool Blend & Italian Cotton",
                "fit": "Structured Slim Tailored"
            },
            "bottom": {
                "item": "Flat-Front Tailored Trousers",
                "color_name": "Charcoal / Midnight Navy",
                "color_hex": "#2C3539",
                "fit": "Tailored Ankle Break"
            },
            "footwear": {
                "item": "Hand-Burnished Leather Oxford Shoes or Monk Straps",
                "color_name": "Deep Walnut Brown" if is_warm else "Polished Obsidian Black",
                "color_hex": "#4A2E10" if is_warm else "#0F0F0F"
            },
            "accessories": [
                {"name": "Swiss Automatic Dress Watch", "type": "Wristwear", "detail": "Sunray dial with slim leather strap"},
                {"name": "Silk Pocket Square", "type": "Pocket Square", "detail": "Paisley or geometric accent color pattern"},
                {"name": "Full-Grain Leather Briefcase", "type": "Bag", "detail": "Matches dress shoe leather hue"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "High fashion photography of a tailored single-breasted suit blazer over dress shirt, polished leather oxfords, executive penthouse background",
            "style_tips": "Ensure 1/2 inch of shirt cuff shows beneath the blazer sleeve. Keep collar stays sharp."
        }

        # 4. PARTY
        party = {
            "category": "Party",
            "title": "Glamorous Evening & Lounge Luxe",
            "vibe": "Bold, eye-catching, sophisticated nightlife",
            "match_score": "97% Night Palette Match",
            "top": {
                "item": "Luxe Satin-Finish Shirt or Silk Evening Top",
                "color_name": "Deep Wine / Burgundy" if is_warm else "Midnight Emerald",
                "color_hex": "#800020" if is_warm else "#004B49",
                "material": "Silk / Satin Blend",
                "fit": "Fluid Tailored Silhouette"
            },
            "bottom": {
                "item": "Sleek Cropped Trousers or Velvet-Trim Pants",
                "color_name": "Jet Black",
                "color_hex": "#111111",
                "fit": "Cropped Slim"
            },
            "footwear": {
                "item": "Suede Chelsea Boots or Patent Leather Loafers",
                "color_name": "Velvet Black / Dark Espresso",
                "color_hex": "#1A1A1A"
            },
            "accessories": [
                {"name": "Statement Signet Ring / Bracelet", "type": "Jewelry", "detail": "Warm Gold finish" if is_warm else "Sterling Silver finish"},
                {"name": "Designer Leather Clutch or Crossbody", "type": "Bag", "detail": "Sleek metallic hardware accents"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Nightlife glamour fashion portrait of model in satin burgundy evening shirt and black cropped trousers, moody cocktail lounge lighting",
            "style_tips": "Unbutton the top two buttons for an open, confident collar line."
        }

        # 5. STREETWEAR
        streetwear = {
            "category": "Streetwear",
            "title": "Urban High-Street & Oversized Layering",
            "vibe": "High-energy, contemporary streetwear aesthetic",
            "match_score": "96% Fit",
            "top": {
                "item": "Heavyweight Drop-Shoulder Hoodie or Graphic Tee",
                "color_name": "Charcoal Wash / Earth Sage",
                "color_hex": "#36454F",
                "material": "450gsm Heavy Fleece Cotton",
                "fit": "Oversized Streetwear Fit"
            },
            "bottom": {
                "item": "Multi-Pocket Tactical Cargo Pants or Loose Denim",
                "color_name": "Matte Black",
                "color_hex": "#1A1A1A",
                "fit": "Loose Relaxed Fit"
            },
            "footwear": {
                "item": "Chunky Lifestyle Sneakers or High-Top Canvas",
                "color_name": "Vintage White & Gum Sole",
                "color_hex": "#E5E5E5"
            },
            "accessories": [
                {"name": "Crossbody Sling Bag", "type": "Bag", "detail": "Nylon tactical strap with matte metal buckle"},
                {"name": "Embroidered Baseball Cap", "type": "Headwear", "detail": "Unstructured crown in neutral color"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Urban streetwear fashion photo of model in heavy fleece hoodie and tactical cargo pants with retro sneakers, city street sunset",
            "style_tips": "Layer a longline white tee underneath so 1 inch shows at the hemline."
        }

        # 6. TRADITIONAL / ETHNIC
        traditional = {
            "category": "Traditional / Ethnic",
            "title": "Heritage Festive & Cultural Elegance",
            "vibe": "Regal, timeless, celebratory magnificence",
            "match_score": "99% Festive Radiance",
            "top": {
                "item": "Embroidered Raw Silk Kurta or Sherwani / Festive Saree",
                "color_name": "Royal Ochre / Mustard Gold" if is_warm else "Deep Royal Crimson",
                "color_hex": "#D4AF37" if is_warm else "#990000",
                "material": "Raw Chanderi Silk & Zari Embroidery",
                "fit": "Classic Regal Fit"
            },
            "bottom": {
                "item": "Silk Churidar Trousers or Draped Silk Dupatta/Lehenga",
                "color_name": "Cream / Antiqued Gold",
                "color_hex": "#E6D7B8",
                "fit": "Graceful Draped Fit"
            },
            "footwear": {
                "item": "Handcrafted Embroidered Mojris / Juttis or Strappy Metallic Sandals",
                "color_name": "Antiqued Gold / Rich Maroon",
                "color_hex": "#800000"
            },
            "accessories": [
                {"name": "Heritage Kundan / Antique Jewellery", "type": "Jewelry", "detail": "Intricate stone inlay matching top accent"},
                {"name": "Silk Dupatta / Brooch Pin", "type": "Drape", "detail": "Contrasting border with gold zari detailing"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Regal festive ethnic fashion portrait of model wearing raw silk gold embroidered kurta sherwani and silk churidar, palace background",
            "style_tips": "Coordinate your footwear accents with the metallic thread (zari) in the embroidery."
        }

        # 7. WEDDING / SPECIAL OCCASION
        wedding = {
            "category": "Wedding / Special Occasion",
            "title": "Royal Wedding & Black-Tie Gala",
            "vibe": "Ultra-luxurious, opulent, unforgettable presence",
            "match_score": "100% Supreme Royalty",
            "top": {
                "item": "Velvet Nehru Jacket over Silk Kurta or Tuxedo Blazer",
                "color_name": "Deep Royal Navy" if is_warm else "Emerald Black Velvet",
                "color_hex": "#000080" if is_warm else "#002B20",
                "material": "Italian Velvet & Raw Silk",
                "fit": "Precision Bespoke Tailoring"
            },
            "bottom": {
                "item": "Tailored Velvet-Trim Trousers or Silk Churidar",
                "color_name": "Midnight Black",
                "color_hex": "#0F0F0F",
                "fit": "Bespoke Taper"
            },
            "footwear": {
                "item": "Patent Leather Tuxedo Slippers or Velvet Loafers",
                "color_name": "Jet Obsidian Black",
                "color_hex": "#000000"
            },
            "accessories": [
                {"name": "Jeweled Lapel Brooch / Cufflinks", "type": "Jewelry", "detail": "Gemstone inlay matching jacket accent"},
                {"name": "Silk Satin Bowtie / Dupatta", "type": "Accent", "detail": "High-lustre silk finish"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Royal wedding black-tie tux fashion portrait of model in velvet tuxedo jacket with lapel brooch and patent slippers, gala background",
            "style_tips": "Keep metal finishes matching between cufflinks, watch bezel, and footwear buckles."
        }

        # 8. COLLEGE / STUDENT
        college = {
            "category": "College / Student",
            "title": "Contemporary Student & Campus Chic",
            "vibe": "Youthful, low-maintenance, high-style comfort",
            "match_score": "96% Campus Palette",
            "top": {
                "item": "Layered Oversized Hoodie or Drop-Shoulder Graphic Tee",
                "color_name": "Olive Green" if is_warm else "Charcoal Heather",
                "color_hex": "#556B2F" if is_warm else "#36454F",
                "material": "French Terry Cotton",
                "fit": "Oversized Streetwear Fit"
            },
            "bottom": {
                "item": "Straight-Leg Vintage Wash Jeans or Cargo Pants",
                "color_name": "Beige Cargo / Light Denim",
                "color_hex": "#D2B48C",
                "fit": "Straight Casual"
            },
            "footwear": {
                "item": "Retro Canvas High-Tops or Lifestyle Sneakers",
                "color_name": "Off-White & Suede",
                "color_hex": "#F5F5DC"
            },
            "accessories": [
                {"name": "Heavy-Duty Canvas Backpack", "type": "Bag", "detail": "Padded laptop sleeve in earth tones"},
                {"name": "Ribbed Knit Beanie", "type": "Headwear", "detail": "Compliments sweater tone"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Contemporary campus chic photo of student model in layered hoodie, straight leg jeans and canvas sneakers, university quad",
            "style_tips": "Cuff the hem of your jeans 1 inch above the sneaker collar."
        }

        # 9. SUMMER
        summer = {
            "category": "Summer",
            "title": "Breezy Riviera & Coastal Sun",
            "vibe": "Light, cooling, sun-kissed resort elegance",
            "match_score": "98% Summer Breathability",
            "top": {
                "item": "100% Pure Italian Linen Cuban Collar Shirt",
                "color_name": "Cream / Soft Ecru" if is_warm else "Sky Blue",
                "color_hex": "#FFFDD0" if is_warm else "#87CEEB",
                "material": "Pure Open-Weave Linen",
                "fit": "Relaxed Resort Fit"
            },
            "bottom": {
                "item": "Tailored Linen Shorts or Light Cotton Trousers",
                "color_name": "Warm Sand / Beige",
                "color_hex": "#F5F5DC",
                "fit": "Tailored 7-Inch Inseam"
            },
            "footwear": {
                "item": "Woven Leather Moccasins or Leather Espadrilles",
                "color_name": "Cognac Tan",
                "color_hex": "#964B00"
            },
            "accessories": [
                {"name": "Woven Straw Fedora / Panama Hat", "type": "Headwear", "detail": "Lightweight sun protection"},
                {"name": "UV400 Wayfarer Sunglasses", "type": "Eyewear", "detail": "Amber polarized lenses"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Breezy Riviera summer fashion portrait of model in pure Italian linen Cuban shirt, tailored shorts, and straw fedora, beach ocean background",
            "style_tips": "Leave the top two buttons unbuttoned to let linen drape naturally in summer breezes."
        }

        # 10. WINTER
        winter = {
            "category": "Winter",
            "title": "Alpine Luxe & Layered Tailoring",
            "vibe": "Cozy, structured, sophisticated warmth",
            "match_score": "99% Winter Depth",
            "top": {
                "item": "Wool Double-Breasted Overcoat over Cashmere Turtleneck",
                "color_name": "Camel & Espresso" if is_warm else "Charcoal & Deep Burgundy",
                "color_hex": "#C19A6B" if is_warm else "#36454F",
                "material": "100% Merino Wool & Cashmere",
                "fit": "Structured Tailored Coat"
            },
            "bottom": {
                "item": "Heavyweight Wool Flannel Trousers or Raw Denim",
                "color_name": "Dark Charcoal / Indigo",
                "color_hex": "#292524",
                "fit": "Tailored Straight Cut"
            },
            "footwear": {
                "item": "Leather Chelsea Boots with Shearling Lining",
                "color_name": "Dark Espresso Brown" if is_warm else "Matte Black",
                "color_hex": "#3B2F2F" if is_warm else "#111111"
            },
            "accessories": [
                {"name": "100% Cashmere Fringe Scarf", "type": "Warmth", "detail": "Rich terracotta or navy accent"},
                {"name": "Lined Leather Gloves", "type": "Handwear", "detail": "Touchscreen-compatible fingertips"}
            ],
            "ai_generated_image": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
            "ai_prompt": "Alpine luxe winter fashion portrait of model in wool double-breasted overcoat over cashmere turtleneck and leather Chelsea boots, snowy street",
            "style_tips": "Ensure the collar of your turtleneck stands neatly beneath your coat lapel."
        }

        outfits_list = [casual, smart_casual, formal, party, streetwear, traditional, wedding, college, summer, winter]

        # Preserve the uploaded person as the actual subject for the result so the
        # recommendations stay anchored to the real uploaded face and skin tone.
        if image_base64:
            for outfit in outfits_list:
                outfit["reference_image"] = image_base64
                outfit["ai_generated_image"] = image_base64
                outfit["ai_prompt"] = (
                    f"Fashion try-on portrait using the uploaded person as the subject, "
                    f"wearing {outfit['top']['item']} with {outfit['bottom']['item']} and "
                    f"{outfit['footwear']['item']}, styled for {outfit['category']}"
                )

        return {
            "outfits": outfits_list,
            "general_styling_advice": [
                "Color Contrast Rule: Wear statement colors near your face (shirts, scarves) and grounding neutrals below.",
                "Jewelry Pairing: Warm undertones shine brightest with Warm Gold & Rose Gold; Cool undertones look brilliant with Sterling Silver & Platinum.",
                "Occasion Layering: Adapt outfit intensity by unbuttoning collars for casual environments or buttoning up with a blazer for formal settings."
            ]
        }
