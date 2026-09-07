#!/usr/bin/env python3
"""
Personal Style Recommendation Starter Script
Launches Python FastAPI Backend & Web Server.
"""

import sys
import os
import webbrowser

# Add backend directory to sys.path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

from app import run_server

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"\n✨ Launching Personal Style Recommendation Application...")
    print(f"👉 Open in browser: http://127.0.0.1:{port}\n")
    
    # Auto-open browser tab if run interactively
    try:
        if "--no-browser" not in sys.argv:
            webbrowser.open(f"http://127.0.0.1:{port}")
    except Exception:
        pass

    run_server(port=port)
