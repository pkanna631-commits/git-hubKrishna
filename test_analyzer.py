"""Regression tests for the personal style analyzer."""

import io
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from PIL import Image

from analyzer import ImageAnalyzer
from outfits import OutfitGenerator


def make_skin_image(rgb, size=(220, 220)):
    image = Image.new('RGB', size, rgb)
    buffer = io.BytesIO()
    image.save(buffer, format='PNG')
    return buffer.getvalue()


def test_rgb_to_lab_is_valid():
    L, a, b = ImageAnalyzer.rgb_to_lab(210, 160, 130)
    ita = ImageAnalyzer.calculate_ita(L, b)
    assert 0 <= ita <= 90


def test_analyzer_distinguishes_people_by_skin_tone():
    warm_image = make_skin_image((210, 165, 130))
    cool_image = make_skin_image((165, 145, 180))

    warm_analysis = ImageAnalyzer.analyze(warm_image)
    cool_analysis = ImageAnalyzer.analyze(cool_image)

    assert warm_analysis['sampled_skin_color_hex'] != cool_analysis['sampled_skin_color_hex']
    assert warm_analysis['undertone_code'] in {'warm', 'neutral'}
    assert cool_analysis['undertone_code'] in {'cool', 'neutral'}


def test_outfit_generator_keeps_uploaded_person_context():
    analysis = ImageAnalyzer.analyze(make_skin_image((200, 155, 120)))
    generated = OutfitGenerator.generate(analysis['tone_code'], analysis['undertone_code'], 'data:image/jpeg;base64,TEST_PERSON')

    assert len(generated['outfits']) >= 5
    assert all(outfit['ai_generated_image'] == 'data:image/jpeg;base64,TEST_PERSON' for outfit in generated['outfits'])
