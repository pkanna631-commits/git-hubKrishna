"""
Footwear Recommendation Engine
Recommends footwear based on skin tone, undertone, and selected outfit style:
- Sneakers
- Formal
- Traditional
- Casual
- Outdoor
"""

from typing import Dict, List, Any

class FootwearStylist:
    """
    Generates footwear recommendations tailored to outfit style and undertone.
    """

    @classmethod
    def recommend(cls, tone_code: str = "medium", undertone_code: str = "warm", style_category: str = "Casual") -> Dict[str, Any]:
        is_warm = undertone_code == "warm"
        
        sneakers = [
          {
            "name": "Minimalist Low-Top Leather Sneakers",
            "type": "Sneakers",
            "color_name": "Off-White / Ecru" if is_warm else "Crisp Pure White",
            "color_hex": "#FFFDD0" if is_warm else "#FFFFFF",
            "best_paired_with": "Chinos, Raw Denim, Cropped Trousers",
            "why_it_matches": "Clean monochrome silhouette that grounds warm/cool top layers without competing for attention.",
            "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80"
          },
          {
            "name": "Retro High-Top Canvas Sneakers",
            "type": "Sneakers",
            "color_name": "Vintage Cream / Black Suede",
            "color_hex": "#2B2B2B",
            "best_paired_with": "Streetwear Cargo Pants & Hoodies",
            "why_it_matches": "Adds an urban edge while accentuating relaxed proportions.",
            "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80"
          }
        ]

        formal = [
          {
            "name": "Hand-Burnished Leather Oxford Shoes",
            "type": "Formal",
            "color_name": "Deep Walnut Cognac" if is_warm else "Polished Obsidian Black",
            "color_hex": "#4A2E10" if is_warm else "#0F0F0F",
            "best_paired_with": "Tailored Suits, Blazers & Wool Trousers",
            "why_it_matches": "Classic closed-lacing construction that exudes executive authority.",
            "image": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80"
          },
          {
            "name": "Suede Double Monk-Strap Loafers",
            "type": "Formal",
            "color_name": "Espresso Suede" if is_warm else "Charcoal Suede",
            "color_hex": "#3B2F2F" if is_warm else "#2C3539",
            "best_paired_with": "Smart Casual Chinos & Italian Linen Blazers",
            "why_it_matches": "Textured suede softens formal tailoring while adding tactile elegance.",
            "image": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=400&q=80"
          }
        ]

        traditional = [
          {
            "name": "Handcrafted Zari Embroidered Mojari / Jutti",
            "type": "Traditional",
            "color_name": "Antiqued Gold & Rich Maroon",
            "color_hex": "#800000",
            "best_paired_with": "Sherwani, Kurta Pajama & Bandhgala",
            "why_it_matches": "Embroidery thread coordinates with metallic zari details in ethnic festive outfits.",
            "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80"
          },
          {
            "name": "Strappy Metallic Ethnic Sandals",
            "type": "Traditional",
            "color_name": "Rose Gold / Antique Brass",
            "color_hex": "#B76E79",
            "best_paired_with": "Silk Sarees, Lehengas & Anarkali Suits",
            "why_it_matches": "Reflects festive light while maintaining comfortable elegance for celebrations.",
            "image": "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=400&q=80"
          }
        ]

        casual = [
          {
            "name": "Penny Loafers in Soft Calfskin",
            "type": "Casual",
            "color_name": "Warm Mahogany" if is_warm else "Midnight Black",
            "color_hex": "#4A0E0E" if is_warm else "#111111",
            "best_paired_with": "Polo Shirts, Tailored Shorts, Rolled Chinos",
            "why_it_matches": "Effortless sockless resort look that elevates casual weekend wear.",
            "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=400&q=80"
          }
        ]

        outdoor = [
          {
            "name": "Leather Chelsea Boots with Lug Sole",
            "type": "Outdoor / Winter",
            "color_name": "Dark Tobacco Brown" if is_warm else "Matte Black",
            "color_hex": "#3B2712" if is_warm else "#1C1C1C",
            "best_paired_with": "Winter Overcoats, Heavy Denim & Leather Jackets",
            "why_it_matches": "Rugged silhouette that provides ankle warmth and sturdy structured proportions.",
            "image": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&q=80"
          }
        ]

        return {
            "style_category": style_category,
            "recommendations": {
                "sneakers": sneakers,
                "formal": formal,
                "traditional": traditional,
                "casual": casual,
                "outdoor": outdoor
            },
            "featured_pairing": formal[0] if style_category in ["Formal", "Wedding / Special Occasion"] else (traditional[0] if style_category == "Traditional / Ethnic" else sneakers[0])
        }
