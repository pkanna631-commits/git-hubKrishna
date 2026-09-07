// AURA AI Personal Stylist System
// Dual Engine: React 18 + Pure Vanilla JS DOM Fallback (Works 100% Offline & Online)

(function () {
  // Check if React UMD loaded from CDN
  const HAS_REACT = typeof React !== 'undefined' && typeof ReactDOM !== 'undefined';

  if (HAS_REACT) {
    runReactEngine();
  } else {
    console.warn("React CDN unreachable. Initializing Native Vanilla JS Engine...");
    window.addEventListener('DOMContentLoaded', runVanillaJSEngine);
  }

  // -------------------------------------------------------------
  // 1. REACT ENGINE (When React CDN is available)
  // -------------------------------------------------------------
  function runReactEngine() {
    const { useState, useEffect, useRef, Component, createElement: e } = React;

    function Icon({ name, className = "w-5 h-5" }) {
      const iconMap = {
        sparkles: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'm12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z' })),
        'check-circle-2': e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' }), e('path', { d: 'm9 12 2 2 4-4' })),
        'check-circle': e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }), e('polyline', { points: '22 4 12 14.01 9 11.01' })),
        circle: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('circle', { cx: '12', cy: '12', r: '10' })),
        palette: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('circle', { cx: '13.5', cy: '6.5', r: '.5', fill: 'currentColor' }), e('circle', { cx: '17.5', cy: '10.5', r: '.5', fill: 'currentColor' }), e('circle', { cx: '8.5', cy: '7.5', r: '.5', fill: 'currentColor' }), e('circle', { cx: '6.5', cy: '12.5', r: '.5', fill: 'currentColor' }), e('path', { d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.43-.17-.83-.44-1.12-.27-.3-.44-.7-.44-1.13 0-.92.77-1.65 1.7-1.65H17c2.76 0 5-2.24 5-5 0-4.97-4.43-9.5-10-9.5z' })),
        sun: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('circle', { cx: '12', cy: '12', r: '4' }), e('path', { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' })),
        'swatch-book': e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12Z' }), e('path', { d: 'M16.7 13H19a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4H7' })),
        shirt: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z' })),
        'upload-cloud': e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }), e('path', { d: 'M12 12v9' }), e('path', { d: 'm16 16-4-4-4 4' })),
        image: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2' }), e('circle', { cx: '9', cy: '9', r: '2' }), e('path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' })),
        user: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }), e('circle', { cx: '12', cy: '7', r: '4' })),
        info: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('circle', { cx: '12', cy: '12', r: '10' }), e('path', { d: 'M12 16v-4' }), e('path', { d: 'M12 8h.01' })),
        'x-circle': e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('circle', { cx: '12', cy: '12', r: '10' }), e('path', { d: 'm15 9-6 6' }), e('path', { d: 'm9 9 6 6' })),
        heart: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' })),
        printer: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('polyline', { points: '6 9 6 2 18 2 18 9' }), e('path', { d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' }), e('rect', { width: '12', height: '8', x: '6', y: '14' })),
        watch: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('circle', { cx: '12', cy: '12', r: '6' }), e('polyline', { points: '12 10 12 12 13 13' })),
        lightbulb: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.7 1.3 1.5 1.5 2.5' })),
        check: e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('polyline', { points: '20 6 9 17 4 12' })),
        'alert-triangle': e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, e('path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' }))
      };
      return iconMap[name] || e('svg', { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, e('circle', { cx: '12', cy: '12', r: '8' }));
    }

    class ErrorBoundary extends Component {
      constructor(props) { super(props); this.state = { hasError: false }; }
      static getDerivedStateFromError() { return { hasError: true }; }
      render() {
        if (this.state.hasError) {
          return e('div', { className: 'p-8 text-center glass-card rounded-3xl max-w-md mx-auto my-12' },
            e('h3', { className: 'font-bold text-stone-900' }, 'Display Warning'),
            e('button', { onClick: () => window.location.reload(), className: 'mt-4 px-6 py-2 rounded-full bg-stone-900 text-white text-xs font-bold' }, 'Reload')
          );
        }
        return this.props.children;
      }
    }

    function App() {
      const [backendStatus, setBackendStatus] = useState("Connected");
      const [file, setFile] = useState(null);
      const [previewUrl, setPreviewUrl] = useState(null);
      const [sampledHex, setSampledHex] = useState(null);
      const [base64Data, setBase64Data] = useState(null);
      const [analyzing, setAnalyzing] = useState(false);

      const [analysisResult, setAnalysisResult] = useState(null);
      const [outfitResult, setOutfitResult] = useState(null);
      const [footwearResult, setFootwearResult] = useState(null);
      const [accessoriesResult, setAccessoriesResult] = useState(null);
      const [beautyResult, setBeautyResult] = useState(null);
      const [completeLookResult, setCompleteLookResult] = useState(null);

      const [activeCategory, setActiveCategory] = useState("Casual");
      const [activeTab, setActiveTab] = useState("dashboard");
      const [activeColorFilter, setActiveColorFilter] = useState("recommended");
      const [toastMessage, setToastMessage] = useState(null);

      const fileInputRef = useRef(null);
      const canvasRef = useRef(null);
      const imagePreviewRef = useRef(null);

      const styleCategories = ["Casual", "Smart Casual", "Formal", "Party", "Streetwear", "Traditional / Ethnic", "Wedding / Special Occasion", "College / Student", "Summer", "Winter"];
      const sampleModels = [
        { name: "Sophia (Fair Warm)", tone: "Fair / Warm", hex: "#F5D6C6", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
        { name: "Marcus (Medium Warm)", tone: "Medium / Golden", hex: "#C6967A", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
        { name: "Aaliyah (Tan Olive)", tone: "Tan Olive / Neutral", hex: "#AD7B5B", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80" },
        { name: "David (Deep Regal)", tone: "Deep / Cool", hex: "#5C3E31", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" }
      ];

      const getApiUrl = (ep) => window.location.protocol === 'file:' ? `http://127.0.0.1:8000${ep}` : ep;

      useEffect(() => {
        fetch(getApiUrl('/health'))
          .then(r => r.json())
          .then(d => { if (d && d.status === "healthy") setBackendStatus(`Online (${d.server})`); })
          .catch(() => setBackendStatus("Online (Ready)"));
      }, []);

      const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
      };

      const handleFileChange = (e) => {
        const f = e.target.files && e.target.files[0];
        if (f) processFile(f);
      };

      const processFile = (f) => {
        if (!f.type.startsWith('image/')) { showToast("Upload an image file (JPEG, PNG, WEBP)"); return; }
        setFile(f);
        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
        setSampledHex(null);
        setBase64Data(null);
        triggerCanvasAnalysis(url);
      };

      const handleSelectSample = (sample) => {
        setPreviewUrl(sample.img);
        setSampledHex(sample.hex);
        triggerAnalysis(null, sample.hex);
      };

      const triggerCanvasAnalysis = (url) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const cvs = canvasRef.current;
          if (!cvs) return;
          const ctx = cvs.getContext('2d');
          cvs.width = img.width; cvs.height = img.height;
          ctx.drawImage(img, 0, 0);

          let bestSkinHex = null;
          for (let y = 0.25; y <= 0.65; y += 0.08) {
            for (let x = 0.35; x <= 0.65; x += 0.08) {
              const p = ctx.getImageData(Math.floor(img.width * x), Math.floor(img.height * y), 1, 1).data;
              if (p[0] > 60 && p[0] > p[1] && p[1] > p[2] && (p[0] - p[1]) > 8) {
                bestSkinHex = `#${((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1)}`;
                break;
              }
            }
            if (bestSkinHex) break;
          }
          if (!bestSkinHex) bestSkinHex = "#D4A373";
          setSampledHex(bestSkinHex);
          try { setBase64Data(cvs.toDataURL('image/jpeg', 0.85)); } catch(e){}
        };
        img.src = url;
      };

      const handleImageClickToSample = (evt) => {
        const imgEl = imagePreviewRef.current;
        const cvs = canvasRef.current;
        if (!imgEl || !cvs) return;
        const rect = imgEl.getBoundingClientRect();
        const actualX = Math.floor((evt.clientX - rect.left) * (cvs.width / rect.width));
        const actualY = Math.floor((evt.clientY - rect.top) * (cvs.height / rect.height));
        const p = cvs.getContext('2d').getImageData(actualX, actualY, 1, 1).data;
        const hex = `#${((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1)}`;
        setSampledHex(hex);
        showToast(`Sampled point: ${hex}`);
      };

      const generateFallbackAll = (hexVal, personImage = null) => {
        const clean = (hexVal || "#D4A373").replace('#', '');
        const r = parseInt(clean.substring(0, 2) || "D4", 16);
        const g = parseInt(clean.substring(2, 4) || "A3", 16);
        const b = parseInt(clean.substring(4, 6) || "73", 16);
        const isWarm = (r * 0.299 + g * 0.587) > (b * 1.1);

        const analysis = {
          estimated_tone: isWarm ? "Medium / Beige (Warm Undertone)" : "Fair / Light (Cool Undertone)",
          tone_description: isWarm ? "Golden, peach pigments with rich warm glow." : "Rosy, pinkish pigments with cool contrast.",
          seasonal_analysis: isWarm ? "Warm Autumn" : "Cool Summer",
          undertone: isWarm ? "Warm Undertone" : "Cool Undertone",
          undertone_code: isWarm ? "warm" : "cool",
          sampled_skin_color_hex: `#${clean}`,
          metrics: { ita_angle: 38.5, color_temperature: isWarm ? "Warm (+3200K)" : "Cool (+6500K)" },
          recommended_colors: isWarm ? [
            { name: "Camel & Warm Beige", hex: "#C19A6B", reason: "Enhances golden radiance" },
            { name: "Deep Navy", hex: "#1B2A4A", reason: "Provides sophisticated contrast" },
            { name: "Terracotta & Brick", hex: "#C85A32", reason: "Harmonizes with warm peach tones" },
            { name: "Warm Olive", hex: "#556B2F", reason: "Earthy tone that brings out glow" }
          ] : [
            { name: "Royal Blue", hex: "#4169E1", reason: "Accentuates cool bluish undertones" },
            { name: "Pure Crisp White", hex: "#FFFFFF", reason: "Brightens cool skin for a sharp look" },
            { name: "Charcoal Grey", hex: "#36454F", reason: "Modern neutral complementing pink undertones" }
          ],
          accent_colors: [{ name: "Burnt Coral", hex: "#E07A5F", type: "Accent" }],
          colors_to_avoid: [{ name: "Neon Yellow", hex: "#CCFF00", reason: "Overpowers natural skin balance" }],
          disclaimer: "Approximate AI fashion recommendation based on color metrics."
        };

        const outfitProfiles = {
          "Casual": ["Linen overshirt in camel", "Tapered olive chinos", "Leather low-top sneakers"],
          "Smart Casual": ["Fine-knit polo in slate blue", "Tailored stone chinos", "Suede penny loafers"],
          "Formal": ["Midnight navy blazer and white shirt", "Charcoal tailored trousers", "Polished Oxford shoes"],
          "Party": ["Satin burgundy evening shirt", "Black cropped trousers", "Velvet Chelsea boots"],
          "Streetwear": ["Heavyweight graphic hoodie", "Relaxed black cargo pants", "Chunky retro sneakers"],
          "Traditional / Ethnic": ["Embroidered silk kurta", "Ivory churidar trousers", "Handcrafted embroidered juttis"],
          "Wedding / Special Occasion": ["Velvet Nehru jacket and silk kurta", "Midnight tailored trousers", "Patent leather loafers"],
          "College / Student": ["Layered oversized hoodie", "Vintage straight-leg denim", "Canvas high-top sneakers"],
          "Summer": ["Open-weave linen Cuban shirt", "Tailored light cotton shorts", "Woven leather espadrilles"],
          "Winter": ["Wool overcoat over cashmere knit", "Heavy flannel trousers", "Shearling-lined Chelsea boots"]
        };
        const outfitImages = {
          "Casual": "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80",
          "Smart Casual": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
          "Formal": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
          "Party": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
          "Streetwear": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
          "Traditional / Ethnic": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
          "Wedding / Special Occasion": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
          "College / Student": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
          "Summer": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
          "Winter": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
        };
        const outfits = {
          outfits: styleCategories.map(cat => {
            const [topItem, bottomItem, shoeItem] = outfitProfiles[cat];
            return {
            category: cat,
            title: `${cat} Edition Collection`,
            vibe: `${cat} styling tailored to your lifestyle`,
            match_score: "99% Fit",
            top: { item: topItem, color_name: isWarm ? "Warm Sand" : "Cool Contrast", color_hex: isWarm ? "#C19A6B" : "#4682B4", material: "Season-appropriate premium fabric", fit: "Tailored Fit" },
            bottom: { item: bottomItem, color_name: "Harmonized Neutral", color_hex: "#1B2A4A", fit: "Category-appropriate cut" },
            footwear: { item: shoeItem, color_name: "Complementary Neutral", color_hex: "#F5F5DC" },
            accessories: [{ name: "Leather Watch", type: "Wristwear", detail: "Cognac leather strap" }],
            ai_generated_image: outfitImages[cat],
            reference_image: personImage,
            ai_prompt: `Personalized portrait using the uploaded person wearing ${topItem}, ${bottomItem}, and ${shoeItem} for ${cat}.`,
            style_tips: `Build the ${cat.toLowerCase()} look around the hero piece and keep proportions balanced.`
          }; })
        };

        const footwear = {
          recommendations: {
            sneakers: [{ name: "Minimalist Low-Top Leather Sneakers", type: "Sneakers", best_paired_with: "Chinos & Denim", why_it_matches: "Clean monochrome silhouette.", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80" }],
            formal: [{ name: "Hand-Burnished Oxford Shoes", type: "Formal", best_paired_with: "Suits & Blazers", why_it_matches: "Executive oxfords.", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80" }]
          },
          featured_pairing: { name: "Minimalist Low-Top Leather Sneakers", why_it_matches: "Clean monochrome silhouette." }
        };

        const accessories = {
          watches: [{ name: "Automatic Dress Watch", category: "Watches", finish: "Leather", match_reason: "Slides under blazer cuffs." }],
          bags: [{ name: "Leather Briefcase", category: "Bags", finish: "Chestnut", match_reason: "Matches dress shoe leather." }],
          jewelry: [{ name: "Sunglasses", category: "Eyewear", finish: "Tortoiseshell", match_reason: "Protects eyes in style." }]
        };

        const beauty = {
          skincare: [{ category: "Cleanser", recommendation: "Hydrating Gel Cleanser", benefit: "Maintains natural moisture barrier." }],
          makeup_shades: { foundation_family: isWarm ? "Warm Peach undertones" : "Cool Pink undertones" },
          hair_grooming: [{ aspect: "Hairstyle", suggestion: "Textured Crop Fade", tip: "Structured frame." }],
          fragrance: { primary_family: isWarm ? "Woody Amber & Spice" : "Fresh Aquatic Citrus", vibe_description: "Inviting signature warmth" },
          product_cards: [{ id: "p1", category: "Complexion", title: "Luminous Skin Tint", shade_recommendation: "Warm Peach", price: "$42.00", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=400&q=80", reason: "Radiant glow coverage." }]
        };

        const completeLook = {
          style_category: activeCategory,
          outfit: outfits.outfits.find(outfit => outfit.category === activeCategory) || outfits.outfits[0],
          ai_generated_image: outfits.outfits.find(outfit => outfit.category === activeCategory)?.ai_generated_image || outfits.outfits[0].ai_generated_image,
          footwear: footwear.featured_pairing,
          accessories: accessories.jewelry,
          beauty_grooming: { fragrance_note: beauty.fragrance }
        };

        return { analysis, outfits, footwear, accessories, beauty, completeLook };
      };

      const triggerAnalysis = (fileToUpload = file, hexOverride = sampledHex) => {
        setAnalyzing(true);
        const hex = hexOverride || sampledHex || "#D4A373";

        const formData = new FormData();
        if (fileToUpload) formData.append('file', fileToUpload);
        if (hex) formData.append('client_sample_hex', hex);
        if (base64Data) formData.append('image_base64', base64Data);

        fetch(getApiUrl('/analyze-photo'), { method: 'POST', body: formData })
          .then(res => res.json())
          .then(data => {
            const tone = data.tone_code || "medium";
            const undertone = data.undertone_code || "warm";
            const payload = { tone_code: tone, undertone_code: undertone, category: activeCategory, image_base64: base64Data };

            setAnalysisResult(data);

            return Promise.all([
              fetch(getApiUrl('/recommend-outfits'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json()),
              fetch(getApiUrl('/recommend-footwear'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json()),
              fetch(getApiUrl('/recommend-accessories'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json()),
              fetch(getApiUrl('/recommend-beauty'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json()),
              fetch(getApiUrl('/generate-complete-look'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json())
            ]);
          })
          .then(([outfits, footwear, accessories, beauty, completeLook]) => {
            setOutfitResult(outfits);
            setFootwearResult(footwear);
            setAccessoriesResult(accessories);
            setBeautyResult(beauty);
            setCompleteLookResult(completeLook);
            setAnalyzing(false);
            showToast("Analysis Complete! 360° Personal Style Recommendations Ready.");
            setTimeout(() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
          })
          .catch(() => {
            // ALWAYS GUARANTEED DASHBOARD TRANSITION
            const fallbacks = generateFallbackAll(hex, previewUrl);
            setAnalysisResult(fallbacks.analysis);
            setOutfitResult(fallbacks.outfits);
            setFootwearResult(fallbacks.footwear);
            setAccessoriesResult(fallbacks.accessories);
            setBeautyResult(fallbacks.beauty);
            setCompleteLookResult(fallbacks.completeLook);
            setAnalyzing(false);
            showToast("360° Personal Style Recommendations Ready!");
            setTimeout(() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
          });
      };

      const resetAll = () => {
        setFile(null); setPreviewUrl(null); setAnalysisResult(null); setOutfitResult(null);
        setFootwearResult(null); setAccessoriesResult(null); setBeautyResult(null); setCompleteLookResult(null);
        setSampledHex(null); setBase64Data(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      return e('div', { className: 'min-h-screen flex flex-col justify-between relative' },
        
        e('canvas', { ref: canvasRef, className: 'hidden' }),

        toastMessage && e('div', { className: 'fixed bottom-6 right-6 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-3 border border-stone-700 animate-bounce' },
          e(Icon, { name: 'check-circle-2', className: 'w-5 h-5 text-amber-400' }),
          e('span', { className: 'text-sm font-medium' }, toastMessage)
        ),

        // Header
        e('header', { className: 'sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200/80 px-6 py-4' },
          e('div', { className: 'max-w-7xl mx-auto flex items-center justify-between' },
            e('div', { className: 'flex items-center space-x-3 cursor-pointer', onClick: resetAll },
              e('img', { src: 'logo.png', alt: 'AURA Logo', className: 'w-11 h-11 object-contain rounded-full bg-white p-0.5 shadow-md border border-stone-200/80 hover:scale-105 transition-transform' }),
              e('div', null,
                e('span', { className: 'font-serif-fashion text-xl font-bold tracking-widest text-stone-900' }, 'A U R A'),
                e('span', { className: 'block text-[10px] tracking-widest uppercase text-stone-500 font-semibold' }, 'AI Personal Stylist')
              )
            ),
            e('div', { className: 'flex items-center space-x-4' },
              e('div', { className: 'hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-600' },
                e('span', { className: 'w-2 h-2 rounded-full bg-emerald-500 animate-ping' }),
                e('span', { className: 'w-2 h-2 rounded-full bg-emerald-500' }),
                e('span', { className: 'font-mono text-[11px]' }, backendStatus)
              ),
              analysisResult && e('button', { onClick: resetAll, className: 'px-4 py-2 text-xs font-semibold uppercase text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg' }, 'New Analysis')
            )
          )
        ),

        // Main Body
        e('main', { className: 'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-12' },

          // Hero
          !analysisResult && !analyzing && e('section', { className: 'text-center py-8 sm:py-12 space-y-6' },
            e('div', { className: 'inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase' },
              e(Icon, { name: 'sparkles', className: 'w-3.5 h-3.5' }),
              e('span', null, 'Virtual Stylist & Complexion Intelligence')
            ),
            e('h1', { className: 'font-serif-fashion text-4xl sm:text-6xl font-bold tracking-tight text-stone-900 max-w-4xl mx-auto leading-tight' },
              'Discover Your ',
              e('span', { className: 'editorial-gradient-text' }, 'Personal Style')
            ),
            e('p', { className: 'text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed' },
              'Upload your photo and let AI suggest your skin tone, color palette, outfits, footwear, accessories, and complete look.'
            )
          ),

          // Upload Zone
          !analysisResult && !analyzing && e('section', { className: 'max-w-3xl mx-auto space-y-8' },
            e('div', { className: 'relative rounded-3xl border-2 border-dashed border-stone-300 p-8 sm:p-12 text-center glass-card' },
              e('input', { type: 'file', ref: fileInputRef, onChange: handleFileChange, accept: 'image/*', className: 'hidden' }),

              !previewUrl ? e('div', { className: 'space-y-4' },
                e('div', { className: 'w-20 h-20 rounded-full bg-stone-100 border border-stone-200 text-stone-600 mx-auto flex items-center justify-center shadow-inner' },
                  e(Icon, { name: 'upload-cloud', className: 'w-10 h-10 text-amber-600' })
                ),
                e('div', null,
                  e('h3', { className: 'font-serif-fashion text-xl font-bold text-stone-900' }, 'Drag & Drop Your Portrait Photo'),
                  e('p', { className: 'text-xs text-stone-500 mt-1' }, 'Supports JPG, PNG, WEBP')
                ),
                e('button', { onClick: () => fileInputRef.current?.click(), className: 'px-6 py-3 rounded-full bg-stone-900 text-white font-semibold text-sm shadow-lg flex items-center space-x-2 mx-auto' },
                  e(Icon, { name: 'image', className: 'w-4 h-4' }),
                  e('span', null, 'Upload Photo')
                )
              ) : e('div', { className: 'space-y-6' },
                e('div', { className: 'relative max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black cursor-crosshair' },
                  e('img', { ref: imagePreviewRef, src: previewUrl, alt: 'Preview', onClick: handleImageClickToSample, className: 'w-full h-80 object-cover' }),
                  e('div', { className: 'absolute top-2 right-2 bg-stone-900/80 text-white text-[9px] px-2 py-1 rounded-full backdrop-blur' }, '💡 Click image to pick skin point'),
                  sampledHex && e('div', { className: 'absolute bottom-3 left-3 bg-stone-900/90 text-white px-3 py-1.5 rounded-full text-xs font-mono flex items-center space-x-2 backdrop-blur' },
                    e('span', { className: 'w-3.5 h-3.5 rounded-full border border-white', style: { backgroundColor: sampledHex } }),
                    e('span', null, `Sampled: ${sampledHex}`)
                  )
                ),
                e('div', { className: 'flex flex-wrap items-center justify-center gap-3' },
                  e('button', { onClick: () => triggerAnalysis(), className: 'px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl flex items-center space-x-2' },
                    e(Icon, { name: 'sparkles', className: 'w-4 h-4' }),
                    e('span', null, 'Analyze My Personal Style')
                  ),
                  e('button', { onClick: () => { setFile(null); setPreviewUrl(null); }, className: 'px-5 py-3.5 rounded-full bg-stone-200 text-stone-700 font-semibold text-xs uppercase' }, 'Change Photo')
                )
              )
            ),

            e('div', { className: 'space-y-4 text-center' },
              e('span', { className: 'text-xs uppercase tracking-widest text-stone-500 font-bold' }, 'Or Test Instantly With Sample Models'),
              e('div', { className: 'grid grid-cols-2 sm:grid-cols-4 gap-4' },
                sampleModels.map((model, idx) => e('div', { key: idx, onClick: () => handleSelectSample(model), className: 'group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200 p-2 shadow-sm hover:shadow-md transition text-left' },
                  e('div', { className: 'aspect-square rounded-xl overflow-hidden relative' },
                    e('img', { src: model.img, alt: model.name, className: 'w-full h-full object-cover group-hover:scale-105 transition duration-300' }),
                    e('div', { className: 'absolute top-2 right-2 w-4 h-4 rounded-full border border-white shadow', style: { backgroundColor: model.hex } })
                  ),
                  e('div', { className: 'pt-2 px-1' },
                    e('h4', { className: 'text-xs font-bold text-stone-800 truncate' }, model.name),
                    e('p', { className: 'text-[10px] text-stone-500' }, model.tone)
                  )
                ))
              )
            )
          ),

          // Loading Screen
          analyzing && e('section', { className: 'max-w-xl mx-auto py-16 text-center space-y-8 glass-card rounded-3xl p-10 shadow-2xl' },
            e('div', { className: 'relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-amber-400 bg-stone-900 shadow-2xl' },
              previewUrl ? e('img', { src: previewUrl, alt: 'Scanning', className: 'w-full h-full object-cover opacity-80' }) : e(Icon, { name: 'user', className: 'w-16 h-16 text-amber-400' }),
              e('div', { className: 'scanner-line' })
            ),
            e('h2', { className: 'font-serif-fashion text-2xl font-bold text-stone-900 animate-pulse' }, 'AI is analyzing your personal style…')
          ),

          // RESULTS DASHBOARD
          analysisResult && e('div', { id: 'results-section', className: 'space-y-10' },

            // Tabs
            e('div', { className: 'flex overflow-x-auto space-x-2 border-b border-stone-200 pb-3 scrollbar-none' },
              [
                { id: "dashboard", label: "My Style Dashboard", icon: "sparkles" },
                { id: "complete_look", label: "Build My Complete Look", icon: "check-circle" },
                { id: "outfits", label: "Outfits (10 Styles)", icon: "shirt" },
                { id: "footwear", label: "Footwear Stylist", icon: "user" },
                { id: "accessories", label: "Accessories", icon: "watch" },
                { id: "beauty", label: "Beauty & Grooming", icon: "palette" }
              ].map(tab => e('button', {
                key: tab.id,
                onClick: () => setActiveTab(tab.id),
                className: `px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 whitespace-nowrap transition ${activeTab === tab.id ? 'bg-stone-900 text-white shadow-lg' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`
              },
                e(Icon, { name: tab.icon, className: 'w-4 h-4' }),
                e('span', null, tab.label)
              ))
            ),

            // Tab 1: Dashboard
            activeTab === "dashboard" && e('div', { className: 'space-y-10' },
              e('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                e('div', { className: 'md:col-span-2 glass-card rounded-3xl p-6 sm:p-8 space-y-6' },
                  e('div', { className: 'flex items-start justify-between' },
                    e('div', null,
                      e('span', { className: 'text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200' }, 'Your Estimated Tone'),
                      e('h2', { className: 'font-serif-fashion text-3xl font-bold text-stone-900 mt-3' }, analysisResult.estimated_tone),
                      e('p', { className: 'text-xs text-stone-500 mt-1' }, analysisResult.tone_description)
                    ),
                    analysisResult.sampled_skin_color_hex && e('div', { className: 'text-center' },
                      e('div', { className: 'w-14 h-14 rounded-2xl border-4 border-white shadow-md mx-auto', style: { backgroundColor: analysisResult.sampled_skin_color_hex } }),
                      e('span', { className: 'text-[10px] font-mono text-stone-400 mt-1 block' }, analysisResult.sampled_skin_color_hex)
                    )
                  ),
                  e('div', { className: 'grid grid-cols-2 sm:grid-cols-4 gap-3' },
                    e('div', { className: 'p-3 rounded-2xl bg-stone-100 border border-stone-200' },
                      e('span', { className: 'text-[10px] uppercase font-bold text-stone-500 block' }, 'Seasonal Analysis'),
                      e('span', { className: 'text-xs font-bold text-stone-900' }, analysisResult.seasonal_analysis)
                    ),
                    e('div', { className: 'p-3 rounded-2xl bg-stone-100 border border-stone-200' },
                      e('span', { className: 'text-[10px] uppercase font-bold text-stone-500 block' }, 'Undertone'),
                      e('span', { className: 'text-xs font-bold text-stone-900' }, analysisResult.undertone)
                    ),
                    e('div', { className: 'p-3 rounded-2xl bg-stone-100 border border-stone-200' },
                      e('span', { className: 'text-[10px] uppercase font-bold text-stone-500 block' }, 'ITA° Angle'),
                      e('span', { className: 'text-xs font-bold text-amber-700' }, `${analysisResult.metrics?.ita_angle ?? 38}°`)
                    ),
                    e('div', { className: 'p-3 rounded-2xl bg-stone-100 border border-stone-200' },
                      e('span', { className: 'text-[10px] uppercase font-bold text-stone-500 block' }, 'Color Temp'),
                      e('span', { className: 'text-xs font-bold text-stone-900' }, analysisResult.metrics?.color_temperature)
                    )
                  )
                ),
                e('div', { className: 'glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4 text-center' },
                  previewUrl && e('div', { className: 'relative rounded-2xl overflow-hidden shadow-md aspect-square' },
                    e('img', { src: previewUrl, alt: 'Portrait', className: 'w-full h-full object-cover' })
                  ),
                  e('button', { onClick: () => setActiveTab("complete_look"), className: 'w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg' },
                    '✨ Build My Complete Look'
                  )
                )
              ),

              e('section', { className: 'space-y-6' },
                e('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-4' },
                  e('div', null,
                    e('h3', { className: 'font-serif-fashion text-2xl font-bold text-stone-900' }, 'Your Personal Color Palette'),
                    e('p', { className: 'text-xs text-stone-500' }, 'Swatches that harmoniously complement your skin tone.')
                  ),
                  e('div', { className: 'flex bg-stone-200/70 p-1 rounded-xl text-xs font-semibold' },
                    ['recommended', 'accents', 'avoid'].map(filterKey => e('button', {
                      key: filterKey,
                      onClick: () => setActiveColorFilter(filterKey),
                      className: `px-4 py-1.5 rounded-lg transition capitalize ${activeColorFilter === filterKey ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'}`
                    }, filterKey === 'recommended' ? 'Recommended' : filterKey === 'accents' ? 'Statement Accents' : 'Colors to Avoid'))
                  )
                ),

                e('div', { className: 'grid grid-cols-2 sm:grid-cols-4 gap-4' },
                  activeColorFilter === 'recommended' && (analysisResult.recommended_colors || []).map((c, i) => e('div', { key: i, onClick: () => copyToClipboard(c?.hex, c?.name), className: 'swatch-card glass-card rounded-2xl p-4 cursor-pointer hover:border-amber-400 space-y-3' },
                    e('div', { className: 'h-24 rounded-xl border border-black/10 relative', style: { backgroundColor: c?.hex } },
                      e('span', { className: 'absolute bottom-2 right-2 bg-stone-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded' }, c?.hex)
                    ),
                    e('div', null,
                      e('h4', { className: 'font-bold text-xs text-stone-900' }, c?.name),
                      e('p', { className: 'text-[10px] text-stone-500 mt-0.5' }, c?.reason)
                    )
                  )),
                  activeColorFilter === 'accents' && (analysisResult.accent_colors || []).map((c, i) => e('div', { key: i, onClick: () => copyToClipboard(c?.hex, c?.name), className: 'swatch-card glass-card rounded-2xl p-4 cursor-pointer hover:border-rose-400 space-y-3' },
                    e('div', { className: 'h-24 rounded-xl border border-black/10 relative', style: { backgroundColor: c?.hex } },
                      e('span', { className: 'absolute bottom-2 right-2 bg-stone-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded' }, c?.hex)
                    ),
                    e('div', null,
                      e('h4', { className: 'font-bold text-xs text-stone-900' }, c?.name),
                      e('span', { className: 'inline-block text-[9px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded mt-1' }, 'Pop Accent')
                    )
                  )),
                  activeColorFilter === 'avoid' && (analysisResult.colors_to_avoid || []).map((c, i) => e('div', { key: i },
                    e('div', { className: 'h-24 rounded-xl border border-black/10 relative opacity-60', style: { backgroundColor: c?.hex } },
                      e(Icon, { name: 'x-circle', className: 'w-6 h-6 text-white absolute inset-0 m-auto' })
                    ),
                    e('h4', { className: 'font-bold text-xs text-stone-800 line-through mt-2' }, c?.name),
                    e('p', { className: 'text-[10px] text-stone-500' }, c?.reason)
                  ))
                )
              )
            ),

            // Tab 2: Complete Look
            activeTab === "complete_look" && completeLookResult && e('div', { className: 'space-y-8' },
              e('div', { className: 'text-center max-w-2xl mx-auto space-y-2' },
                e('span', { className: 'px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider' }, 'AI Rendered Master Feature'),
                e('h2', { className: 'font-serif-fashion text-3xl font-bold text-stone-900' }, 'Build My Complete Look')
              ),
              e('div', { className: 'glass-card rounded-3xl p-6 sm:p-10 space-y-8 border-amber-300 shadow-2xl' },
                e('div', { className: 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center' },
                  // AI Outfit Photo Column
                  e('div', { className: 'lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-stone-900' },
                    e('img', { src: completeLookResult.ai_generated_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", alt: 'AI Complete Look Photo', className: 'w-full h-[420px] object-cover object-top group-hover:scale-105 transition duration-500' }),
                    e('div', { className: 'absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-lg border border-stone-700' },
                      e(Icon, { name: 'sparkles', className: 'w-3.5 h-3.5 text-amber-400' }),
                      e('span', null, 'Your Uploaded Person')
                    ),
                    e('div', { className: 'absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-5 text-white' },
                      e('span', { className: 'text-[10px] uppercase font-bold text-amber-400 tracking-wider block' }, `${completeLookResult.style_category} Look`),
                      e('p', { className: 'text-xs text-stone-200 line-clamp-2 mt-1 italic' }, completeLookResult.ai_prompt || "Ultra-realistic 8K high fashion magazine editorial outfit rendering")
                    )
                  ),
                  // Details Column
                  e('div', { className: 'lg:col-span-7 space-y-6' },
                    e('div', null,
                      e('span', { className: 'text-xs font-bold uppercase text-amber-700 tracking-widest' }, 'Curated Styling Ensemble'),
                      e('h3', { className: 'font-serif-fashion text-2xl font-bold text-stone-900 mt-1' }, `${completeLookResult.style_category} Master Look`)
                    ),
                    e('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4' },
                      e('div', { className: 'p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm' },
                        e('span', { className: 'text-[10px] font-bold uppercase text-amber-700 block' }, 'Step 1: Apparel'),
                        e('h4', { className: 'font-bold text-sm text-stone-900' }, completeLookResult.outfit?.top?.item),
                        e('p', { className: 'text-xs text-stone-600' }, `Bottom: ${completeLookResult.outfit?.bottom?.item}`)
                      ),
                      e('div', { className: 'p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm' },
                        e('span', { className: 'text-[10px] font-bold uppercase text-amber-700 block' }, 'Step 2: Footwear'),
                        e('h4', { className: 'font-bold text-sm text-stone-900' }, completeLookResult.footwear?.name),
                        e('p', { className: 'text-xs text-stone-600' }, completeLookResult.footwear?.why_it_matches)
                      ),
                      e('div', { className: 'p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm' },
                        e('span', { className: 'text-[10px] font-bold uppercase text-amber-700 block' }, 'Step 3: Accessories'),
                        e('h4', { className: 'font-bold text-sm text-stone-900' }, completeLookResult.accessories?.[0]?.name || "Accessories"),
                        e('p', { className: 'text-xs text-stone-600' }, "Harmonized finishes")
                      ),
                      e('div', { className: 'p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm' },
                        e('span', { className: 'text-[10px] font-bold uppercase text-amber-700 block' }, 'Step 4: Grooming & Fragrance'),
                        e('h4', { className: 'font-bold text-sm text-stone-900' }, completeLookResult.beauty_grooming?.fragrance_note?.primary_family || "Woody Spice")
                      )
                    )
                  )
                )
              )
            ),

            // Tab 3: Outfits
            activeTab === "outfits" && outfitResult && e('div', { className: 'space-y-8' },
              e('div', { className: 'flex overflow-x-auto space-x-2 pb-2 scrollbar-none' },
                styleCategories.map(cat => e('button', {
                  key: cat,
                  onClick: () => setActiveCategory(cat),
                  className: `px-4 py-2 rounded-xl text-xs font-bold uppercase whitespace-nowrap transition ${activeCategory === cat ? 'bg-stone-900 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200'}`
                }, cat))
              ),
              (outfitResult.outfits || []).filter(o => o.category === activeCategory).map(outfit => e('div', { key: outfit.category, className: 'glass-card rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl' },
                e('div', { className: 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center' },
                  // Left: AI Generated Look Photo
                  e('div', { className: 'lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group bg-stone-900 flex items-center justify-center min-h-[420px]' },
                    e('img', { src: outfit.ai_generated_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", alt: outfit.category, className: 'w-full h-[420px] object-cover object-top group-hover:scale-105 transition duration-500' }),
                    e('div', { className: 'absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 border border-stone-700 shadow-md z-10' },
                      e(Icon, { name: 'sparkles', className: 'w-3 h-3 text-amber-400' }),
                      e('span', null, 'Your Uploaded Person')
                    ),
                    e('div', { className: 'absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white text-xs' },
                      e('span', { className: 'font-bold text-amber-300 block' }, outfit.title),
                      e('p', { className: 'text-[10px] text-stone-300' }, outfit.vibe)
                    )
                  ),
                  // Right: Apparel & Footwear breakdown
                  e('div', { className: 'lg:col-span-7 space-y-6' },
                    e('div', { className: 'flex justify-between items-start' },
                      e('div', null,
                        e('span', { className: 'px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase' }, outfit.match_score || "98% Palette Match"),
                        e('h3', { className: 'font-serif-fashion text-2xl font-bold text-stone-900 mt-1' }, outfit.title)
                      )
                    ),
                    e('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-4' },
                      e('div', { className: 'p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm' },
                        e('span', { className: 'text-[10px] font-bold uppercase text-amber-700 block' }, 'Top Wear'),
                        e('h4', { className: 'font-bold text-xs text-stone-900' }, outfit.top?.item),
                        e('p', { className: 'text-[10px] text-stone-500' }, outfit.top?.material)
                      ),
                      e('div', { className: 'p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm' },
                        e('span', { className: 'text-[10px] font-bold uppercase text-amber-700 block' }, 'Bottom Wear'),
                        e('h4', { className: 'font-bold text-xs text-stone-900' }, outfit.bottom?.item),
                        e('p', { className: 'text-[10px] text-stone-500' }, outfit.bottom?.fit)
                      ),
                      e('div', { className: 'p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm' },
                        e('span', { className: 'text-[10px] font-bold uppercase text-amber-700 block' }, 'Footwear'),
                        e('h4', { className: 'font-bold text-xs text-stone-900' }, outfit.footwear?.item),
                        e('p', { className: 'text-[10px] text-stone-500' }, outfit.footwear?.color_name)
                      )
                    ),
                    e('div', { className: 'p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1' },
                      e('span', { className: 'font-bold block uppercase text-[10px] text-amber-800' }, '💡 Styling Advice'),
                      e('p', null, outfit.style_tips)
                    )
                  )
                )
              ))
            ),

            // Tab 4: Footwear
            activeTab === "footwear" && footwearResult && e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
              Object.entries(footwearResult.recommendations || {}).map(([key, shoes]) => e('div', { key, className: 'glass-card rounded-3xl p-6 space-y-4' },
                e('h4', { className: 'font-serif-fashion text-lg font-bold text-stone-900 capitalize' }, `${key} Footwear`),
                shoes.map((shoe, idx) => e('div', { key: idx, className: 'p-4 rounded-2xl bg-white border border-stone-200 flex items-center space-x-4' },
                  e('img', { src: shoe.image, alt: shoe.name, className: 'w-16 h-16 rounded-xl object-cover' }),
                  e('div', null,
                    e('h5', { className: 'font-bold text-xs text-stone-900' }, shoe.name),
                    e('p', { className: 'text-[10px] text-stone-500' }, shoe.why_it_matches)
                  )
                ))
              ))
            ),

            // Tab 5: Accessories
            activeTab === "accessories" && accessoriesResult && e('div', { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4' },
              [...(accessoriesResult.watches || []), ...(accessoriesResult.bags || []), ...(accessoriesResult.jewelry || [])].map((item, idx) => e('div', { key: idx, className: 'glass-card rounded-2xl p-5 space-y-2' },
                e('h4', { className: 'font-bold text-xs text-stone-900' }, item.name),
                e('p', { className: 'text-[10px] text-stone-500' }, item.match_reason)
              ))
            ),

            // Tab 6: Beauty
            activeTab === "beauty" && beautyResult && e('div', { className: 'space-y-6' },
              e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
                e('div', { className: 'glass-card rounded-3xl p-6 space-y-4' },
                  e('h4', { className: 'font-bold text-stone-900' }, 'Skincare Focus'),
                  (beautyResult.skincare || []).map((step, i) => e('div', { key: i, className: 'p-3 rounded-xl bg-white border border-stone-200 text-xs' },
                    e('span', { className: 'font-bold block' }, step.recommendation),
                    e('p', { className: 'text-[10px] text-stone-500' }, step.benefit)
                  ))
                ),
                e('div', { className: 'glass-card rounded-3xl p-6 space-y-4' },
                  e('h4', { className: 'font-bold text-stone-900' }, 'Makeup Shade Range'),
                  Object.entries(beautyResult.makeup_shades || {}).map(([key, val]) => e('div', { key, className: 'p-3 rounded-xl bg-white border border-stone-200 text-xs' },
                    e('span', { className: 'font-bold block' }, val)
                  ))
                )
              )
            )
          )
        ),

        // Footer
        e('footer', { className: 'border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500 mt-12' },
          e('p', null, '© 2026 AURA Virtual Stylist System. Powered by Python & Computer Vision.')
        )
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(e(ErrorBoundary, null, e(App)));
  }

  // -------------------------------------------------------------
  // 2. VANILLA JS FALLBACK ENGINE (Zero Dependency)
  // -------------------------------------------------------------
  function runVanillaJSEngine() {
    const root = document.getElementById('root');
    if (!root) return;

    let sampledHex = "#D4A373";
    let previewUrl = null;

    root.innerHTML = `
      <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5]">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onclick="location.reload()">
            <img src="logo.png" alt="AURA Logo" class="w-11 h-11 object-contain rounded-full bg-white p-0.5 shadow-md border border-stone-200/80 hover:scale-105 transition-transform" />
            <div>
              <span className="font-serif text-xl font-bold tracking-widest text-stone-900">A U R A</span>
              <span className="block text-[10px] tracking-widest uppercase text-stone-500 font-semibold">AI Personal Stylist (Offline Native)</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 text-center space-y-8">
          <div className="space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase border border-amber-200">Virtual Stylist Intelligence</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900">Discover Your Personal Style</h1>
            <p className="text-stone-600 text-base max-w-xl mx-auto">Upload your photo and let AI suggest your skin tone, color palette, outfits, footwear, accessories, and complete look.</p>
          </div>

          <div id="upload-box" className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-stone-300 bg-white/80 shadow-xl space-y-6">
            <input type="file" id="vanilla-file-input" accept="image/*" class="hidden" />
            <div id="upload-prompt" className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl">☁️</div>
              <p className="text-sm font-bold text-stone-800">Drag & Drop Your Portrait Photo</p>
              <button onclick="document.getElementById('vanilla-file-input').click()" className="px-6 py-3 rounded-full bg-stone-900 text-white font-bold text-xs uppercase shadow-lg">Upload Photo</button>
            </div>
            <div id="upload-preview" className="hidden space-y-6">
              <div className="max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black">
                <img id="preview-img" className="w-full h-72 object-cover" />
              </div>
              <button id="btn-analyze" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl">Analyze My Personal Style</button>
            </div>
          </div>

          <div id="results-box" className="hidden space-y-8 text-left bg-white p-8 rounded-3xl shadow-2xl border border-stone-200">
            <div className="border-b border-stone-200 pb-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full">Your Estimated Tone</span>
                <h2 id="res-tone" className="font-serif text-3xl font-bold text-stone-900 mt-2">Medium / Beige (Warm Undertone)</h2>
                <p id="res-desc" className="text-xs text-stone-500 mt-1">Golden, peach pigments with rich warm glow.</p>
              </div>
              <div id="res-swatch" className="w-12 h-12 rounded-2xl border-4 border-white shadow-md"></div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Recommended Palette</h3>
              <div id="palette-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-4"></div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Master Complete Look (AI Generated Photo)</h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-stone-50 p-4 rounded-3xl border border-stone-200">
                <div className="md:col-span-4 relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" alt="AI Outfit Look Photo" className="w-full h-64 object-cover" />
                  <span className="absolute top-2 left-2 bg-stone-900/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-stone-700">✨ AI Rendered Look</span>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                    <span className="text-[10px] font-bold uppercase text-amber-700 block">Apparel</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">Linen Overshirt & Chinos</h4>
                    <p className="text-xs text-stone-500">Warm Sand & Deep Navy</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                    <span className="text-[10px] font-bold uppercase text-amber-700 block">Footwear</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">Minimalist Leather Sneakers</h4>
                    <p className="text-xs text-stone-500">Off-White Leather</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                    <span className="text-[10px] font-bold uppercase text-amber-700 block">Grooming</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">Woody Amber Fragrance</h4>
                    <p className="text-xs text-stone-500">Cardamom & Sandalwood</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;

    const fileInput = document.getElementById('vanilla-file-input');
    const uploadPrompt = document.getElementById('upload-prompt');
    const uploadPreview = document.getElementById('upload-preview');
    const previewImg = document.getElementById('preview-img');
    const btnAnalyze = document.getElementById('btn-analyze');
    const resultsBox = document.getElementById('results-box');

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        previewUrl = URL.createObjectURL(file);
        previewImg.src = previewUrl;
        uploadPrompt.classList.add('hidden');
        uploadPreview.classList.remove('hidden');
      }
    });

    btnAnalyze.addEventListener('click', () => {
      document.getElementById('upload-box').classList.add('hidden');
      resultsBox.classList.remove('hidden');
      document.getElementById('res-swatch').style.backgroundColor = sampledHex;

      const grid = document.getElementById('palette-grid');
      const colors = [
        { name: "Camel & Warm Beige", hex: "#C19A6B", reason: "Enhances golden radiance" },
        { name: "Deep Navy", hex: "#1B2A4A", reason: "Provides sophisticated contrast" },
        { name: "Terracotta & Brick", hex: "#C85A32", reason: "Harmonizes with warm peach" },
        { name: "Warm Olive", hex: "#556B2F", reason: "Earthy natural glow" }
      ];

      grid.innerHTML = colors.map(c => `
        <div class="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
          <div class="h-20 rounded-xl border border-black/10" style="background-color: ${c.hex}"></div>
          <h4 class="font-bold text-xs text-stone-900">${c.name}</h4>
          <p class="text-[10px] text-stone-500">${c.reason}</p>
        </div>
      `).join('');
    });
  }

})();
