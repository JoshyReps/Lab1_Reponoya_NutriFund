/**
 * Client-Side Application Logic (Dual-Mode: Static GitHub Pages & Express API)
 * Dietary Compliance Validation Engine
 */

let allPolicies = [];
let allFoods = [];
let samplePlans = [];
let selectedPolicies = ['low-salt']; // Default selected policy

// Detect if running in pure static/GitHub Pages mode or with active backend API
const isStaticMode = (typeof window.DietaryValidator !== 'undefined');

document.addEventListener('DOMContentLoaded', async () => {
  await loadInitialData();
  setupEventListeners();
  // Auto-run first sample plan to present immediate visual audit
  loadSamplePlan('low-salt-compliant');
});

/**
 * Fetch or Load Policies, Foods, and Sample Plans
 */
async function loadInitialData() {
  try {
    if (isStaticMode && window.DIETARY_RULES && window.FOOD_DATA && window.SAMPLE_DATA) {
      // Pure client-side static mode (GitHub Pages)
      allPolicies = Object.values(window.DIETARY_RULES.DIETARY_POLICIES);
      allFoods = window.FOOD_DATA.FOOD_DATABASE;
      samplePlans = Object.values(window.SAMPLE_DATA.SAMPLE_PLANS);
    } else {
      // Backend Express API mode
      const [policiesRes, foodsRes, samplesRes] = await Promise.all([
        fetch('/api/policies').then(r => r.json()),
        fetch('/api/foods').then(r => r.json()),
        fetch('/api/sample-plans').then(r => r.json())
      ]);

      allPolicies = policiesRes.policies || [];
      allFoods = foodsRes.foods || [];
      samplePlans = samplesRes.samples || [];
    }

    renderPolicyCards();
    renderFoodDropdowns();
    renderQuickTestButtons();
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
}

/**
 * Render Policy Selection Cards
 */
function renderPolicyCards() {
  const container = document.getElementById('policyGrid');
  container.innerHTML = '';

  allPolicies.forEach(policy => {
    const isChecked = selectedPolicies.includes(policy.id);
    const card = document.createElement('div');
    card.className = `policy-card ${isChecked ? 'active' : ''}`;
    card.dataset.policyId = policy.id;

    card.innerHTML = `
      <div>
        <div class="policy-card-top">
          <span class="policy-name">${policy.name}</span>
          <input type="checkbox" class="policy-checkbox" value="${policy.id}" ${isChecked ? 'checked' : ''}>
        </div>
        <div class="policy-cebuano">${policy.cebuanoName}</div>
      </div>
      <p class="policy-desc">${policy.description}</p>
    `;

    card.addEventListener('click', (e) => {
      const checkbox = card.querySelector('.policy-checkbox');
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      updateSelectedPolicies();
    });

    const checkbox = card.querySelector('.policy-checkbox');
    checkbox.addEventListener('change', () => {
      updateSelectedPolicies();
    });

    container.appendChild(card);
  });
}

function updateSelectedPolicies() {
  const checkboxes = document.querySelectorAll('.policy-checkbox:checked');
  selectedPolicies = Array.from(checkboxes).map(cb => cb.value);

  document.querySelectorAll('.policy-card').forEach(card => {
    const pid = card.dataset.policyId;
    if (selectedPolicies.includes(pid)) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  if (selectedPolicies.length === 0) {
    selectedPolicies = ['low-salt'];
    const defaultCb = document.querySelector(`.policy-checkbox[value="low-salt"]`);
    if (defaultCb) defaultCb.checked = true;
    const defaultCard = document.querySelector(`.policy-card[data-policy-id="low-salt"]`);
    if (defaultCard) defaultCard.classList.add('active');
  }
}

/**
 * Populate Multi-Select Options with Categorized Foods
 */
function renderFoodDropdowns() {
  const selects = [
    { el: document.getElementById('breakfastItems'), categories: ['grain_carbs', 'meat_protein', 'vegetable', 'fruit', 'fats_oil'] },
    { el: document.getElementById('lunchItems'), categories: ['grain_carbs', 'meat_protein', 'vegetable', 'soup', 'fats_oil'] },
    { el: document.getElementById('dinnerItems'), categories: ['grain_carbs', 'meat_protein', 'vegetable', 'soup', 'fats_oil'] },
    { el: document.getElementById('snackItems'), categories: ['fruit', 'dessert', 'grain_carbs'] },
    { el: document.getElementById('beverageItems'), categories: ['beverage'] }
  ];

  selects.forEach(({ el, categories }) => {
    if (!el) return;
    el.innerHTML = '';

    const filtered = allFoods.filter(f => categories.includes(f.category));
    filtered.forEach(food => {
      const opt = document.createElement('option');
      opt.value = food.id;
      opt.textContent = `${food.name} (${food.cebuano})`;
      el.appendChild(opt);
    });
  });
}

/**
 * Render 1-Click Sample Test Plan Buttons
 */
function renderQuickTestButtons() {
  const container = document.getElementById('quickTestButtons');
  container.innerHTML = '';

  const testCases = [
    { id: 'low-salt-compliant', label: '✓ Low Salt (Compliant)', type: 'pass' },
    { id: 'low-salt-violation', label: '✗ Low Salt (Violations)', type: 'fail' },
    { id: 'low-fat-compliant', label: '✓ Low Fat (Compliant)', type: 'pass' },
    { id: 'low-fat-violation', label: '✗ Low Fat (Violations)', type: 'fail' },
    { id: 'low-purine-compliant', label: '✓ Low Purine (Compliant)', type: 'pass' },
    { id: 'low-purine-violation', label: '✗ Low Purine (Violations)', type: 'fail' },
    { id: 'potassium-restricted-compliant', label: '✓ Potassium Restricted (Compliant)', type: 'pass' },
    { id: 'potassium-restricted-violation', label: '✗ Potassium Restricted (Violations)', type: 'fail' }
  ];

  testCases.forEach(tc => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `btn-sample ${tc.type === 'pass' ? 'btn-sample-pass' : 'btn-sample-fail'}`;
    btn.textContent = tc.label;
    btn.addEventListener('click', () => loadSamplePlan(tc.id));
    container.appendChild(btn);
  });
}

/**
 * Load Predefined Sample Plan into Form and Trigger Immediate Validation
 */
async function loadSamplePlan(planId) {
  try {
    let plan = null;

    if (isStaticMode && window.SAMPLE_DATA) {
      plan = window.SAMPLE_DATA.SAMPLE_PLANS[planId];
    } else {
      const res = await fetch(`/api/sample-plans/${planId}`);
      const data = await res.json();
      plan = data.plan;
    }

    if (!plan) return;

    // Set target policy
    selectedPolicies = [plan.policyId];
    document.querySelectorAll('.policy-checkbox').forEach(cb => {
      cb.checked = (cb.value === plan.policyId);
    });
    updateSelectedPolicies();

    // Populate patient name
    document.getElementById('patientName').value = plan.patientName || '';

    // Populate meals
    populateMealSlot('breakfast', plan.meals.breakfast);
    populateMealSlot('lunch', plan.meals.lunch);
    populateMealSlot('dinner', plan.meals.dinner);
    populateMealSlot('snack', plan.meals.snacks);

    // Populate beverages
    setSelectedOptions(document.getElementById('beverageItems'), plan.beverages || []);

    // Populate seasonings
    const allSeasonings = [
      ...(plan.meals.breakfast?.seasonings || []),
      ...(plan.meals.lunch?.seasonings || []),
      ...(plan.meals.dinner?.seasonings || [])
    ];
    document.querySelectorAll('input[name="seasonings"]').forEach(cb => {
      cb.checked = allSeasonings.includes(cb.value);
    });

    // Populate trackers
    if (plan.dailyStats) {
      document.getElementById('waterLiters').value = plan.dailyStats.waterLiters ?? 2.5;
      document.getElementById('weeklyEggs').value = plan.dailyStats.weeklyEggCount ?? 2;
      document.getElementById('meatServings').value = plan.dailyStats.dailyMeatServings ?? 2;
      document.getElementById('coffeeCups').value = plan.dailyStats.dailyCoffeeCups ?? 1;
    }

    // Trigger validation
    triggerValidation();
  } catch (err) {
    console.error('Error loading sample plan:', err);
  }
}

function populateMealSlot(slotName, mealData) {
  if (!mealData) return;
  const itemsSelect = document.getElementById(`${slotName}Items`);
  const customInput = document.getElementById(`${slotName}Custom`);
  const methodSelect = document.getElementById(`${slotName}Method`);

  if (itemsSelect) setSelectedOptions(itemsSelect, mealData.items || []);
  if (customInput) customInput.value = (mealData.customItems || []).join(', ');
  if (methodSelect && mealData.cookingMethod) methodSelect.value = mealData.cookingMethod;
}

function setSelectedOptions(selectEl, values) {
  Array.from(selectEl.options).forEach(opt => {
    opt.selected = values.includes(opt.value);
  });
}

function getSelectedOptions(selectEl) {
  return Array.from(selectEl.selectedOptions).map(opt => opt.value);
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  const form = document.getElementById('mealPlanForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerValidation();
  });

  document.getElementById('clearPlanBtn').addEventListener('click', () => {
    form.reset();
    document.querySelectorAll('.food-multiselect').forEach(s => setSelectedOptions(s, []));
    document.getElementById('resultsContent').classList.add('d-none');
    document.getElementById('resultsPlaceholder').classList.remove('d-none');
  });

  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });
}

/**
 * Execute Compliance Validation Call
 */
async function triggerValidation() {
  const patientName = document.getElementById('patientName').value.trim();

  // Gather seasonings
  const checkedSeasonings = Array.from(document.querySelectorAll('input[name="seasonings"]:checked')).map(cb => cb.value);

  // Gather meal slots
  const parseCustom = (val) => val ? val.split(',').map(s => s.trim()).filter(Boolean) : [];

  const payload = {
    patientName: patientName || 'Inpatient Evaluation',
    selectedPolicies,
    meals: {
      breakfast: {
        items: getSelectedOptions(document.getElementById('breakfastItems')),
        customItems: parseCustom(document.getElementById('breakfastCustom').value),
        cookingMethod: document.getElementById('breakfastMethod').value,
        seasonings: checkedSeasonings
      },
      lunch: {
        items: getSelectedOptions(document.getElementById('lunchItems')),
        customItems: parseCustom(document.getElementById('lunchCustom').value),
        cookingMethod: document.getElementById('lunchMethod').value,
        seasonings: checkedSeasonings
      },
      dinner: {
        items: getSelectedOptions(document.getElementById('dinnerItems')),
        customItems: parseCustom(document.getElementById('dinnerCustom').value),
        cookingMethod: document.getElementById('dinnerMethod').value,
        seasonings: checkedSeasonings
      },
      snacks: {
        items: getSelectedOptions(document.getElementById('snackItems')),
        customItems: parseCustom(document.getElementById('snackCustom').value)
      }
    },
    beverages: getSelectedOptions(document.getElementById('beverageItems')),
    dailyStats: {
      waterLiters: parseFloat(document.getElementById('waterLiters').value) || 0,
      weeklyEggCount: parseInt(document.getElementById('weeklyEggs').value, 10) || 0,
      dailyMeatServings: parseInt(document.getElementById('meatServings').value, 10) || 0,
      dailyCoffeeCups: parseInt(document.getElementById('coffeeCups').value, 10) || 0
    }
  };

  try {
    if (isStaticMode && window.DietaryValidator) {
      // In-browser static execution (GitHub Pages mode)
      const auditResult = window.DietaryValidator.validateMealPlan(payload, selectedPolicies);
      renderValidationReport(auditResult);
    } else {
      // Backend Express API mode
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.status === 'success' && result.data) {
        renderValidationReport(result.data);
      } else {
        alert('Validation Error: ' + (result.message || 'Unknown error'));
      }
    }
  } catch (error) {
    console.error('Validation request failed:', error);
    alert('Failed to connect to backend validator service.');
  }
}

/**
 * Render Audit Report on Right Column
 */
function renderValidationReport(audit) {
  document.getElementById('resultsPlaceholder').classList.add('d-none');
  const resultsContent = document.getElementById('resultsContent');
  resultsContent.classList.remove('d-none');

  // Timestamp
  document.getElementById('auditTimestamp').textContent = `Audited: ${new Date(audit.timestamp).toLocaleTimeString()}`;

  // Score Banner
  const scoreBanner = document.getElementById('scoreBanner');
  scoreBanner.className = 'score-banner';
  if (audit.overallStatus === 'COMPLIANT') {
    scoreBanner.classList.add('status-compliant');
  } else if (audit.overallStatus === 'WARNING') {
    scoreBanner.classList.add('status-warning');
  } else {
    scoreBanner.classList.add('status-violation');
  }

  document.getElementById('scoreNumber').textContent = `${audit.complianceScore}%`;
  document.getElementById('statusBadge').textContent = audit.overallStatus;
  document.getElementById('patientAuditTitle').textContent = `Patient: ${audit.patientName}`;
  document.getElementById('auditSummaryText').textContent = audit.summary;

  // Critical Violations
  const violationsGroup = document.getElementById('violationsGroup');
  const violationsList = document.getElementById('violationsList');
  document.getElementById('violationsCount').textContent = audit.criticalViolations.length;
  violationsList.innerHTML = '';

  if (audit.criticalViolations.length === 0) {
    violationsGroup.classList.add('d-none');
  } else {
    violationsGroup.classList.remove('d-none');
    audit.criticalViolations.forEach(v => {
      const card = document.createElement('div');
      card.className = 'alert-card alert-card-danger';
      card.innerHTML = `
        <div class="alert-card-header">
          <span>❌ ${escapeHtml(v.item)}</span>
          <span>[${escapeHtml(v.meal)}]</span>
        </div>
        <div class="alert-card-body">${escapeHtml(v.rule)}</div>
        <span class="alert-citation">Source: ${escapeHtml(v.institutionCitation || v.policy)}</span>
      `;
      violationsList.appendChild(card);
    });
  }

  // Clinical Warnings
  const warningsGroup = document.getElementById('warningsGroup');
  const warningsList = document.getElementById('warningsList');
  document.getElementById('warningsCount').textContent = audit.warnings.length;
  warningsList.innerHTML = '';

  if (audit.warnings.length === 0) {
    warningsGroup.classList.add('d-none');
  } else {
    warningsGroup.classList.remove('d-none');
    audit.warnings.forEach(w => {
      const card = document.createElement('div');
      card.className = 'alert-card alert-card-warning';
      card.innerHTML = `
        <div class="alert-card-header">
          <span>⚠️ ${escapeHtml(w.item)}</span>
          <span>[${escapeHtml(w.meal)}]</span>
        </div>
        <div class="alert-card-body">${escapeHtml(w.warning)}</div>
      `;
      warningsList.appendChild(card);
    });
  }

  // Recommended Substitutions
  const substitutionsGroup = document.getElementById('substitutionsGroup');
  const subBody = document.getElementById('substitutionsBody');
  subBody.innerHTML = '';

  if (audit.substitutions.length === 0) {
    substitutionsGroup.classList.add('d-none');
  } else {
    substitutionsGroup.classList.remove('d-none');
    audit.substitutions.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="sub-item-bad">${escapeHtml(s.original)}</td>
        <td class="sub-item-good">👉 ${escapeHtml(s.recommendedReplacement)}</td>
        <td>${escapeHtml(s.benefit)}</td>
      `;
      subBody.appendChild(tr);
    });
  }

  // Compliant Highlights
  const compliantGroup = document.getElementById('compliantGroup');
  const compliantPills = document.getElementById('compliantPills');
  compliantPills.innerHTML = '';

  if (audit.compliantHighlights.length === 0) {
    compliantGroup.classList.add('d-none');
  } else {
    compliantGroup.classList.remove('d-none');
    const uniqueApproved = Array.from(new Set(audit.compliantHighlights.map(h => h.item)));
    uniqueApproved.forEach(itemName => {
      const pill = document.createElement('span');
      pill.className = 'pill-tag';
      pill.textContent = `✓ ${itemName}`;
      compliantPills.appendChild(pill);
    });
  }

  // Official Hospital Guidelines Box
  const guidelinesContent = document.getElementById('guidelinesContent');
  guidelinesContent.innerHTML = '';

  if (audit.hospitalGuidance && audit.hospitalGuidance.length > 0) {
    audit.hospitalGuidance.forEach(hg => {
      const block = document.createElement('div');
      block.className = 'guideline-item';
      
      let cebuanoList = (hg.cebuano || []).map(c => `<li>${escapeHtml(c)}</li>`).join('');
      let englishList = (hg.english || []).map(e => `<li>${escapeHtml(e)}</li>`).join('');

      block.innerHTML = `
        <strong>${escapeHtml(hg.policyName)} — Mga Pahimangno:</strong>
        <ul class="guideline-cebuano" style="margin: 0.3rem 0 0.5rem 1.2rem;">${cebuanoList}</ul>
        <strong style="color: var(--primary-dark); font-size: 0.72rem;">Clinical Translation (English):</strong>
        <ul class="guideline-english" style="margin: 0.3rem 0 0 1.2rem;">${englishList}</ul>
      `;
      guidelinesContent.appendChild(block);
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
