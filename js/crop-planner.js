/**
 * AGRIMIND AI — SMART CROP PLANNER
 * Rule-Based Crop Suitability Recommendation Engine & Comparison
 */

// Comprehensive Indian Crop Knowledge Base for Rule Engine
const cropKnowledgeBase = {
  paddy: {
    id: "paddy",
    name: "Paddy / Rice (Oryza sativa)",
    photo: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
    seasons: ["kharif", "rabi"],
    soils: ["alluvial", "clay-loam", "black"],
    waterReq: "High",
    duration: "115 – 140 days",
    expectedYield: "20 – 30 Quintals / Acre",
    investmentLevel: "Medium (₹16,000 – ₹24,000 / Acre)",
    marketDemand: "Consistent High (MSP & Open Mandi)",
    whySuitable: "Thrives in warm, humid conditions with abundant water availability and heavy clay or alluvial soils capable of water retention.",
    soilSuitability: "Excellent for alluvial plains and clayey loams with slightly acidic to neutral pH (5.5 – 7.0).",
    verificationFactors: "Check assured water supply for the initial 60 days, puddling soil depth, and local MSP procurement centers."
  },

  wheat: {
    id: "wheat",
    name: "Wheat (Triticum aestivum)",
    photo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    seasons: ["rabi"],
    soils: ["alluvial", "clay-loam", "black"],
    waterReq: "Moderate",
    duration: "120 – 145 days",
    expectedYield: "18 – 24 Quintals / Acre",
    investmentLevel: "Low to Medium (₹12,000 – ₹18,000 / Acre)",
    marketDemand: "Very High (Government Procurement & Commercial)",
    whySuitable: "Ideal winter crop for northern and central Indian plains requiring cool temperatures during vegetative growth and bright sunshine during grain filling.",
    soilSuitability: "Best suited for fertile, well-drained alluvial and loam soils with pH 6.0 – 7.5.",
    verificationFactors: "Confirm timely winter sowing (November 10 – 25) to avoid terminal heat stress during March maturity."
  },

  cotton: {
    id: "cotton",
    name: "Cotton (Gossypium hirsutum)",
    photo: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80",
    seasons: ["kharif"],
    soils: ["black", "alluvial", "red"],
    waterReq: "Moderate",
    duration: "150 – 180 days",
    expectedYield: "8 – 14 Quintals / Acre",
    investmentLevel: "High (₹22,000 – ₹32,000 / Acre)",
    marketDemand: "High Commercial (Textile Mills & CCI)",
    whySuitable: "Deep root system performs exceptionally well in moisture-retentive black cotton soils with sunny, frost-free weather.",
    soilSuitability: "Deep black regur soils and well-aerated sandy loams with pH 6.5 – 8.0.",
    verificationFactors: "Monitor pink bollworm and sucking pest pressure; ensure proper drainage to prevent waterlogging."
  },

  soybean: {
    id: "soybean",
    name: "Soybean (Glycine max)",
    photo: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    seasons: ["kharif"],
    soils: ["black", "clay-loam", "alluvial"],
    waterReq: "Moderate",
    duration: "90 – 105 days",
    expectedYield: "8 – 12 Quintals / Acre",
    investmentLevel: "Low (₹10,000 – ₹15,000 / Acre)",
    marketDemand: "Strong (Edible Oil & Meal Processing)",
    whySuitable: "Short-duration nitrogen-fixing legume that enriches soil fertility while generating rapid cash returns in rainfed tracts.",
    soilSuitability: "Fertile loam and medium black soils with pH 6.0 – 7.2. Sensitive to waterlogging.",
    verificationFactors: "Ensure seed germination test (>70%) before sowing and apply Rhizobium bio-fertilizer inoculant."
  },

  groundnut: {
    id: "groundnut",
    name: "Groundnut / Peanut (Arachis hypogaea)",
    photo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    seasons: ["kharif", "zaid"],
    soils: ["red", "sandy", "alluvial"],
    waterReq: "Low to Moderate",
    duration: "105 – 125 days",
    expectedYield: "10 – 16 Quintals / Acre",
    investmentLevel: "Medium (₹14,000 – ₹20,000 / Acre)",
    marketDemand: "Steady High (Oil Mills & Confectionery)",
    whySuitable: "Excellent tolerance to light soils and moderate moisture; ideal for semi-arid red soil zones of southern and western India.",
    soilSuitability: "Light sandy loam or red friable soil with pH 6.0 – 7.5 that permits easy gynophore (peg) penetration.",
    verificationFactors: "Apply gypsum at 150-200 kg/acre at 40-45 DAS for pod filling and calcium enrichment."
  },

  mustard: {
    id: "mustard",
    name: "Mustard / Rapeseed (Brassica juncea)",
    photo: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
    seasons: ["rabi"],
    soils: ["alluvial", "clay-loam", "sandy"],
    waterReq: "Low",
    duration: "110 – 130 days",
    expectedYield: "6 – 10 Quintals / Acre",
    investmentLevel: "Low (₹8,000 – ₹12,000 / Acre)",
    marketDemand: "High (Edible Mustard Oil Extraction)",
    whySuitable: "Highly economical winter oilseed requiring minimal irrigation and thriving across north and central Indian conditions.",
    soilSuitability: "Light to heavy loams with good drainage and neutral pH (6.0 – 7.5).",
    verificationFactors: "Monitor for aphid infestation during cloudy winter spells and provide irrigation at pre-flowering."
  },

  chickpea: {
    id: "chickpea",
    name: "Chickpea / Bengal Gram (Cicer arietinum)",
    photo: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    seasons: ["rabi"],
    soils: ["black", "alluvial", "red"],
    waterReq: "Low",
    duration: "100 – 120 days",
    expectedYield: "7 – 12 Quintals / Acre",
    investmentLevel: "Low (₹9,000 – ₹14,000 / Acre)",
    marketDemand: "Consistently High (Dal & Besan processing)",
    whySuitable: "Drought-hardy pulse crop with low water requirement that fixes atmospheric nitrogen, improving subsequent soil health.",
    soilSuitability: "Deep moisture-holding black soils or loam soils with pH 6.0 – 7.5.",
    verificationFactors: "Avoid fields prone to water stagnation or soil-borne wilt (Fusarium); practice seed treatment."
  },

  maize: {
    id: "maize",
    name: "Maize / Corn (Zea mays)",
    photo: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    seasons: ["kharif", "rabi", "zaid"],
    soils: ["alluvial", "clay-loam", "red"],
    waterReq: "Moderate",
    duration: "95 – 115 days",
    expectedYield: "25 – 35 Quintals / Acre",
    investmentLevel: "Medium (₹15,000 – ₹22,000 / Acre)",
    marketDemand: "High (Poultry Feed, Starch, Silage)",
    whySuitable: "Versatile, high-biomass cereal crop suitable for all three seasons with wide agro-climatic adaptability and strong industrial feed demand.",
    soilSuitability: "Well-drained fertile loamy soils rich in organic matter with pH 6.5 – 7.5.",
    verificationFactors: "Scout for Fall Armyworm (FAW) at seedling stage; ensure soil has no water stagnation."
  },

  tomato: {
    id: "tomato",
    name: "Hybrid Tomato (Solanum lycopersicum)",
    photo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    seasons: ["kharif", "rabi", "zaid"],
    soils: ["red", "alluvial", "clay-loam"],
    waterReq: "Moderate to High (Drip Preferred)",
    duration: "120 – 150 days",
    expectedYield: "150 – 250 Quintals / Acre",
    investmentLevel: "High (₹35,000 – ₹55,000 / Acre)",
    marketDemand: "Volatile High (Daily Mandi & Food Processing)",
    whySuitable: "High-value horticultural crop with substantial profit potential when grown under trellis or drip irrigation with proper crop care.",
    soilSuitability: "Well-drained red loamy or sandy loam soils rich in organic humus with pH 6.0 – 7.0.",
    verificationFactors: "Check local cold storage availability and market price trends; invest in staking/trellising."
  }
};

/**
 * Rule-Based Recommendation Algorithm
 */
function getCropRecommendationsDemo(inputs) {
  const { season, soil, waterAvailability, preference } = inputs;
  const scoredCrops = [];

  for (const key in cropKnowledgeBase) {
    const crop = cropKnowledgeBase[key];
    let score = 50; // base score

    // Season match
    if (crop.seasons.includes(season)) {
      score += 30;
    } else {
      score -= 30;
    }

    // Soil match
    if (crop.soils.includes(soil)) {
      score += 25;
    } else {
      score -= 10;
    }

    // Water availability match
    if (waterAvailability === 'scarce') {
      if (crop.waterReq.includes('Low')) score += 20;
      if (crop.waterReq.includes('High')) score -= 30;
    } else if (waterAvailability === 'abundant') {
      if (crop.waterReq.includes('High')) score += 20;
    } else { // moderate
      if (crop.waterReq.includes('Moderate')) score += 20;
    }

    // Crop category preference
    if (preference && preference !== 'any') {
      if (preference === 'cereals' && ['paddy', 'wheat', 'maize'].includes(key)) score += 15;
      if (preference === 'pulses' && ['chickpea', 'soybean'].includes(key)) score += 15;
      if (preference === 'oilseeds' && ['mustard', 'groundnut', 'soybean'].includes(key)) score += 15;
      if (preference === 'cash' && ['cotton'].includes(key)) score += 15;
      if (preference === 'vegetables' && ['tomato'].includes(key)) score += 15;
    }

    if (score > 40) {
      scoredCrops.push({ ...crop, matchScore: score });
    }
  }

  // Sort descending by match score and take top 3
  scoredCrops.sort((a, b) => b.matchScore - a.matchScore);
  return scoredCrops.slice(0, 3);
}

document.addEventListener('DOMContentLoaded', () => {
  initCropPlanner();
});

function initCropPlanner() {
  const form = document.getElementById('cropPlannerForm');
  const resultsContainer = document.getElementById('plannerResults');
  const suggestionsGrid = document.getElementById('suggestionsGrid');
  const compareBtn = document.getElementById('compareCropsBtn');
  const compareModal = document.getElementById('compareCropsModal');
  const compareTableBody = document.getElementById('compareTableBody');

  let currentRecommendations = [];

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const state = document.getElementById('plannerState').value;
    const district = document.getElementById('plannerDistrict').value;
    const season = document.getElementById('plannerSeason').value;
    const soil = document.getElementById('plannerSoil').value;
    const landArea = parseFloat(document.getElementById('plannerLandArea').value) || 1;
    const landUnit = document.getElementById('plannerLandUnit').value;
    const irrigation = document.getElementById('plannerIrrigation').value;
    const waterAvailability = document.getElementById('plannerWater').value;
    const preference = document.getElementById('plannerPreference').value;

    const recommendations = getCropRecommendationsDemo({
      state,
      district,
      season,
      soil,
      landArea,
      landUnit,
      irrigation,
      waterAvailability,
      preference
    });

    currentRecommendations = recommendations;
    renderRecommendations(recommendations, landArea, landUnit);
  });

  function renderRecommendations(crops, area, unit) {
    if (!suggestionsGrid) return;

    if (!crops || crops.length === 0) {
      suggestionsGrid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 2.5rem;">
          <p style="font-size: 1.1rem; color: var(--color-muted-text);">No direct matches found in our sample rules for this combination. Try selecting 'Moderate' water availability or 'Any' crop category.</p>
        </div>
      `;
      resultsContainer.style.display = 'block';
      return;
    }

    suggestionsGrid.innerHTML = crops.map((crop, idx) => `
      <div class="card reveal active" style="overflow: hidden; display: flex; flex-direction: column;">
        <div style="position: relative; height: 180px; overflow: hidden; background: #000;">
          <img src="${crop.photo}" alt="${crop.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.95;">
          <span class="badge ${idx === 0 ? 'badge-lime' : 'badge-leaf'}" style="position: absolute; top: 12px; left: 12px;">
            ${idx === 0 ? 'Top Recommendation' : 'Strong Match'}
          </span>
          <span class="badge badge-dark" style="position: absolute; bottom: 12px; right: 12px;">
            ${crop.waterReq} Water Need
          </span>
        </div>

        <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
          <h3 style="font-size: 1.3rem; margin-bottom: 0.35rem; color: var(--color-text-dark);">${crop.name}</h3>
          
          <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.825rem; color: var(--color-muted-text); flex-wrap: wrap;">
            <span>⏱ ${crop.duration}</span>
            <span>•</span>
            <span>🌾 Exp: ${crop.expectedYield}</span>
          </div>

          <div style="background: #F6F8F5; border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem;">
            <p style="font-size: 0.875rem; font-weight: 600; color: var(--color-dark-green); margin-bottom: 0.25rem;">Why this crop is suitable:</p>
            <p style="font-size: 0.85rem; color: var(--color-text-body); margin: 0;">${crop.whySuitable}</p>
          </div>

          <div style="font-size: 0.825rem; color: var(--color-muted-text); margin-bottom: 1rem; border-left: 2px solid var(--color-fresh-leaf); padding-left: 0.75rem;">
            <strong>Key factors to verify:</strong> ${crop.verificationFactors}
          </div>

          <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: var(--color-muted-text);">For ${area} ${unit}</span>
            <button type="button" class="btn btn-sm btn-outline-dark select-plan-crop" data-crop-name="${crop.name}">
              Plan for this Crop
            </button>
          </div>
        </div>
      </div>
    `).join('');

    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Enable compare button if 2 or more crops
    if (compareBtn) {
      compareBtn.style.display = crops.length > 1 ? 'inline-flex' : 'none';
    }

    // Attach click listeners to "Plan for this Crop"
    document.querySelectorAll('.select-plan-crop').forEach(btn => {
      btn.addEventListener('click', () => {
        const cropName = btn.getAttribute('data-crop-name');
        window.showToast(`Selected ${cropName}. You can run economics in the Profit Calculator.`, 'success');
      });
    });
  }

  // Compare Crops Modal
  if (compareBtn && compareModal) {
    compareBtn.addEventListener('click', () => {
      if (!currentRecommendations.length) return;

      if (compareTableBody) {
        compareTableBody.innerHTML = currentRecommendations.map(c => `
          <tr>
            <td style="font-weight: 700; color: var(--color-dark-green);">${c.name}</td>
            <td>${c.duration}</td>
            <td><span class="badge ${c.waterReq === 'High' ? 'badge-info' : c.waterReq === 'Low' ? 'badge-leaf' : 'badge-warning'}">${c.waterReq}</span></td>
            <td>${c.expectedYield}</td>
            <td>${c.investmentLevel}</td>
            <td>${c.marketDemand}</td>
            <td>${c.soilSuitability}</td>
          </tr>
        `).join('');
      }

      window.openModal('compareCropsModal');
    });
  }

  // Change Inputs Action
  const changeInputsBtn = document.getElementById('changeInputsBtn');
  if (changeInputsBtn) {
    changeInputsBtn.addEventListener('click', () => {
      form.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

