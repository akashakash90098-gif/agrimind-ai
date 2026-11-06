/**
 * AGRIMIND AI — AI CROP DOCTOR
 * Leaf Disease Prototype Analysis & Management Engine
 */

// Local sample illustrative diagnostic dataset
const cropDiseaseDatabase = {
  paddy: {
    condition: "Bacterial Leaf Blight (Xanthomonas oryzae pv. oryzae)",
    severity: "Moderate Risk",
    symptoms: [
      "Water-soaked stripes starting from leaf tips and margins, later turning grayish-white.",
      "Lesions with wavy margins enlarging in length and width along the veins.",
      "Bacterial ooze droplets visible in early morning on young lesions under high humidity.",
      "Severe blighting and premature drying of leaves during maximum tillering to heading stage."
    ],
    prevention: [
      "Ensure balanced fertilization: avoid excessive nitrogen application which accelerates blighting.",
      "Maintain intermittent field drainage; avoid continuous standing water in affected plots.",
      "Clean irrigation channels to prevent bacterial spread across adjacent bunds.",
      "Practice field sanitation by removing stubbles and alternate weed hosts (Leersia oryzoides)."
    ],
    nextSteps: [
      "Drain standing water from the field for 2 to 3 days to restrict bacterial multiplication.",
      "Apply potassium fertilizer (MOP) at 15-20 kg/acre to strengthen cell walls and increase resistance.",
      "Avoid clipping seedling tips during transplantation.",
      "Do not enter the field when foliage is wet to prevent spreading the pathogen."
    ],
    consultation: "Contact your District Agricultural Officer or nearby Krishi Vigyan Kendra (KVK) if more than 20% of the canopy shows drying or if blighting reaches the flag leaf."
  },

  tomato: {
    condition: "Early Blight (Alternaria solani)",
    severity: "Common Fungal Infection",
    symptoms: [
      "Small, dark brown to black spots with characteristic concentric rings ('bullseye' appearance).",
      "Yellow chlorotic halos surrounding older circular lesions on lower leaves.",
      "Progressive bottom-up leaf defoliation exposing developing tomatoes to sunscald.",
      "Dark sunken cankers on stems at or near ground level in severe instances."
    ],
    prevention: [
      "Mulch soil around plants with clean straw or plastic film to prevent soil-splash onto lower foliage.",
      "Adopt drip or furrow irrigation; avoid overhead sprinkler watering that wets leaves.",
      "Prune bottom leaves up to 12 inches from the soil surface to enhance air circulation.",
      "Rotate with non-solanaceous crops (avoid planting after potato, brinjal, or chilli) for 2 seasons."
    ],
    nextSteps: [
      "Gently remove and safely destroy heavily infected lower leaves before watering.",
      "Stake and tie plants securely to keep fruit and foliage off the ground.",
      "Sanitize pruning shears with 70% alcohol or diluted bleach between plants.",
      "Assess weather forecasts for prolonged humidity or morning dew."
    ],
    consultation: "Consult an agronomist if concentric lesions begin appearing on green fruits or main stem nodes."
  },

  cotton: {
    condition: "Cotton Leaf Curl Disease (Begomovirus / CLCuD)",
    severity: "High Monitoring Required",
    symptoms: [
      "Upward or downward curling of leaf margins accompanied by thickening of main veins.",
      "Small enations (leaf-like outgrowths) on the underside of major veins in later stages.",
      "Stunted vegetative growth and shortened internodes leading to a bunched appearance.",
      "Significant reduction in square and boll formation if infected before flowering."
    ],
    prevention: [
      "Control whitefly (Bemisia tabaci) vectors through yellow sticky traps (10-15 traps/acre).",
      "Eradicate weed hosts such as Abutilon indicum and Parthenium hysterophorus around field borders.",
      "Adopt recommended CLCuD-tolerant hybrid varieties suitable for your agro-climatic zone.",
      "Avoid late sowing to prevent crop exposure to peak whitefly vector populations."
    ],
    nextSteps: [
      "Install yellow sticky traps immediately at canopy height to monitor whitefly activity.",
      "Rogue out and bury severely infected stunted plants in young fields.",
      "Maintain optimal plant spacing to promote beneficial predatory insects (lacewings, spiders).",
      "Avoid excessive vegetative fertilizer application."
    ],
    consultation: "Report widespread vein thickening to the State Agricultural Department surveillance team immediately."
  },

  wheat: {
    condition: "Yellow Rust / Stripe Rust (Puccinia striiformis f. sp. tritici)",
    severity: "Weather-Sensitive Fungal Alert",
    symptoms: [
      "Linear stripes of bright yellow-orange pustules (uredinia) arranged parallel to leaf veins.",
      "Yellow powdery spores rubbing off easily onto fingers or clothing when brushed.",
      "Chlorotic and necrotic stripes on leaves, sheaths, and occasionally on glumes.",
      "Rapid spread during cool (10-15°C) and moist foggy winter weather."
    ],
    prevention: [
      "Sow certified rust-resistant wheat varieties recommended for your specific ecological zone.",
      "Adhere strictly to timely sowing windows (avoid delayed sowing into late December).",
      "Ensure balanced N:P:K nutrient management without surplus urea application.",
      "Monitor northern borders and foothill regions closely during foggy January mornings."
    ],
    nextSteps: [
      "Conduct daily morning surveys across fields, particularly in moist depressions and border rows.",
      "Mark isolated focal spots showing yellow stripes with flags for intensive observation.",
      "Avoid evening flood irrigation during cloudy, stagnant weather windows.",
      "Document the specific wheat variety and planting date before contacting advisory officers."
    ],
    consultation: "Contact your local university agricultural extension center (PAU/HAU/IARI) as soon as focal rust spots are detected."
  },

  chilli: {
    condition: "Chilli Anthracnose / Dieback (Colletotrichum capsici)",
    severity: "Moderate to High",
    symptoms: [
      "Circular to elliptical sunken lesions on ripe red chilli fruits with concentric black acervuli.",
      "Dieback of tender branches starting from twig tips moving downwards.",
      "Premature shedding of flowers and small undeveloped pods.",
      "Bleached white twigs appearing dry and brittle in late morning sun."
    ],
    prevention: [
      "Source certified disease-free seeds and use hot water or bio-agent seed treatment.",
      "Collect and destroy crop debris immediately following the final harvest.",
      "Ensure wide row spacing (60 x 45 cm) for adequate sunlight penetration into the canopy.",
      "Avoid harvesting fruits during damp morning conditions."
    ],
    nextSteps: [
      "Harvest ripe fruits promptly as soon as they turn red; do not leave over-ripe pods on plants.",
      "Clip dry dead twigs with 2 cm of healthy wood and dispose of them outside the field.",
      "Ensure good soil drainage in raised beds.",
      "Store harvested produce on elevated clean tarpaulins rather than bare earth."
    ],
    consultation: "Consult a horticultural officer if circular spots appear on more than 10% of green developing pods."
  },

  maize: {
    condition: "Northern Corn Leaf Blight (Exserohilum turcicum)",
    severity: "Moderate",
    symptoms: [
      "Long, elliptical, grayish-green or tan lesions (cigar-shaped, 2.5 to 15 cm long).",
      "Lesions initially appearing on lower leaves, gradually progressing upward to upper canopy.",
      "Dark fungal spores visible within lesions during wet, humid weather.",
      "Extensive leaf blighting resembling drought stress during the tasseling stage."
    ],
    prevention: [
      "Adopt crop rotation with non-host crops like pulses, groundnut or soybean.",
      "Incorporate previous crop residues thoroughly into the soil via deep summer ploughing.",
      "Maintain recommended plant density to avoid excessive canopy humidity.",
      "Plant tolerant maize hybrids adapted to your district."
    ],
    nextSteps: [
      "Inspect lower canopy leaves weekly during the vegetative 6-8 leaf stage.",
      "Ensure balanced nitrogen and potash application to boost plant vigor.",
      "Avoid overhead sprinkler irrigation in late afternoon.",
      "Keep field borders clear of wild sorghum weeds."
    ],
    consultation: "Consult extension staff if cigar-shaped lesions reach the ear leaf prior to silking."
  },

  potato: {
    condition: "Late Blight of Potato (Phytophthora infestans)",
    severity: "Critical Weather Alert",
    symptoms: [
      "Water-soaked irregular pale to dark green lesions turning rapidly into dark brown dead tissue.",
      "Delicate white fungal-like mildew growth visible on the underside of leaves around lesions.",
      "Rapid blighting and decay of the entire canopy within 4-7 days under wet, cloudy weather.",
      "Brown to purplish surface discoloration on underlying tubers with dry granular rot."
    ],
    prevention: [
      "Plant certified seed tubers sourced from reliable disease-free cold stores.",
      "Perform thorough earthing up to provide a minimum 10 cm soil barrier over developing tubers.",
      "Destroy volunteer potato plants and cull piles near fields well before planting season.",
      "Monitor weather warnings for overcast skies with relative humidity above 90%."
    ],
    nextSteps: [
      "Cease flood irrigation immediately when cool cloudy rain spells are forecast.",
      "Rogue out and bury initial focal blighted plants immediately.",
      "Do not harvest tubers from fields with blighted green foliage; dehaulm 10-14 days prior.",
      "Store harvested potatoes in well-ventilated, dry, shaded sheds."
    ],
    consultation: "Alert your village agricultural assistant immediately upon noticing white mildew under water-soaked leaf margins."
  },

  unknown: {
    condition: "Nutritional Chlorosis & Environmental Foliar Stress",
    severity: "General Assessment",
    symptoms: [
      "Interveinal yellowing (chlorosis) or margin scorch on leaf blades.",
      "Absence of distinct fungal pustules, bacterial water-soaking, or concentric rings.",
      "Stunted or pale new foliage indicating potential micronutrient deficiency (Iron, Zinc, or Magnesium).",
      "Physical leaf curling potentially caused by high ambient temperatures, drought, or soil compaction."
    ],
    prevention: [
      "Conduct a certified soil test (Soil Health Card) to determine pH and micronutrient reserves.",
      "Incorporate well-decomposed organic manure or vermicompost (2-3 tonnes/acre).",
      "Avoid waterlogging and ensure timely aeration through shallow intercultural hoeing.",
      "Protect young foliage from severe heatwaves with proper irrigation scheduling."
    ],
    nextSteps: [
      "Check root zone moisture and verify that soil is not waterlogged or excessively dry.",
      "Examine the underside of leaves with a 10x magnifying glass to rule out tiny mites or thrips.",
      "Take high-resolution photographs under bright natural morning light for expert review.",
      "Review recent fertilizer and pesticide application dates to check for chemical toxicity."
    ],
    consultation: "Take a physical leaf sample inside a clean ziplock bag to your nearest Krishi Vigyan Kendra (KVK) for direct microscopic inspection."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initCropDoctor();
});

function initCropDoctor() {
  const dropzone = document.getElementById('doctorDropzone');
  const fileInput = document.getElementById('doctorFileInput');
  const browseBtn = document.getElementById('doctorBrowseBtn');
  const previewBox = document.getElementById('doctorPreviewBox');
  const previewImg = document.getElementById('doctorPreviewImg');
  const removeBtn = document.getElementById('doctorRemoveBtn');
  const cropSelect = document.getElementById('doctorCropSelect');
  const analyzeBtn = document.getElementById('doctorAnalyzeBtn');
  const reportSection = document.getElementById('doctorReport');
  const scanProgressText = document.getElementById('scanProgressText');
  const samplePills = document.querySelectorAll('.sample-crop-pill');

  let currentFile = null;

  if (!dropzone || !fileInput) return;

  // Browse button trigger
  if (browseBtn) {
    browseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  // Dropzone click
  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  // Drag & drop handlers
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length) {
      handleImageSelection(files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleImageSelection(fileInput.files[0]);
    }
  });

  // Sample leaf photo quick test pills
  samplePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const sampleUrl = pill.getAttribute('data-img');
      const crop = pill.getAttribute('data-crop');
      loadSampleImage(sampleUrl, crop);
    });
  });

  // Remove / replace image
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      resetDoctor();
    });
  }

  // Analyze Crop Action
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      startAnalysis();
    });
  }

  function handleImageSelection(file) {
    // Validate format
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      window.showToast('Please upload a valid image file (JPG, PNG, or WEBP).', 'danger');
      return;
    }

    // Validate size (max 5 MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      window.showToast('File size exceeds 5 MB. Please choose a smaller image.', 'warning');
      return;
    }

    currentFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      dropzone.style.display = 'none';
      previewBox.style.display = 'block';
      analyzeBtn.disabled = false;
      reportSection.classList.remove('active');
      reportSection.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  function loadSampleImage(url, crop) {
    currentFile = { name: 'sample-' + crop + '.jpg', type: 'image/jpeg' };
    previewImg.src = url;
    if (cropSelect) cropSelect.value = crop;
    dropzone.style.display = 'none';
    previewBox.style.display = 'block';
    analyzeBtn.disabled = false;
    reportSection.classList.remove('active');
    reportSection.style.display = 'none';
    window.showToast(`Loaded sample ${crop.toUpperCase()} leaf for testing.`, 'info');
  }

  function startAnalysis() {
    if (!previewImg.src) {
      window.showToast('Please upload or select a leaf image first.', 'warning');
      return;
    }

    analyzeBtn.disabled = true;
    previewBox.classList.add('scanning');
    
    const steps = [
      "Inspecting leaf contours...",
      "Analyzing lesion patterns and discoloration...",
      "Matching against agricultural diagnostic database...",
      "Preparing agronomic assessment report..."
    ];

    let stepIndex = 0;
    if (scanProgressText) scanProgressText.textContent = steps[0];

    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length && scanProgressText) {
        scanProgressText.textContent = steps[stepIndex];
      }
    }, 600);

    // Complete scan after ~2.4 seconds
    setTimeout(() => {
      clearInterval(stepInterval);
      previewBox.classList.remove('scanning');
      analyzeBtn.disabled = false;
      renderDiagnosticReport();
    }, 2400);
  }

  function renderDiagnosticReport() {
    const selectedCrop = (cropSelect ? cropSelect.value : 'unknown') || 'unknown';
    const lang = (typeof window !== 'undefined' && window.agrimindI18n) ? window.agrimindI18n.getLanguage() : 'en';
    const db = (window.agrimindCropDiseaseDatabase && window.agrimindCropDiseaseDatabase[lang]) ? window.agrimindCropDiseaseDatabase[lang] : cropDiseaseDatabase;
    const data = db[selectedCrop] || cropDiseaseDatabase[selectedCrop] || cropDiseaseDatabase.unknown;

    // Populate Report Fields
    const reportCropName = document.getElementById('reportCropName');
    const reportCondition = document.getElementById('reportCondition');
    const reportSeverity = document.getElementById('reportSeverity');
    const symptomsList = document.getElementById('reportSymptomsList');
    const preventionList = document.getElementById('reportPreventionList');
    const nextStepsList = document.getElementById('reportNextStepsList');
    const consultText = document.getElementById('reportConsultText');

    if (reportCropName) {
      const cropNames = {
        paddy: "Paddy / Rice (Oryza sativa)",
        tomato: "Tomato (Solanum lycopersicum)",
        cotton: "Cotton (Gossypium hirsutum)",
        wheat: "Wheat (Triticum aestivum)",
        chilli: "Chilli / Pepper (Capsicum annuum)",
        maize: "Maize / Corn (Zea mays)",
        potato: "Potato (Solanum tuberosum)",
        unknown: "Unspecified Crop Sample"
      };
      reportCropName.textContent = cropNames[selectedCrop] || selectedCrop.toUpperCase();
    }

    if (reportCondition) reportCondition.textContent = data.condition;
    if (reportSeverity) {
      reportSeverity.textContent = data.severity;
      reportSeverity.className = `badge ${data.severity.includes('High') || data.severity.includes('Critical') ? 'badge-danger' : 'badge-warning'}`;
    }

    if (symptomsList) {
      symptomsList.innerHTML = data.symptoms.map(s => `<li>${s}</li>`).join('');
    }

    if (preventionList) {
      preventionList.innerHTML = data.prevention.map(p => `<li>${p}</li>`).join('');
    }

    if (nextStepsList) {
      nextStepsList.innerHTML = data.nextSteps.map(n => `<li>${n}</li>`).join('');
    }

    if (consultText) {
      consultText.textContent = data.consultation;
    }

    reportSection.style.display = 'block';
    reportSection.classList.add('active');

    // Smooth scroll down to report
    reportSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.showToast('Demonstration diagnosis report generated.', 'success');
  }

  function resetDoctor() {
    currentFile = null;
    fileInput.value = '';
    previewImg.src = '';
    previewBox.style.display = 'none';
    previewBox.classList.remove('scanning');
    dropzone.style.display = 'block';
    analyzeBtn.disabled = true;
    reportSection.classList.remove('active');
    reportSection.style.display = 'none';
  }

  // Bind Reset & Print buttons in report
  const resetBtn = document.getElementById('reportResetBtn');
  const printBtn = document.getElementById('reportPrintBtn');

  if (resetBtn) {
    resetBtn.addEventListener('click', resetDoctor);
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}



// Re-render diagnosis report on language change
if (typeof window !== 'undefined') {
  window.addEventListener('agrimind:languageChange', () => {
    const reportSection = document.getElementById('doctorReport');
    if (reportSection && reportSection.style.display !== 'none' && reportSection.classList.contains('active')) {
      const cropSelect = document.getElementById('doctorCropSelect');
      const selectedCrop = (cropSelect ? cropSelect.value : 'unknown') || 'unknown';
      const lang = window.agrimindI18n.getLanguage();
      const db = (window.agrimindCropDiseaseDatabase && window.agrimindCropDiseaseDatabase[lang]) ? window.agrimindCropDiseaseDatabase[lang] : cropDiseaseDatabase;
      const data = db[selectedCrop] || cropDiseaseDatabase[selectedCrop] || cropDiseaseDatabase.unknown;
      
      const reportCondition = document.getElementById('reportCondition');
      const reportSeverity = document.getElementById('reportSeverity');
      const symptomsList = document.getElementById('reportSymptomsList');
      const preventionList = document.getElementById('reportPreventionList');
      const nextStepsList = document.getElementById('reportNextStepsList');
      const consultText = document.getElementById('reportConsultText');

      if (reportCondition) reportCondition.textContent = data.condition;
      if (reportSeverity) {
        reportSeverity.textContent = data.severity;
        reportSeverity.className = 'badge ' + (data.severity.includes('High') || data.severity.includes('Critical') || data.severity.includes('తీవ్ర') || data.severity.includes('தீவிர') || data.severity.includes('सघन') ? 'badge-danger' : 'badge-warning');
      }
      if (symptomsList && data.symptoms) {
        symptomsList.innerHTML = data.symptoms.map(s => '<li>' + s + '</li>').join('');
      }
      if (preventionList && data.prevention) {
        preventionList.innerHTML = data.prevention.map(p => '<li>' + p + '</li>').join('');
      }
      if (nextStepsList && data.nextSteps) {
        nextStepsList.innerHTML = data.nextSteps.map(n => '<li>' + n + '</li>').join('');
      }
      if (consultText) consultText.textContent = data.consultation;
    }
  });
}
