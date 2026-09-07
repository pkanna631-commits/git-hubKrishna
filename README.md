# AURA — AI Personal Style Recommendation System

A modern, high-fashion AI-powered **Personal Style Recommendation Application**. The system analyzes user portrait photos, estimates skin tone and undertone using scientific CIELAB color metrics and Individual Typology Angle (ITA°), generates customized flattering color palettes, and presents bespoke outfit recommendations across 5 lifestyle categories.

---

## 🌟 Key Features

1. **Editorial Fashion Homepage**:
   - High-end fashion design with smooth glassmorphism cards and champagne/rose gold typography.
   - Interactive Drag-and-Drop photo uploader.
   - Pre-loaded sample models for instant 1-click testing.

2. **Python AI Complexion & Style Analysis**:
   - **Skin Tone Estimation**: Scientific ITA° angle calculation (`arctan((L* - 50) / b*)`) & CIELAB color space classification (Very Light, Fair, Medium, Tan/Olive, Deep Brown).
   - **Undertone Estimation**: Warm (golden/peach), Cool (rosy/pink), or Neutral.
   - **Seasonal Color Palette**: Maps users into seasonal color analysis (Spring, Summer, Autumn, Winter).
   - **Lighting Quality Feedback**: Identifies overexposed or underexposed photos to give camera lighting advice.

3. **Style Result Dashboard**:
   - Visual color swatches with HEX codes and click-to-copy functionality.
   - Categorized palettes: **Recommended Core Colors**, **Statement Pop Accents**, and **Colors to Avoid**.

4. **10 Bespoke Outfit Categories**:
   - 👕 **Casual**: Weekend Resort & Elevated Linen Casual.
   - 🎓 **College**: Streetwear Oversized Hoodie & Campus Canvas Vibe.
   - 💼 **Formal**: Executive Tailored Blazer & Italian Cotton Dress Shirt.
   - 🍸 **Party**: Luxe Satin Evening Wear & Nightlife Accessories.
   - 🪔 **Traditional**: Regal Heritage Silk Kurta / Sherwani / Saree with Kundan & Brooch Accents.
   - 💍 **Wedding / Special Occasion**, 🎒 **Smart Casual**, 🏙️ **Streetwear**, ☀️ **Summer**, and ❄️ **Winter**.

5. **Privacy-First Design**:
   - Photos are processed in memory and **never permanently stored**.
   - Clear disclaimers stating that recommendations are approximate and camera lighting affects color sampling.
   - Zero physical body/attractiveness judgments or ratings.

---

## 🏗️ Technology Stack

- **Backend**: Python (FastAPI with fallback to Python HTTP Server), NumPy / Color conversion engine, `multipart/form-data` REST API.
- **Frontend**: Single Page Application with React 18, Tailwind CSS, Lucide Icons, and Canvas color sampling.

---

## 🚀 Quick Start Guide

### Running the Python Backend & Frontend

1. Clone or navigate to the project directory:
   ```bash
   cd "/Users/kanna/Documents/untitled folder"
   ```

2. Launch the application:
   ```bash
   python3 start.py
   ```

3. Open your browser at:
   ```
   http://127.0.0.1:8000
   ```

---

## 📡 Python REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check and feature capabilities |
| `POST` | `/analyze-photo` | Upload photo (`multipart/form-data`) or JSON base64; returns skin tone, undertone, ITA°, and recommended color swatches |
| `POST` | `/recommend-outfits` | Takes `tone_code`, `undertone_code`, and optional `image_base64`; returns curated outfits across all 10 categories |
| `POST` | `/generate-complete-look` | Returns the selected category's complete outfit, footwear, accessories, and grooming recommendations |

---

## 📂 Project Structure

```
untitled folder/
├── backend/
│   ├── app.py              # Python REST API Server (FastAPI / HTTP server)
│   ├── analyzer.py         # Skin Tone, Undertone & CIELAB/ITA° analysis engine
│   ├── outfits.py          # 5-Category Outfit recommendation generator
│   └── static/             # Frontend Single Page Application
│       ├── index.html      # React SPA HTML entrypoint
│       ├── styles.css      # Editorial fashion CSS animations & swatches
│       └── app.js          # React 18 frontend component logic
├── test_analyzer.py        # Automated test suite for Python analysis engine
├── start.py                # Single-command application launcher
└── README.md               # Documentation
```
