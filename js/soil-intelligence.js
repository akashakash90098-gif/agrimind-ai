/**
 * AGRIMIND AI — SOIL INTELLIGENCE
 * Interactive Soil Health Dashboard, pH Gauge, NPK Meters & Agronomic Advice
 */

// Soil Presets for Instant Testing
const soilPresets = {
  alluvial: {
    name: "Indo-Gangetic Alluvial Loam",
    ph: 7.2,
    n: 240, // kg/ha
    p: 22,  // kg/ha
    k: 210, // kg/ha
    moisture: 38,
    soilType: "alluvial"
  },
  black: {
    name: "Deccan Vertisol / Black Cotton",
    ph: 7.8,
    n: 180,
    p: 16,
    k: 310,
    moisture: 45,
    soilType: "black"
  },
  red: {
    name: "Southern Red Sandy Loam",
    ph: 6.2,
    n: 160,
    p: 12,
    k: 140,
    moisture: 24,
    soilType: "red"
  },
  alkaline: {
    name: "Degraded Sodic / Alkaline Soil",
    ph: 8.8,
    n: 110,
    p: 8,
    k: 280,
    moisture: 18,
    soilType: "clay-loam"
  }
};

// Crop pH and Nutrient Tolerances for Matrix
const cropSoilTolerance = [
  { name: "Paddy / Rice", minPh: 5.5, maxPh: 7.5, nReq: "high", pReq: "medium", kReq: "medium" },
  { name: "Wheat", minPh: 6.0, maxPh: 7.8, nReq: "high", pReq: "medium", kReq: "medium" },
  { name: "Cotton", minPh: 6.5, maxPh: 8.2, nReq: "high", pReq: "medium", kReq: "high" },
  { name: "Maize", minPh: 5.8, maxPh: 7.5, nReq: "high", pReq: "medium", kReq: "medium" },
  { name: "Tomato", minPh: 6.0, maxPh: 6.8, nReq: "medium", pReq: "high", kReq: "high" },
  { name: "Groundnut", minPh: 5.8, maxPh: 7.2, nReq: "low", pReq: "medium", kReq: "medium" },
  { name: "Mustard", minPh: 6.0, maxPh: 7.5, nReq: "medium", pReq: "medium", kReq: "low" },
  { name: "Sugarcane", minPh: 6.5, maxPh: 8.0, nReq: "high", pReq: "high", kReq: "high" }
];

document.addEventListener('DOMContentLoaded', () => {
  initSoilIntelligence();
});

function initSoilIntelligence() {
  const phSlider = document.getElementById('soilPhSlider');
  const phInput = document.getElementById('soilPhInput');
  const nInput = document.getElementById('soilNInput');
  const pInput = document.getElementById('soilPInput');
  const kInput = document.getElementById('soilKInput');
  const moistureInput = document.getElementById('soilMoistureInput');
  const soilTypeSelect = document.getElementById('soilTypeSelect');

  const needle = document.getElementById('gaugeNeedle');
  const phDisplay = document.getElementById('phValueDisplay');
  const phCategoryPill = document.getElementById('phCategoryPill');

  const nFill = document.getElementById('nBarFill');
  const nVal = document.getElementById('nValText');
  const nStatus = document.getElementById('nStatusPill');

  const pFill = document.getElementById('pBarFill');
  const pVal = document.getElementById('pValText');
  const pStatus = document.getElementById('pStatusPill');

  const kFill = document.getElementById('kBarFill');
  const kVal = document.getElementById('kValText');
  const kStatus = document.getElementById('kStatusPill');

  const moistureFill = document.getElementById('moistureBarFill');
  const moistureVal = document.getElementById('moistureValText');

  const summaryText = document.getElementById('soilSummaryText');
  const improvementList = document.getElementById('soilImprovementList');
  const cropMatrixContainer = document.getElementById('cropMatrixGrid');
  const presetPills = document.querySelectorAll('.soil-preset-btn');

  if (!phSlider || !needle) return;

  // Sync Slider and Number Input for pH
  phSlider.addEventListener('input', () => {
    phInput.value = parseFloat(phSlider.value).toFixed(1);
    updateDashboard();
  });

  phInput.addEventListener('input', () => {
    let val = parseFloat(phInput.value);
    if (isNaN(val)) val = 7.0;
    val = Math.max(4.0, Math.min(10.0, val));
    phSlider.value = val;
    updateDashboard();
  });

  // Listeners for NPK & Moisture
  [nInput, pInput, kInput, moistureInput, soilTypeSelect].forEach(el => {
    if (el) el.addEventListener('input', updateDashboard);
  });

  // Preset Buttons
  presetPills.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.getAttribute('data-preset');
      const preset = soilPresets[presetKey];
      if (preset) {
        phSlider.value = preset.ph;
        phInput.value = preset.ph.toFixed(1);
        nInput.value = preset.n;
        pInput.value = preset.p;
        kInput.value = preset.k;
        moistureInput.value = preset.moisture;
        if (soilTypeSelect) soilTypeSelect.value = preset.soilType;

        presetPills.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        updateDashboard();
        window.showToast(`Loaded ${preset.name} sample readings.`, 'info');
      }
    });
  });

  function updateDashboard() {
    const ph = parseFloat(phInput.value) || 7.0;
    const n = parseFloat(nInput.value) || 0;
    const p = parseFloat(pInput.value) || 0;
    const k = parseFloat(kInput.value) || 0;
    const moisture = parseFloat(moistureInput.value) || 0;
    const soilType = soilTypeSelect ? soilTypeSelect.value : 'alluvial';

    // 1. Update pH Semi-Circular Gauge Needle
    // Range 4.0 (angle -90deg) to 10.0 (angle +90deg) -> Total 180 deg span
    const clampedPh = Math.max(4.0, Math.min(10.0, ph));
    const rotation = ((clampedPh - 4.0) / 6.0) * 180 - 90;
    needle.style.transform = `rotate(${rotation}deg)`;

    phDisplay.textContent = ph.toFixed(1);

    // pH Classification
    let phCategory = "Neutral (Optimal for most crops)";
    let phPillClass = "badge-leaf";

    if (ph < 5.5) {
      phCategory = "Strongly Acidic (Risk of nutrient lockup)";
      phPillClass = "badge-danger";
    } else if (ph < 6.5) {
      phCategory = "Moderately Acidic";
      phPillClass = "badge-warning";
    } else if (ph <= 7.5) {
      phCategory = "Neutral / Optimal Buffer Zone";
      phPillClass = "badge-leaf";
    } else if (ph <= 8.5) {
      phCategory = "Moderately Alkaline";
      phPillClass = "badge-warning";
    } else {
      phCategory = "Strongly Alkaline / Sodic";
      phPillClass = "badge-danger";
    }

    phCategoryPill.textContent = phCategory;
    phCategoryPill.className = `badge ${phPillClass}`;

    // 2. NPK Nutrient Progress Bars & Status
    // Nitrogen: Low (<140), Medium (140-280), High (>280)
    const nPercent = Math.min(100, (n / 350) * 100);
    nFill.style.width = `${nPercent}%`;
    nVal.textContent = `${n} kg/ha`;
    if (n < 140) {
      nStatus.textContent = "Deficient (<140)";
      nStatus.className = "badge badge-danger";
    } else if (n <= 280) {
      nStatus.textContent = "Sufficient (140-280)";
      nStatus.className = "badge badge-leaf";
    } else {
      nStatus.textContent = "Surplus (>280)";
      nStatus.className = "badge badge-warning";
    }

    // Phosphorus: Low (<11), Medium (11-25), High (>25)
    const pPercent = Math.min(100, (p / 40) * 100);
    pFill.style.width = `${pPercent}%`;
    pVal.textContent = `${p} kg/ha`;
    if (p < 11) {
      pStatus.textContent = "Deficient (<11)";
      pStatus.className = "badge badge-danger";
    } else if (p <= 25) {
      pStatus.textContent = "Sufficient (11-25)";
      pStatus.className = "badge badge-leaf";
    } else {
      pStatus.textContent = "Surplus (>25)";
      pStatus.className = "badge badge-warning";
    }

    // Potassium: Low (<120), Medium (120-280), High (>280)
    const kPercent = Math.min(100, (k / 380) * 100);
    kFill.style.width = `${kPercent}%`;
    kVal.textContent = `${k} kg/ha`;
    if (k < 120) {
      kStatus.textContent = "Deficient (<120)";
      kStatus.className = "badge badge-danger";
    } else if (k <= 280) {
      kStatus.textContent = "Sufficient (120-280)";
      kStatus.className = "badge badge-leaf";
    } else {
      kStatus.textContent = "High / Rich (>280)";
      kStatus.className = "badge badge-leaf";
    }

    // Moisture Progress Bar
    if (moistureFill && moistureVal) {
      moistureFill.style.width = `${Math.min(100, moisture)}%`;
      moistureVal.textContent = `${moisture}% (${moisture < 20 ? 'Dry' : moisture <= 50 ? 'Optimal Field Capacity' : 'Waterlogged'})`;
    }

    // 3. Agronomic Interpretation & Improvement Suggestions
    generateAgronomicAdvice(ph, n, p, k, soilType);

    // 4. Update Crop Compatibility Matrix
    updateCropMatrix(ph, n, p, k);
  }

  function generateAgronomicAdvice(ph, n, p, k, soilType) {
    if (!summaryText || !improvementList) return;

    let summary = "";
    const suggestions = [];

    if (ph < 6.0) {
      summary = `The soil demonstrates acidic characteristics (pH ${ph.toFixed(1)}). In acidic soils, phosphorus availability is often reduced due to fixation by iron and aluminum oxides, and beneficial nitrifying microbial activity declines.`;
      suggestions.push("Apply agricultural lime (calcium carbonate) or dolomite at soil-test recommended rates 3-4 weeks prior to sowing.");
      suggestions.push("Use rock phosphate or single superphosphate (SSP) rather than water-soluble diammonium phosphate (DAP).");
      suggestions.push("Incorporate organic compost or vermicompost to buffer soil cation exchange capacity.");
    } else if (ph > 8.0) {
      summary = `The soil exhibits alkaline to sodic tendencies (pH ${ph.toFixed(1)}). At elevated pH, micronutrients such as Zinc, Iron, and Manganese become immobilized, while high exchangeable sodium can disperse clay particles, causing poor water infiltration.`;
      suggestions.push("Apply agricultural gypsum (calcium sulfate) followed by leaching with good-quality irrigation water to displace excess sodium.");
      suggestions.push("Incorporate green manures such as Dhaincha (Sesbania aculeata) or Sunnhemp during the summer break to produce organic acids.");
      suggestions.push("Use acid-forming fertilizers such as ammonium sulfate or pressmud from sugar mills.");
      suggestions.push("Foliar spray chelated micronutrients (Zinc EDTA and Ferrous Sulfate) to prevent deficiency symptoms.");
    } else {
      summary = `The soil is in a balanced, productive neutral pH range (${ph.toFixed(1)}). Nutrient availability for major macronutrients (N, P, K) and essential micronutrients is generally optimal, supporting high root uptake efficiency.`;
      suggestions.push("Maintain soil organic carbon above 0.5% through regular additions of farmyard manure (FYM) or bio-compost.");
      suggestions.push("Practice conservation tillage or crop residue retention to maintain active soil biological structure.");
    }

    // Macronutrient advice
    if (n < 140) {
      suggestions.push("Available Nitrogen is low. Apply split doses of nitrogen (e.g., neem-coated urea or bio-fertilizers like Azotobacter/Rhizobium) matched with crop growth stages.");
    }
    if (p < 11) {
      suggestions.push("Available Phosphorus is deficient. Band-place phosphatic fertilizers close to the seed zone at sowing rather than broad broadcasting.");
    }
    if (k < 120) {
      suggestions.push("Potassium reserves are suboptimal. Apply Muriate of Potash (MOP) to improve plant drought resilience and grain/fruit weight.");
    }

    summaryText.textContent = summary;
    improvementList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
  }

  function updateCropMatrix(ph, n, p, k) {
    if (!cropMatrixContainer) return;

    cropMatrixContainer.innerHTML = cropSoilTolerance.map(crop => {
      let status = "compatible";
      let label = "High Suitability";

      if (ph < crop.minPh || ph > crop.maxPh) {
        if (ph < crop.minPh - 0.7 || ph > crop.maxPh + 0.7) {
          status = "incompatible";
          label = "Poor Suitability (pH Stress)";
        } else {
          status = "moderate";
          label = "Moderate (Requires Care)";
        }
      }

      return `
        <div class="crop-matrix-item ${status}">
          <div style="font-weight: 700; margin-bottom: 0.2rem;">${crop.name}</div>
          <div style="font-size: 0.725rem; opacity: 0.85;">${label}</div>
          <div style="font-size: 0.675rem; margin-top: 0.25rem;">Prefers pH ${crop.minPh} – ${crop.maxPh}</div>
        </div>
      `;
    }).join('');
  }

  // Initial render
  updateDashboard();
}
