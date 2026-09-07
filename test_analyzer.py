"""
Unit Test Script for Personal Style Recommendation Engine
Verifies Python image analyzer and outfit generator logic.
"""

import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from analyzer import ImageAnalyzer
from outfits import OutfitGenerator

def run_tests():
    print("==================================================")
    print("  RUNNING PERSONAL STYLE ENGINE UNIT TESTS")
    print("==================================================")

    # 1. Test ITA and LAB calculation
    L, a, b = ImageAnalyzer.rgb_to_lab(210, 160, 130)
    ita = ImageAnalyzer.calculate_ita(L, b)
    print(f"✓ RGB(210, 160, 130) -> LAB({L:.1f}, {a:.1f}, {b:.1f}), ITA° = {ita:.1f}°")
    assert 0 <= ita <= 90, "ITA calculation out of range"

    # 2. Test ImageAnalyzer analyze method with hex sample
    sample_hex = "#D4A373" # Warm medium skin tone
    analysis = ImageAnalyzer.analyze(b"", sample_hex)
    
    print("\n--- Image Analysis Results ---")
    print(f"• Estimated Tone: {analysis['estimated_tone']}")
    print(f"• Skin Tone Category: {analysis['skin_tone_category']}")
    print(f"• Undertone: {analysis['undertone']}")
    print(f"• Seasonal Analysis: {analysis['seasonal_analysis']}")
    print(f"• Recommended Colors Count: {len(analysis['recommended_colors'])}")
    print(f"• Sample Swatch: {analysis['recommended_colors'][0]['name']} ({analysis['recommended_colors'][0]['hex']})")

    assert analysis['undertone_code'] == 'warm', "Should detect warm undertone"
    assert len(analysis['recommended_colors']) >= 5, "Should return at least 5 recommended colors"

    # 3. Test Outfit Generator for 5 categories
    outfits_data = OutfitGenerator.generate(analysis['tone_code'], analysis['undertone_code'])
    outfits = outfits_data['outfits']
    
    print("\n--- Outfit Generator Results ---")
    print(f"• Generated Outfit Categories Count: {len(outfits)}")
    
    categories = [o['category'] for o in outfits]
    print(f"• Categories: {', '.join(categories)}")
    
Xerox    required_cats = ["Casual", "College / Student", "Formal", "Party", "Traditional / Ethnic"]
    for cat in required_cats:
        assert cat in categories, f"Missing required outfit category: {cat}"
        outfit = next(o for o in outfits if o['category'] == cat)
        print(f"  - [{cat}]: {outfit['title']} ({outfit['top']['item']})")
        assert 'top' in outfit and 'bottom' in outfit and 'footwear' in outfit and 'accessories' in outfit, f"Incomplete outfit structure for {cat}"

    uploaded_image = "data:image/jpeg;base64,TEST_PERSON"
    personalized = OutfitGenerator.generate(analysis['tone_code'], analysis['undertone_code'], uploaded_image)
    assert all(outfit['ai_generated_image'] == uploaded_image for outfit in personalized['outfits']), "Uploaded person image must remain the personalized subject"

    print("\n==================================================")
    print("🎉 ALL TESTS PASSED SUCCESSFULLY! (100% HEALTHY)")
    print("==================================================")

if __name__ == "__main__":
    run_tests()
