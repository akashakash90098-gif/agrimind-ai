/**
 * AGRIMIND AI — MULTILINGUAL DATA BUILDER
 * Generates js/multilingual-data.js containing:
 * 1. cropDiseaseDatabase (Paddy, Tomato, Cotton, Wheat)
 * 2. cropKnowledgeDatabase (9 crops for Crop Planner & Comparison)
 * 3. regionalWeatherDatabase (6 regions for Weather & Irrigation)
 * 4. sampleMandiDatabase (15 market commodities & states)
 * 5. knowledgeArticlesDatabase (6 full guides with sections & takeaways)
 * across English (en), Telugu (te), Tamil (ta), and Hindi (hi).
 */

const fs = require('fs');
const path = require('path');

// 1. CROP DISEASE DATABASE
const cropDiseaseDatabase = {
  en: {
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
        "Sow certified rust-resistant varieties recommended for your specific agro-ecological zone.",
        "Maintain recommended sowing dates (avoid late December sowing in sub-mountainous tracts).",
        "Apply balanced NPK fertilization; avoid excessive nitrogen that softens leaf tissues.",
        "Regularly scout fields during foggy winter months (January to February)."
      ],
      nextSteps: [
        "Conduct thorough morning field inspections, especially in shaded, damp corners.",
        "Mark focus spots with bamboo stakes where initial yellow pustules are detected.",
        "Avoid late afternoon heavy flood irrigations during persistent overcast conditions.",
        "Document wheat variety name and sowing date before reporting to local authorities."
      ],
      consultation: "Alert your nearest KVK or Block Agricultural Officer if yellow stripes emerge before heading stage."
    }
  },
  te: {
    paddy: {
      condition: "బాక్టీరియల్ ఆకు ఎండు తెగులు (Xanthomonas oryzae)",
      severity: "మధ్యస్థ ప్రమాదం",
      symptoms: [
        "ఆకుల చివర్ల నుంచి మరియు అంచుల నుంచి నీటి డాగలతో ప్రారంభమై బూడిద-తెలుపు రంగులోకి మారుతుంది.",
        "ఈనెల వెంబడి పొడవు మరియు వెడల్పుగా అలల వంటి అంచులతో విస్తరించే మచ్చలు.",
        "అధిక తేమ ఉన్నప్పుడు ఉదయాన్నే లేత మచ్చలపై పసుపు రంగు బాక్టీరియా చుక్కలు కనిపిస్తాయి.",
        "పిలకల దశ నుండి గింజ పాలుపోసుకునే దశ వరకు తీవ్రంగా ఆకులు ఎండిపోవడం."
      ],
      prevention: [
        "సమతుల్య ఎరువుల నిర్వహణ: తెగులును పెంచే అధిక నత్రజని ఎరువుల వినియోగాన్ని నివారించండి.",
        "పొలంలో నీటిని నిల్వ ఉంచకుండా ఆరబెట్టి తడిపే విధానం పాటించండి.",
        "పక్క పొలాల్లోకి బాక్టీరియా వ్యాపించకుండా కాలువలను శుభ్రంగా ఉంచండి.",
        "పొలం గట్లపై కలుపు మొక్కలను తొలగించి పారిశుధ్యం పాటించండి."
      ],
      nextSteps: [
        "బాక్టీరియా వ్యాప్తిని అరికట్టడానికి 2-3 రోజుల పాటు పొలంలోని నిల్వ నీటిని తీసివేయండి.",
        "రోగనిరోధక శక్తిని పెంచడానికి ఎకరానికి 15-20 కిలోల పొటాష్ (MOP) ఎరువును వేయండి.",
        "నాట్లు వేసేటప్పుడు నారు కొనలను తుంచడం నివారించండి.",
        "ఆకులు తడిగా ఉన్న సమయంలో పొలంలోకి ప్రవేశించకండి."
      ],
      consultation: "20% కంటే ఎక్కువ ఆకులు ఎండిపోయినట్లయితే స్థానిక వ్యవసాయ అధికారి లేదా కృషి విజ్ఞాన కేంద్రం (KVK) ను సంప్రదించండి."
    },
    tomato: {
      condition: "ముందస్తు ఆకు ఎండు తెగులు / ఎర్లీ బ్లైట్ (Alternaria solani)",
      severity: "సాధారణ ఫంగల్ ఇన్ఫెక్షన్",
      symptoms: [
        "ఆకులపై ఏకాగ్ర వలయాలతో కూడిన ముదురు గోధుమ నుండి నలుపు మచ్చలు.",
        "దిగువ ఆకులపై పాత మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడటం.",
        "కింది ఆకులు రాలిపోయి కాయలు ఎండ తీవ్రతకు దెబ్బతినడం.",
        "తీవ్రమైన స్థితిలో భూమికి దగ్గరగా ఉన్న కాండంపై నల్లటి పుండ్లు ఏర్పడటం."
      ],
      prevention: [
        "మట్టి చిమ్మకుండా మొక్కల చుట్టూ ఎండుగడ్డి లేదా ప్లాస్టిక్ మల్చింగ్ వేయండి.",
        "ఆకులు తడవకుండా బిందు సేద్యం (డ్రిప్) పద్ధతిని పాటించండి.",
        "గాలి వెలుతురు కోసం నేల నుండి 12 అంగుళాల వరకు కింది ఆకులను కత్తిరించండి.",
        "టమాటా తర్వాత బంగాళాదుంప, వంగ లేదా మిరప వేయకుండా పంట మార్పిడి చేయండి."
      ],
      nextSteps: [
        "తెగులు సోకిన కింది ఆకులను జాగ్రత్తగా కోసి పొలానికి దూరంగా కాల్చివేయండి.",
        "మొక్కలు నేలపై పడకుండా కర్రలు లేదా తాళ్లతో ఆధారం కల్పించండి.",
        "ఆకులు కత్తిరించే కత్తెరలను డెట్టాల్ లేదా స్పిరిట్ తో శుభ్రం చేయండి.",
        "వరుసగా మంచు మరియు తేమ ఎక్కువగా ఉన్న రోజుల్లో అప్రమత్తంగా ఉండండి."
      ],
      consultation: "పచ్చి కాయలపై లేదా ప్రధాన కాండంపై మచ్చలు కనిపిస్తే వెంటనే వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి."
    },
    cotton: {
      condition: "పత్తి ఆకు ముడత వైరస్ తెగులు (CLCuD)",
      severity: "తీవ్రమైన పర్యవేక్షణ అవసరం",
      symptoms: [
        "ఆకుల అంచులు పైకి లేదా కిందికి ముడుచుకోవడం మరియు ప్రధాన ఈనెలు లావుగా మారడం.",
        "తర్వాతి దశల్లో ప్రధాన ఈనెల వెనుక భాగంలో చిన్న ఆకు వంటి ఎదుగుదలలు రావడం.",
        "మొక్కల పెరుగుదల ఆగిపోయి గుబురుగా లేదా గిడసబారి కనిపించడం.",
        "పూతకు ముందే తెగులు సోకితే పూత మరియు కాయల సంఖ్య బాగా తగ్గిపోతుంది."
      ],
      prevention: [
        "తెల్లదోమ నియంత్రణకు ఎకరానికి 10-15 పసుపు రంగు జిగురు అట్టలను అమర్చండి.",
        "పొలం గట్లపై ఉన్న తుత్తురుబెండ, పార్థీనియం వంటి కలుపు మొక్కలను పీకివేయండి.",
        "మీ ప్రాంతానికి సిఫార్సు చేసిన తెగులు నిరోధక హైబ్రిడ్ రకాలను మాత్రమే ఎంచుకోండి.",
        "తెల్లదోమ తాకిడి తప్పించడానికి ఆలస్యంగా విత్తడం నివారించండి."
      ],
      nextSteps: [
        "తెల్లదోమ ఉధృతిని గమనించడానికి పైరు ఎత్తులో పసుపు అట్టలను ఉంచండి.",
        "తీవ్రంగా దెబ్బతిన్న గిడసబారిన మొక్కలను పీకి భూమిలో పాతిపెట్టండి.",
        "మిత్రపురుగులను కాపాడటానికి సిఫార్సు చేయని రసాయన మందులను అధికంగా వాడకండి.",
        "అధిక మోతాదులో యూరియా వాడకాన్ని తగ్గించండి."
      ],
      consultation: "ఈనెలు లావుగా మారడం తోటంతా కనిపిస్తే వెంటనే మండల వ్యవసాయ విస్తరణ అధికారికి సమాచారం ఇవ్వండి."
    },
    wheat: {
      condition: "పసుపు కుంకుమ తెగులు / ఎల్లో రస్ట్ (Puccinia striiformis)",
      severity: "వాతావరణ సున్నితమైన ఫంగల్ హెచ్చరిక",
      symptoms: [
        "ఆకులపై ఈనెల వెంబడి సమాంతరంగా ప్రకాశవంతమైన పసుపు-నారింజ రంగు పొక్కుల చారలు.",
        "ఆకులను తాకినప్పుడు చేతులకు లేదా బట్టలకు పసుపు రంగు పౌడర్ అంటుకోవడం.",
        "ఆకులు, కాండం మరియు కంకులపై పసుపు చారలు వ్యాపించడం.",
        "చల్లని (10-15°C) మరియు పొగమంచుతో కూడిన చలికాలంలో వేగంగా వ్యాపిస్తుంది."
      ],
      prevention: [
        "మీ ప్రాంతానికి వ్యవసాయ పరిశోధనా కేంద్రాలు సిఫార్సు చేసిన రకాలను మాత్రమే విత్తండి.",
        "సరైన సమయంలో విత్తండి (నవంబర్ చివరి నాటికి విత్తడం పూర్తి చేయండి).",
        "ఆకులు మృదువుగా మారి తెగులు రాకుండా అధిక నత్రజని వాడకాన్ని తగ్గించండి.",
        "జనవరి, ఫిబ్రవరి నెలల్లో ఉదయాన్నే క్రమం తప్పకుండా పొలాన్ని తనిఖీ చేయండి."
      ],
      nextSteps: [
        "పొలంలో నీడ మరియు తేమ ఎక్కువగా ఉండే ప్రదేశాలలో రోజూ పరిశీలించండి.",
        "పసుపు పొక్కులు కనిపించిన ప్రదేశంలో గుర్తుగా వెదురు బొంగులు నాటండి.",
        "ఆకాశం మేఘావృతమై ఉన్నప్పుడు సాయంత్రం వేళల్లో భారీ నీటి తడులు ఇవ్వకండి.",
        "విత్తిన గోధుమ రకం మరియు విత్తిన తేదీ వివరాలను నమోదు చేసుకుని అధికారులను సంప్రదించండి."
      ],
      consultation: "కంకి దశకు ముందే పసుపు చారలు కనిపిస్తే వెంటనే సమీపంలోని కృషి విజ్ఞాన కేంద్రం (KVK) నిపుణులను సంప్రదించండి."
    }
  },
  ta: {
    paddy: {
      condition: "பாக்டீரியா இலைக்கருகல் நோய் (Xanthomonas oryzae)",
      severity: "நடுத்தர ஆபத்து",
      symptoms: [
        "இலைகளின் நுனி மற்றும் ஓரங்களில் இருந்து நீர் கசிந்த கோடுகளாக தொடங்கி சாம்பல்-வெள்ளை நிறமாக மாறும்.",
        "நரம்புகளின் வழியாக நீளமாகவும் அகலமாகவும் அலைபோன்ற விளிம்புகளுடன் பரவும் புள்ளிகள்.",
        "அதிக ஈரப்பதத்தில் அதிகாலையில் இளம் புள்ளிகளில் மஞ்சள் நிற பாக்டீரியா கசிவு திரவம் காணப்படும்.",
        "தூர்கட்டும் பருவம் முதல் பால் பிடிக்கும் பருவம் வரை இலைகள் வேகமாக காய்ந்துபோதல்."
      ],
      prevention: [
        "சீரான உர மேலாண்மை: கருகல் நோயை அதிகரிக்கும் அதிகப்படியான தழைச்சத்தை (யூரியா) தவிர்க்கவும்.",
        "வயலில் தொடர்ந்து தண்ணீர் தேங்க விடாமல் உலரவிட்டு நீர் பாய்ச்சும் முறையை பின்பற்றவும்.",
        "பக்கத்து வயல்களுக்கு நோய் பரவாமல் இருக்க பாசன வாய்க்கால்களை சுத்தமாக வைக்கவும்.",
        "வரப்புகளில் உள்ள தேவையற்ற களைகளை அகற்றி வயலை தூய்மையாக பராமரிக்கவும்."
      ],
      nextSteps: [
        "பாக்டீரியா பெருகுவதை கட்டுப்படுத்த 2-3 நாட்களுக்கு வயலில் தேங்கியுள்ள தண்ணீரை வடிக்கவும்.",
        "நோய் எதிர்ப்பு திறனை அதிகரிக்க ஏக்கருக்கு 15-20 கிலோ பொட்டாஷ் உரத்தை இடவும்.",
        "நாற்று நடும் போது நாற்றின் நுனிகளை கிள்ளுவதை தவிர்க்கவும்.",
        "இலைகளில் பனி அல்லது ஈரம் இருக்கும்போது வயலுக்குள் வேலை செய்வதை தவிர்க்கவும்."
      ],
      consultation: "20% க்கும் மேற்பட்ட இலைகள் கருகினால் உடனே உங்கள் வட்டார வேளாண்மை அலுவலர் அல்லது KVK விஞ்ஞானியை அணுகவும்."
    },
    tomato: {
      condition: "தக்காளி ஆரம்ப இலைக்கருகல் நோய் (Alternaria solani)",
      severity: "பொதுவான பூஞ்சாண தொற்று",
      symptoms: [
        "இலைகளில் இலக்கு பலகை போன்ற வளையங்களுடன் கூடிய அடர் பழுப்பு முதல் கருப்பு புள்ளிகள்.",
        "கீழ் இலைகளில் உள்ள பழைய புள்ளிகளைச் சுற்றி மஞ்சள் நிற வளையம் தோன்றுதல்.",
        "கீழ் இலைகள் உதிர்ந்து காய்கள் நேரடி வெயிலில் பட்டு வெம்பி போதல்.",
        "தீவிர நிலையில் தண்டுப் பகுதியில் தரை மட்டத்தில் கருமையான புண்கள் உருவாதல்."
      ],
      prevention: [
        "மண்ணிலுள்ள பூஞ்சாணம் இலைகளில் தெறிக்காமல் இருக்க வைக்கோல் அல்லது பிளாஸ்டிக் மூடாக்கு இடவும்.",
        "சொட்டு நீர்ப்பாசனம் அமைக்கவும்; இலைகள் நனையும்படி தெளிப்பு நீர் பாசனத்தை தவிர்க்கவும்.",
        "காற்றோட்டம் கிடைக்க நிலத்திலிருந்து 12 அங்குலம் வரை உள்ள கீழ் இலைகளை கவாத்து செய்யவும்.",
        "தக்காளிக்கு பின் உருளை அல்லது கத்தரி பயிரிடாமல் 2 பருவங்களுக்கு பயிர் சுழற்சி செய்யவும்."
      ],
      nextSteps: [
        "நோய் தாக்கிய கீழ் இலைகளை கவனமாக கிள்ளி வயலுக்கு வெளியே தீயிட்டு அழிக்கவும்.",
        "செடிகள் தரையில் படாமல் குச்சிகள் நட்டு பாதுகாப்பாக கட்டிவிடவும்.",
        "கவாத்து செய்யும் கத்திரிகளை டெட்டால் அல்லது ஸ்பிரிட் கொண்டு சுத்தப்படுத்தவும்.",
        "தொடர் பனிமூட்டம் அல்லது மழைக்காலங்களில் செடிகளை தீவிரமாக கண்காணிக்கவும்."
      ],
      consultation: "பச்சைக் காய்களிலோ அல்லது முக்கிய தண்டிலோ வளைய புள்ளிகள் தோன்றினால் உடனடியாக தோட்டக்கலை அலுவலரை அணுகவும்."
    },
    cotton: {
      condition: "பருத்தி இலைச்சுருட்டு வைரஸ் நோய் (CLCuD)",
      severity: "தீவிர கண்காணிப்பு தேவை",
      symptoms: [
        "இலை விளிம்புகள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருண்டு நரம்புகள் தடிமனாக மாறுதல்.",
        "முதிர்ந்த நிலையில் இலை நரம்புகளின் அடியில் சிறிய இலை போன்ற வளர்ச்சிகள் தோன்றுதல்.",
        "செடியின் வளர்ச்சி குன்றி புதர் போன்ற அல்லது குட்டை தோற்றமளித்தல்.",
        "பூக்கும் முன் தாக்கப்பட்டால் பூ மொட்டுகள் மற்றும் காய்களின் எண்ணிக்கை கணிசமாக குறையும்."
      ],
      prevention: [
        "வெள்ளை ஈக்களை கட்டுப்படுத்த ஏக்கருக்கு 10-15 மஞ்சள் ஒட்டும் பொறிகளை நிறுவவும்.",
        "வரப்புகளில் உள்ள துத்தி மற்றும் பார்த்தீனியம் போன்ற களைகளை வேருடன் அகற்றவும்.",
        "உங்கள் பகுதிக்கு பரிந்துரைக்கப்பட்ட நோய் எதிர்ப்பு வீரிய ஒட்டு ரகங்களை பயிரிடவும்.",
        "வெள்ளை ஈக்களின் தாக்குதலை தவிர்க்க சரியான பருவத்தில் விதைப்பை முடிக்கவும்."
      ],
      nextSteps: [
        "வெள்ளை ஈக்களின் நடமாட்டத்தை கண்காணிக்க பயிரின் உயரத்திற்கு மஞ்சள் பொறிகளை வைக்கவும்.",
        "ஆரம்ப நிலையிலேயே தீவிரமாக தாக்கப்பட்ட குட்டை செடிகளை பிடுங்கி மண்ணில் புதைக்கவும்.",
        "நன்மை செய்யும் பூச்சிகளை பாதுகாக்க தேவையின்றி அதிக வீரிய பூச்சிக்கொல்லிகளை தெளிக்காதீர்கள்.",
        "அதிகப்படியான யூரியா பயன்பாட்டை தவிர்க்கவும்."
      ],
      consultation: "நரம்புகள் தடிமனாதல் வயல் முழுவதும் தென்பட்டால் உடனடியாக வேளாண் விரிவாக்க அலுவலருக்கு தகவல் தெரிவிக்கவும்."
    },
    wheat: {
      condition: "மஞ்சள் துரு நோய் / ஸ்ட்ரைப் ரஸ்ட் (Puccinia striiformis)",
      severity: "வானிலை உணர்திறன் பூஞ்சாண எச்சரிக்கை",
      symptoms: [
        "இலை நரம்புகளுக்கு இணையாக பிரகாசமான மஞ்சள்-ஆரஞ்சு நிற பொடி போன்ற வரிகள் தோன்றுதல்.",
        "இலைகளை தொடும்போது கைகளிலோ அல்லது ஆடைகளிலோ மஞ்சள் பொடி ஒட்டிக்கொள்ளுதல்.",
        "இலைகள், தண்டுகள் மற்றும் கதிர்களில் மஞ்சள் கோடுகள் பரவுதல்.",
        "குளிர்ந்த (10-15°C) மற்றும் பனிமூட்டமான குளிர்காலத்தில் வேகமாக பரவும் தன்மை கொண்டது."
      ],
      prevention: [
        "உங்கள் மண்டலத்திற்கு வேளாண் பல்கலைக்கழகத்தால் சான்றளிக்கப்பட்ட துரு எதிர்ப்பு விதைகளை விதைக்கவும்.",
        "பரிந்துரைக்கப்பட்ட காலத்திற்குள் விதைப்பை முடிக்கவும் (டிசம்பர் தாமத விதைப்பை தவிர்க்கவும்).",
        "சீரான உரங்களை இடவும்; இலைகளை மென்மையாக்கும் அதிக தழைச்சத்தை தவிர்க்கவும்.",
        "ஜனவரி, பிப்ரவரி பனி மாதங்களில் அதிகாலையில் வயலை தொடர்ச்சியாக பார்வையிடவும்."
      ],
      nextSteps: [
        "வயலின் நிழல் மற்றும் ஈரப்பதம் மிகுந்த பகுதிகளில் தினசரி ஆய்வு மேற்கொள்ளவும்.",
        "மஞ்சள் பொடி தென்படும் இடங்களில் அடையாளமாக மூங்கில் குச்சிகளை நட்டு கண்காணிக்கவும்.",
        "வானம் மேகமூட்டமாக இருக்கும் மாலை வேளைகளில் அதிகப்படியான பாசனத்தை தவிர்க்கவும்.",
        "கோதுமை ரகம் மற்றும் விதைத்த தேதியைக் குறித்துக்கொண்டு அதிகாரிகளைத் தொடர்பு கொள்ளவும்."
      ],
      consultation: "கதிர் வெளிவரும் பருவத்திற்கு முன்பே மஞ்சள் புள்ளிகள் தோன்றினால் உடனடியாக KVK அலுவலரைத் தொடர்பு கொள்ளவும்."
    }
  },
  hi: {
    paddy: {
      condition: "जीवाणु पत्ती झुलसा / बैक्टीरियल लीफ ब्लाइट (Xanthomonas oryzae)",
      severity: "मध्यम जोखिम",
      symptoms: [
        "पत्तियों के सिरों और किनारों से पानी जैसे गीले धब्बे शुरू होकर राख जैसे सफेद हो जाते हैं।",
        "नसों के समानांतर लहरदार किनारों वाले लंबे धब्बे तेजी से बढ़ते हैं।",
        "अधिक नमी में सुबह के समय नए धब्बों पर पीले रंग की जीवाणु बूंदें दिखाई देती हैं।",
        "कल्ले फूटने से लेकर बाली निकलने तक पत्तियां सूखने से पैदावार घटती है।"
      ],
      prevention: [
        "संतुलित खाद डालें: यूरिया का अत्यधिक प्रयोग तुरंत बंद करें जिससे रोग तेजी से न फैले।",
        "खेत से 2-3 दिन के लिए पानी निकालकर जमीन को हवा लगने दें।",
        "सिंचाई की नालियों को साफ रखें ताकि बैक्टीरिया दूसरे खेतों में न फैले।",
        "मेड़ों पर उगी जंगली घास और खरपतवार को पूरी तरह साफ करें।"
      ],
      nextSteps: [
        "खेत में भरा पानी तुरंत बाहर निकालें ताकि बैक्टीरिया का फैलाव रुक सके।",
        "प्रति एकड़ 15-20 किलोग्राम पोटाश (MOP) डालकर पौधों की रोग प्रतिरोधक क्षमता बढ़ाएं।",
        "रोपाई के समय पौध के ऊपरी सिरे न काटें।",
        "पत्तियां गीली होने पर खेत में काम न करें जिससे रोग आगे न फैले।"
      ],
      consultation: "यदि 20% से अधिक पत्तियां सूखने लगें तो तुरंत नजदीकी कृषि विज्ञान केंद्र (KVK) के विशेषज्ञ से संपर्क करें।"
    },
    tomato: {
      condition: "अगेती झुलसा / अर्ली ब्लाइट (Alternaria solani)",
      severity: "सामान्य फफूंद संक्रमण",
      symptoms: [
        "पत्तियों पर गोल छल्लेदार गहरे भूरे या काले धब्बे (निशाने जैसे छल्ले)।",
        "निचली पत्तियों पर पुराने धब्बों के चारों ओर पीला घेरा बन जाता है।",
        "पत्तियां नीचे से ऊपर की ओर सूखकर गिरने लगती हैं और फल धूप से जलने लगते हैं।",
        "गंभीर स्थिति में तने के निचले हिस्से पर काले धंसे हुए घाव बन जाते हैं।"
      ],
      prevention: [
        "मिट्टी के छींटों से बचाने के लिए पौधों के चारों ओर पुआल या प्लास्टिक मल्च लगाएं।",
        "ड्रिप विधि से सिंचाई करें; फव्वारा सिंचाई से बचें जिससे पत्तियां गीली न हों।",
        "हवा का संचार बढ़ाने के लिए जमीन से 12 इंच ऊपर तक की निचली पत्तियां काट दें।",
        "टमाटर के बाद आलू या बैंगन न लगाकर 2 मौसम तक गैर-सोलनेसी फसल चक्र अपनाएं।"
      ],
      nextSteps: [
        "रोगग्रस्त निचली पत्तियों को सावधानीपूर्वक तोड़कर खेत से दूर नष्ट कर दें।",
        "पौधों को डंडों से बांधें ताकि फल और पत्तियां जमीन के संपर्क में न आएं।",
        "कटाई-छंटाई की कैंची को डेटॉल या ब्लीच के घोल से साफ रखें।",
        "लगातार नमी और ओस वाले दिनों में पौधों की विशेष देखभाल करें।"
      ],
      consultation: "यदि हरे फलों या मुख्य तने पर धब्बे दिखाई देने लगें तो तुरंत कृषि वैज्ञानिक की सलाह लें।"
    },
    cotton: {
      condition: "कपास का पत्ती मरोड़ रोग (CLCuD वायरस)",
      severity: "सघन निगरानी आवश्यक",
      symptoms: [
        "पत्तियों के किनारे ऊपर या नीचे की ओर मुड़ जाते हैं और नसें मोटी हो जाती हैं।",
        "पत्ती की निचली सतह पर नसों के पास छोटी पत्ती जैसी विकृतियां उभर आती हैं।",
        "पौधों की बढ़वार रुक जाती है और पौधा झाड़ीनुमा दिखने लगता है।",
        "फूल आने से पहले संक्रमण होने पर टिंडे बहुत कम बनते हैं।"
      ],
      prevention: [
        "सफेद मक्खी की रोकथाम हेतु प्रति एकड़ 10-15 पीले चिपचिपे ट्रैप (येलो स्टिकी ट्रैप) लगाएं।",
        "खेत की मेड़ों से कंघी बूटी और गाजर घास जैसे खरपतवार उखाड़कर नष्ट करें।",
        "अपने क्षेत्र के लिए अनुशंसित रोग-रोधी हाइब्रिड किस्मों की ही बुवाई करें।",
        "देरी से बुवाई करने से बचें ताकि सफेद मक्खी का प्रकोप न हो।"
      ],
      nextSteps: [
        "सफेद मक्खी की संख्या जांचने के लिए तुरंत फसल की ऊंचाई पर पीले ट्रैप लगाएं।",
        "शुरुआती खेत में गंभीर रूप से बौने पौधों को उखाड़कर जमीन में दबा दें।",
        "पौधों के बीच उचित दूरी रखें ताकि मित्र कीटों को संरक्षण मिल सके।",
        "अत्यधिक यूरिया के छिड़काव से बचें।"
      ],
      consultation: "यदि नसों का मोटा होना पूरे खेत में दिखे तो तुरंत कृषि विभाग के अधिकारियों को सूचित करें।"
    },
    wheat: {
      condition: "पीला रतुआ / स्ट्राइप रस्ट (Puccinia striiformis)",
      severity: "मौसम-संवेदनशील फंगल चेतावनी",
      symptoms: [
        "पत्तियों पर नसों के समानांतर चमकदार पीले-नारंगी पाउडर की धारियां बन जाती हैं।",
        "उंगलियों से छूने पर उंगलियों पर पीला हल्दी जैसा पाउडर लग जाता है।",
        "पत्तियों, डंडियों और बालियों पर पीली धारियां दिखाई देती हैं।",
        "ठंडे (10-15°C) और कोहरे वाले मौसम में यह रोग बहुत तेजी से फैलता है।"
      ],
      prevention: [
        "अपने कृषि क्षेत्र के लिए प्रमाणित रतुआ-रोधी गेहूं किस्मों का ही बीज बोएं।",
        "समय पर बुवाई करें (दिसंबर के अंतिम सप्ताह तक बुवाई में देरी न करें)।",
        "संतुलित खाद का प्रयोग करें और यूरिया की अधिक मात्रा न डालें।",
        "जनवरी के कोहरे वाले दिनों में सुबह के समय खेत का नियमित निरीक्षण करें।"
      ],
      nextSteps: [
        "रोज सुबह खेत का चक्कर लगाएं, विशेषकर छायादार व नमी वाले हिस्सों में।",
        "जहां भी पीली धारियां दिखें, उस स्थान पर झंडी लगाकर निगरानी रखें।",
        "बादल छाए रहने के दौरान शाम की भारी सिंचाई से बचें।",
        "गेहूं की किस्म और बुवाई की तारीख नोट कर विशेषज्ञ से संपर्क करें।"
      ],
      consultation: "बाली निकलने से पहले पीला पाउडर दिखाई देने पर तुरंत नजदीकी केवीके वैज्ञानिक को सूचित करें।"
    }
  }
};

// 2. CROP KNOWLEDGE DATABASE FOR PLANNER & COMPARISON
const cropKnowledgeDatabase = {
  en: {
    paddy: {
      name: "Paddy / Rice (Oryza sativa)",
      duration: "115 – 140 days",
      expectedYield: "20 – 30 Quintals / Acre",
      investmentLevel: "Medium (₹16,000 – ₹24,000 / Acre)",
      waterNeed: "High (1200 - 1500 mm)",
      marketDemand: "Consistent High (MSP & Open Mandi)",
      whySuitable: "Thrives in warm, humid conditions with abundant water availability and heavy clay or alluvial soils capable of water retention.",
      verificationFactors: "Check assured water supply for the initial 60 days, puddling soil depth, and local MSP procurement centers."
    },
    wheat: {
      name: "Wheat (Triticum aestivum)",
      duration: "120 – 145 days",
      expectedYield: "18 – 24 Quintals / Acre",
      investmentLevel: "Low to Medium (₹12,000 – ₹18,000 / Acre)",
      waterNeed: "Moderate (450 - 650 mm)",
      marketDemand: "Very High (Government Procurement & Commercial)",
      whySuitable: "Ideal winter crop for northern and central Indian plains requiring cool temperatures during vegetative growth and bright sunshine during grain filling.",
      verificationFactors: "Confirm timely winter sowing (November 10 – 25) to avoid terminal heat stress during March maturity."
    },
    cotton: {
      name: "Cotton (Gossypium hirsutum)",
      duration: "150 – 180 days",
      expectedYield: "8 – 14 Quintals / Acre",
      investmentLevel: "High (₹22,000 – ₹32,000 / Acre)",
      waterNeed: "Moderate (700 - 900 mm)",
      marketDemand: "High Commercial (Textile Mills & CCI)",
      whySuitable: "Deep root system performs exceptionally well in moisture-retentive black cotton soils with sunny, frost-free weather.",
      verificationFactors: "Monitor pink bollworm and sucking pest pressure; ensure proper drainage to prevent waterlogging."
    },
    soybean: {
      name: "Soybean (Glycine max)",
      duration: "90 – 105 days",
      expectedYield: "8 – 12 Quintals / Acre",
      investmentLevel: "Low (₹10,000 – ₹15,000 / Acre)",
      waterNeed: "Moderate (500 - 650 mm)",
      marketDemand: "Strong (Edible Oil & Meal Processing)",
      whySuitable: "Short-duration nitrogen-fixing legume that enriches soil fertility while generating rapid cash returns in rainfed tracts.",
      verificationFactors: "Ensure seed germination test (>70%) before sowing and apply Rhizobium bio-fertilizer inoculant."
    },
    groundnut: {
      name: "Groundnut / Peanut (Arachis hypogaea)",
      duration: "105 – 125 days",
      expectedYield: "10 – 16 Quintals / Acre",
      investmentLevel: "Medium (₹14,000 – ₹20,000 / Acre)",
      waterNeed: "Low to Moderate (400 - 550 mm)",
      marketDemand: "Steady High (Oil Mills & Confectionery)",
      whySuitable: "Excellent tolerance to light soils and moderate moisture; ideal for semi-arid red soil zones of southern and western India.",
      verificationFactors: "Apply gypsum at 150-200 kg/acre at 40-45 DAS for pod filling and calcium enrichment."
    },
    mustard: {
      name: "Mustard / Rapeseed (Brassica juncea)",
      duration: "110 – 130 days",
      expectedYield: "6 – 10 Quintals / Acre",
      investmentLevel: "Low (₹8,000 – ₹12,000 / Acre)",
      waterNeed: "Low (250 - 350 mm)",
      marketDemand: "High (Edible Mustard Oil Extraction)",
      whySuitable: "Highly economical winter oilseed requiring minimal irrigation and thriving across north and central Indian conditions.",
      verificationFactors: "Monitor for aphid infestation during cloudy winter spells and provide irrigation at pre-flowering."
    },
    chickpea: {
      name: "Chickpea / Bengal Gram (Cicer arietinum)",
      duration: "100 – 120 days",
      expectedYield: "7 – 12 Quintals / Acre",
      investmentLevel: "Low (₹9,000 – ₹14,000 / Acre)",
      waterNeed: "Low (200 - 300 mm)",
      marketDemand: "Consistently High (Dal & Besan processing)",
      whySuitable: "Drought-hardy pulse crop with low water requirement that fixes atmospheric nitrogen, improving subsequent soil health.",
      verificationFactors: "Avoid fields prone to water stagnation or soil-borne wilt (Fusarium); practice seed treatment."
    },
    maize: {
      name: "Maize / Corn (Zea mays)",
      duration: "95 – 115 days",
      expectedYield: "25 – 35 Quintals / Acre",
      investmentLevel: "Medium (₹15,000 – ₹22,000 / Acre)",
      waterNeed: "Moderate (500 - 700 mm)",
      marketDemand: "High (Poultry Feed, Starch, Silage)",
      whySuitable: "Versatile, high-biomass cereal crop suitable for all three seasons with wide agro-climatic adaptability and strong industrial feed demand.",
      verificationFactors: "Scout for Fall Armyworm (FAW) at seedling stage; ensure soil has no water stagnation."
    },
    tomato: {
      name: "Hybrid Tomato (Solanum lycopersicum)",
      duration: "120 – 150 days",
      expectedYield: "150 – 250 Quintals / Acre",
      investmentLevel: "High (₹35,000 – ₹55,000 / Acre)",
      waterNeed: "Moderate to High (Drip Preferred)",
      marketDemand: "Volatile High (Daily Mandi & Food Processing)",
      whySuitable: "High-value horticultural crop with substantial profit potential when grown under trellis or drip irrigation with proper crop care.",
      verificationFactors: "Check local cold storage availability and market price trends; invest in staking/trellising."
    }
  },
  te: {
    paddy: {
      name: "వరి / వరిధాన్యం (Oryza sativa)",
      duration: "115 – 140 రోజులు",
      expectedYield: "20 – 30 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "మధ్యస్థం (₹16,000 – ₹24,000 / ఎకరా)",
      waterNeed: "అధికం (1200 - 1500 మి.మీ)",
      marketDemand: "స్థిరమైన అధిక గిరాకీ (MSP & మార్కెట్)",
      whySuitable: "అధిక ఉష్ణోగ్రత, తేమ మరియు నీటి నిల్వ సామర్థ్యం గల నల్లరేగడి లేదా ఒండ్రు నేలల్లో అద్భుతంగా పండుతుంది.",
      verificationFactors: "మొదటి 60 రోజుల పాటు నిరంతర నీటి లభ్యత, నేల దమ్ము లోతు మరియు స్థానిక ధాన్యం కొనుగోలు కేంద్రాలను తనిఖీ చేయండి."
    },
    wheat: {
      name: "గోధుమ (Triticum aestivum)",
      duration: "120 – 145 రోజులు",
      expectedYield: "18 – 24 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "తక్కువ నుండి మధ్యస్థం (₹12,000 – ₹18,000 / ఎకరా)",
      waterNeed: "మధ్యస్థం (450 - 650 మి.మీ)",
      marketDemand: "చాలా ఎక్కువ (ప్రభుత్వ కొనుగోలు & మార్కెట్)",
      whySuitable: "శీతాకాలపు చల్లని వాతావరణం మరియు గింజ పాలుపోసుకునే సమయంలో ఎండ ఉన్న ప్రాంతాల్లో ఉత్తమ దిగుబడిని ఇస్తుంది.",
      verificationFactors: "మార్చిలో వచ్చే వేడి గాలుల ఒత్తిడిని తప్పించడానికి నవంబర్ 10 నుండి 25 లోపు సకాలంలో విత్తడం ముఖ్యం."
    },
    cotton: {
      name: "పత్తి / దూది (Gossypium hirsutum)",
      duration: "150 – 180 రోజులు",
      expectedYield: "8 – 14 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "ఎక్కువ (₹22,000 – ₹32,000 / ఎకరా)",
      waterNeed: "మధ్యస్థం (700 - 900 మి.మీ)",
      marketDemand: "అధిక వాణిజ్య డిమాండ్ (టెక్స్‌టైల్ & సీసీఐ)",
      whySuitable: "తేమను నిలుపుకునే లోతైన నల్లరేగడి నేలల్లో మరియు ఎండతో కూడిన వాతావరణంలో లోతుగా వెళ్లే వేరు వ్యవస్థతో బాగా పెరుగుతుంది.",
      verificationFactors: "గులాబీ రంగు కాయతొలుచు పురుగు మరియు రసం పీల్చే పురుగుల ఉధృతిని పర్యవేక్షించండి; నీరు నిలవకుండా చూసుకోండి."
    },
    soybean: {
      name: "సోయాబీన్ (Glycine max)",
      duration: "90 – 105 రోజులు",
      expectedYield: "8 – 12 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "తక్కువ (₹10,000 – ₹15,000 / ఎకరా)",
      waterNeed: "మధ్యస్థం (500 - 650 మి.మీ)",
      marketDemand: "బలమైన డిమాండ్ (నూనె మిల్లులు & దాణా)",
      whySuitable: "నత్రజనిని స్థిరీకరించే స్వల్పకాలిక అపరాల పంట; భూసారాన్ని పెంచుతూ వర్షాధార ప్రాంతాల్లో త్వరిత ఆదాయాన్ని ఇస్తుంది.",
      verificationFactors: "విత్తే ముందు మొలక శాతం (>70%) పరీక్షించండి మరియు రైజోబియం జీవన ఎరువుతో విత్తన శుద్ధి చేయండి."
    },
    groundnut: {
      name: "వేరుశనగ / పల్లీ (Arachis hypogaea)",
      duration: "105 – 125 రోజులు",
      expectedYield: "10 – 16 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "మధ్యస్థం (₹14,000 – ₹20,000 / ఎకరా)",
      waterNeed: "తక్కువ నుండి మధ్యస్థం (400 - 550 మి.మీ)",
      marketDemand: "స్థిరమైన డిమాండ్ (నూనె & ఆహార ఉత్పత్తులు)",
      whySuitable: "ఎర్ర నేలలు మరియు బెట్ట పరిస్థితులను తట్టుకునే అద్భుతమైన నూనెగింజల పంట.",
      verificationFactors: "ఊడలు దిగే దశలో (40-45 రోజులు) కాయ నిండటానికి ఎకరానికి 150-200 కిలోల జిప్సం వేయండి."
    },
    mustard: {
      name: "ఆవాలు (Brassica juncea)",
      duration: "110 – 130 రోజులు",
      expectedYield: "6 – 10 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "తక్కువ (₹8,000 – ₹12,000 / ఎకరా)",
      waterNeed: "తక్కువ (250 - 350 మి.మీ)",
      marketDemand: "అధిక డిమాండ్ (ఆవనూనె తయారీ)",
      whySuitable: "తక్కువ నీటితో పండే అత్యంత లాభదాయకమైన రబీ నూనెగింజల పంట.",
      verificationFactors: "మబ్బులతో కూడిన చలి వాతావరణంలో పేనుబంక తాకిడిని పర్యవేక్షించండి; పూతకు ముందు నీటి తడి అందించండి."
    },
    chickpea: {
      name: "శనగలు / బెంగాల్ గ్రామ్ (Cicer arietinum)",
      duration: "100 – 120 రోజులు",
      expectedYield: "7 – 12 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "తక్కువ (₹9,000 – ₹14,000 / ఎకరా)",
      waterNeed: "తక్కువ (200 - 300 మి.మీ)",
      marketDemand: "నిరంతరం అధికం (పప్పు & బేసన్ మిల్లులు)",
      whySuitable: "బెట్టను తట్టుకునే తక్కువ నీటి అవసరం గల పప్పుధాన్యాల పంట; నేలకు సహజ నత్రజనిని చేకూరుస్తుంది.",
      verificationFactors: "నీరు నిలిచే పొలాలను నివారించండి; ఎండు తెగులు రాకుండా ట్రైకోడెర్మాతో విత్తన శుద్ధి చేయండి."
    },
    maize: {
      name: "మొక్కజొన్న (Zea mays)",
      duration: "95 – 115 రోజులు",
      expectedYield: "25 – 35 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "మధ్యస్థం (₹15,000 – ₹22,000 / ఎకరా)",
      waterNeed: "మధ్యస్థం (500 - 700 మి.మీ)",
      marketDemand: "అధిక డిమాండ్ (కోళ్ల దాణా & స్టార్చ్ పరిశ్రమ)",
      whySuitable: "అన్ని సీజన్లలో పండించగల అధిక బయోమాస్ గల ఆహార ధాన్యపు పంట; విస్తృత వాతావరణ అనుకూలత కలిగి ఉంది.",
      verificationFactors: "మొలక దశలోనే కత్తెర పురుగు (ఫాల్ ఆర్మీవార్మ్) నివారణకు జాగ్రత్తలు తీసుకోండి."
    },
    tomato: {
      name: "హైబ్రిడ్ టమాటా (Solanum lycopersicum)",
      duration: "120 – 150 రోజులు",
      expectedYield: "150 – 250 క్వింటాళ్లు / ఎకరా",
      investmentLevel: "ఎక్కువ (₹35,000 – ₹55,000 / ఎకరా)",
      waterNeed: "మధ్యస్థం నుండి ఎక్కువ (డ్రిప్ మేలైనది)",
      marketDemand: "హై వాల్యూ (రోజువారీ మార్కెట్ & ప్రాసెసింగ్)",
      whySuitable: "మద్దతు కర్రలు మరియు డ్రిప్ సేద్యంతో అధిక ఆదాయాన్ని అందించే వాణిజ్య ఉద్యాన పంట.",
      verificationFactors: "స్థానిక మార్కెట్ ధరలు మరియు కోల్డ్ స్టోరేజ్ సదుపాయాలను ముందుగానే తనిఖీ చేసుకోండి."
    }
  },
  ta: {
    paddy: {
      name: "நெல் / நெற்பயிர் (Oryza sativa)",
      duration: "115 – 140 நாட்கள்",
      expectedYield: "20 – 30 குவிண்டால் / ஏக்கர்",
      investmentLevel: "நடுத்தரம் (₹16,000 – ₹24,000 / ஏக்கர்)",
      waterNeed: "அதிகம் (1200 - 1500 மி.மீ)",
      marketDemand: "நிலையான அதிக தேவை (MSP & மண்டிகள்)",
      whySuitable: "அதிக வெப்பம், ஈரப்பதம் மற்றும் களிமண் அல்லது வண்டல் மண் உள்ள பாசன நிலங்களுக்கு மிகவும் ஏற்றது.",
      verificationFactors: "முதல் 60 நாட்களுக்கு தடையற்ற நீர் வசதி மற்றும் நேரடி கொள்முதல் நிலையங்களை உறுதிப்படுத்தவும்."
    },
    wheat: {
      name: "கோதுமை (Triticum aestivum)",
      duration: "120 – 145 நாட்கள்",
      expectedYield: "18 – 24 குவிண்டால் / ஏக்கர்",
      investmentLevel: "குறைவு முதல் நடுத்தரம் (₹12,000 – ₹18,000 / ஏக்கர்)",
      waterNeed: "நடுத்தரம் (450 - 650 மி.மீ)",
      marketDemand: "மிக அதிகம் (அரசு கொள்முதல் & சந்தை)",
      whySuitable: "குளிர்கால குளிர்ந்த சூழல் மற்றும் கதிர் பிடிக்கும் போது நல்ல வெயில் தேவைப்படும் சிறந்த உணவுப் பயிர்.",
      verificationFactors: "மார்ச் மாத வெப்ப அழுத்தத்தைத் தவிர்க்க நவம்பர் 10 முதல் 25க்குள் சரியான நேரத்தில் விதைக்கவும்."
    },
    cotton: {
      name: "பருத்தி (Gossypium hirsutum)",
      duration: "150 – 180 நாட்கள்",
      expectedYield: "8 – 14 குவிண்டால் / ஏக்கர்",
      investmentLevel: "அதிகம் (₹22,000 – ₹32,000 / ஏக்கர்)",
      waterNeed: "நடுத்தரம் (700 - 900 மி.மீ)",
      marketDemand: "அதிக வணிக மதிப்பு (ஜவுளி ஆலைகள் & CCI)",
      whySuitable: "ஈரப்பதத்தைத் தக்கவைக்கும் கரிசல் மண்ணிலும், நல்ல சூரிய ஒளியிலும் ஆழமான வேர் அமைப்புடன் செழித்து வளரும்.",
      verificationFactors: "இளஞ்சிவப்பு காய்ப்புழு மற்றும் சாறு உறிஞ்சும் பூச்சிகளைக் கண்காணிக்கவும்; நீர் தேங்காமல் வடிகால் அமைக்கவும்."
    },
    soybean: {
      name: "சோயாபீன் (Glycine max)",
      duration: "90 – 105 நாட்கள்",
      expectedYield: "8 – 12 குவிண்டால் / ஏக்கர்",
      investmentLevel: "குறைவு (₹10,000 – ₹15,000 / ஏக்கர்)",
      waterNeed: "நடுத்தரம் (500 - 650 மி.மீ)",
      marketDemand: "வலுவான தேவை (எண்ணெய் ஆலைகள் & புண்ணாக்கு)",
      whySuitable: "மண்ணில் தழைச்சத்தை நிலைநிறுத்தும் குறுகிய கால பயறுவகை பயிர்; விரைவான வருமானம் தரக்கூடியது.",
      verificationFactors: "விதைப்பதற்கு முன் முளைப்புத் திறனை (>70%) சோதித்து ரைசோபியம் கொண்டு விதை நேர்த்தி செய்யவும்."
    },
    groundnut: {
      name: "நிலக்கடலை / மணிலா (Arachis hypogaea)",
      duration: "105 – 125 நாட்கள்",
      expectedYield: "10 – 16 குவிண்டால் / ஏக்கர்",
      investmentLevel: "நடுத்தரம் (₹14,000 – ₹20,000 / ஏக்கர்)",
      waterNeed: "குறைவு முதல் நடுத்தரம் (400 - 550 மி.மீ)",
      marketDemand: "நிலையான அதிக தேவை (எண்ணெய் & உணவு)",
      whySuitable: "செம்மண் மற்றும் லேசான நிலங்களில் வறட்சியைத் தாங்கி வளரக்கூடிய சிறந்த எண்ணெய் வித்துப் பயிர்.",
      verificationFactors: "காய் திரட்சிக்காக விதைத்த 40-45 ஆம் நாளில் ஏக்கருக்கு 150-200 கிலோ ஜிப்சம் இடவும்."
    },
    mustard: {
      name: "கடுகு (Brassica juncea)",
      duration: "110 – 130 நாட்கள்",
      expectedYield: "6 – 10 குவிண்டால் / ஏக்கர்",
      investmentLevel: "குறைவு (₹8,000 – ₹12,000 / ஏக்கர்)",
      waterNeed: "குறைவு (250 - 350 மி.மீ)",
      marketDemand: "அதிகம் (கடுகு எண்ணெய் உற்பத்தி)",
      whySuitable: "குறைந்த பாசன நீரில் அதிக லாபம் தரக்கூடிய குளிர்கால எண்ணெய் வித்துப் பயிர்.",
      verificationFactors: "மேகமூட்டமான பனிக் காலங்களில் அசுவினி பூச்சிகளைக் கண்காணித்து பூக்கும் முன் நீர் பாய்ச்சவும்."
    },
    chickpea: {
      name: "கொண்டைக்கடலை / சுண்டல் (Cicer arietinum)",
      duration: "100 – 120 நாட்கள்",
      expectedYield: "7 – 12 குவிண்டால் / ஏக்கர்",
      investmentLevel: "குறைவு (₹9,000 – ₹14,000 / ஏக்கர்)",
      waterNeed: "குறைவு (200 - 300 மி.மீ)",
      marketDemand: "தொடர்ந்து அதிகம் (பருப்பு & கடலை மாவு)",
      whySuitable: "வறட்சியைத் தாங்கும் குறைந்த நீர் தேவை கொண்ட பயறுவகை பயிர்; மண் வளத்தை மேம்படுத்துகிறது.",
      verificationFactors: "தண்ணீர் தேங்கும் நிலங்களைத் தவிர்க்கவும்; வாடல் நோயைத் தடுக்க விதை நேர்த்தி செய்யவும்."
    },
    maize: {
      name: "மக்காச்சோளம் (Zea mays)",
      duration: "95 – 115 நாட்கள்",
      expectedYield: "25 – 35 குவிண்டால் / ஏக்கர்",
      investmentLevel: "நடுத்தரம் (₹15,000 – ₹22,000 / ஏக்கர்)",
      waterNeed: "நடுத்தரம் (500 - 700 மி.மீ)",
      marketDemand: "அதிக தேவை (கோழி தீவனம் & ஸ்டார்ச் ஆலைகள்)",
      whySuitable: "அனைத்து பருவங்களிலும் பயிரிடக்கூடிய அதிக மகசூல் தரும் தானியப் பயிர்.",
      verificationFactors: "முளைப்பு பருவத்திலேயே படைப்புழு (Fall Armyworm) தாக்குதலை உன்னிப்பாக கவனிக்கவும்."
    },
    tomato: {
      name: "வீரிய ஒட்டு தக்காளி (Solanum lycopersicum)",
      duration: "120 – 150 நாட்கள்",
      expectedYield: "150 – 250 குவிண்டால் / ஏக்கர்",
      investmentLevel: "அதிகம் (₹35,000 – ₹55,000 / ஏக்கர்)",
      waterNeed: "நடுத்தரம் முதல் அதிகம் (சொட்டு நீர் சிறந்தது)",
      marketDemand: "அதிக விற்பனை வாய்ப்பு (தினசரி சந்தை)",
      whySuitable: "பந்தல் அல்லது குச்சி ஊன்றி சொட்டு நீர்ப்பாசன முறையில் அதிக வருவாய் ஈட்டித் தரும் தோட்டக்கலைப் பயிர்.",
      verificationFactors: "உள்ளூர் சந்தை விலை மற்றும் குளிர்சாதன கிடங்கு வசதிகளை முன்கூட்டியே உறுதிப்படுத்தவும்."
    }
  },
  hi: {
    paddy: {
      name: "धान / चावल (Oryza sativa)",
      duration: "115 – 140 दिन",
      expectedYield: "20 – 30 क्विंटल / एकड़",
      investmentLevel: "मध्यम (₹16,000 – ₹24,000 / एकड़)",
      waterNeed: "अधिक (1200 - 1500 मिमी)",
      marketDemand: "लगातार उच्च (एमएसपी और खुली मंडी)",
      whySuitable: "गर्म, आर्द्र जलवायु और पानी रोकने की क्षमता वाली भारी दोमट या मटियार मिट्टी में उत्कृष्ट उत्पादन देता है।",
      verificationFactors: "शुरुआती 60 दिनों के लिए सुनिश्चित जल आपूर्ति, लेह लगाने की गहराई और स्थानीय सरकारी खरीद केंद्र की जांच करें।"
    },
    wheat: {
      name: "गेहूं (Triticum aestivum)",
      duration: "120 – 145 दिन",
      expectedYield: "18 – 24 क्विंटल / एकड़",
      investmentLevel: "कम से मध्यम (₹12,000 – ₹18,000 / एकड़)",
      waterNeed: "मध्यम (450 - 650 मिमी)",
      marketDemand: "बहुत अधिक (सरकारी खरीद व व्यावसायिक)",
      whySuitable: "उत्तर और मध्य भारत के मैदानी इलाकों के लिए आदर्श रबी फसल, जिसे शुरुआती ठंड और दाना भरते समय तेज धूप चाहिए।",
      verificationFactors: "मार्च की पछुआ हवाओं और गर्मी से बचने के लिए 10 से 25 नवंबर के बीच समय पर बुवाई सुनिश्चित करें।"
    },
    cotton: {
      name: "कपास / रुई (Gossypium hirsutum)",
      duration: "150 – 180 दिन",
      expectedYield: "8 – 14 क्विंटल / एकड़",
      investmentLevel: "उच्च (₹22,000 – ₹32,000 / एकड़)",
      waterNeed: "मध्यम (700 - 900 मिमी)",
      marketDemand: "उच्च व्यावसायिक (कपड़ा मिलें व सीसीआई)",
      whySuitable: "नमी सोखने वाली गहरी काली कपासी मिट्टी में धूप वाले मौसम में गहरी जड़ प्रणाली के साथ बेहतरीन पनपता है।",
      verificationFactors: "गुलाबी सुंडी और रस चूसक कीटों की निगरानी करें; खेत में जलभराव रोकने के लिए उचित जल निकासी रखें।"
    },
    soybean: {
      name: "सोयाबीन (Glycine max)",
      duration: "90 – 105 दिन",
      expectedYield: "8 – 12 क्विंटल / एकड़",
      investmentLevel: "कम (₹10,000 – ₹15,000 / एकड़)",
      waterNeed: "मध्यम (500 - 650 मिमी)",
      marketDemand: "मजबूत (खाद्य तेल और खल प्रसंस्करण)",
      whySuitable: "कम अवधि की दलहनी फसल जो मिट्टी में नाइट्रोजन जोड़कर उर्वरा शक्ति बढ़ाती है और जल्दी नकदी प्रदान करती है।",
      verificationFactors: "बुवाई से पहले बीज अंकुरण दर (>70%) अवश्य जांचें और राइजोबियम कल्चर से बीजोपचार करें।"
    },
    groundnut: {
      name: "मूंगफली (Arachis hypogaea)",
      duration: "105 – 125 दिन",
      expectedYield: "10 – 16 क्विंटल / एकड़",
      investmentLevel: "मध्यम (₹14,000 – ₹20,000 / एकड़)",
      waterNeed: "कम से मध्यम (400 - 550 मिमी)",
      marketDemand: "स्थिर उच्च (तेल मिलें व खाद्य उपयोग)",
      whySuitable: "हल्की रेतीली व लाल दोमट मिट्टी में सूखा सहन करने वाली उत्कृष्ट तिलहनी फसल।",
      verificationFactors: "सुइयां बनते समय और फलियों के भराव के लिए 40-45 दिन पर 150-200 किलो प्रति एकड़ जिप्सम डालें।"
    },
    mustard: {
      name: "सरसों / राई (Brassica juncea)",
      duration: "110 – 130 दिन",
      expectedYield: "6 – 10 क्विंटल / एकड़",
      investmentLevel: "कम (₹8,000 – ₹12,000 / एकड़)",
      waterNeed: "कम (250 - 350 मिमी)",
      marketDemand: "उच्च (सरसों खाद्य तेल निष्कर्षण)",
      whySuitable: "कम सिंचाई में उत्तर और मध्य भारत की जलवायु में पकने वाली बेहद किफायती रबी तिलहन फसल।",
      verificationFactors: "बादल छाए रहने पर माहू (चेपा) कीट की निगरानी करें और फूल आने से पहले हल्की सिंचाई दें।"
    },
    chickpea: {
      name: "चना / देसी चना (Cicer arietinum)",
      duration: "100 – 120 दिन",
      expectedYield: "7 – 12 क्विंटल / एकड़",
      investmentLevel: "कम (₹9,000 – ₹14,000 / एकड़)",
      waterNeed: "कम (200 - 300 मिमी)",
      marketDemand: "लगातार उच्च (दाल व बेसन मिलें)",
      whySuitable: "सूखा सहन करने वाली कम पानी की दलहनी फसल जो भूमि की सेहत सुधारती है।",
      verificationFactors: "जलभराव वाले खेतों से बचें; उकठा रोग (विल्ट) की रोकथाम के लिए ट्राइकोडर्मा से बीज उपचार करें।"
    },
    maize: {
      name: "मक्का (Zea mays)",
      duration: "95 – 115 दिन",
      expectedYield: "25 – 35 क्विंटल / एकड़",
      investmentLevel: "मध्यम (₹15,000 – ₹22,000 / एकड़)",
      waterNeed: "मध्यम (500 - 700 मिमी)",
      marketDemand: "उच्च (मुर्गी दाना, स्टार्च व साइलेज)",
      whySuitable: "तीनों मौसमों में उगाई जा सकने वाली बहुउपयोगी और उच्च पैदावार देने वाली अनाज फसल।",
      verificationFactors: "अंकुरण के समय फॉल आर्मीवर्म (सैनिक कीट) की निगरानी करें; खेत में पानी न रुकने दें।"
    },
    tomato: {
      name: "हाइब्रिड टमाटर (Solanum lycopersicum)",
      duration: "120 – 150 दिन",
      expectedYield: "150 – 250 क्विंटल / एकड़",
      investmentLevel: "उच्च (₹35,000 – ₹55,000 / एकड़)",
      waterNeed: "मध्यम से उच्च (ड्रिप सर्वोत्तम)",
      marketDemand: "अत्यधिक लाभकारी (दैनिक मंडी व फूड प्रोसेसिंग)",
      whySuitable: "सहारे (स्टेकिंग) और ड्रिप सिंचाई में भारी मुनाफा देने वाली लोकप्रिय बागवानी फसल।",
      verificationFactors: "स्थानीय मंडी भाव और कोल्ड स्टोरेज सुविधाओं की जानकारी रखें; उचित बधाई का प्रबंध करें।"
    }
  }
};

// 3. REGIONAL WEATHER DATABASE
const regionalWeatherDatabase = {
  en: {
    ludhiana: {
      city: "Ludhiana, Punjab",
      state: "Punjab (North Zone)",
      current: { condition: "Clear & Sunny", dewPoint: "15°C" },
      forecast: [
        { day: "Today", condition: "Sunny" },
        { day: "Tomorrow", condition: "Partly Cloudy" },
        { day: "Wed", condition: "Clear Skies" },
        { day: "Thu", condition: "Light Overcast" },
        { day: "Fri", condition: "Sunny" }
      ],
      farmingAdvice: "Ideal weather window for wheat field monitoring and timely second irrigation. Low humidity minimizes yellow rust risk."
    },
    guntur: {
      city: "Guntur, Andhra Pradesh",
      state: "Andhra Pradesh (Coastal Zone)",
      current: { condition: "Warm & Humid", dewPoint: "23°C" },
      forecast: [
        { day: "Today", condition: "Humid & Sun" },
        { day: "Tomorrow", condition: "Passing Showers" },
        { day: "Wed", condition: "Scattered Rain" },
        { day: "Thu", condition: "Partly Cloudy" },
        { day: "Fri", condition: "Sunny" }
      ],
      farmingAdvice: "Moderate showers expected over the next 48 hours. Postpone foliar insecticide sprays on chilli and cotton crops until clear weather returns."
    },
    nashik: {
      city: "Nashik, Maharashtra",
      state: "Maharashtra (Western Ghats)",
      current: { condition: "Pleasant & Breezy", dewPoint: "17°C" },
      forecast: [
        { day: "Today", condition: "Clear" },
        { day: "Tomorrow", condition: "Sunny" },
        { day: "Wed", condition: "Light Clouds" },
        { day: "Thu", condition: "Breezy" },
        { day: "Fri", condition: "Clear" }
      ],
      farmingAdvice: "Stable weather conditions favorable for onion harvesting and vineyard pruning. Ensure grape trellis canopy aeration."
    },
    coimbatore: {
      city: "Coimbatore, Tamil Nadu",
      state: "Tamil Nadu (Kongu Zone)",
      current: { condition: "Scattered Clouds", dewPoint: "21°C" },
      forecast: [
        { day: "Today", condition: "Cloudy" },
        { day: "Tomorrow", condition: "Mild Drizzle" },
        { day: "Wed", condition: "Partly Cloudy" },
        { day: "Thu", condition: "Scattered Clouds" },
        { day: "Fri", condition: "Sunny" }
      ],
      farmingAdvice: "Moderate cloud cover will reduce pan evaporation rates. Adjust drip irrigation operating hours downwards by 15%."
    },
    varanasi: {
      city: "Varanasi, Uttar Pradesh",
      state: "Uttar Pradesh (Eastern Plains)",
      current: { condition: "Sunny & Mild Fog", dewPoint: "16°C" },
      forecast: [
        { day: "Today", condition: "Sunny" },
        { day: "Tomorrow", condition: "Sunny" },
        { day: "Wed", condition: "Hazy Sun" },
        { day: "Thu", condition: "Clear" },
        { day: "Fri", condition: "Clear" }
      ],
      farmingAdvice: "Morning fog will dissipate by midday. Good soil moisture conditions for mustard flowering and winter pulse pod development."
    },
    indore: {
      city: "Indore, Madhya Pradesh",
      state: "Madhya Pradesh (Malwa Plateau)",
      current: { condition: "Sunny & Dry", dewPoint: "14°C" },
      forecast: [
        { day: "Today", condition: "Sunny" },
        { day: "Tomorrow", condition: "Clear" },
        { day: "Wed", condition: "Clear" },
        { day: "Thu", condition: "Sunny" },
        { day: "Fri", condition: "Clear" }
      ],
      farmingAdvice: "Warm afternoon temperatures and dry air. Provide light evening sprinkler irrigation for potato tubers to prevent moisture stress."
    }
  },
  te: {
    ludhiana: {
      city: "లూధియానా, పంజాబ్",
      state: "పంజాబ్ (ఉత్తర మండలం)",
      current: { condition: "స్పష్టమైన ఎండ", dewPoint: "15°C" },
      forecast: [
        { day: "నేడు", condition: "ఎండ" },
        { day: "రేపు", condition: "పాక్షిక మేఘావృతం" },
        { day: "బుధ", condition: "స్పష్టమైన ఆకాశం" },
        { day: "గురు", condition: "తేలికపాటి మేఘాలు" },
        { day: "శుక్ర", condition: "ఎండ" }
      ],
      farmingAdvice: "గోధుమ పైరు పరిశీలన మరియు రెండవ తడికి అనుకూలమైన వాతావరణం. తక్కువ తేమ వల్ల పసుపు కుంకుమ తెగులు ప్రమాదం తగ్గుతుంది."
    },
    guntur: {
      city: "గుంటూరు, ఆంధ్రప్రదేశ్",
      state: "ఆంధ్రప్రదేశ్ (కోస్తా మండలం)",
      current: { condition: "వేడి & ఉక్కపోత", dewPoint: "23°C" },
      forecast: [
        { day: "నేడు", condition: "ఉక్కపోత & ఎండ" },
        { day: "రేపు", condition: "చిరుజల్లులు" },
        { day: "బుధ", condition: "చెదురుమదురు వర్షం" },
        { day: "గురు", condition: "పాక్షిక మేఘాలు" },
        { day: "శుక్ర", condition: "ఎండ" }
      ],
      farmingAdvice: "రాబోయే 48 గంటల్లో ఓ మోస్తరు వర్షాలు పడే అవకాశం ఉంది. మిర్చి, పత్తి పంటలపై పురుగుమందుల పిచికారీని వాయిదా వేయండి."
    },
    nashik: {
      city: "నాసిక్, మహారాష్ట్ర",
      state: "మహారాష్ట్ర (పశ్చిమ కనుమలు)",
      current: { condition: "ఆహ్లాదకరమైన గాలి", dewPoint: "17°C" },
      forecast: [
        { day: "నేడు", condition: "స్పష్టం" },
        { day: "రేపు", condition: "ఎండ" },
        { day: "బుధ", condition: "తేలికపాటి మేఘాలు" },
        { day: "గురు", condition: "చల్లని గాలి" },
        { day: "శుక్ర", condition: "స్పష్టం" }
      ],
      farmingAdvice: "ఉల్లి కోతకు మరియు ద్రాక్ష తోటల కత్తిరింపుకు స్థిరమైన వాతావరణం అనుకూలంగా ఉంది."
    },
    coimbatore: {
      city: "కోయంబత్తూరు, తమిళనాడు",
      state: "తమిళనాడు (కొంగు మండలం)",
      current: { condition: "చెదురుమదురు మేఘాలు", dewPoint: "21°C" },
      forecast: [
        { day: "నేడు", condition: "మేఘావృతం" },
        { day: "రేపు", condition: "చిరుజల్లు" },
        { day: "బుధ", condition: "పాక్షిక మేఘాలు" },
        { day: "గురు", condition: "తేలికపాటి మేఘాలు" },
        { day: "శుక్ర", condition: "ఎండ" }
      ],
      farmingAdvice: "మేఘావృత వాతావరణం వల్ల ఆవిరి రేటు తగ్గుతుంది. బిందు సేద్యం సమయాన్ని 15% తగ్గించుకోండి."
    },
    varanasi: {
      city: "వారణాసి, ఉత్తరప్రదేశ్",
      state: "ఉత్తరప్రదేశ్ (తూర్పు మైదానాలు)",
      current: { condition: "ఎండ & తేలికపాటి పొగమంచు", dewPoint: "16°C" },
      forecast: [
        { day: "నేడు", condition: "ఎండ" },
        { day: "రేపు", condition: "ఎండ" },
        { day: "బుధ", condition: "మసక ఎండ" },
        { day: "గురు", condition: "స్పష్టం" },
        { day: "శుక్ర", condition: "స్పష్టం" }
      ],
      farmingAdvice: "మధ్యాహ్నానికి పొగమంచు తగ్గుతుంది. ఆవాల పూత మరియు శనగ కాయల ఎదుగుదలకు నేల తేమ అనుకూలంగా ఉంది."
    },
    indore: {
      city: "ఇండోర్, మధ్యప్రదేశ్",
      state: "మధ్యప్రదేశ్ (మాల్వా పీఠభూమి)",
      current: { condition: "ఎండ & పొడి వాతావరణం", dewPoint: "14°C" },
      forecast: [
        { day: "నేడు", condition: "ఎండ" },
        { day: "రేపు", condition: "స్పష్టం" },
        { day: "బుధ", condition: "స్పష్టం" },
        { day: "గురు", condition: "ఎండ" },
        { day: "శుక్ర", condition: "స్పష్టం" }
      ],
      farmingAdvice: "మధ్యాహ్న ఉష్ణోగ్రతలు మరియు పొడి గాలి. బంగాళాదుంప పంటకు సాయంత్రం వేళల్లో తేలికపాటి నీటి తడి ఇవ్వండి."
    }
  },
  ta: {
    ludhiana: {
      city: "லூதியானா, பஞ்சாப்",
      state: "பஞ்சாப் (வடக்கு மண்டலம்)",
      current: { condition: "தெளிவான வெயில்", dewPoint: "15°C" },
      forecast: [
        { day: "இன்று", condition: "வெயில்" },
        { day: "நாளை", condition: "பகுதி மேகமூட்டம்" },
        { day: "புதன்", condition: "தெளிவான வானம்" },
        { day: "வியாழன்", condition: "லேசான மேகம்" },
        { day: "வெள்ளி", condition: "வெயில்" }
      ],
      farmingAdvice: "கோதுமை வயல் ஆய்வு மற்றும் இரண்டாவது பாசனத்திற்கு உகந்த வானிலை. குறைந்த ஈரப்பதம் மஞ்சள் துரு நோய் அபாயத்தைக் குறைக்கிறது."
    },
    guntur: {
      city: "குண்டூர், ஆந்திரப் பிரதேசம்",
      state: "ஆந்திரப் பிரதேசம் (கடலோர மண்டலம்)",
      current: { condition: "வெப்பம் & புழுக்கம்", dewPoint: "23°C" },
      forecast: [
        { day: "இன்று", condition: "புழுக்கம் & வெயில்" },
        { day: "நாளை", condition: "மழை தூறல்" },
        { day: "புதன்", condition: "பரவலான மழை" },
        { day: "வியாழன்", condition: "பகுதி மேகம்" },
        { day: "வெள்ளி", condition: "வெயில்" }
      ],
      farmingAdvice: "அடுத்த 48 மணி நேரத்தில் மிதமான மழை எதிர்பார்க்கப்படுகிறது. மிளகாய் மற்றும் பருத்தி பயிர்களுக்கு மருந்து தெளிப்பதை ஒத்திவைக்கவும்."
    },
    nashik: {
      city: "நாசிக், மகாராஷ்டிரா",
      state: "மகாராஷ்டிரா (மேற்கு தொடர்ச்சி மலை)",
      current: { condition: "இதமான காற்று", dewPoint: "17°C" },
      forecast: [
        { day: "இன்று", condition: "தெளிவானது" },
        { day: "நாளை", condition: "வெயில்" },
        { day: "புதன்", condition: "லேசான மேகம்" },
        { day: "வியாழன்", condition: "குளிர்ந்த காற்று" },
        { day: "வெள்ளி", condition: "தெளிவானது" }
      ],
      farmingAdvice: "வெங்காய அறுவடை மற்றும் திராட்சை கவாத்து செய்ய நிலையான வானிலை சாதகமாக உள்ளது."
    },
    coimbatore: {
      city: "கோயம்புத்தூர், தமிழ்நாடு",
      state: "தமிழ்நாடு (கொங்கு மண்டலம்)",
      current: { condition: "சிதறிய மேகங்கள்", dewPoint: "21°C" },
      forecast: [
        { day: "இன்று", condition: "மேகமூட்டம்" },
        { day: "நாளை", condition: "லேசான தூறல்" },
        { day: "புதன்", condition: "பகுதி மேகமூட்டம்" },
        { day: "வியாழன்", condition: "சிதறிய மேகம்" },
        { day: "வெள்ளி", condition: "வெயில்" }
      ],
      farmingAdvice: "மேகமூட்டத்தால் நீர் ஆவியாதல் குறையும். சொட்டு நீர்ப்பாசன நேரத்தை 15% வரை குறைத்துக் கொள்ளலாம்."
    },
    varanasi: {
      city: "வாரணாசி, உத்திரப் பிரதேசம்",
      state: "உத்திரப் பிரதேசம் (கிழக்கு சமவெளி)",
      current: { condition: "வெயில் & பனிமூட்டம்", dewPoint: "16°C" },
      forecast: [
        { day: "இன்று", condition: "வெயில்" },
        { day: "நாளை", condition: "வெயில்" },
        { day: "புதன்", condition: "மங்கலான வெயில்" },
        { day: "வியாழன்", condition: "தெளிவானது" },
        { day: "வெள்ளி", condition: "தெளிவானது" }
      ],
      farmingAdvice: "நண்பகலில் பனி விலகும். கடுகு பூக்கும் பருவத்திற்கும் பயறு காய்ப்பதற்கும் நில ஈரப்பதம் சிறந்தது."
    },
    indore: {
      city: "இந்தூர், மத்தியப் பிரதேசம்",
      state: "மத்தியப் பிரதேசம் (மால்வா பீடபூமி)",
      current: { condition: "வெயில் & உலர் காற்று", dewPoint: "14°C" },
      forecast: [
        { day: "இன்று", condition: "வெயில்" },
        { day: "நாளை", condition: "தெளிவானது" },
        { day: "புதன்", condition: "தெளிவானது" },
        { day: "வியாழன்", condition: "வெயில்" },
        { day: "வெள்ளி", condition: "தெளிவானது" }
      ],
      farmingAdvice: "பகல் வெப்பமும் உலர் காற்றும் நிலவுகிறது. உருளைக்கிழங்கு பயிருக்கு மாலையில் லேசான தெளிப்பு நீர் பாய்ச்சவும்."
    }
  },
  hi: {
    ludhiana: {
      city: "लुधियाना, पंजाब",
      state: "पंजाब (उत्तरी क्षेत्र)",
      current: { condition: "साफ व धूप", dewPoint: "15°C" },
      forecast: [
        { day: "आज", condition: "धूप" },
        { day: "कल", condition: "हल्के बादल" },
        { day: "बुध", condition: "साफ आसमान" },
        { day: "गुरु", condition: "हल्की बदली" },
        { day: "शुक्र", condition: "धूप" }
      ],
      farmingAdvice: "गेहूं की निगरानी और दूसरी सिंचाई के लिए उत्तम मौसम। कम नमी के कारण पीला रतुआ का खतरा न्यूनतम है।"
    },
    guntur: {
      city: "गुंटूर, आंध्र प्रदेश",
      state: "आंध्र प्रदेश (तटीय क्षेत्र)",
      current: { condition: "गर्म व उमस भरा", dewPoint: "23°C" },
      forecast: [
        { day: "आज", condition: "उमस व धूप" },
        { day: "कल", condition: "हल्की बौछारें" },
        { day: "बुध", condition: "रुक-रुक कर बारिश" },
        { day: "गुरु", condition: "आंशिक बादल" },
        { day: "शुक्र", condition: "धूप" }
      ],
      farmingAdvice: "अगले 48 घंटों में मध्यम बारिश की संभावना है। मिर्च और कपास पर कीटनाशक का छिड़काव मौसम साफ होने तक टालें।"
    },
    nashik: {
      city: "नासिक, महाराष्ट्र",
      state: "महाराष्ट्र (पश्चिमी घाट)",
      current: { condition: "सुहावना व हवादार", dewPoint: "17°C" },
      forecast: [
        { day: "आज", condition: "साफ" },
        { day: "कल", condition: "धूप" },
        { day: "बुध", condition: "हल्के बादल" },
        { day: "गुरु", condition: "हवादार" },
        { day: "शुक्र", condition: "साफ" }
      ],
      farmingAdvice: "प्याज की खुदाई और अंगूर की छंटाई के लिए स्थिर मौसम पूरी तरह अनुकूल है।"
    },
    coimbatore: {
      city: "कोयंबटूर, तमिलनाडु",
      state: "तमिलनाडु (कोंगु क्षेत्र)",
      current: { condition: "बिखरे बादल", dewPoint: "21°C" },
      forecast: [
        { day: "आज", condition: "बादल" },
        { day: "कल", condition: "हल्की बूंदाबांदी" },
        { day: "बुध", condition: "आंशिक बादल" },
        { day: "गुरु", condition: "हल्के बादल" },
        { day: "शुक्र", condition: "धूप" }
      ],
      farmingAdvice: "बादल छाए रहने से वाष्पीकरण कम होगा। ड्रिप सिंचाई चलाने का समय 15% कम करें।"
    },
    varanasi: {
      city: "वाराणसी, उत्तर प्रदेश",
      state: "उत्तर प्रदेश (पूर्वी मैदान)",
      current: { condition: "धूप व हल्का कोहरा", dewPoint: "16°C" },
      forecast: [
        { day: "आज", condition: "धूप" },
        { day: "कल", condition: "धूप" },
        { day: "बुध", condition: "धुंधली धूप" },
        { day: "गुरु", condition: "साफ" },
        { day: "शुक्र", condition: "साफ" }
      ],
      farmingAdvice: "दोपहर तक कोहरा छंट जाएगा। सरसों में फूल आने और चने में दाना बनने के लिए मिट्टी की नमी उत्तम है।"
    },
    indore: {
      city: "इंदौर, मध्य प्रदेश",
      state: "मध्य प्रदेश (मालवा पठार)",
      current: { condition: "धूप व शुष्क हवा", dewPoint: "14°C" },
      forecast: [
        { day: "आज", condition: "धूप" },
        { day: "कल", condition: "साफ" },
        { day: "बुध", condition: "साफ" },
        { day: "गुरु", condition: "धूप" },
        { day: "शुक्र", condition: "साफ" }
      ],
      farmingAdvice: "दोपहर का तापमान गर्म और हवा शुष्क है। आलू की फसल को शाम के समय हल्की फव्वारा सिंचाई दें।"
    }
  }
};

// 4. MANDI COMMODITY TRANSLATIONS
const mandiCommodityTranslations = {
  en: {
    "Paddy (Basmati)": "Paddy (Basmati)",
    "Paddy (Common)": "Paddy (Common)",
    "Wheat": "Wheat",
    "Cotton (Medium Staple)": "Cotton (Medium Staple)",
    "Soybean (Yellow)": "Soybean (Yellow)",
    "Mustard (Sarson)": "Mustard (Sarson)",
    "Maize (Makka)": "Maize (Makka)",
    "Red Chilli (Teja)": "Red Chilli (Teja)",
    "Tomato (Hybrid)": "Tomato (Hybrid)",
    "Onion (Red)": "Onion (Red)",
    "Gram / Chana": "Gram / Chana",
    "Turmeric (Haldi)": "Turmeric (Haldi)",
    "Punjab": "Punjab",
    "Andhra Pradesh": "Andhra Pradesh",
    "Madhya Pradesh": "Madhya Pradesh",
    "Gujarat": "Gujarat",
    "Maharashtra": "Maharashtra",
    "Rajasthan": "Rajasthan",
    "Karnataka": "Karnataka",
    "Tamil Nadu": "Tamil Nadu",
    "Uttar Pradesh": "Uttar Pradesh",
    "Today": "Today",
    "arrivals_suffix": "Qtl"
  },
  te: {
    "Paddy (Basmati)": "వరి (బాస్మతి)",
    "Paddy (Common)": "వరి (సాధారణ)",
    "Wheat": "గోధుమలు",
    "Cotton (Medium Staple)": "పత్తి (మధ్యస్థ పింజ)",
    "Soybean (Yellow)": "సోయాబీన్ (పసుపు)",
    "Mustard (Sarson)": "ఆవాలు",
    "Maize (Makka)": "మొక్కజొన్న",
    "Red Chilli (Teja)": "ఎర్ర మిరప (తేజా)",
    "Tomato (Hybrid)": "టమాటా (హైబ్రిడ్)",
    "Onion (Red)": "ఉల్లిపాయ (ఎరుపు)",
    "Gram / Chana": "శనగలు (దేశీ)",
    "Turmeric (Haldi)": "పసుపు",
    "Punjab": "పంజాబ్",
    "Andhra Pradesh": "ఆంధ్రప్రదేశ్",
    "Madhya Pradesh": "మధ్యప్రదేశ్",
    "Gujarat": "గుజరాత్",
    "Maharashtra": "మహారాష్ట్ర",
    "Rajasthan": "రాజస్థాన్",
    "Karnataka": "కర్ణాటక",
    "Tamil Nadu": "తమిళనాడు",
    "Uttar Pradesh": "ఉత్తరప్రదేశ్",
    "Today": "నేడు",
    "arrivals_suffix": "క్వింటాళ్లు"
  },
  ta: {
    "Paddy (Basmati)": "நெல் (பாசுமதி)",
    "Paddy (Common)": "நெல் (சாதாரண)",
    "Wheat": "கோதுமை",
    "Cotton (Medium Staple)": "பருத்தி (நடுத்தர இழை)",
    "Soybean (Yellow)": "சோயாபீன் (மஞ்சள்)",
    "Mustard (Sarson)": "கடுகு",
    "Maize (Makka)": "மக்காச்சோளம்",
    "Red Chilli (Teja)": "சிவப்பு மிளகாய் (தேஜா)",
    "Tomato (Hybrid)": "தக்காளி (ஹைப்ரிட்)",
    "Onion (Red)": "வெங்காயம் (சிவப்பு)",
    "Gram / Chana": "கொண்டைக்கடலை",
    "Turmeric (Haldi)": "மஞ்சள்",
    "Punjab": "பஞ்சாப்",
    "Andhra Pradesh": "ஆந்திரப் பிரதேசம்",
    "Madhya Pradesh": "மத்தியப் பிரதேசம்",
    "Gujarat": "குஜராத்",
    "Maharashtra": "மகாராஷ்டிரா",
    "Rajasthan": "ராஜஸ்தான்",
    "Karnataka": "கர்நாடகா",
    "Tamil Nadu": "தமிழ்நாடு",
    "Uttar Pradesh": "உத்தரப் பிரதேசம்",
    "Today": "இன்று",
    "arrivals_suffix": "குவிண்டால்"
  },
  hi: {
    "Paddy (Basmati)": "धान (बासमती)",
    "Paddy (Common)": "धान (साधारण)",
    "Wheat": "गेहूं",
    "Cotton (Medium Staple)": "कपास (मध्यम रेशा)",
    "Soybean (Yellow)": "सोयाबीन (पीला)",
    "Mustard (Sarson)": "सरसों",
    "Maize (Makka)": "मक्का",
    "Red Chilli (Teja)": "लाल मिर्च (तेजा)",
    "Tomato (Hybrid)": "टमाटर (हाइब्रिड)",
    "Onion (Red)": "प्याज (लाल)",
    "Gram / Chana": "चना (देसी)",
    "Turmeric (Haldi)": "हल्दी",
    "Punjab": "पंजाब",
    "Andhra Pradesh": "आंध्र प्रदेश",
    "Madhya Pradesh": "मध्य प्रदेश",
    "Gujarat": "गुजरात",
    "Maharashtra": "महाराष्ट्र",
    "Rajasthan": "राजस्थान",
    "Karnataka": "कर्नाटक",
    "Tamil Nadu": "तमिलनाडु",
    "Uttar Pradesh": "उत्तर प्रदेश",
    "Today": "आज",
    "arrivals_suffix": "क्विंटल"
  }
};

// 5. KNOWLEDGE HUB ARTICLES DATASET
const knowledgeArticlesDatabase = {
  en: [
    {
      id: 1,
      title: "Precision Drip Irrigation: How Indian Farmers Cut Water Usage by 45%",
      category: "Irrigation",
      readTime: "6 min read",
      publishedDate: "November 2026",
      summary: "A practical guide to drip lateral design, sub-main filtration, and fertigation scheduling that saves groundwater while boosting crop uniform weight."
    },
    {
      id: 2,
      title: "System of Rice Intensification (SRI): Maximizing Paddy Yields With Less Seed",
      category: "Crop Cultivation",
      readTime: "7 min read",
      publishedDate: "October 2026",
      summary: "Transform rice farming using 8-12 day young single seedlings, wide square spacing (25x25 cm), and alternate wetting and drying."
    },
    {
      id: 3,
      title: "Managing Soil Salinity & Sodic Hardpans in Irrigated Plains",
      category: "Soil Health",
      readTime: "5 min read",
      publishedDate: "October 2026",
      summary: "Identify electrical conductivity (EC) and exchangeable sodium percentage (ESP) issues and reclaim degraded plots using gypsum and green manuring."
    },
    {
      id: 4,
      title: "Integrated Pest Management (IPM) for Cotton: Halting Pink Bollworm",
      category: "Pest Prevention",
      readTime: "8 min read",
      publishedDate: "September 2026",
      summary: "A calendar-based IPM framework combining pheromone traps, trichogramma parasitoids, and selective eco-friendly interventions."
    },
    {
      id: 5,
      title: "Biological Control of Early & Late Blight in Tomato Crops",
      category: "Organic Farming",
      readTime: "6 min read",
      publishedDate: "September 2026",
      summary: "A practical guide to navigating the NPOP transition period, preparing farm-made liquid bio-formulations, and earning organic premiums."
    },
    {
      id: 6,
      title: "Farm Business Basics: Understanding Mandi Price Seasonality & e-NAM Trading",
      category: "Farm Business",
      readTime: "7 min read",
      publishedDate: "August 2026",
      summary: "Master market arrival cycles, assaying quality parameters, and trading across state APMCs using the national electronic agriculture market."
    }
  ],
  te: [
    {
      id: 1,
      title: "ఖచ్చితమైన బిందు సేద్యం (డ్రిప్): భారతీయ రైతులు 45% నీటిని ఎలా ఆదా చేస్తున్నారు?",
      category: "నీటి యాజమాన్యం",
      readTime: "6 నిమిషాలు",
      publishedDate: "నవంబర్ 2026",
      summary: "భూగర్భ జలాలను ఆదా చేస్తూ పంట నాణ్యతను పెంచే డ్రిప్ లేటరల్ రూపకల్పన, ఫిల్ట్రేషన్ మరియు ఫెర్టిగేషన్ పై సమగ్ర మార్గదర్శి."
    },
    {
      id: 2,
      title: "శ్రీవరి సాగు విధానం (SRI): తక్కువ విత్తనంతో అధిక వరి దిగుబడి సాధించడం",
      category: "పంట సాగు",
      readTime: "7 నిమిషాలు",
      publishedDate: "అక్టోబర్ 2026",
      summary: "8-12 రోజుల లేత ఏకైక నారు మొక్క, విశాలమైన చతురస్రాకార అంతరం (25x25 సెం.మీ) మరియు ఆరబెట్టి తడిపే పద్ధతితో వరి సాగును మార్చండి."
    },
    {
      id: 3,
      title: "సాగు భూములలో చౌడు, క్షార నేలల సమస్యల నిర్వహణ",
      category: "భూసార ఆరోగ్యం",
      readTime: "5 నిమిషాలు",
      publishedDate: "అక్టోబర్ 2026",
      summary: "విద్యుత్ వాహకత (EC) మరియు సోడియం శాతాన్ని గుర్తించి, జిప్సం మరియు పచ్చిరొట్ట ఎరువులతో చౌడు భూములను పునరుద్ధరించండి."
    },
    {
      id: 4,
      title: "పత్తిలో సమగ్ర సస్యరక్షణ (IPM): గులాబీ రంగు కాయతొలుచు పురుగు నివారణ",
      category: "సస్యరక్షణ",
      readTime: "8 నిమిషాలు",
      publishedDate: "సెప్టెంబర్ 2026",
      summary: "లింగాకర్షక బుట్టలు, ట్రైకోగ్రామా పరాన్నజీవులు మరియు పర్యావరణ అనుకూల చర్యలతో కూడిన క్యాలెండర్ ఆధారిత సస్యరక్షణ విధానం."
    },
    {
      id: 5,
      title: "టమాటా పంటలో ఆకు ఎండు తెగుళ్ల జీవ నియంత్రణ విధానాలు",
      category: "సేంద్రీయ వ్యవసాయం",
      readTime: "6 నిమిషాలు",
      publishedDate: "సెప్టెంబర్ 2026",
      summary: "సేంద్రీయ ధృవీకరణ నిబంధనలు, ఇంట్లోనే జీవ ఎరువుల తయారీ మరియు సేంద్రీయ ప్రీమియం ధరలను పొందే విధానం."
    },
    {
      id: 6,
      title: "వ్యవసాయ వ్యాపార సూత్రాలు: మండి ధరల హెచ్చుతగ్గులు మరియు e-NAM వ్యాపారం",
      category: "వ్యవసాయ వ్యాపారం",
      readTime: "7 నిమిషాలు",
      publishedDate: "ఆగస్టు 2026",
      summary: "మార్కెట్ రాకల చక్రాలు, నాణ్యతా ప్రమాణాలు మరియు జాతీయ ఎలక్ట్రానిక్ వ్యవసాయ మార్కెట్ (e-NAM) ద్వారా ఇతర రాష్ట్రాల్లో వ్యాపారం."
    }
  ],
  ta: [
    {
      id: 1,
      title: "துல்லிய சொட்டு நீர்ப்பாசனம்: இந்திய விவசாயிகள் 45% தண்ணீரை எவ்வாறு மிச்சப்படுத்துகிறார்கள்?",
      category: "பாசனம்",
      readTime: "6 நிமிடம்",
      publishedDate: "நவம்பர் 2026",
      summary: "நிலத்தடி நீரைச் சேமித்து பயிர் எடையை அதிகரிக்கும் சொட்டு நீர் குழாய் வடிவமைப்பு மற்றும் திரவ உர மேலாண்மைக்கான வழிகாட்டி."
    },
    {
      id: 2,
      title: "செம்மை நெல் சாகுபடி (SRI): குறைந்த விதையில் அதிக நெல் மகசூல் பெறுவது எப்படி?",
      category: "பயிர் சாகுபடி",
      readTime: "7 நிமிடம்",
      publishedDate: "அக்டோபர் 2026",
      summary: "8-12 நாள் இள நாற்று, சதுர நடவு (25x25 செ.மீ) மற்றும் காய்ச்சலும் பாய்ச்சலும் பாசன முறையைப் பயன்படுத்தி நெல் சாகுபடியை மேம்படுத்துங்கள்."
    },
    {
      id: 3,
      title: "பாசன நிலங்களில் உவர் மற்றும் களர் நிலப் பிரச்சனைகளை நிர்வகித்தல்",
      category: "மண் வளம்",
      readTime: "5 நிமிடம்",
      publishedDate: "அக்டோபர் 2026",
      summary: "மண்ணின் உப்புத்தன்மை மற்றும் சோடியம் அளவைக் கண்டறிந்து, ஜிப்சம் மற்றும் பசுந்தாள் உரங்கள் மூலம் நிலத்தை சீரமைக்கவும்."
    },
    {
      id: 4,
      title: "பருத்தியில் ஒருங்கிணைந்த பூச்சி மேலாண்மை (IPM): இளஞ்சிவப்பு காய்ப்புழு கட்டுப்பாடு",
      category: "பூச்சி மேலாண்மை",
      readTime: "8 நிமிடம்",
      publishedDate: "செப்டம்பர் 2026",
      summary: "இனக்கவர்ச்சிப் பொறிகள், டிரைகோகிரம்மா ஒட்டுண்ணிகள் மற்றும் இயற்கை வழிமுறைகளை இணைக்கும் கால அட்டவணை முறை."
    },
    {
      id: 5,
      title: "தக்காளிப் பயிரில் இலைக்கருகல் நோய்களுக்கான உயிரியல் கட்டுப்பாடு",
      category: "இயற்கை வேளாண்மை",
      readTime: "6 நிமிடம்",
      publishedDate: "செப்டம்பர் 2026",
      summary: "இயற்கை விவசாய சான்றிதழ் வழிமுறைகள், பண்ணையிலேயே திரவ உரங்கள் தயாரித்தல் மற்றும் கூடுதல் விலை பெறுவதற்கான வழிகாட்டி."
    },
    {
      id: 6,
      title: "பண்ணை வணிக அடிப்படைகள்: மண்டி விலை மாற்றங்கள் மற்றும் e-NAM வர்த்தகம்",
      category: "பண்ணை வணிகம்",
      readTime: "7 நிமிடம்",
      publishedDate: "ஆகஸ்ட் 2026",
      summary: "சந்தை வரத்து சுழற்சிகள், தர மதிப்பீட்டு அளவுகோல்கள் மற்றும் தேசிய மின்னணு வேளாண் சந்தை (e-NAM) வழியாக மாநிலங்களுக்கு இடையே வர்த்தகம்."
    }
  ],
  hi: [
    {
      id: 1,
      title: "सटीक ड्रिप सिंचाई: भारतीय किसान 45% तक पानी की बचत कैसे करते हैं?",
      category: "सिंचाई प्रबंधन",
      readTime: "6 मिनट",
      publishedDate: "नवंबर 2026",
      summary: "ड्रिप पाइपलाइन डिजाइन, फिल्ट्रेशन और फर्टिगेशन शेड्यूलिंग पर एक व्यावहारिक गाइड जो भूजल बचाकर फसल का वजन और गुणवत्ता बढ़ाती है।"
    },
    {
      id: 2,
      title: "धान की श्री विधि (SRI): कम बीज में धान की अधिकतम पैदावार कैसे लें?",
      category: "फसल खेती",
      readTime: "7 मिनट",
      publishedDate: "अक्टूबर 2026",
      summary: "8-12 दिन की छोटी पौध, 25x25 सेमी की दूरी पर एक-एक पौधा और बारी-बारी से गीला-सूखा रखकर धान की पैदावार में क्रांति लाएं।"
    },
    {
      id: 3,
      title: "सिंचित मैदानी इलाकों में खारी और क्षारीय मिट्टी का प्रबंधन",
      category: "मृदा स्वास्थ्य",
      readTime: "5 मिनट",
      publishedDate: "अक्टूबर 2026",
      summary: "विद्युत चालकता (EC) और सोडियम प्रतिशत (ESP) की पहचान करें और जिप्सम तथा हरी खाद (ढैंचा) से बंजर जमीन को फिर से उपजाऊ बनाएं।"
    },
    {
      id: 4,
      title: "कपास में एकीकृत कीट प्रबंधन (IPM): गुलाबी सुंडी की रोकथाम",
      category: "कीट नियंत्रण",
      readTime: "8 मिनट",
      publishedDate: "सितंबर 2026",
      summary: "फेरोमोन ट्रैप, ट्राइकोग्रामा परजीवी और पर्यावरण अनुकूल जैविक उपायों को मिलाकर कैलेंडर आधारित कीट नियंत्रण ढांचा।"
    },
    {
      id: 5,
      title: "टमाटर में अगेती और पछेती झुलसा का जैविक नियंत्रण",
      category: "जैविक खेती",
      readTime: "6 मिनट",
      publishedDate: "सितंबर 2026",
      summary: "एनपीओपी जैविक प्रमाणन, खेत पर तरल जैव-कीटनाशक बनाने और जैविक उत्पादों पर प्रीमियम दाम पाने की व्यावहारिक मार्गदर्शिका।"
    },
    {
      id: 6,
      title: "कृषि व्यवसाय के मूल सिद्धांत: मंडी भाव का मौसमी चक्र और e-NAM व्यापार",
      category: "कृषि व्यवसाय",
      readTime: "7 मिनट",
      publishedDate: "अगस्त 2026",
      summary: "मंडी आवक चक्र, गुणवत्ता जांच और राष्ट्रीय कृषि इलेक्ट्रॉनिक बाजार (e-NAM) के माध्यम से अन्य राज्यों की मंडियों में लाभकारी व्यापार।"
    }
  ]
};

// Generate full bundled JS file
const fileContent = `/**
 * AGRIMIND AI — MULTILINGUAL DYNAMIC DATASETS
 * Comprehensive domain datasets in English (en), Telugu (te), Tamil (ta), and Hindi (hi).
 */

(function () {
  'use strict';

  const cropDiseaseDatabase = ${JSON.stringify(cropDiseaseDatabase, null, 2)};
  const cropKnowledgeDatabase = ${JSON.stringify(cropKnowledgeDatabase, null, 2)};
  const regionalWeatherDatabase = ${JSON.stringify(regionalWeatherDatabase, null, 2)};
  const mandiCommodityTranslations = ${JSON.stringify(mandiCommodityTranslations, null, 2)};
  const knowledgeArticlesDatabase = ${JSON.stringify(knowledgeArticlesDatabase, null, 2)};

  // Export to window
  if (typeof window !== 'undefined') {
    window.agrimindCropDiseaseDatabase = cropDiseaseDatabase;
    window.agrimindCropKnowledgeDatabase = cropKnowledgeDatabase;
    window.agrimindRegionalWeatherDatabase = regionalWeatherDatabase;
    window.agrimindMandiCommodities = mandiCommodityTranslations;
    window.agrimindKnowledgeArticlesDatabase = knowledgeArticlesDatabase;
  }

  // CommonJS export for test harnesses
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      cropDiseaseDatabase,
      cropKnowledgeDatabase,
      regionalWeatherDatabase,
      mandiCommodityTranslations,
      knowledgeArticlesDatabase
    };
  }
})();
`;

fs.writeFileSync(path.join(__dirname, 'js/multilingual-data.js'), fileContent, 'utf8');
console.log('Successfully generated js/multilingual-data.js!');
