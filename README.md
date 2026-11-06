# AgriMind AI — Intelligent Farming Platform

> **Grow Smarter. Farm Better.**  
> *Your farm, powered by intelligent technology.*

---

## 1. Project Overview

**AgriMind AI** is a complete, responsive, agricultural technology platform designed for Indian farmers. The platform brings together scientific agronomic decision tools, leaf disease diagnostic workflows, guided crop planning, soil health intelligence, weather-driven irrigation scheduling, mandi market price insights, farm economics budgeting, and practical agronomic knowledge in one place.

Built with a cinematic, modern dark-forest and lime green design system, AgriMind AI delivers rapid performance across smartphones, tablets, and desktop computers without requiring build tools or mandatory backend servers.

---

## 2. Key Capabilities & Features

1. **AI Crop Doctor (`crop-doctor.html`):**
   - Drag-and-drop crop leaf image upload with validation (JPG, PNG, WEBP up to 5 MB).
   - Scanning laser visualizer with step-by-step diagnostic inspection status.
   - Sample leaf photos for 1-click test runs across Paddy, Tomato, Cotton, and Wheat.
   - Comprehensive condition reports detailing common symptoms, cultural & biological preventive measures, safe next steps, and guidance on when to consult local Krishi Vigyan Kendra (KVK) extension officers.
   - Printable diagnostic report with clean `@media print` styling.
   - Honest prototype disclaimer regarding illustrative demo status.

2. **Smart Crop Planner (`crop-planner.html`):**
   - Guided multi-parameter input: State/Region, District, Season (Kharif, Rabi, Zaid), Soil Type, Land Area (Acres/Hectares), Irrigation Availability, Water Availability, and Category Preference.
   - Transparent rule-based agronomic recommendation engine matching climate and soil attributes.
   - Detailed recommendation cards displaying botanical name, duration, water requirement badge, expected yield, investment level, and factors to verify before sowing.
   - Side-by-side **Compare Crops Modal** comparing duration, water requirements, investment, and market demand.

3. **Soil Intelligence Dashboard (`soil-intelligence.html`):**
   - Live interactive semi-circular SVG soil pH gauge with dynamic needle animation.
   - Horizontal progress bars for Available Nitrogen (N), Phosphorus (P), and Potassium (K) with Low, Sufficient, and Surplus thresholds.
   - Soil moisture meter and organic matter fertility assessment.
   - Instant regional presets: Indo-Gangetic Alluvial, Deccan Black Cotton, South Red Sandy Loam, and Alkaline/Sodic soil.
   - Dynamic crop compatibility matrix highlighting suitability across 8 major Indian crops.
   - Scientifically grounded soil reclamation advice (gypsum for alkaline soils, lime for acidic soils, green manuring).

4. **Weather & Irrigation (`weather-irrigation.html`):**
   - Regional selector across major Indian agricultural belts (Ludhiana, Guntur, Nashik, Coimbatore, Varanasi, Indore).
   - Real-time weather demo card (temperature, relative humidity, wind speed/direction, rainfall probability, solar UV index, dew point).
   - 5-day agro-meteorological forecast cards with custom SVG weather icons and temperature trend bars.
   - Smart irrigation planner factoring in crop growth stage, soil texture, recent rainfall credit (mm), and irrigation method (drip, sprinkler, flood) to compute custom watering intervals.

5. **Mandi Market Insights (`mandi-market.html`):**
   - Searchable, sortable, and filterable price table for major Indian commodities across APMCs and state mandis.
   - Summary statistics cards: Average modal price, highest listing, lowest listing, and weekly market velocity.
   - Potential Revenue Estimator calculating gross value and net farmgate realization after deducting haulage and loading fees.

6. **Farm Profit Calculator (`profit-calculator.html`):**
   - Comprehensive agricultural economics calculator supporting Acres and Hectares.
   - Real-time reactivity computing total yield, gross revenue, itemized operational expenses (seeds, fertilizer, crop protection, labor, irrigation, tractor/transport, miscellaneous), net profit/loss, profit margin %, return on investment (ROI %), and break-even selling price per quintal.
   - Stacked visual cost breakdown bar with percentage distribution and colored legend.
   - Quick one-click scenarios: 1 Acre Tomato, 5 Acres Wheat, 2 Acres Cotton.
   - Print estimate feature.

7. **Smart Farming Calendar (`farming-calendar.html`):**
   - Crop-specific agronomic roadmap generator based on standard Indian package of practices across 7 major crops (Rice, Wheat, Tomato, Cotton, Maize, Groundnut, Sugarcane).
   - Calculates task dates relative to planting/sowing date covering 10 categories: Land preparation, Seed selection & sowing, Germination monitoring, Irrigation, Nutrient management, Weed control, Pest & disease scouting, Growth monitoring, Harvest preparation, and Harvesting.
   - Monthly interactive calendar view with Sun–Sat grid, previous/next month navigation, "Today" indicator, and clickable task pills.
   - List/Timeline view sorting tasks chronologically with day offsets (e.g. Day +18) and category badges.
   - Task CRUD: Mark as completed/undo, add custom farming task, edit task details, quick postpone (+3 days, +7 days, or custom date), and delete task.
   - Real-time progress bar showing percentage completion, upcoming tasks (14 days), and overdue task warning indicators.
   - Full localStorage persistence (`agrimind_crop_plans`) and print styling (`window.print()`).

8. **Smart Irrigation Reminders (`irrigation-reminders.html`):**
   - Dedicated watering reminder scheduler with crop name, farm/field name, date, time, repeat frequencies (Daily, Every 2 days, Every 3 days, Every 5 days, Weekly, Custom), and irrigation method.
   - Auto-recurrence logic: marking a recurring watering completed automatically schedules the next session date while archiving completed sessions into an irrigation history log.
   - Priority dashboard tabs: Due Today, Upcoming, Overdue, and Completed History.
   - Browser notifications with explicit user opt-in (`Notification.requestPermission()`) and automatic in-app audible/visual toast fallback alerts running every 25 seconds.
   - Educational Smart Irrigation Guidance Panel: ICAR & FAO-56 rule-based calculator factoring crop type, soil texture, growth stage, and rainfall to estimate optimal watering intervals and symptoms of moisture stress vs overwatering.
   - Full localStorage persistence (`agrimind_irrigation_reminders`).

9. **Farming Knowledge Hub & Article Pages (`knowledge-hub.html`, `article.html`):**
   - Searchable, category-filtered knowledge library covering Irrigation, Crop Cultivation, Soil Health, Pest Prevention, Organic Farming, and Farm Business Basics.
   - Dynamic article detail reader rendering full rich guides with Table of Contents, takeaways callouts, and related article recommendations.

10. **Regional Multilingual Engine (`js/translations.js`):**
   - Instant 1-click language switching between **English**, **Telugu (తెలుగు)**, **Tamil (தமிழ்)**, and **Hindi (हिन्दी)**.
   - Stores language choice in `localStorage` so selection persists seamlessly across pages.

11. **About, Contact & Privacy (`about.html`, `contact.html`, `privacy.html`, `404.html`):**
   - Ethical AI statements, official Kisan Call Centre helplines (1800-180-1551), accessible form validation, and transparent privacy policies.

---

## 3. Technology Stack

- **Markup:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Styling:** Modern modular CSS3 with CSS Custom Properties, Flexbox, CSS Grid, clamp() responsive typography, and glassmorphism.
- **Scripting:** Vanilla ES6+ JavaScript (zero external runtime dependencies, zero build steps).
- **Typography:** Google Fonts pairing — *Manrope* for editorial headlines and *Inter* for body text.
- **Icons:** Lightweight inline SVG icons.

---

## 4. Project Folder Structure

```text
agrimind/
├── index.html                  # Homepage (Cinematic Hero, Tools Showcase, Previews)
├── crop-doctor.html            # AI Crop Doctor (Leaf Disease Scanning & Care)
├── crop-planner.html           # Smart Crop Planner (Rule-based Guided Suggestions)
├── soil-intelligence.html      # Soil Health Dashboard (pH Gauge & NPK Balance)
├── weather-irrigation.html     # Weather Forecast & Irrigation Scheduler
├── mandi-market.html           # Mandi Market Prices, Arrivals & Revenue Estimator
├── profit-calculator.html      # Farm Economics & Cost Breakdown Calculator
├── knowledge-hub.html          # Searchable Agricultural Knowledge Library
├── article.html                # Dynamic In-Depth Article Reader & Table of Contents
├── about.html                  # Mission, Architecture, & Ethical AI Statement
├── contact.html                # Contact Form with Accessible Validation & Helplines
├── privacy.html                # Transparent Client-Side Privacy Policy
├── 404.html                    # Custom 404 Error Screen
├── robots.txt                  # Search Engine Crawler Guidance
├── sitemap.xml                 # XML Sitemap for Deployment
├── README.md                   # Comprehensive Documentation & Deployment Guide
├── .gitignore                  # Git Ignore Configuration
├── css/
│   ├── style.css               # Design system, theme variables, resets, utilities
│   ├── components.css          # Navigation, buttons, cards, badges, modals, footer
│   ├── pages.css               # Hero, crop scanner, soil gauge, calculators, tables
│   └── responsive.css          # Breakpoints (320px–1920px) & @media print styles
└── js/
    ├── translations.js         # Multilingual engine (EN, TE, TA, HI) & localStorage
    ├── main.js                 # Global navigation, mobile drawer, scroll reveal, modals
    ├── crop-doctor.js          # Leaf upload, scanning simulation, diagnostic report
    ├── crop-planner.js         # Rule-based crop matching engine & comparison modal
    ├── soil-intelligence.js    # Interactive SVG pH gauge, NPK meters & agronomic rules
    ├── weather-irrigation.js   # 5-day weather simulation & irrigation planner
    ├── mandi-market.js         # Mandi search, filters, sorting & revenue estimator
    ├── profit-calculator.js    # Real-time economics, cost visualizer & presets
    └── knowledge-hub.js        # Article database, live search, categories & renderer
```

---

## 5. How to Run Locally

Because AgriMind AI is built with vanilla web technologies, you do not need to install Node.js or run build commands.

### Method 1: VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Select **File > Open Folder...** and choose the `agrimind` directory.
3. If you haven't already, install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions panel (`Ctrl+Shift+X`).
4. Right-click on `index.html` in the explorer and choose **"Open with Live Server"**.
5. Your default web browser will open at `http://127.0.0.1:5500/index.html`.

### Method 2: Python Built-In HTTP Server
If you have Python installed on your machine:
```bash
# Navigate to the project directory
cd c:\Users\V AKASH\Downloads\agrimind

# Start a local static server
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Method 3: Direct File Opening
You can double-click `index.html` directly to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari. (Note: Using an HTTP server like Method 1 or 2 is recommended for optimal URL query parameter support on `article.html`).

---

## 6. How to Deploy to GitHub

To upload this project to GitHub:

### Step 1: Initialize Git and Commit
Open PowerShell or your terminal in the `agrimind` folder:
```bash
git init
git add .
git commit -m "Initial AgriMind AI website"
git branch -M main
```

### Step 2: Connect to Your GitHub Repository
1. Go to [github.com/new](https://github.com/new) and create a new repository named `agrimind-ai` (choose **Public**).
2. Do not check "Add a README" or ".gitignore" as they are already included locally.
3. Link the remote and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/agrimind-ai.git
git push -u origin main
```
*(If the remote already exists, you can update it with `git remote set-url origin YOUR_URL`).*

---

## 7. How to Deploy to Vercel

AgriMind AI is ready for instant 1-click static deployment on Vercel:

1. Visit [vercel.com](https://vercel.com) and sign in (using GitHub).
2. Click **"Add New..." > "Project"**.
3. Import your `agrimind-ai` repository from GitHub.
4. In the **Configure Project** screen:
   - **Framework Preset:** Leave as **"Other"**.
   - **Root Directory:** `./` (default).
   - **Build Command:** Leave empty (no build step needed).
   - **Output Directory:** Leave empty (root directory serves static files).
5. Click **"Deploy"**.
6. Within seconds, Vercel will generate your live production URL (e.g. `https://agrimind-ai.vercel.app`).
7. Open the live URL on your computer and phone to test all pages, calculators, language switches, and diagnostic tools.

### Updating the Live Site
Whenever you make changes to files:
```bash
git add .
git commit -m "Updated feature"
git push origin main
```
Vercel automatically detects the push and redeploys the latest website within seconds!

---

## 8. Current Prototype Status

AgriMind AI Version 1.0 is a fully functional client-side prototype:
- **Leaf Disease Analysis:** Uses an illustrative dataset of common diseases (Bacterial Blight, Early Blight, Cotton Leaf Curl, Yellow Rust, etc.) with animated visual scanning. It does not yet send pixels to a remote neural network.
- **Weather & Mandi Data:** Utilizes curated sample datasets reflecting typical Indian agricultural conditions rather than live paid API feeds.
- **Client-Side Storage:** User language choices are stored in browser `localStorage`. No personal data or credentials are collected or tracked.

---

## 9. Future AI & Live Data Integration Readiness

The codebase is organized with clear architectural boundaries for easy upgrade:
- `crop-doctor.js`: Contains `startAnalysis()` and `renderDiagnosticReport()`. In production, replace `startAnalysis()` with a `fetch()` call to a secure serverless endpoint (`/api/analyze-leaf`) running a trained TensorFlow/PyTorch model or Gemini Vision API.
- `weather-irrigation.js`: Replace `regionalWeatherDatabase` with live fetch calls to the IMD (India Meteorological Department) API or OpenWeatherMap.
- `mandi-market.js`: Replace `sampleMandiDatabase` with an API integration to the government's official e-NAM / Agmarknet open data portal.
- All secrets and API keys should be stored in Vercel Environment Variables and accessed via serverless functions in `/api/`, never exposed in client JavaScript.

---

## 10. License & Attribution

- **License:** MIT License. Free for educational and agricultural development.
- **Photography:** Courtesy of Unsplash agricultural contributors (editorial crop, farming, and soil photography).
- **Icons:** Feather / Lucide style inline SVGs.

