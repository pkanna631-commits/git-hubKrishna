"""
Beauty & Grooming Stylist Engine
Provides personalized recommendations for:
- Skincare (Cleanser, Moisturizer, Sunscreen, Lip Care)
- Makeup shade families (Foundation, Concealer, Blush, Lip, Eyeshadow)
- Hair & Grooming (Styling products, Haircare, Beard/Grooming)
- Fragrance Notes (Fresh, Woody, Citrus, Floral, Spicy)
- Beauty Product Cards with shade recommendations
"""

from typing import Dict, List, Any

class BeautyStylist:
    """
    Generates non-medical beauty and grooming advice based on complexion & undertone analysis.
    """

    @classmethod
    def recommend(cls, tone_code: str = "medium", undertone_code: str = "warm") -> Dict[str, Any]:
        is_warm = undertone_code == "warm"

        skincare = [
            {
                "category": "Cleanser",
                "recommendation": "Hydrating Gentle Gel Cleanser",
                "benefit": "Maintains moisture barrier balance for a natural healthy glow."
            },
            {
                "category": "Moisturizer",
                "recommendation": "Niacinamide Light Gel Moisturizer",
                "benefit": "Evens out texture and calms sun exposure."
            },
            {
                "category": "Sunscreen",
                "recommendation": "Invisible Broad-Spectrum SPF 50 PA++++",
                "benefit": "Protects against UV hyperpigmentation without white cast."
            },
            {
                "category": "Lip Care",
                "recommendation": "Nourishing Botanical Lip Oil",
                "benefit": "Keeps lips hydrated with subtle natural shine."
            }
        ]

        makeup_shades = {
            "foundation_family": "Golden / Warm Peach undertone range" if is_warm else "Rosy / Cool Pink undertone range",
            "concealer_family": "Warm Vanilla / Honey" if is_warm else "Cool Porcelain / Soft Ivory",
            "blush_color_family": "Warm Peach, Terracotta, Coral" if is_warm else "Soft Berry, Dusty Rose, Cool Mauve",
            "lip_color_family": "Warm Nude, Burnt Coral, Brick Red" if is_warm else "Cool Berry, Rosy Pink, Deep Plum",
            "eyeshadow_family": "Warm Bronze, Copper, Champagne" if is_warm else "Slate Grey, Ice Violet, Cool Taupe"
        }

        hair_grooming = [
            {
                "aspect": "Hairstyle Trend",
                "suggestion": "Textured Crop / Tapered Fade with Natural Flow",
                "tip": "Maintains structured frame balancing facial geometry."
            },
            {
                "aspect": "Styling Product",
                "suggestion": "Matte Finish Sea Salt Spray or Clay Pomade",
                "tip": "Adds natural volume without greasy residue."
            },
            {
                "aspect": "Grooming & Beard",
                "suggestion": "Hydrating Beard Oil & Precision Edge Trimmer",
                "tip": "Keeps facial lines clean and enhances jawline definition."
            }
        ]

        fragrance = {
            "primary_family": "Woody Amber & Warm Spice" if is_warm else "Fresh Citrus & Aquatic Mineral",
            "key_notes": "Sandalwood, Cardamom, Vanilla Amber, Cedarwood" if is_warm else "Bergamot, Marine Accord, Lavender, Vetiver",
            "vibe_description": "Rich, inviting warmth that lingers elegantly" if is_warm else "Crisp, energetic freshness with clean high notes",
            "occasion": "Ideal for evening events and formal occasions" if is_warm else "Perfect for daytime, college, and active resort wear"
        }

        product_cards = [
            {
                "id": "p1",
                "category": "Complexion Perfection",
                "title": "Luminous Radiant Skin Tint SPF 30",
                "shade_recommendation": makeup_shades["foundation_family"],
                "reason": "Lightweight coverage that lets your skin's natural undertone radiance shine through.",
                "price": "$42.00",
                "image": "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=400&q=80"
            },
            {
                "id": "p2",
                "category": "Lip & Cheek Tint",
                "title": "Velvet Botanical Blush Tint",
                "shade_recommendation": makeup_shades["blush_color_family"],
                "reason": "Blends seamlessly into cheekbones to accentuate natural warmth.",
                "price": "$28.00",
                "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80"
            },
            {
                "id": "p3",
                "category": "Signature Fragrance",
                "title": "AURA Maison Eau De Parfum 100ml",
                "shade_recommendation": fragrance["primary_family"],
                "reason": fragrance["vibe_description"],
                "price": "$115.00",
                "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80"
            }
        ]

        return {
            "skincare": skincare,
            "makeup_shades": makeup_shades,
            "hair_grooming": hair_grooming,
            "fragrance": fragrance,
            "product_cards": product_cards
        }
