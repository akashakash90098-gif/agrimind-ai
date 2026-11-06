/**
 * AGRIMIND AI — FARM PROFIT CALCULATOR
 * Real-Time Agricultural Economics, Cost Breakdown & Unit Conversions
 */

// Presets for quick exploration
const profitPresets = {
  tomato: {
    crop: "Hybrid Tomato (Trellis)",
    area: 1,
    unit: "acres",
    yieldPerUnit: 180, // Quintals/acre
    pricePerQtl: 1600, // ₹/quintal
    costs: {
      seed: 8500,
      fertilizer: 18000,
      pesticide: 12000,
      labor: 28000,
      irrigation: 6500,
      machinery: 8000,
      other: 5000
    }
  },
  wheat: {
    crop: "Wheat (HD-3086)",
    area: 5,
    unit: "acres",
    yieldPerUnit: 22,
    pricePerQtl: 2425,
    costs: {
      seed: 9500,
      fertilizer: 19500,
      pesticide: 6000,
      labor: 16000,
      irrigation: 8500,
      machinery: 14000,
      other: 4500
    }
  },
  cotton: {
    crop: "Bt Cotton",
    area: 2,
    unit: "acres",
    yieldPerUnit: 11,
    pricePerQtl: 7100,
    costs: {
      seed: 4800,
      fertilizer: 14000,
      pesticide: 11000,
      labor: 18000,
      irrigation: 5500,
      machinery: 7500,
      other: 3500
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initProfitCalculator();
});

function initProfitCalculator() {
  const form = document.getElementById('profitCalcForm');
  const resetBtn = document.getElementById('calcResetBtn');
  const printBtn = document.getElementById('calcPrintBtn');

  // Input Fields
  const cropInput = document.getElementById('calcCropName');
  const areaInput = document.getElementById('calcArea');
  const unitSelect = document.getElementById('calcUnit');
  const yieldInput = document.getElementById('calcYield');
  const priceInput = document.getElementById('calcPrice');

  const costSeed = document.getElementById('costSeed');
  const costFertilizer = document.getElementById('costFertilizer');
  const costPesticide = document.getElementById('costPesticide');
  const costLabor = document.getElementById('costLabor');
  const costIrrigation = document.getElementById('costIrrigation');
  const costMachinery = document.getElementById('costMachinery');
  const costOther = document.getElementById('costOther');

  // Output Displays
  const outProfit = document.getElementById('outNetProfit');
  const outRevenue = document.getElementById('outGrossRevenue');
  const outExpenses = document.getElementById('outTotalExpenses');
  const outYield = document.getElementById('outTotalYield');
  const outMargin = document.getElementById('outProfitMargin');
  const outRoi = document.getElementById('outRoi');
  const outBreakevenPrice = document.getElementById('outBreakevenPrice');

  // Breakdown Visualizer Elements
  const barContainer = document.getElementById('costStackedBar');
  const legendContainer = document.getElementById('costLegendGrid');
  const presetPills = document.querySelectorAll('.profit-preset-btn');

  if (!areaInput || !outProfit) return;

  const costCategories = [
    { id: 'seed', name: 'Seed & Planting', input: costSeed, color: '#3B82F6' },
    { id: 'fertilizer', name: 'Fertilizers & Nutrients', input: costFertilizer, color: '#10B981' },
    { id: 'pesticide', name: 'Crop Protection & Bio-sprays', input: costPesticide, color: '#F59E0B' },
    { id: 'labor', name: 'Field Labor & Harvesting', input: costLabor, color: '#EF4444' },
    { id: 'irrigation', name: 'Irrigation & Electricity', input: costIrrigation, color: '#06B6D4' },
    { id: 'machinery', name: 'Tractor, Fuel & Transport', input: costMachinery, color: '#8B5CF6' },
    { id: 'other', name: 'Other Contingencies', input: costOther, color: '#6B7280' }
  ];

  // Dynamic Calculation Function
  function calculateFarmProfit() {
    const area = parseFloat(areaInput.value) || 0;
    const yieldPerUnit = parseFloat(yieldInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const unit = unitSelect ? unitSelect.value : 'acres';

    // Total Yield in Quintals
    const totalYield = area * yieldPerUnit;

    // Gross Revenue
    const grossRevenue = totalYield * price;

    // Total Expenses
    let totalExpenses = 0;
    const itemizedCosts = {};

    costCategories.forEach(cat => {
      const val = parseFloat(cat.input ? cat.input.value : 0) || 0;
      itemizedCosts[cat.id] = val;
      totalExpenses += val;
    });

    // Net Profit & Metrics
    const netProfit = grossRevenue - totalExpenses;
    const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
    const roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;
    const breakevenPrice = totalYield > 0 ? (totalExpenses / totalYield) : 0;

    // Render Outputs
    if (outYield) outYield.textContent = `${totalYield.toLocaleString('en-IN', { maximumFractionDigits: 1 })} Quintals`;
    if (outRevenue) outRevenue.textContent = `₹${Math.round(grossRevenue).toLocaleString('en-IN')}`;
    if (outExpenses) outExpenses.textContent = `₹${Math.round(totalExpenses).toLocaleString('en-IN')}`;

    if (outProfit) {
      const isPositive = netProfit >= 0;
      outProfit.textContent = `${isPositive ? '+' : ''}₹${Math.round(netProfit).toLocaleString('en-IN')}`;
      outProfit.className = `calc-profit-val ${isPositive ? 'positive' : 'negative'}`;
    }

    if (outMargin) {
      outMargin.textContent = `${profitMargin.toFixed(1)}%`;
      outMargin.style.color = profitMargin >= 0 ? 'var(--color-lime)' : '#F87171';
    }

    if (outRoi) {
      outRoi.textContent = `${roi.toFixed(1)}%`;
      outRoi.style.color = roi >= 0 ? 'var(--color-pure-white)' : '#F87171';
    }

    if (outBreakevenPrice) {
      outBreakevenPrice.textContent = `₹${Math.round(breakevenPrice).toLocaleString('en-IN')} / Qtl`;
    }

    // Render Cost Breakdown Stacked Bar & Legend
    renderCostBreakdown(totalExpenses, itemizedCosts);
  }

  function renderCostBreakdown(totalExpenses, itemizedCosts) {
    if (!barContainer || !legendContainer) return;

    if (totalExpenses <= 0) {
      barContainer.innerHTML = `<div style="width: 100%; height: 100%; background: #E2E8F0; border-radius: var(--radius-full);"></div>`;
      legendContainer.innerHTML = `<div style="color: var(--color-muted-text); font-size: 0.825rem;">Enter production expenses to visualize the cost distribution.</div>`;
      return;
    }

    // Build Segments
    let barHtml = '';
    let legendHtml = '';

    costCategories.forEach(cat => {
      const val = itemizedCosts[cat.id] || 0;
      if (val > 0) {
        const pct = ((val / totalExpenses) * 100).toFixed(1);
        barHtml += `
          <div class="cost-segment" style="width: ${pct}%; background-color: ${cat.color};" title="${cat.name}: ₹${val.toLocaleString('en-IN')} (${pct}%)"></div>
        `;
        legendHtml += `
          <div class="cost-legend-item">
            <span class="cost-legend-dot" style="background-color: ${cat.color};"></span>
            <span>${cat.name}: <strong>₹${val.toLocaleString('en-IN')}</strong> (${pct}%)</span>
          </div>
        `;
      }
    });

    barContainer.innerHTML = barHtml;
    legendContainer.innerHTML = legendHtml;
  }

  // Bind live listeners on all inputs
  const allInputs = [
    cropInput, areaInput, unitSelect, yieldInput, priceInput,
    costSeed, costFertilizer, costPesticide, costLabor, costIrrigation, costMachinery, costOther
  ];

  allInputs.forEach(inp => {
    if (inp) {
      inp.addEventListener('input', calculateFarmProfit);
      inp.addEventListener('change', calculateFarmProfit);
    }
  });

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      calculateFarmProfit();
      window.showToast('Calculator inputs reset.', 'info');
    });
  }

  // Print Estimate Button
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Preset Buttons
  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const key = pill.getAttribute('data-preset');
      const p = profitPresets[key];
      if (p) {
        if (cropInput) cropInput.value = p.crop;
        if (areaInput) areaInput.value = p.area;
        if (unitSelect) unitSelect.value = p.unit;
        if (yieldInput) yieldInput.value = p.yieldPerUnit;
        if (priceInput) priceInput.value = p.pricePerQtl;

        if (costSeed) costSeed.value = p.costs.seed;
        if (costFertilizer) costFertilizer.value = p.costs.fertilizer;
        if (costPesticide) costPesticide.value = p.costs.pesticide;
        if (costLabor) costLabor.value = p.costs.labor;
        if (costIrrigation) costIrrigation.value = p.costs.irrigation;
        if (costMachinery) costMachinery.value = p.costs.machinery;
        if (costOther) costOther.value = p.costs.other;

        presetPills.forEach(b => b.classList.remove('active'));
        pill.classList.add('active');

        calculateFarmProfit();
        window.showToast(`Loaded ${p.crop} sample cost profile.`, 'info');
      }
    });
  });

  // Initial Calculation
  calculateFarmProfit();
}
