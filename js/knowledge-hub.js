/**
 * AGRIMIND AI — FARMING KNOWLEDGE HUB
 * Practical Agronomic Library, Search, Filtering & Article Detail Renderer
 */

const articlesDatabase = [
  {
    id: 1,
    title: "Precision Drip Irrigation: How Indian Farmers Cut Water Usage by 45%",
    category: "Irrigation",
    categorySlug: "irrigation",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80",
    summary: "A practical guide to drip lateral design, sub-main filtration, and fertigation scheduling that saves groundwater while boosting crop uniform weight.",
    featured: true,
    publishedDate: "November 2026",
    sections: [
      {
        heading: "The Groundwater Crisis in Irrigated Basins",
        content: `Traditional flood irrigation remains standard across nearly 65% of India's cultivated area. However, furrow and flood methods lead to significant evaporation, deep percolation below root zones, and weed proliferation along ditches. Precision drip irrigation delivers metered water directly to the root zone at low discharge rates (1.2 to 4.0 liters/hour per dripper), transforming irrigation efficiency from 40% under flooding to over 90% under drip.`
      },
      {
        heading: "Core Components of a Resilient Drip System",
        content: `A reliable field drip assembly includes:
        <ul>
          <li><strong>Filtration Unit:</strong> Hydrocyclone sand separator for borewell grit, followed by dual disc or screen filters (120 mesh / 130 micron) to prevent emitter clogging.</li>
          <li><strong>Pressure Regulating Valves (PRVs):</strong> Maintains uniform pressure (1.0 – 1.5 kg/cm²) across undulating plots.</li>
          <li><strong>Venturi Fertigation Injector:</strong> Allows precise dosing of water-soluble fertilizers directly into irrigation lines.</li>
          <li><strong>Inline Dripper Laterals:</strong> 16mm UV-stabilized virgin polyethylene tubing with pressure-compensating (PC) drippers spaced at 30 to 50 cm.</li>
        </ul>`
      },
      {
        heading: "Step-by-Step Fertigation Management",
        content: `Fertigation allows spoon-feeding crops according to their physiological growth stages:
        <ol>
          <li><strong>First 20% of run time:</strong> Run clean water to pressurize laterals and flush the root zone.</li>
          <li><strong>Middle 60% of run time:</strong> Inject fully dissolved water-soluble fertilizers (e.g. 19:19:19, Potassium Nitrate, Urea) through the Venturi valve.</li>
          <li><strong>Final 20% of run time:</strong> Flush lines with clean water to prevent chemical salt precipitation and fungal buildup inside drippers.</li>
        </ol>`
      },
      {
        heading: "Maintenance Checklist for Long Lifespan",
        content: `Acid treatment with commercial hydrochloric acid (HCl) at 33% concentration once every crop season dissolves calcium carbonate scales. Additionally, flush sub-main flush valves once every fortnight to clear silt deposits.`
      }
    ],
    takeaways: [
      "Drip systems reduce total water application by 35% to 50% compared to furrow flood methods.",
      "Dual-stage filtration is mandatory when using borewell water with suspended silt.",
      "Always flush lines with clean water for 15 minutes following every fertigation cycle."
    ]
  },

  {
    id: 2,
    title: "System of Rice Intensification (SRI): Maximizing Paddy Yields With Less Seed",
    category: "Crop Cultivation",
    categorySlug: "crop-cultivation",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80",
    summary: "Transform rice farming using 8-12 day young single seedlings, wide square spacing (25x25 cm), and alternate wetting and drying.",
    featured: false,
    publishedDate: "October 2026",
    sections: [
      {
        heading: "Principles of the SRI Method",
        content: `The System of Rice Intensification (SRI) developed in Madagascar and validated by agricultural universities across Tamil Nadu, Andhra Pradesh, and Punjab demonstrates that rice plants achieve superior root architecture and tillering capacity when grown under non-flooded, aerated soil conditions.`
      },
      {
        heading: "Key Agronomic Shifts in SRI",
        content: `Unlike conventional transplanting of 25-day-old bundled seedlings into submerged mud:
        <ul>
          <li><strong>Young Seedlings:</strong> Transplant tender 8-to-12 day old seedlings possessing just two leaves with seed sac intact.</li>
          <li><strong>Single Seedling per Hill:</strong> Plant exactly one seedling per hill rather than 4-5 crowded plants.</li>
          <li><strong>Wide Square Spacing:</strong> Space hills at 25 x 25 cm or 30 x 30 cm using a marker roller.</li>
          <li><strong>Mechanical Weeding:</strong> Operate a rotary or cono-weeder 3 to 4 times between rows, incorporating weeds back into the soil as organic matter while aerating root channels.</li>
        </ul>`
      },
      {
        heading: "Alternate Wetting and Drying (AWD)",
        content: `Do not flood the field continuously. Keep soil moist but not submerged during the vegetative stage. Introduce a thin 2-3 cm layer of water only during panicle initiation to grain dough stage.`
      }
    ],
    takeaways: [
      "Reduces seed requirement from 25-30 kg/acre to only 2 kg/acre.",
      "Reduces methane greenhouse emissions through intermittent aerobic soil periods.",
      "Produces stronger tillers with higher resistance to lodging during pre-harvest storms."
    ]
  },

  {
    id: 3,
    title: "Managing Soil Salinity & Sodic Hardpans in Irrigated Plains",
    category: "Soil Health",
    categorySlug: "soil-health",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910a394?auto=format&fit=crop&w=1200&q=80",
    summary: "Identify electrical conductivity (EC) and exchangeable sodium percentage (ESP) issues and reclaim degraded plots using gypsum and green manuring.",
    featured: false,
    publishedDate: "October 2026",
    sections: [
      {
        heading: "Diagnosing Saline vs. Sodic Soils",
        content: `Distinguishing between saline and sodic soils is essential for correct reclamation:
        <ul>
          <li><strong>Saline Soils:</strong> Electrical Conductivity (EC) > 4 dS/m, pH < 8.5. Characterized by white crust on surface in dry weather. Can be reclaimed primarily through leaching with fresh water and providing drainage.</li>
          <li><strong>Sodic Soils:</strong> pH > 8.5, Exchangeable Sodium Percentage (ESP) > 15%. Highly dispersed clay particles create a dense impermeable hardpan. Requires chemical amendment (Gypsum) before leaching.</li>
        </ul>`
      },
      {
        heading: "Gypsum Application Protocol",
        content: `Calculate gypsum requirement from certified soil test reports. Broadcast agricultural gypsum evenly across the ploughed surface during hot summer months. Work it lightly into the top 10 cm of soil, impound good-quality water for 10-15 days, and drain the standing leachate out of the plot through drainage furrows.`
      },
      {
        heading: "Bio-reclamation with Sesbania (Dhaincha)",
        content: `Sow Dhaincha at 20-25 kg/acre. Incorporate the succulent 45-day crop back into the soil using a disc harrow. Decomposition releases carbon dioxide and organic acids that dissolve native soil calcium carbonate, naturally neutralizing alkaline salts.`
      }
    ],
    takeaways: [
      "Never apply gypsum to purely saline soil; it is strictly intended for sodic (high pH) soils.",
      "Effective sub-surface drainage is mandatory to discharge displaced sodium salts.",
      "Green manuring with Dhaincha reduces soil bulk density and restores microbial life."
    ]
  },

  {
    id: 4,
    title: "Integrated Pest Management (IPM) for Cotton: Halting Pink Bollworm",
    category: "Pest Prevention",
    categorySlug: "pest-prevention",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1200&q=80",
    summary: "A calendar-based IPM framework combining pheromone traps, trichogramma parasitoids, and selective eco-friendly interventions.",
    featured: false,
    publishedDate: "September 2026",
    sections: [
      {
        heading: "The Pink Bollworm (Pectinophora gossypiella) Threat",
        content: `Pink bollworm larvae enter tender cotton bolls within hours of hatching. Once sealed inside, larvae feed on developing seeds and lint, creating 'rosetted flowers' and staining lint brown, causing massive qualitative downgrading at mandi auctions.`
      },
      {
        heading: "Pheromone Trap Monitoring Protocol",
        content: `Install funnel-shaped pheromone traps baited with gossyplure lures at 45 days after sowing (DAS):
        <ul>
          <li>Place 4-5 traps per acre at canopy height to monitor moth emergence.</li>
          <li>Replace rubber septa lures every 25-30 days.</li>
          <li><strong>Economic Threshold Level (ETL):</strong> Catch of 8 moths/trap/night for 3 consecutive days, or 10% rosetted flowers in 20 sampled plants indicates actionable threshold.</li>
        </ul>`
      },
      {
        heading: "Biological and Mating Disruption Steps",
        content: `Release egg parasitoids (Trichogramma bactrae) at 50,000 to 60,000 parasites/acre at weekly intervals starting from square formation. Deploy PB-Rope or mating disruption dispensers across continuous village clusters for superior suppression.`
      }
    ],
    takeaways: [
      "Avoid synthetic pyrethroid sprays early in the season; they cause secondary outbreaks of whitefly.",
      "Destruction of cotton stalks immediately after the final picking terminates larval overwintering diapause.",
      "Community-wide synchronized sowing is essential for effective pest control."
    ]
  },

  {
    id: 5,
    title: "Transitioning to Certified Organic Farming: 3-Year Soil & Compliance Roadmap",
    category: "Organic Farming",
    categorySlug: "organic-farming",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
    summary: "A practical guide to navigating the NPOP transition period, preparing farm-made liquid bio-formulations, and earning organic premiums.",
    featured: false,
    publishedDate: "September 2026",
    sections: [
      {
        heading: "Understanding the Conversion Period",
        content: `Under India's National Programme for Organic Production (NPOP) and Participatory Guarantee System (PGS-India), agricultural land requires a mandatory conversion period (usually 2 to 3 years) during which no prohibited synthetic fertilizers or pesticides may be used.`
      },
      {
        heading: "On-Farm Liquid Bio-Formulations",
        content: `Instead of purchasing commercial inputs, prepare high-potency traditional bio-enhancers on-farm:
        <ul>
          <li><strong>Jeevamrutha:</strong> Mix 10 kg native cow dung, 10 liters cow urine, 2 kg jaggery, 2 kg pulse flour, and a handful of virgin forest soil in 200 liters of water. Ferment for 48 hours; apply via irrigation water twice a month.</li>
          <li><strong>Beejamrutha:</strong> Seed treatment formulation protecting young sprouts from soil-borne fungal pathogens.</li>
          <li><strong>Neemastram & Brahmastram:</strong> Fermented botanical extracts using bitter leaves (Neem, Custard apple, Papaya, Pongamia) for broad-spectrum sucking pest deterrence.</li>
        </ul>`
      },
      {
        heading: "Farm Record Keeping and Buffer Zones",
        content: `Maintain clear farm diaries recording date of sowing, input batches, and harvests. Establish a physical 3-meter hedge buffer zone along boundaries shared with non-organic neighbors to prevent spray drift contamination.`
      }
    ],
    takeaways: [
      "Soil organic matter takes 24-36 months of continuous biological inputs to rebuild native fungal networks.",
      "Group certification under PGS-India significantly lowers third-party auditing costs for smallholders.",
      "Intercropping with leguminous pulses prevents yield drops during transition years."
    ]
  },

  {
    id: 6,
    title: "Farm Business Basics: Understanding Mandi Price Seasonality & e-NAM Trading",
    category: "Farm Business Basics",
    categorySlug: "farm-business-basics",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    summary: "Master market arrival cycles, assaying quality parameters, and trading across state APMCs using the national electronic agriculture market.",
    featured: false,
    publishedDate: "August 2026",
    sections: [
      {
        heading: "The Seasonality of Mandi Gluts",
        content: `Agricultural commodity prices follow predictable seasonal cycles. During peak harvest arrivals (e.g. October for soybean and paddy; March-April for wheat and mustard), local mandi yards experience severe gluts, depressing modal spot prices below realistic production costs. Farmers possessing on-farm hermetic storage bags (PICS bags) or access to WDRA-registered cold stores can avoid distress selling and capture 15% to 30% higher margins 60-90 days post-harvest.`
      },
      {
        heading: "How e-NAM (National Agriculture Market) Works",
        content: `e-NAM integrates physical APMC mandis into a unified electronic online trading platform:
        <ol>
          <li><strong>Gate Entry & Lot Weighing:</strong> Produce is assigned a unique lot ID at the mandi gate.</li>
          <li><strong>Scientific Quality Assaying:</strong> Sample lots undergo rapid testing for moisture percentage, foreign matter, grain damage, and test weight (hectolitre weight).</li>
          <li><strong>National Electronic Bidding:</strong> Traders and millers nationwide submit competitive online bids based on verified assay reports.</li>
          <li><strong>Direct Bank Settlement:</strong> Payment is credited directly into the farmer's registered bank account via PFMS/UPI upon bid acceptance.</li>
        </ol>`
      },
      {
        heading: "Key Quality Parameters Farmers Can Control",
        content: `Ensure grain moisture is dried below 12% (14% for paddy) before bagging. Clean extraneous trash, stones, and chaff; clean uniform lots command consistent ₹150–₹250/quintal premiums at auction.`
      }
    ],
    takeaways: [
      "Grain moisture management is the single most controllable factor influencing mandi pricing.",
      "Warehouse Receipts (e-NWR) can be pledged for low-interest bank loans to meet urgent household cash needs without selling crops at seasonal troughs.",
      "Grade produce at farm gate to reduce deduction fees during mandi auctions."
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Check which page we are on
  const isKnowledgeHub = document.getElementById('hubArticlesGrid') !== null;
  const isArticleDetail = document.getElementById('articleDetailContainer') !== null;

  if (isKnowledgeHub) {
    initKnowledgeHub();
  }

  if (isArticleDetail) {
    initArticleDetail();
  }
});

/**
 * Knowledge Hub Page (List & Search)
 */
function initKnowledgeHub() {
  const grid = document.getElementById('hubArticlesGrid');
  const searchInput = document.getElementById('hubSearchInput');
  const categoryChips = document.querySelectorAll('.category-chip');

  let activeCategory = 'all';

  function filterArticles() {
    const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');

    const filtered = articlesDatabase.filter(art => {
      const matchCat = (activeCategory === 'all' || art.categorySlug === activeCategory);
      const matchQuery = !query || 
        art.title.toLowerCase().includes(query) || 
        art.summary.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query);

      return matchCat && matchQuery;
    });

    renderArticles(filtered);
  }

  function renderArticles(list) {
    if (!grid) return;

    if (!list.length) {
      grid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <p style="font-size: 1.1rem; color: var(--color-muted-text);">No articles matched your search query. Try exploring different agricultural categories or resetting keywords.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(art => `
      <article class="article-card reveal active">
        <img class="article-card-img" src="${art.image}" alt="${art.title}" loading="lazy">
        <div class="article-card-body">
          <div class="article-card-meta">
            <span class="badge badge-leaf">${art.category}</span>
            <span>⏱ ${art.readTime}</span>
          </div>
          <h3 class="article-card-title">
            <a href="article.html?id=${art.id}">${art.title}</a>
          </h3>
          <p class="article-card-summary">${art.summary}</p>
          <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid #EEF3EB; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.775rem; color: var(--color-muted-text);">${art.publishedDate}</span>
            <a href="article.html?id=${art.id}" class="btn btn-sm btn-outline-dark" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
              Read Guide →
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Category chip listeners
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-cat') || 'all';
      filterArticles();
    });
  });

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener('input', filterArticles);
  }

  // Initial render
  filterArticles();
}

/**
 * Article Detail Page Renderer
 */
function initArticleDetail() {
  const container = document.getElementById('articleDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const articleId = parseInt(urlParams.get('id')) || 1;

  const article = articlesDatabase.find(a => a.id === articleId) || articlesDatabase[0];

  // Populate title & metadata
  const titleEl = document.getElementById('articleTitle');
  const catEl = document.getElementById('articleCategoryBadge');
  const timeEl = document.getElementById('articleReadTime');
  const dateEl = document.getElementById('articleDate');
  const heroImg = document.getElementById('articleHeroImg');
  const tocList = document.getElementById('articleTocList');
  const contentEl = document.getElementById('articleMainContent');
  const takeawaysEl = document.getElementById('articleTakeawaysList');
  const relatedGrid = document.getElementById('relatedArticlesGrid');

  if (titleEl) titleEl.textContent = article.title;
  if (catEl) catEl.textContent = article.category;
  if (timeEl) timeEl.textContent = `⏱ ${article.readTime}`;
  if (dateEl) dateEl.textContent = `Published: ${article.publishedDate}`;
  if (heroImg) {
    heroImg.src = article.image;
    heroImg.alt = article.title;
  }

  // Build Table of Contents and Main Sections
  if (tocList && contentEl) {
    let tocHtml = '';
    let contentHtml = '';

    article.sections.forEach((sec, idx) => {
      const anchorId = `sec-${idx}`;
      tocHtml += `<li><a href="#${anchorId}">${sec.heading}</a></li>`;
      contentHtml += `
        <section id="${anchorId}" style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--color-dark-green);">${sec.heading}</h2>
          <div>${sec.content}</div>
        </section>
      `;
    });

    tocList.innerHTML = tocHtml;
    contentEl.innerHTML = contentHtml;
  }

  // Takeaways
  if (takeawaysEl && article.takeaways) {
    takeawaysEl.innerHTML = article.takeaways.map(t => `<li><strong>${t}</strong></li>`).join('');
  }

  // Related Articles
  if (relatedGrid) {
    const related = articlesDatabase.filter(a => a.id !== article.id).slice(0, 3);
    relatedGrid.innerHTML = related.map(rel => `
      <article class="article-card">
        <img class="article-card-img" src="${rel.image}" alt="${rel.title}" loading="lazy">
        <div class="article-card-body">
          <div class="article-card-meta">
            <span class="badge badge-leaf">${rel.category}</span>
            <span>⏱ ${rel.readTime}</span>
          </div>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.5rem;">
            <a href="article.html?id=${rel.id}">${rel.title}</a>
          </h4>
          <a href="article.html?id=${rel.id}" style="margin-top: auto; font-size: 0.85rem; font-weight: 600; color: var(--color-dark-green);">Read Guide →</a>
        </div>
      </article>
    `).join('');
  }
}

