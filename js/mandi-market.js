/**
 * AGRIMIND AI — MANDI MARKET & PRICE INSIGHTS
 * Sample Agricultural Market Commodity Prices, Filtering, Trends & Revenue Estimator
 */

// Sample Illustrative Mandi Database
const sampleMandiDatabase = [
  { crop: "Paddy (Basmati)", state: "Punjab", market: "Khanna APMC", modalPrice: 4250, minPrice: 3800, maxPrice: 4600, arrivals: "1,240 Qtl", date: "Today", trend: "+3.2%" },
  { crop: "Paddy (Common)", state: "Andhra Pradesh", market: "Guntur Mandi", modalPrice: 2280, minPrice: 2183, maxPrice: 2350, arrivals: "2,850 Qtl", date: "Today", trend: "+0.8%" },
  { crop: "Wheat", state: "Madhya Pradesh", market: "Indore Mandi", modalPrice: 2550, minPrice: 2420, maxPrice: 2710, arrivals: "3,100 Qtl", date: "Today", trend: "-0.5%" },
  { crop: "Wheat", state: "Punjab", market: "Ludhiana APMC", modalPrice: 2480, minPrice: 2350, maxPrice: 2600, arrivals: "4,200 Qtl", date: "Today", trend: "+1.2%" },
  { crop: "Cotton (Medium Staple)", state: "Gujarat", market: "Rajkot APMC", modalPrice: 7200, minPrice: 6850, maxPrice: 7550, arrivals: "980 Qtl", date: "Today", trend: "+2.1%" },
  { crop: "Cotton (Medium Staple)", state: "Maharashtra", market: "Amravati Mandi", modalPrice: 7050, minPrice: 6600, maxPrice: 7350, arrivals: "1,150 Qtl", date: "Today", trend: "-1.1%" },
  { crop: "Soybean (Yellow)", state: "Madhya Pradesh", market: "Ujjain APMC", modalPrice: 4420, minPrice: 4200, maxPrice: 4680, arrivals: "1,890 Qtl", date: "Today", trend: "+1.5%" },
  { crop: "Mustard (Sarson)", state: "Rajasthan", market: "Jaipur APMC", modalPrice: 5650, minPrice: 5350, maxPrice: 5900, arrivals: "1,420 Qtl", date: "Today", trend: "+2.8%" },
  { crop: "Maize (Makka)", state: "Karnataka", market: "Davangere Mandi", modalPrice: 2200, minPrice: 2050, maxPrice: 2320, arrivals: "2,100 Qtl", date: "Today", trend: "+0.4%" },
  { crop: "Red Chilli (Teja)", state: "Andhra Pradesh", market: "Guntur Yard", modalPrice: 19800, minPrice: 18200, maxPrice: 21500, arrivals: "450 Qtl", date: "Today", trend: "+4.5%" },
  { crop: "Tomato (Hybrid)", state: "Maharashtra", market: "Nashik APMC", modalPrice: 1650, minPrice: 1200, maxPrice: 2100, arrivals: "3,400 Qtl", date: "Today", trend: "-5.2%" },
  { crop: "Tomato (Hybrid)", state: "Karnataka", market: "Kolar Mandi", modalPrice: 1720, minPrice: 1300, maxPrice: 2250, arrivals: "4,100 Qtl", date: "Today", trend: "-3.8%" },
  { crop: "Onion (Red)", state: "Maharashtra", market: "Lasalgaon Mandi", modalPrice: 2850, minPrice: 2400, maxPrice: 3300, arrivals: "5,800 Qtl", date: "Today", trend: "+6.1%" },
  { crop: "Gram / Chana", state: "Rajasthan", market: "Bikaner APMC", modalPrice: 5900, minPrice: 5650, maxPrice: 6150, arrivals: "920 Qtl", date: "Today", trend: "+1.0%" },
  { crop: "Turmeric (Haldi)", state: "Tamil Nadu", market: "Erode Mandi", modalPrice: 14200, minPrice: 13100, maxPrice: 15400, arrivals: "610 Qtl", date: "Today", trend: "+3.0%" }
];

// Sample 30-Day Historical Trends (5-day intervals)
const mandiHistoryTrends = {
  paddy: [
    { label: "Day 1", price: 3950 },
    { label: "Day 5", price: 4020 },
    { label: "Day 10", price: 4100 },
    { label: "Day 15", price: 4050 },
    { label: "Day 20", price: 4180 },
    { label: "Day 25", price: 4220 },
    { label: "Day 30", price: 4250 }
  ],
  wheat: [
    { label: "Day 1", price: 2420 },
    { label: "Day 5", price: 2450 },
    { label: "Day 10", price: 2490 },
    { label: "Day 15", price: 2520 },
    { label: "Day 20", price: 2500 },
    { label: "Day 25", price: 2530 },
    { label: "Day 30", price: 2550 }
  ],
  cotton: [
    { label: "Day 1", price: 6850 },
    { label: "Day 5", price: 6920 },
    { label: "Day 10", price: 7000 },
    { label: "Day 15", price: 6950 },
    { label: "Day 20", price: 7100 },
    { label: "Day 25", price: 7150 },
    { label: "Day 30", price: 7200 }
  ],
  soybean: [
    { label: "Day 1", price: 4200 },
    { label: "Day 5", price: 4280 },
    { label: "Day 10", price: 4350 },
    { label: "Day 15", price: 4310 },
    { label: "Day 20", price: 4390 },
    { label: "Day 25", price: 4400 },
    { label: "Day 30", price: 4420 }
  ],
  mustard: [
    { label: "Day 1", price: 5350 },
    { label: "Day 5", price: 5420 },
    { label: "Day 10", price: 5500 },
    { label: "Day 15", price: 5480 },
    { label: "Day 20", price: 5560 },
    { label: "Day 25", price: 5610 },
    { label: "Day 30", price: 5650 }
  ],
  tomato: [
    { label: "Day 1", price: 2200 },
    { label: "Day 5", price: 2050 },
    { label: "Day 10", price: 1900 },
    { label: "Day 15", price: 1820 },
    { label: "Day 20", price: 1750 },
    { label: "Day 25", price: 1680 },
    { label: "Day 30", price: 1650 }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initMandiMarket();
});

function initMandiMarket() {
  const searchInput = document.getElementById('mandiSearchInput');
  const cropFilter = document.getElementById('mandiCropFilter');
  const stateFilter = document.getElementById('mandiStateFilter');
  const sortSelect = document.getElementById('mandiSortSelect');
  const tableBody = document.getElementById('mandiTableBody');

  const statAvg = document.getElementById('mandiStatAvg');
  const statHigh = document.getElementById('mandiStatHigh');
  const statLow = document.getElementById('mandiStatLow');
  const statTrend = document.getElementById('mandiStatTrend');

  // Trend Chart Elements
  const trendSelect = document.getElementById('trendCropSelect');
  const chartContainer = document.getElementById('mandiTrendChart');

  // Revenue Estimator Elements
  const calcQty = document.getElementById('calcQty');
  const calcPrice = document.getElementById('calcPrice');
  const calcTransport = document.getElementById('calcTransport');
  const calcGrossRev = document.getElementById('calcGrossRev');
  const calcNetRev = document.getElementById('calcNetRev');
  const calcBtn = document.getElementById('calcRevenueBtn');

  function filterAndSortData() {
    const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
    const selectedCrop = (cropFilter ? cropFilter.value : 'all');
    const selectedState = (stateFilter ? stateFilter.value : 'all');
    const sortBy = (sortSelect ? sortSelect.value : 'price-desc');

    let filtered = sampleMandiDatabase.filter(item => {
      const matchQuery = !query || 
        item.crop.toLowerCase().includes(query) || 
        item.market.toLowerCase().includes(query) || 
        item.state.toLowerCase().includes(query);

      const matchCrop = selectedCrop === 'all' || item.crop.toLowerCase().includes(selectedCrop.toLowerCase());
      const matchState = selectedState === 'all' || item.state.toLowerCase() === selectedState.toLowerCase();

      return matchQuery && matchCrop && matchState;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'price-desc') return b.modalPrice - a.modalPrice;
      if (sortBy === 'price-asc') return a.modalPrice - b.modalPrice;
      if (sortBy === 'crop') return a.crop.localeCompare(b.crop);
      if (sortBy === 'market') return a.market.localeCompare(b.market);
      return 0;
    });

    renderTable(filtered);
    updateStats(filtered);
  }

  function renderTable(data) {
    if (!tableBody) return;

    if (!data.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--color-muted-text);">
            No matching mandi listings found. Try adjusting your search query or filters.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = data.map(item => `
      <tr>
        <td style="font-weight: 700; color: var(--color-dark-green);">${item.crop}</td>
        <td>
          <div style="font-weight: 600;">${item.market}</div>
          <div style="font-size: 0.775rem; color: var(--color-muted-text);">${item.state}</div>
        </td>
        <td><span class="price-pill">₹${item.modalPrice.toLocaleString('en-IN')}</span> / Qtl</td>
        <td style="font-size: 0.825rem; color: var(--color-text-body);">₹${item.minPrice} – ₹${item.maxPrice}</td>
        <td>${item.arrivals}</td>
        <td>
          <span class="badge ${item.trend.startsWith('+') ? 'badge-leaf' : 'badge-danger'}">
            ${item.trend}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-dark select-mandi-crop" data-crop="${item.crop}" data-price="${item.modalPrice}">
            Calculate
          </button>
        </td>
      </tr>
    `).join('');

    // Attach row calculate buttons
    document.querySelectorAll('.select-mandi-crop').forEach(btn => {
      btn.addEventListener('click', () => {
        const crop = btn.getAttribute('data-crop');
        const price = btn.getAttribute('data-price');
        if (calcPrice) calcPrice.value = price;
        calculateRevenue();
        const estCard = document.getElementById('revenueEstimatorCard');
        if (estCard) estCard.scrollIntoView({ behavior: 'smooth' });
        window.showToast(`Selected price ₹${price}/Qtl for calculation.`, 'info');
      });
    });
  }

  function updateStats(data) {
    if (!data.length) {
      if (statAvg) statAvg.textContent = "₹0";
      if (statHigh) statHigh.textContent = "₹0";
      if (statLow) statLow.textContent = "₹0";
      return;
    }

    const prices = data.map(d => d.modalPrice);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    if (statAvg) statAvg.textContent = `₹${avg.toLocaleString('en-IN')}`;
    if (statHigh) statHigh.textContent = `₹${max.toLocaleString('en-IN')}`;
    if (statLow) statLow.textContent = `₹${min.toLocaleString('en-IN')}`;
    if (statTrend) statTrend.textContent = "+1.8% Avg";
  }

  // 30-Day Trend Chart Renderer
  function renderTrendChart(cropKey) {
    if (!chartContainer) return;
    const series = mandiHistoryTrends[cropKey] || mandiHistoryTrends.paddy;
    const maxPrice = Math.max(...series.map(s => s.price));
    const minPrice = Math.min(...series.map(s => s.price));

    chartContainer.innerHTML = series.map((pt, idx) => {
      // Calculate height percentage relative to max
      const heightPct = Math.max(25, Math.round((pt.price / (maxPrice * 1.05)) * 100));
      const isPositive = idx === 0 || pt.price >= series[idx - 1].price;

      return `
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; height: 100%;">
          <div style="font-size: 0.725rem; font-weight: 700; color: var(--color-dark-green);">₹${pt.price.toLocaleString('en-IN')}</div>
          <div style="width: 100%; max-width: 42px; height: 160px; background: #EEF3EB; border-radius: var(--radius-sm); position: relative; display: flex; align-items: flex-end;">
            <div style="width: 100%; height: ${heightPct}%; background: ${isPositive ? 'linear-gradient(to top, var(--color-fresh-leaf), var(--color-lime))' : 'linear-gradient(to top, #F87171, #FCA5A5)'}; border-radius: var(--radius-sm); transition: height 0.5s ease;"></div>
          </div>
          <div style="font-size: 0.725rem; color: var(--color-muted-text);">${pt.label}</div>
        </div>
      `;
    }).join('');
  }

  if (trendSelect) {
    trendSelect.addEventListener('change', () => {
      renderTrendChart(trendSelect.value);
    });
  }

  // Potential Revenue Calculator
  function calculateRevenue() {
    const qty = parseFloat(calcQty ? calcQty.value : 0) || 0;
    const price = parseFloat(calcPrice ? calcPrice.value : 0) || 0;
    const transportPerQtl = parseFloat(calcTransport ? calcTransport.value : 0) || 0;

    const gross = qty * price;
    const totalTransport = qty * transportPerQtl;
    const net = Math.max(0, gross - totalTransport);

    if (calcGrossRev) calcGrossRev.textContent = `₹${Math.round(gross).toLocaleString('en-IN')}`;
    if (calcNetRev) calcNetRev.textContent = `₹${Math.round(net).toLocaleString('en-IN')}`;
  }

  if (calcBtn) calcBtn.addEventListener('click', calculateRevenue);
  if (calcQty) calcQty.addEventListener('input', calculateRevenue);
  if (calcPrice) calcPrice.addEventListener('input', calculateRevenue);
  if (calcTransport) calcTransport.addEventListener('input', calculateRevenue);

  // Filter Listeners
  if (searchInput) searchInput.addEventListener('input', filterAndSortData);
  if (cropFilter) cropFilter.addEventListener('change', filterAndSortData);
  if (stateFilter) stateFilter.addEventListener('change', filterAndSortData);
  if (sortSelect) sortSelect.addEventListener('change', filterAndSortData);

  // Initial render
  filterAndSortData();
  renderTrendChart('paddy');
  calculateRevenue();
}
