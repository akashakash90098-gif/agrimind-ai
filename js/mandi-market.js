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

  // Revenue Estimator Elements
  const calcCropSelect = document.getElementById('calcCropSelect');
  const calcQty = document.getElementById('calcQty');
  const calcPrice = document.getElementById('calcPrice');
  const calcTransport = document.getElementById('calcTransport');
  const calcGrossRev = document.getElementById('calcGrossRev');
  const calcNetRev = document.getElementById('calcNetRev');
  const calcBtn = document.getElementById('calcRevenueBtn');

  let currentData = [...sampleMandiDatabase];

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

    currentData = filtered;
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

  if (calcBtn) {
    calcBtn.addEventListener('click', calculateRevenue);
  }

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
  calculateRevenue();
}

