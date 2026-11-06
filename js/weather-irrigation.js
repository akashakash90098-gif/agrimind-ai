/**
 * AGRIMIND AI — WEATHER & IRRIGATION
 * Agro-Meteorological Forecast Simulator & Smart Irrigation Scheduler
 */

// Sample Demo Meteorological Datasets for Key Indian Agricultural Regions
const regionalWeatherDatabase = {
  ludhiana: {
    city: "Ludhiana, Punjab",
    state: "Punjab (North Zone)",
    current: {
      temp: 26,
      condition: "Clear & Sunny",
      icon: "sun",
      humidity: 52,
      windSpeed: "9 km/h",
      windDir: "NW",
      rainfallProb: "5%",
      uvIndex: "6 (Moderate)",
      dewPoint: "15°C"
    },
    forecast: [
      { day: "Today", min: 16, max: 27, condition: "Sunny", rain: "0 mm", icon: "sun" },
      { day: "Tomorrow", min: 17, max: 28, condition: "Partly Cloudy", rain: "0 mm", icon: "cloud-sun" },
      { day: "Wed", min: 18, max: 29, condition: "Clear Skies", rain: "0 mm", icon: "sun" },
      { day: "Thu", min: 19, max: 27, condition: "Light Overcast", rain: "2 mm", icon: "cloud" },
      { day: "Fri", min: 17, max: 26, condition: "Sunny", rain: "0 mm", icon: "sun" }
    ],
    farmingAdvice: "Ideal weather window for wheat field monitoring and timely second irrigation. Low humidity minimizes yellow rust risk."
  },

  guntur: {
    city: "Guntur, Andhra Pradesh",
    state: "Andhra Pradesh (Coastal Zone)",
    current: {
      temp: 32,
      condition: "Warm & Humid",
      icon: "cloud-sun",
      humidity: 74,
      windSpeed: "14 km/h",
      windDir: "SE",
      rainfallProb: "25%",
      uvIndex: "8 (Very High)",
      dewPoint: "23°C"
    },
    forecast: [
      { day: "Today", min: 24, max: 33, condition: "Humid & Sun", rain: "1 mm", icon: "cloud-sun" },
      { day: "Tomorrow", min: 25, max: 34, condition: "Passing Showers", rain: "6 mm", icon: "cloud-rain" },
      { day: "Wed", min: 24, max: 32, condition: "Scattered Rain", rain: "12 mm", icon: "cloud-rain" },
      { day: "Thu", min: 23, max: 31, condition: "Partly Cloudy", rain: "3 mm", icon: "cloud-sun" },
      { day: "Fri", min: 24, max: 33, condition: "Sunny", rain: "0 mm", icon: "sun" }
    ],
    farmingAdvice: "Moderate showers expected over the next 48 hours. Postpone foliar insecticide sprays on chilli and cotton crops until clear weather returns."
  },

  nashik: {
    city: "Nashik, Maharashtra",
    state: "Maharashtra (Western Ghats)",
    current: {
      temp: 28,
      condition: "Pleasant & Breezy",
      icon: "sun",
      humidity: 58,
      windSpeed: "12 km/h",
      windDir: "W",
      rainfallProb: "10%",
      uvIndex: "7 (High)",
      dewPoint: "17°C"
    },
    forecast: [
      { day: "Today", min: 18, max: 29, condition: "Clear", rain: "0 mm", icon: "sun" },
      { day: "Tomorrow", min: 19, max: 30, condition: "Sunny", rain: "0 mm", icon: "sun" },
      { day: "Wed", min: 18, max: 29, condition: "Light Clouds", rain: "0 mm", icon: "cloud" },
      { day: "Thu", min: 17, max: 28, condition: "Breezy", rain: "0 mm", icon: "wind" },
      { day: "Fri", min: 18, max: 29, condition: "Clear", rain: "0 mm", icon: "sun" }
    ],
    farmingAdvice: "Stable weather conditions favorable for onion harvesting and vineyard pruning. Ensure grape trellis canopy aeration."
  },

  coimbatore: {
    city: "Coimbatore, Tamil Nadu",
    state: "Tamil Nadu (Kongu Zone)",
    current: {
      temp: 30,
      condition: "Scattered Clouds",
      icon: "cloud",
      humidity: 68,
      windSpeed: "11 km/h",
      windDir: "NE",
      rainfallProb: "20%",
      uvIndex: "7 (High)",
      dewPoint: "21°C"
    },
    forecast: [
      { day: "Today", min: 22, max: 31, condition: "Cloudy", rain: "2 mm", icon: "cloud" },
      { day: "Tomorrow", min: 22, max: 31, condition: "Mild Drizzle", rain: "4 mm", icon: "cloud-rain" },
      { day: "Wed", min: 23, max: 32, condition: "Partly Cloudy", rain: "1 mm", icon: "cloud-sun" },
      { day: "Thu", min: 22, max: 30, condition: "Scattered Clouds", rain: "0 mm", icon: "cloud" },
      { day: "Fri", min: 21, max: 31, condition: "Sunny", rain: "0 mm", icon: "sun" }
    ],
    farmingAdvice: "Moderate cloud cover will reduce pan evaporation rates. Adjust drip irrigation operating hours downwards by 15%."
  },

  varanasi: {
    city: "Varanasi, Uttar Pradesh",
    state: "Uttar Pradesh (Eastern Plains)",
    current: {
      temp: 27,
      condition: "Sunny & Mild Fog",
      icon: "sun",
      humidity: 60,
      windSpeed: "8 km/h",
      windDir: "E",
      rainfallProb: "0%",
      uvIndex: "6 (Moderate)",
      dewPoint: "16°C"
    },
    forecast: [
      { day: "Today", min: 17, max: 28, condition: "Sunny", rain: "0 mm", icon: "sun" },
      { day: "Tomorrow", min: 18, max: 29, condition: "Sunny", rain: "0 mm", icon: "sun" },
      { day: "Wed", min: 19, max: 30, condition: "Clear", rain: "0 mm", icon: "sun" },
      { day: "Thu", min: 18, max: 29, condition: "Hazy Sun", rain: "0 mm", icon: "sun" },
      { day: "Fri", min: 17, max: 28, condition: "Clear", rain: "0 mm", icon: "sun" }
    ],
    farmingAdvice: "Optimal conditions for winter vegetable hoeing and top-dressing urea on late-sown wheat crops."
  },

  indore: {
    city: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh (Malwa Plateau)",
    current: {
      temp: 29,
      condition: "Bright Sunshine",
      icon: "sun",
      humidity: 48,
      windSpeed: "10 km/h",
      windDir: "W",
      rainfallProb: "0%",
      uvIndex: "7 (High)",
      dewPoint: "14°C"
    },
    forecast: [
      { day: "Today", min: 17, max: 30, condition: "Sunny", rain: "0 mm", icon: "sun" },
      { day: "Tomorrow", min: 18, max: 31, condition: "Clear", rain: "0 mm", icon: "sun" },
      { day: "Wed", min: 18, max: 30, condition: "Clear", rain: "0 mm", icon: "sun" },
      { day: "Thu", min: 19, max: 31, condition: "Sunny", rain: "0 mm", icon: "sun" },
      { day: "Fri", min: 17, max: 29, condition: "Sunny", rain: "0 mm", icon: "sun" }
    ],
    farmingAdvice: "Dry weather with low air humidity. Monitor gram/chickpea crops for pod borer emergence."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initWeatherAndIrrigation();
});

function initWeatherAndIrrigation() {
  const regionSelect = document.getElementById('weatherRegionSelect');
  const cityName = document.getElementById('weatherCityName');
  const stateBadge = document.getElementById('weatherStateBadge');
  const tempVal = document.getElementById('weatherTempVal');
  const condText = document.getElementById('weatherCondText');
  const condIcon = document.getElementById('weatherCondIcon');
  const humidityVal = document.getElementById('weatherHumidityVal');
  const windVal = document.getElementById('weatherWindVal');
  const rainProbVal = document.getElementById('weatherRainProbVal');
  const uvVal = document.getElementById('weatherUvVal');
  const dewVal = document.getElementById('weatherDewVal');
  const adviceText = document.getElementById('weatherFarmingAdvice');
  const forecastGrid = document.getElementById('forecastGrid');
  const tempBarsContainer = document.getElementById('tempBarsContainer');

  // Irrigation Form Elements
  const irrForm = document.getElementById('irrigationForm');
  const irrOutput = document.getElementById('irrigationOutput');
  const irrRecText = document.getElementById('irrRecText');
  const irrTimingText = document.getElementById('irrTimingText');
  const irrDurationText = document.getElementById('irrDurationText');
  const irrSavingTip = document.getElementById('irrSavingTip');

  if (!regionSelect) return;

  regionSelect.addEventListener('change', () => {
    loadWeatherData(regionSelect.value);
  });

  function getWeatherIconSvg(iconType) {
    if (iconType === 'sun') {
      return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else if (iconType === 'cloud-rain') {
      return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`;
    } else if (iconType === 'cloud-sun') {
      return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FDE047" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg>`;
    } else {
      return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
    }
  }

  function loadWeatherData(key) {
    const lang = (typeof window !== 'undefined' && window.agrimindI18n) ? window.agrimindI18n.getLanguage() : 'en';
    const baseData = regionalWeatherDatabase[key] || regionalWeatherDatabase.ludhiana;
    const transDb = (window.agrimindRegionalWeatherDatabase && window.agrimindRegionalWeatherDatabase[lang]) ? window.agrimindRegionalWeatherDatabase[lang] : {};
    const trans = transDb[key] || {};
    const data = {
      ...baseData,
      city: trans.city || baseData.city,
      state: trans.state || baseData.state,
      current: {
        ...baseData.current,
        condition: trans.current?.condition || baseData.current.condition
      },
      forecast: baseData.forecast.map((fc, idx) => ({
        ...fc,
        day: trans.forecast?.[idx]?.day || fc.day,
        condition: trans.forecast?.[idx]?.condition || fc.condition
      })),
      farmingAdvice: trans.farmingAdvice || baseData.farmingAdvice
    };

    if (cityName) cityName.textContent = data.city;
    if (stateBadge) stateBadge.textContent = data.state;
    if (tempVal) tempVal.textContent = `${data.current.temp}°C`;
    if (condText) condText.textContent = data.current.condition;
    if (condIcon) condIcon.innerHTML = getWeatherIconSvg(data.current.icon);
    if (humidityVal) humidityVal.textContent = `${data.current.humidity}%`;
    if (windVal) windVal.textContent = `${data.current.windSpeed} ${data.current.windDir}`;
    if (rainProbVal) rainProbVal.textContent = data.current.rainfallProb;
    if (uvVal) uvVal.textContent = data.current.uvIndex;
    if (dewVal) dewVal.textContent = data.current.dewPoint;
    if (adviceText) adviceText.textContent = data.farmingAdvice;

    // 5-Day Forecast Grid
    if (forecastGrid) {
      forecastGrid.innerHTML = data.forecast.map((fc, i) => `
        <div class="forecast-card ${i === 0 ? 'today' : ''}">
          <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--color-dark-green);">${fc.day}</div>
          <div style="display: flex; justify-content: center; margin: 0.5rem 0;">${getWeatherIconSvg(fc.icon)}</div>
          <div style="font-size: 0.825rem; color: var(--color-text-body); margin-bottom: 0.25rem;">${fc.condition}</div>
          <div style="font-weight: 700; font-size: 1.1rem; color: var(--color-text-dark);">${fc.max}° <span style="font-size: 0.85rem; color: var(--color-muted-text); font-weight: 400;">/ ${fc.min}°</span></div>
          <div style="font-size: 0.725rem; color: #2563EB; margin-top: 0.35rem;">🌧 ${fc.rain}</div>
        </div>
      `).join('');
    }

    // Temperature Trend Bars Visualizer
    if (tempBarsContainer) {
      tempBarsContainer.innerHTML = data.forecast.map(fc => {
        const heightPct = Math.min(100, (fc.max / 40) * 100);
        return `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; flex: 1;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-dark-green);">${fc.max}°C</div>
            <div style="width: 24px; height: 120px; background: #E6EFE3; border-radius: var(--radius-sm); position: relative; display: flex; align-items: flex-end;">
              <div style="width: 100%; height: ${heightPct}%; background: linear-gradient(to top, var(--color-fresh-leaf), var(--color-lime)); border-radius: var(--radius-sm);"></div>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-muted-text);">${fc.day}</div>
          </div>
        `;
      }).join('');
    }
  }

  // Irrigation Planner Form Submission
  if (irrForm) {
    irrForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const crop = document.getElementById('irrCrop').value;
      const stage = document.getElementById('irrStage').value;
      const soil = document.getElementById('irrSoil').value;
      const rain = parseFloat(document.getElementById('irrRain').value) || 0;
      const method = document.getElementById('irrMethod').value;

      calculateIrrigationPlan(crop, stage, soil, rain, method);
    });
  }

  function calculateIrrigationPlan(crop, stage, soil, rain, method) {
    let intervalDays = 4;
    let durationHours = "2.5 – 3.0 hours";
    let waterStatus = "Normal moisture depletion";
    let timing = "Early Morning (6:00 AM – 9:00 AM) or Late Evening (after 5:30 PM)";
    let tip = "Apply drip irrigation to minimize evaporation losses by up to 45% compared to surface flooding.";

    // Soil adjustments
    if (soil === 'sandy') {
      intervalDays = Math.max(2, intervalDays - 1);
      durationHours = "1.5 – 2.0 hours (frequent light applications)";
      tip = "Sandy soils have low water holding capacity; avoid heavy flooding which leaches nutrients below the root zone.";
    } else if (soil === 'clay') {
      intervalDays = intervalDays + 2;
      durationHours = "3.5 – 4.5 hours (deep slow infiltration)";
      tip = "Clay soils hold water longer; ensure proper surface drainage to prevent root aeration stress.";
    }

    // Growth stage adjustments
    if (stage === 'flowering' || stage === 'fruiting') {
      intervalDays = Math.max(2, intervalDays - 1);
      waterStatus = "Critical moisture sensitivity stage! Moisture stress will cause flower or pod drop.";
    } else if (stage === 'maturation') {
      intervalDays = intervalDays + 3;
      waterStatus = "Withhold irrigation 10-14 days before harvest to promote uniform ripening.";
    }

    // Recent rainfall credit
    if (rain > 20) {
      intervalDays += 3;
      waterStatus += ` (Credited ${rain} mm of recent natural rainfall. Irrigation can be postponed).`;
    }

    // Method adjustments
    if (method === 'drip') {
      durationHours = "2.0 – 2.5 hours at 1.2 kg/cm² operating pressure";
      tip = "Check drip emitters for salt clogging and clean inline disc filters weekly.";
    } else if (method === 'flood') {
      durationHours = "5 – 7 hours per acre furrow volume";
      tip = "Divide large plots into smaller checks/borders (20m x 10m) to achieve 25% water savings during flood irrigation.";
    }

    if (irrRecText) irrRecText.textContent = `Recommended interval: Irrigate every ${intervalDays} days. ${waterStatus}`;
    if (irrTimingText) irrTimingText.textContent = timing;
    if (irrDurationText) irrDurationText.textContent = durationHours;
    if (irrSavingTip) irrSavingTip.textContent = tip;

    if (irrOutput) {
      irrOutput.style.display = 'block';
      irrOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.showToast('Calculated smart irrigation plan.', 'success');
  }

  // Initial load
  loadWeatherData('ludhiana');
}



// Re-render weather on language change
if (typeof window !== 'undefined') {
  window.addEventListener('agrimind:languageChange', () => {
    const regionSelect = document.getElementById('weatherRegionSelect');
    if (regionSelect) {
      const loadFn = window.__loadWeatherData || (typeof loadWeatherData === 'function' ? loadWeatherData : null);
      if (loadFn) loadFn(regionSelect.value);
      else regionSelect.dispatchEvent(new Event('change'));
    }
  });
}
