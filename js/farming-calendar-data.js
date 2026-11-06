/**
 * AGRIMIND AI — FARMING CALENDAR AGRONOMIC DATABASE
 * Comprehensive crop schedule templates based on standard Indian agronomic packages of practices.
 * Offsets are in days relative to sowing/planting date (Day 0).
 */

const farmingCropSchedules = {
  rice: {
    name: "Paddy / Rice (Oryza sativa)",
    typicalDuration: 125, // days
    season: "Kharif / Rabi",
    description: "Systematic wetland paddy schedule from seedbed preparation to grain harvest.",
    tasks: [
      {
        dayOffset: -14,
        title: "Initial Summer Ploughing & Bund Trimming",
        category: "land-prep",
        description: "Deep summer ploughing to expose weed seeds and soil-borne resting spores. Trim and plaster field bunds to prevent water seepage."
      },
      {
        dayOffset: -7,
        title: "Organic Manure Application & Nursery Bed Preparation",
        category: "land-prep",
        description: "Incorporate 4-5 tonnes/acre of well-decomposed FYM or compost. Prepare raised nursery beds (1.2m wide) with drainage channels."
      },
      {
        dayOffset: -2,
        title: "Seed Treatment & Pre-Soaking",
        category: "seed-sowing",
        description: "Treat seeds with Carbendazim (2g/kg) or Trichoderma viride (10g/kg). Soak seeds in clean water for 24 hours and incubate for sprouting."
      },
      {
        dayOffset: 0,
        title: "Nursery Sowing / Direct Seed Sowing",
        category: "seed-sowing",
        description: "Broadcast pre-germinated seeds uniformly across nursery beds or drill direct-seeded rice (DSR) in well-pulverized seedbed."
      },
      {
        dayOffset: 7,
        title: "Germination Check & Nursery Thinning",
        category: "germination",
        description: "Inspect seedling emergence. Ensure thin layer of water (1-2 cm) in the evening and drain in morning during hot spells."
      },
      {
        dayOffset: 18,
        title: "Main Field Puddling & Basal Fertilizer",
        category: "land-prep",
        description: "Puddle field twice with tractor-mounted puddler. Apply full recommended dose of Phosphorus (SSP/DAP), 50% Potash, and 25% Nitrogen."
      },
      {
        dayOffset: 22,
        title: "Seedling Uprooting & Main Field Transplantation",
        category: "seed-sowing",
        description: "Transplant 20-22 day old young seedlings at 20x15 cm spacing with 2-3 seedlings per hill at shallow depth (2-3 cm)."
      },
      {
        dayOffset: 25,
        title: "Early Establishment Irrigation & Weed Check",
        category: "irrigation",
        description: "Maintain 2-3 cm water level for 5-7 days after transplanting to facilitate quick root anchorage."
      },
      {
        dayOffset: 35,
        title: "First Nitrogen Top-Dressing & Early Tillering Weed Control",
        category: "nutrient",
        description: "Broadcast 35% of recommended Nitrogen (Neem-coated urea) at active tillering. Use cono-weeder or manual weeding between rows."
      },
      {
        dayOffset: 45,
        title: "Stem Borer & Leaf Folder Scouting",
        category: "pest-disease",
        description: "Monitor for dead hearts and white folded leaves. Install 4 pheromone traps/acre. Spray bio-agent Bacillus thuringiensis if ETL exceeds 5%."
      },
      {
        dayOffset: 60,
        title: "Panicle Initiation Irrigation & Potash Split",
        category: "irrigation",
        description: "Critical moisture sensitivity stage! Maintain continuous 3-5 cm water layer. Apply remaining 50% Potash and final Nitrogen split."
      },
      {
        dayOffset: 75,
        title: "Flowering & Sheath Blight Monitoring",
        category: "pest-disease",
        description: "Inspect lower leaf sheaths for water-soaked oval lesions. Avoid excessive canopy humidity; drain water if sheath blight appears."
      },
      {
        dayOffset: 95,
        title: "Milking & Grain Dough Stage Monitoring",
        category: "growth",
        description: "Monitor milky grain transition to hard dough. Keep field alternately wet and dry (AWD method) to conserve water."
      },
      {
        dayOffset: 112,
        title: "Pre-Harvest Field Drainage",
        category: "harvest-prep",
        description: "Withhold all irrigation 10-14 days before harvest to hasten uniform grain drying and harden soil for harvesting machinery."
      },
      {
        dayOffset: 125,
        title: "Paddy Harvesting & Threshing",
        category: "harvest",
        description: "Harvest when 85-90% of panicle grains turn golden yellow. Dry threshed paddy on clean tarpaulins to 12-14% storage moisture."
      }
    ]
  },

  wheat: {
    name: "Wheat (Triticum aestivum)",
    typicalDuration: 135,
    season: "Rabi (Winter)",
    description: "North and Central Indian wheat cultivation schedule from November sowing to April harvest.",
    tasks: [
      {
        dayOffset: -10,
        title: "Pre-Sowing Irrigation (Rauni) & Land Levelling",
        category: "land-prep",
        description: "Apply pre-sowing irrigation (Rauni) to build subsoil moisture. Use laser land leveller to ensure uniform irrigation water spread."
      },
      {
        dayOffset: -3,
        title: "Seed Treatment for Loose Smut & Termites",
        category: "seed-sowing",
        description: "Treat certified wheat seeds with Tebuconazole (1g/kg) or Carboxin. For termite-prone fields, mix Chlorpyrifos 20 EC."
      },
      {
        dayOffset: 0,
        title: "Timely Sowing via Zero-Till / Seed-cum-Fertilizer Drill",
        category: "seed-sowing",
        description: "Sow at 40-45 kg seed/acre at 20-22 cm row spacing and 4-5 cm depth. Band-place full Phosphorus and 50% Nitrogen."
      },
      {
        dayOffset: 8,
        title: "Germination & Plant Stand Assessment",
        category: "germination",
        description: "Assess uniform coleoptile emergence. Target seedling density: 180-200 plants per square meter."
      },
      {
        dayOffset: 21,
        title: "Crown Root Initiation (CRI) First Irrigation",
        category: "irrigation",
        description: "Most critical irrigation of wheat crop! Irrigate at 20-25 days after sowing. Moisture stress now directly reduces tillering."
      },
      {
        dayOffset: 28,
        title: "First Nitrogen Top-Dressing & Weed Control",
        category: "nutrient",
        description: "Top-dress 50% of remaining Urea after CRI irrigation. Apply Clodinafop-propargyl for Phalaris minor (Gulli Danda) if weed flush occurs."
      },
      {
        dayOffset: 45,
        title: "Late Tillering / Jointing Second Irrigation",
        category: "irrigation",
        description: "Apply second light irrigation during jointing stage. Maintain good soil moisture for secondary root growth."
      },
      {
        dayOffset: 60,
        title: "Yellow Rust (Stripe Rust) Field Scouting",
        category: "pest-disease",
        description: "Survey field mornings for linear bright yellow pustule stripes on foliage. Check northern border rows and shaded depressions first."
      },
      {
        dayOffset: 70,
        title: "Boot Stage Third Irrigation & Final Nitrogen Split",
        category: "irrigation",
        description: "Irrigate at flag leaf / boot stage to support spike emergence. Top-dress final urea dose before heading."
      },
      {
        dayOffset: 85,
        title: "Flowering & Anthesis Inspection",
        category: "growth",
        description: "Monitor flowering. Avoid spray chemicals during peak anthesis (pollen release). Check for aphid colonies on spikes."
      },
      {
        dayOffset: 105,
        title: "Grain Filling Fourth Irrigation",
        category: "irrigation",
        description: "Critical for test weight and kernel size. Irrigate on calm, non-windy days to avoid plant lodging."
      },
      {
        dayOffset: 122,
        title: "Terminal Ripening & Harvest Preparation",
        category: "harvest-prep",
        description: "Stop irrigation. Check grain firmness with fingernail; straw turns golden-yellow and kernels become hard."
      },
      {
        dayOffset: 135,
        title: "Wheat Harvesting & Combine Threshing",
        category: "harvest",
        description: "Harvest on bright sunny day with combine harvester. Moisture content should be below 12% for safe warehouse storage."
      }
    ]
  },

  tomato: {
    name: "Hybrid Tomato (Solanum lycopersicum)",
    typicalDuration: 120,
    season: "Kharif / Rabi / Zaid",
    description: "High-value horticultural schedule with staking, fertigation, and disease protection.",
    tasks: [
      {
        dayOffset: -12,
        title: "Deep Summer Ploughing & Raised Bed Making",
        category: "land-prep",
        description: "Make raised beds 90 cm wide with 45 cm furrows. Incorporate 8 tonnes/acre farmyard manure and Neem cake (200 kg/acre)."
      },
      {
        dayOffset: -5,
        title: "Drip Lateral Laying & Plastic Mulch Installation",
        category: "irrigation",
        description: "Lay 16mm inline drip laterals with 40 cm dripper spacing. Cover beds with 25-30 micron silver-black reflective mulch film."
      },
      {
        dayOffset: 0,
        title: "Transplanting of Hardened Seedlings",
        category: "seed-sowing",
        description: "Transplant 25-day-old vigorous seedlings at 60x45 cm zig-zag spacing in the evening. Drench roots with Trichoderma."
      },
      {
        dayOffset: 4,
        title: "Establishment Watering & Gap Filling",
        category: "germination",
        description: "Run light daily drip cycles (30-45 mins). Replace any wilted or dead seedlings within 5 days of transplanting."
      },
      {
        dayOffset: 15,
        title: "First Fertigation & Early Vegetative Scouting",
        category: "nutrient",
        description: "Inject water-soluble 19:19:19 NPK through Venturi (3 kg/acre/week). Scout for leaf miners and flea beetles on tender leaves."
      },
      {
        dayOffset: 25,
        title: "Trellis Staking & Tying of Vines",
        category: "growth",
        description: "Erect bamboo/eucalyptus stakes (2.5m) and tie plants with jute twine. Improves air circulation and reduces soil-borne rot."
      },
      {
        dayOffset: 40,
        title: "Early Blight & Whitefly Monitoring",
        category: "pest-disease",
        description: "Install 15 yellow sticky traps/acre for whiteflies. Spray biological Neem oil (10,000 ppm) or Copper Oxychloride for leaf spot."
      },
      {
        dayOffset: 50,
        title: "Flowering Stage Fertigation Shift",
        category: "nutrient",
        description: "Shift fertigation to high Phosphorus & Potassium (12:61:00 and 0:0:50). Add Calcium Nitrate to prevent Blossom End Rot."
      },
      {
        dayOffset: 70,
        title: "Fruit Development & Drip Irrigation Regulation",
        category: "irrigation",
        description: "Maintain uniform soil moisture. Avoid irregular watering cycles which cause fruit cracking and split skin."
      },
      {
        dayOffset: 85,
        title: "First Fruit Picking (Breaker Stage)",
        category: "harvest",
        description: "Harvest firm fruits at breaker / turning stage (pink blossom end) for distant mandi transport. Handle gently in plastic crates."
      },
      {
        dayOffset: 100,
        title: "Peak Picking & Post-Harvest Sorting",
        category: "harvest",
        description: "Conduct pickings every 3-4 days. Grade by size and maturity. Discard sunscalded or borer-damaged tomatoes."
      },
      {
        dayOffset: 120,
        title: "Final Harvest & Field Residue Clearance",
        category: "harvest-prep",
        description: "Complete final harvest. Dismantle staking twines and clear dried vines to prevent carry-over pathogen spores."
      }
    ]
  },

  cotton: {
    name: "Cotton (Gossypium hirsutum)",
    typicalDuration: 160,
    season: "Kharif (Monsoon)",
    description: "Commercial cotton schedule covering square formation, pink bollworm IPM, and multi-flush picking.",
    tasks: [
      {
        dayOffset: -15,
        title: "Deep Summer Ploughing & Regur Soil Prep",
        category: "land-prep",
        description: "Plough 25-30 cm deep to break hardpan. Apply 4-5 tonnes FYM/acre to enhance moisture retention in black cotton soil."
      },
      {
        dayOffset: -2,
        title: "Seed Treatment with Bio-Agents",
        category: "seed-sowing",
        description: "Treat hybrid cotton seed with Imidacloprid (for sucking pests) and Azotobacter + PSB bio-fertilizers."
      },
      {
        dayOffset: 0,
        title: "Sowing at Recommended Spacing",
        category: "seed-sowing",
        description: "Dibble seeds at 90x60 cm or 120x45 cm spacing on ridges. Apply basal dose of 25% Nitrogen, full Phosphorus and 50% Potash."
      },
      {
        dayOffset: 8,
        title: "Emergence Check & Gap Filling",
        category: "germination",
        description: "Check seedling emergence. Re-dibble missing hills with pre-soaked seed to ensure 100% plant population."
      },
      {
        dayOffset: 20,
        title: "Thinning & First Intercultural Hoeing",
        category: "weed",
        description: "Retain one healthy seedling per hill. Carry out shallow inter-culture with bullock or small weeder to aerate roots."
      },
      {
        dayOffset: 35,
        title: "First Top-Dressing of Nitrogen & Sucking Pest Scouting",
        category: "nutrient",
        description: "Apply 35% Nitrogen split along plant rows. Scout for jassids, thrips, and aphids on leaf undersides."
      },
      {
        dayOffset: 50,
        title: "Square (Bud) Formation & Pheromone Traps Installation",
        category: "pest-disease",
        description: "Crucial square formation stage! Install 5 Gossyplure pheromone traps per acre for monitoring Pink Bollworm moths."
      },
      {
        dayOffset: 65,
        title: "Flower Initiation Irrigation & Boron Foliar Spray",
        category: "irrigation",
        description: "Ensure adequate moisture at flowering. Foliar spray 0.1% Solubor (Boron) to reduce flower shedding and square drop."
      },
      {
        dayOffset: 85,
        title: "Boll Development & Second Potash Split",
        category: "growth",
        description: "Apply balance 50% Potash and remaining Nitrogen. Check for rosetted flowers indicative of bollworm entry."
      },
      {
        dayOffset: 110,
        title: "First Boll Bursting Inspection",
        category: "growth",
        description: "Lower bolls begin bursting. Withhold overhead irrigation to protect lint quality and avoid fiber staining."
      },
      {
        dayOffset: 130,
        title: "First Picking of Open Clean Bolls",
        category: "harvest",
        description: "Pick clean, fully opened bolls in late morning when dew has evaporated. Store in clean dry cotton bags, not plastic."
      },
      {
        dayOffset: 150,
        title: "Second Flush Picking",
        category: "harvest",
        description: "Pick middle and top canopy bolls. Keep stained and trash-free lint segregated for higher mandi pricing."
      },
      {
        dayOffset: 160,
        title: "Final Picking & Cotton Stalk Shredding",
        category: "harvest-prep",
        description: "Complete final picking. Shred cotton stalks with rotary shredder to terminate pink bollworm diapause larvae."
      }
    ]
  },

  maize: {
    name: "Maize / Corn (Zea mays)",
    typicalDuration: 105,
    season: "Kharif / Rabi / Zaid",
    description: "High-biomass cereal crop schedule with Fall Armyworm (FAW) vigilance and cob filling irrigation.",
    tasks: [
      {
        dayOffset: -7,
        title: "Fine Tilth Field Preparation & Basal NPK",
        category: "land-prep",
        description: "Harrow and plank field to obtain firm seedbed. Band-place full Phosphorus, 50% Potash, and 25% Nitrogen at sowing depth."
      },
      {
        dayOffset: 0,
        title: "Sowing at 60 x 20 cm Ridge Spacing",
        category: "seed-sowing",
        description: "Sow certified hybrid seeds at 7-8 kg/acre at 4 cm depth on side of the ridges for optimal aeration."
      },
      {
        dayOffset: 6,
        title: "Germination Inspection & Stand Count",
        category: "germination",
        description: "Verify even coleoptile emergence. Target 30,000-33,000 plants per acre."
      },
      {
        dayOffset: 15,
        title: "Fall Armyworm (FAW) Scouting in Whorls",
        category: "pest-disease",
        description: "Crucial! Check leaf whorls for window-pane pinholes and sawdust-like frass. Apply biological Nomuraea rileyi or neem cake."
      },
      {
        dayOffset: 25,
        title: "Knee-High Stage Irrigation & First Nitrogen Split",
        category: "nutrient",
        description: "Top-dress 35% Nitrogen. Ridge earthing-up to prevent lodging and anchor prop roots firmly in soil."
      },
      {
        dayOffset: 45,
        title: "Tasseling (Male Flower) Critical Irrigation",
        category: "irrigation",
        description: "High water sensitivity window! Moisture deficit during tassel emergence severely stunts pollen viability."
      },
      {
        dayOffset: 55,
        title: "Silking (Female Flower) & Cob Formation Check",
        category: "growth",
        description: "Monitor fresh silk emergence. Ensure balanced moisture. Apply second 40% Nitrogen split before silk browning."
      },
      {
        dayOffset: 75,
        title: "Grain Milking to Dough Stage Irrigation",
        category: "irrigation",
        description: "Provide light irrigation to maximize kernel weight and prevent premature drying of cob tips."
      },
      {
        dayOffset: 95,
        title: "Black Layer Maturity Check & De-husking Prep",
        category: "harvest-prep",
        description: "Check for black layer formation at kernel base indicating physiological maturity. Husk leaves turn straw-brown."
      },
      {
        dayOffset: 105,
        title: "Maize Harvesting & Cob Shelling",
        category: "harvest",
        description: "Harvest mature cobs, sun-dry on clean tarpaulins for 3-4 days, and shell kernels when moisture reaches 13-14%."
      }
    ]
  },

  groundnut: {
    name: "Groundnut / Peanut (Arachis hypogaea)",
    typicalDuration: 115,
    season: "Kharif / Zaid",
    description: "Legume oilseed schedule with pegging, gypsum application, and pod maturity monitoring.",
    tasks: [
      {
        dayOffset: -7,
        title: "Sandy Loam Tilth Prep & FYM Addition",
        category: "land-prep",
        description: "Prepare friable 15 cm seedbed. Avoid cloddy soil so gynophores (pegs) can penetrate easily."
      },
      {
        dayOffset: -1,
        title: "Seed Kernel Inoculation with Rhizobium",
        category: "seed-sowing",
        description: "Treat hand-shelled unblemished kernels with Rhizobium culture and Trichoderma to promote root nodulation."
      },
      {
        dayOffset: 0,
        title: "Sowing at 30 x 10 cm Spacing",
        category: "seed-sowing",
        description: "Sow at 40-45 kg pods/acre at 5 cm depth. Ensure adequate soil moisture for prompt germination."
      },
      {
        dayOffset: 7,
        title: "Germination & Gap Filling",
        category: "germination",
        description: "Check seedling emergence. Re-sow gaps immediately to maintain uniform plant canopy."
      },
      {
        dayOffset: 20,
        title: "First Intercultural Weeding (Pre-Pegging)",
        category: "weed",
        description: "Weed between rows with hand hoe. Note: Stop all intercultural hoeing once pegs start entering the soil!"
      },
      {
        dayOffset: 40,
        title: "Gypsum Application at Flowering / Pegging",
        category: "nutrient",
        description: "Crucial for pod filling! Broadcast agricultural gypsum at 150-200 kg/acre around root zone to provide Calcium and Sulphur."
      },
      {
        dayOffset: 55,
        title: "Pegging Stage Irrigation & Tikka Disease Scouting",
        category: "irrigation",
        description: "Keep top 5 cm soil moist and soft for peg penetration. Scout for circular brown Tikka leaf spots on lower leaves."
      },
      {
        dayOffset: 75,
        title: "Pod Development & Soil Moisture Monitoring",
        category: "growth",
        description: "Maintain alternate wetting and drying. Avoid waterlogging which causes pod rot."
      },
      {
        dayOffset: 100,
        title: "Maturity Test (Inner Pod Shell Blackening)",
        category: "harvest-prep",
        description: "Pull 2-3 sample plants and crack open pods. If inside shell shows dark brown/black veins, crop is mature."
      },
      {
        dayOffset: 115,
        title: "Groundnut Uprooting & Pod Stripping",
        category: "harvest",
        description: "Irrigate lightly 2 days prior to ease uprooting without pod snapping. Invert vines in sun for 3-5 days to dry pods."
      }
    ]
  },

  sugarcane: {
    name: "Sugarcane (Saccharum officinarum)",
    typicalDuration: 330,
    season: "Annual (Autumn / Spring)",
    description: "Full-season perennial cash crop schedule covering setts treatment, earthing-up, and brix maturity.",
    tasks: [
      {
        dayOffset: -15,
        title: "Deep Subsoiling & Furrow Opening",
        category: "land-prep",
        description: "Plough 35-40 cm deep. Open furrows at 90-120 cm row-to-row spacing. Apply 10 tonnes/acre organic compost."
      },
      {
        dayOffset: -2,
        title: "Two-Eyed Sett Selection & Hot Water/Fungicide Treatment",
        category: "seed-sowing",
        description: "Select healthy thick seed canes. Dip two-budded setts in Carbendazim solution (1g/L) for 15 minutes."
      },
      {
        dayOffset: 0,
        title: "Sett Planting & End-to-End Placement",
        category: "seed-sowing",
        description: "Place setts end-to-end in furrows (35,000-40,000 setts/acre). Apply basal dose of DAP and Potash. Cover with 3-5 cm soil."
      },
      {
        dayOffset: 15,
        title: "First Irrigation & Early Shoot Borer Scouting",
        category: "irrigation",
        description: "Irrigate furrows gently. Scout for dead hearts caused by early shoot borer (Chilo infuscatellus)."
      },
      {
        dayOffset: 45,
        title: "Tillering Stage First Nitrogen Top-Dressing",
        category: "nutrient",
        description: "Top-dress 30% of total Nitrogen along cane rows. Provide light hoeing to break crust."
      },
      {
        dayOffset: 90,
        title: "Partial Earthing-Up & Second Nitrogen Split",
        category: "land-prep",
        description: "Convert furrows into ridges around cane bases. Controls late tillers and anchors roots against lodging."
      },
      {
        dayOffset: 130,
        title: "Grand Growth Stage Irrigation Scheduling",
        category: "irrigation",
        description: "Rapid internode elongation phase. Irrigate every 8-10 days in summer. Avoid moisture stress."
      },
      {
        dayOffset: 180,
        title: "Trash Mulching & Propping / Tying of Canes",
        category: "growth",
        description: "Strip lower dried leaves (trash) and mulch in furrows. Tie adjacent cane clumps together to prevent storm lodging."
      },
      {
        dayOffset: 240,
        title: "Red Rot & Pyrilla Surveillance",
        category: "pest-disease",
        description: "Inspect for third leaf yellowing or internal stalk reddening. Rogue out any infected clumps."
      },
      {
        dayOffset: 300,
        title: "Brix Sugar Content Testing & Pre-Harvest Water Cutoff",
        category: "harvest-prep",
        description: "Test cane juice with hand refractometer (target >18° Brix). Stop irrigation 20 days prior to harvest."
      },
      {
        dayOffset: 330,
        title: "Ground-Level Harvesting & Mill Dispatch",
        category: "harvest",
        description: "Cut canes flush with ground level with sharp cane knife (bottom internodes hold highest sucrose). Transport to sugar mill within 24 hours."
      }
    ]
  }
};

const farmingTaskCategories = {
  'land-prep': { name: 'Land Preparation', icon: '🚜', color: '#8D6E63', bg: 'rgba(141, 110, 99, 0.15)' },
  'seed-sowing': { name: 'Seed Selection & Sowing', icon: '🌱', color: '#80B85A', bg: 'rgba(128, 184, 90, 0.15)' },
  'germination': { name: 'Germination Monitoring', icon: '🌿', color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.15)' },
  'irrigation': { name: 'Irrigation', icon: '💧', color: '#03A9F4', bg: 'rgba(3, 169, 244, 0.15)' },
  'nutrient': { name: 'Nutrient Management', icon: '🧪', color: '#FFB300', bg: 'rgba(255, 179, 0, 0.15)' },
  'weed': { name: 'Weed Management', icon: '🌾', color: '#8BC34A', bg: 'rgba(139, 195, 74, 0.15)' },
  'pest-disease': { name: 'Pest & Disease Monitoring', icon: '🔬', color: '#E53935', bg: 'rgba(229, 57, 53, 0.15)' },
  'growth': { name: 'Crop Growth Monitoring', icon: '📈', color: '#9C27B0', bg: 'rgba(156, 39, 176, 0.15)' },
  'harvest-prep': { name: 'Harvest Preparation', icon: '🧺', color: '#FB8C00', bg: 'rgba(251, 140, 0, 0.15)' },
  'harvest': { name: 'Expected Harvesting Period', icon: '🏆', color: '#80B85A', bg: 'rgba(128, 184, 90, 0.25)' }
};

// Export to window
window.farmingCropSchedules = farmingCropSchedules;
window.farmingTaskCategories = farmingTaskCategories;
