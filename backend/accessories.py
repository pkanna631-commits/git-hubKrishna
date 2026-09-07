"""
Accessories Recommendation Engine
Generates complementary accessory pairings across:
- Watches (Classic, Sports, Minimal, Smartwatch)
- Bags (Backpack, Crossbody, Sling, Laptop)
- Jewelry (Bracelets, Chains, Rings, Earrings, Sunglasses)
- Leather & Other (Belts, Caps, Hats, Wallets)
"""

from typing import Dict, List, Any

class AccessoriesStylist:
    """
    Generates tailored accessory recommendations that complement outfits.
    """

    @classmethod
    def recommend(cls, tone_code: str = "medium", undertone_code: str = "warm", style_category: str = "Casual") -> Dict[str, Any]:
        is_warm = undertone_code == "warm"

        watches = [
            {
                "name": "Swiss Automatic Leather Dress Watch",
                "category": "Watches",
                "type": "Classic Watch",
                "finish": "Rose Gold & Cognac Leather" if is_warm else "Silver & Black Leather",
                "match_reason": "Slim case design that slides smoothly under blazer cuffs."
            },
            {
                "name": "Minimalist Matte Mesh Watch",
                "category": "Watches",
                "type": "Minimal Watch",
                "finish": "Champagne Gold" if is_warm else "Gunmetal Grey",
                "match_reason": "Understated dial that elevates casual and smart casual attire."
            }
        ]

        bags = [
            {
                "name": "Full-Grain Leather Laptop Briefcase",
                "category": "Bags",
                "type": "Laptop Bag",
                "finish": "Rich Chestnut Brown" if is_warm else "Matte Black",
                "match_reason": "Matches dress shoe leather tones for professional office cohesion."
            },
            {
                "name": "Heavyweight Canvas City Backpack",
                "category": "Bags",
                "type": "Backpack",
                "finish": "Earthy Olive / Sand",
                "match_reason": "Utilitarian storage that coordinates with campus and casual outfits."
            }
        ]

        jewelry = [
            {
                "name": "Polarized Acetate Sunglasses",
                "category": "Eyewear",
                "type": "Sunglasses",
                "finish": "Tortoiseshell Frames" if is_warm else "Black Gloss Frames",
                "match_reason": "Frames structure facial geometry while protecting eyes from UV light."
            },
            {
                "name": "Textured Signet Ring & Chain",
                "category": "Jewelry",
                "type": "Ring & Chain",
                "finish": "Warm 14K Gold Finish" if is_warm else "Sterling Silver 925",
                "match_reason": "Metallic tones harmonize with skin undertone warmth."
            }
        ]

        leather_goods = [
            {
                "name": "Full-Grain Woven Leather Belt",
                "category": "Leather Goods",
                "type": "Belts",
                "finish": "Cognac Tan" if is_warm else "Polished Black",
                "match_reason": "Direct color anchor matching your selected footwear leather."
            },
            {
                "name": "RFID-Blocking Leather Cardholder",
                "category": "Accessories",
                "type": "Wallets",
                "finish": "Mahogany Brown" if is_warm else "Slate Charcoal",
                "match_reason": "Slim pocket profile avoiding bulky outline in trousers."
            }
        ]

        return {
            "style_category": style_category,
            "watches": watches,
            "bags": bags,
            "jewelry": jewelry,
            "leather_goods": leather_goods
        }
