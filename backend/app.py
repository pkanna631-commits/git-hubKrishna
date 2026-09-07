"""
Python REST API Server for Personal Style Recommendation System.
Serves REST API Endpoints:
- GET  /health
- POST /analyze-photo
- POST /recommend-colors
- POST /recommend-outfits
- POST /recommend-footwear
- POST /recommend-accessories
- POST /recommend-beauty
- POST /generate-complete-look
- GET  / (Static frontend serving)
"""

import sys
import os
import json
import base64
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from analyzer import ImageAnalyzer
from outfits import OutfitGenerator
from footwear import FootwearStylist
from accessories import AccessoriesStylist
from beauty import BeautyStylist

# Determine static frontend directory path
STATIC_DIR = Path(__file__).parent / "static"

FASTAPI_AVAILABLE = False
try:
    from fastapi import FastAPI, File, UploadFile, Form, Request, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import HTMLResponse, JSONResponse
    import uvicorn
    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False

if FASTAPI_AVAILABLE:
    app = FastAPI(
        title="Personal Style Recommendation System API",
        description="Python AI Backend for Skin Tone, Undertone, Color Palette, Outfits, Footwear, Accessories, Beauty & Master Complete Look",
        version="2.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    async def health_check():
        return {
            "status": "healthy",
            "server": "Python FastAPI",
            "version": "2.0.0",
            "endpoints": [
                "/health", "/analyze-photo", "/recommend-colors", "/recommend-outfits",
                "/recommend-footwear", "/recommend-accessories", "/recommend-beauty", "/generate-complete-look"
            ]
        }

    @app.post("/analyze-photo")
    async def analyze_photo(
        file: UploadFile = File(None),
        client_sample_hex: str = Form(None),
        image_base64: str = Form(None)
    ):
        try:
            image_bytes = b""
            if file:
                image_bytes = await file.read()
            elif image_base64:
                if "," in image_base64:
                    image_base64 = image_base64.split(",")[1]
                image_bytes = base64.b64decode(image_base64)
            
            result = ImageAnalyzer.analyze(image_bytes, client_sample_hex)
            return JSONResponse(content=result)
        except Exception as e:
            return JSONResponse(status_code=500, content={"error": str(e)})

    @app.post("/recommend-colors")
    async def recommend_colors(request: Request):
        body = await request.json()
        undertone = body.get("undertone_code", "warm")
        tone = body.get("tone_code", "medium")
        palettes = ImageAnalyzer.generate_color_palettes(undertone, tone)
        return JSONResponse(content=palettes)

    @app.post("/recommend-outfits")
    async def recommend_outfits(request: Request):
        body = await request.json()
        tone_code = body.get("tone_code", "medium")
        undertone_code = body.get("undertone_code", "warm")
        result = OutfitGenerator.generate(tone_code, undertone_code, body.get("image_base64"))
        return JSONResponse(content=result)

    @app.post("/recommend-footwear")
    async def recommend_footwear(request: Request):
        body = await request.json()
        tone_code = body.get("tone_code", "medium")
        undertone_code = body.get("undertone_code", "warm")
        category = body.get("category", "Casual")
        result = FootwearStylist.recommend(tone_code, undertone_code, category)
        return JSONResponse(content=result)

    @app.post("/recommend-accessories")
    async def recommend_accessories(request: Request):
        body = await request.json()
        tone_code = body.get("tone_code", "medium")
        undertone_code = body.get("undertone_code", "warm")
        category = body.get("category", "Casual")
        result = AccessoriesStylist.recommend(tone_code, undertone_code, category)
        return JSONResponse(content=result)

    @app.post("/recommend-beauty")
    async def recommend_beauty(request: Request):
        body = await request.json()
        tone_code = body.get("tone_code", "medium")
        undertone_code = body.get("undertone_code", "warm")
        result = BeautyStylist.recommend(tone_code, undertone_code)
        return JSONResponse(content=result)

    @app.post("/generate-complete-look")
    async def generate_complete_look(request: Request):
        body = await request.json()
        tone_code = body.get("tone_code", "medium")
        undertone_code = body.get("undertone_code", "warm")
        category = body.get("category", "Casual")

        image_base64 = body.get("image_base64")
        outfits_res = OutfitGenerator.generate(tone_code, undertone_code, image_base64)
        selected_outfit = next((o for o in outfits_res["outfits"] if o["category"] == category), outfits_res["outfits"][0])
        footwear_res = FootwearStylist.recommend(tone_code, undertone_code, category)
        accessories_res = AccessoriesStylist.recommend(tone_code, undertone_code, category)
        beauty_res = BeautyStylist.recommend(tone_code, undertone_code)

        complete_look = {
            "style_category": category,
            "outfit": selected_outfit,
            "footwear": footwear_res["featured_pairing"],
            "accessories": accessories_res["jewelry"] + accessories_res["watches"],
            "ai_generated_image": selected_outfit.get("ai_generated_image"),
            "ai_prompt": selected_outfit.get("ai_prompt"),
            "beauty_grooming": {
                "skincare_focus": beauty_res["skincare"][0],
                "fragrance_note": beauty_res["fragrance"],
                "grooming_tip": beauty_res["hair_grooming"][0]
            }
        }
        return JSONResponse(content=complete_look)

    @app.post("/generate-ai-outfit-photo")
    async def generate_ai_outfit_photo(request: Request):
        body = await request.json()
        category = body.get("category", "Casual")
        tone_code = body.get("tone_code", "medium")
        undertone_code = body.get("undertone_code", "warm")
        setting = body.get("setting", "Studio Minimal")
        image_base64 = body.get("image_base64")

        outfits = OutfitGenerator.generate(tone_code, undertone_code, image_base64)["outfits"]
        target = next((o for o in outfits if o["category"] == category), outfits[0])

        env_images = {
            "Parisian Street": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
            "Milan Lounge": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
            "Sunset Resort": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80",
            "Studio Minimal": target.get("ai_generated_image", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80")
        }

        selected_img = env_images.get(setting, target.get("ai_generated_image"))

        return JSONResponse(content={
            "status": "success",
            "category": category,
            "setting": setting,
            "ai_image_url": selected_img,
            "ai_prompt": f"Ultra-realistic 8K fashion photography of a model with {tone_code} tone and {undertone_code} undertone wearing {target['top']['item']} and {target['bottom']['item']}, set in {setting}, high fashion magazine editorial style",
            "styling_notes": target.get("style_tips", "Harmonious palette contrast.")
        })

    if STATIC_DIR.exists():
        app.mount("/", StaticFiles(directory=str(STATIC_DIR), html=True), name="static")

else:
    # Robust Standard Python HTTP Fallback Server
    class FallbackHTTPHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

        def end_headers(self):
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            super().end_headers()

        def do_OPTIONS(self):
            self.send_response(200)
            self.end_headers()

        def do_GET(self):
            parsed_path = urlparse(self.path).path

            if parsed_path in ["/health", "/api/health", "/health/", "/api/health/"]:
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                res = {
                    "status": "healthy",
                    "server": "Python Standard Library HTTP Server",
                    "version": "2.0.0",
                    "endpoints": [
                        "/health", "/analyze-photo", "/recommend-colors", "/recommend-outfits",
                        "/recommend-footwear", "/recommend-accessories", "/recommend-beauty", "/generate-complete-look"
                    ]
                }
                self.wfile.write(json.dumps(res).encode("utf-8"))
                return

            if parsed_path in ["/", "/index.html"]:
                index_path = STATIC_DIR / "index.html"
                if index_path.exists():
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.send_header("Cache-Control", "no-cache")
                    self.end_headers()
                    with open(index_path, "rb") as f:
                        self.wfile.write(f.read())
                    return

            super().do_GET()

        def do_POST(self):
            parsed_path = urlparse(self.path).path
            content_length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(content_length)

            data = {}
            if body_bytes and "application/json" in self.headers.get("Content-Type", ""):
                try:
                    data = json.loads(body_bytes.decode("utf-8"))
                except Exception:
                    pass

            tone_code = data.get("tone_code", "medium")
            undertone_code = data.get("undertone_code", "warm")
            category = data.get("category", "Casual")

            if parsed_path in ["/analyze-photo", "/api/analyze-photo"]:
                content_type = self.headers.get("Content-Type", "")
                image_bytes = b""
                client_hex = None

                if "multipart/form-data" in content_type:
                    # Robust multipart boundary extraction
                    try:
                        raw_boundary = content_type.split("boundary=")[-1].split(";")[0].strip('"\'')
                        boundary = raw_boundary.encode("utf-8")
                        parts = body_bytes.split(b"--" + boundary)
                        for part in parts:
                            if b'name="file"' in part or b'filename=' in part:
                                header_end = part.find(b"\r\n\r\n")
                                if header_end != -1:
                                    image_bytes = part[header_end + 4:].rstrip(b"\r\n")
                            elif b'name="client_sample_hex"' in part:
                                header_end = part.find(b"\r\n\r\n")
                                if header_end != -1:
                                    client_hex = part[header_end + 4:].rstrip(b"\r\n").decode("utf-8", errors="ignore").strip()
                    except Exception:
                        pass
                elif "application/json" in content_type:
                    if "image_base64" in data:
                        b64 = data["image_base64"]
                        if "," in b64:
                            b64 = b64.split(",")[1]
                        image_bytes = base64.b64decode(b64)
                    if "client_sample_hex" in data:
                        client_hex = data["client_sample_hex"]

                result = ImageAnalyzer.analyze(image_bytes, client_hex)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(result).encode("utf-8"))
                return

            elif parsed_path in ["/recommend-colors", "/api/recommend-colors"]:
                res = ImageAnalyzer.generate_color_palettes(undertone_code, tone_code)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(res).encode("utf-8"))
                return

            elif parsed_path in ["/recommend-outfits", "/api/recommend-outfits"]:
                res = OutfitGenerator.generate(tone_code, undertone_code, data.get("image_base64"))
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(res).encode("utf-8"))
                return

            elif parsed_path in ["/recommend-footwear", "/api/recommend-footwear"]:
                res = FootwearStylist.recommend(tone_code, undertone_code, category)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(res).encode("utf-8"))
                return

            elif parsed_path in ["/recommend-accessories", "/api/recommend-accessories"]:
                res = AccessoriesStylist.recommend(tone_code, undertone_code, category)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(res).encode("utf-8"))
                return

            elif parsed_path in ["/recommend-beauty", "/api/recommend-beauty"]:
                res = BeautyStylist.recommend(tone_code, undertone_code)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(res).encode("utf-8"))
                return

            elif parsed_path in ["/generate-complete-look", "/api/generate-complete-look"]:
                image_base64 = data.get("image_base64")
                outfits_res = OutfitGenerator.generate(tone_code, undertone_code, image_base64)
                selected_outfit = next((o for o in outfits_res["outfits"] if o["category"] == category), outfits_res["outfits"][0])
                footwear_res = FootwearStylist.recommend(tone_code, undertone_code, category)
                accessories_res = AccessoriesStylist.recommend(tone_code, undertone_code, category)
                beauty_res = BeautyStylist.recommend(tone_code, undertone_code)

                complete_look = {
                    "style_category": category,
                    "outfit": selected_outfit,
                    "footwear": footwear_res["featured_pairing"],
                    "accessories": accessories_res["jewelry"] + accessories_res["watches"],
                    "ai_generated_image": selected_outfit.get("ai_generated_image"),
                    "ai_prompt": selected_outfit.get("ai_prompt"),
                    "beauty_grooming": {
                        "skincare_focus": beauty_res["skincare"][0],
                        "fragrance_note": beauty_res["fragrance"],
                        "grooming_tip": beauty_res["hair_grooming"][0]
                    }
                }
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(complete_look).encode("utf-8"))
                return

            elif parsed_path in ["/generate-ai-outfit-photo", "/api/generate-ai-outfit-photo"]:
                setting = data.get("setting", "Studio Minimal")
                image_base64 = data.get("image_base64")
                outfits = OutfitGenerator.generate(tone_code, undertone_code, image_base64)["outfits"]
                target = next((o for o in outfits if o["category"] == category), outfits[0])
                env_images = {
                    "Parisian Street": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
                    "Milan Lounge": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
                    "Sunset Resort": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80",
                    "Studio Minimal": target.get("ai_generated_image", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80")
                }
                selected_img = env_images.get(setting, target.get("ai_generated_image"))
                res = {
                    "status": "success",
                    "category": category,
                    "setting": setting,
                    "ai_image_url": selected_img,
                    "ai_prompt": f"Ultra-realistic 8K fashion photography of a model with {tone_code} tone and {undertone_code} undertone wearing {target['top']['item']} and {target['bottom']['item']}, set in {setting}, high fashion magazine editorial style",
                    "styling_notes": target.get("style_tips", "Harmonious palette contrast.")
                }
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(res).encode("utf-8"))
                return

            self.send_response(404)
            self.end_headers()


def run_server(port: int = 8000):
    print(f"============================================================")
    print(f"  AI Personal Style Recommendation System API (Python)")
    print(f"  Server running on http://127.0.0.1:{port}")
    print(f"============================================================")
    if FASTAPI_AVAILABLE:
        print("-> Engine: FastAPI + Uvicorn")
        uvicorn.run(app, host="127.0.0.1", port=port, log_level="info")
    else:
        print("-> Engine: Python Native REST/HTTP Server")
        server = HTTPServer(("127.0.0.1", port), FallbackHTTPHandler)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")
            server.server_close()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    run_server(port)
