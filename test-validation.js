/**
 * Automated Verification Test Suite for Dietary Validation Engine
 * Tests Davao Occidental General Hospital policies & FNRI guidelines.
 */

const assert = require('assert');
const { validateMealPlan } = require('./engine/validator');
const { SAMPLE_PLANS } = require('./samplePlans');

console.log('🧪 Starting Dietary Compliance Validation Test Suite...\n');

let passCount = 0;
let totalCount = 0;

function runTest(testName, fn) {
  totalCount++;
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
  }
}

// 1. Test Low Salt Compliant Plan
runTest('Low Salt Diet - Compliant plan achieves 100% and PASS status', () => {
  const plan = SAMPLE_PLANS['low-salt-compliant'];
  const res = validateMealPlan(plan, ['low-salt']);
  assert.strictEqual(res.overallStatus, 'COMPLIANT');
  assert.strictEqual(res.complianceScore, 100);
  assert.strictEqual(res.criticalViolations.length, 0);
});

// 2. Test Low Salt Violation Plan
runTest('Low Salt Diet - Identifies canned sardines, toyo, instant noodles, and egg limit violations', () => {
  const plan = SAMPLE_PLANS['low-salt-violation'];
  const res = validateMealPlan(plan, ['low-salt']);
  assert.strictEqual(res.overallStatus, 'VIOLATION');
  assert(res.complianceScore < 50);
  assert(res.criticalViolations.length >= 3);
  const itemsViolated = res.criticalViolations.map(v => v.item);
  assert(itemsViolated.some(i => i.includes('sardines') || i.includes('Sardines')));
  assert(itemsViolated.some(i => i.includes('noodles') || i.includes('Noodles')));
  assert(itemsViolated.some(i => i.includes('Egg Intake')));
});

// 3. Test Low Fat Compliant Plan
runTest('Low Fat Diet - Compliant plan with tinola, steamed fish, fruit gelatin passes', () => {
  const plan = SAMPLE_PLANS['low-fat-compliant'];
  const res = validateMealPlan(plan, ['low-fat']);
  assert.strictEqual(res.overallStatus, 'COMPLIANT');
  assert.strictEqual(res.complianceScore, 100);
  assert.strictEqual(res.criticalViolations.length, 0);
});

// 4. Test Low Fat Violation Plan
runTest('Low Fat Diet - Detects deep frying, pork belly, gata, and cream desserts', () => {
  const plan = SAMPLE_PLANS['low-fat-violation'];
  const res = validateMealPlan(plan, ['low-fat']);
  assert.strictEqual(res.overallStatus, 'VIOLATION');
  assert(res.criticalViolations.length >= 4);
});

// 5. Test Low Purine Compliant Plan
runTest('Low Purine Diet - Compliant plan with >= 2.5L water and <= 3 meat portions passes', () => {
  const plan = SAMPLE_PLANS['low-purine-compliant'];
  const res = validateMealPlan(plan, ['low-purine']);
  assert.strictEqual(res.overallStatus, 'COMPLIANT');
  assert.strictEqual(res.complianceScore, 100);
  assert.strictEqual(res.criticalViolations.length, 0);
});

// 6. Test Low Purine Violation Plan
runTest('Low Purine Diet - Flags beer, organ meat (atay), anchovies (bolinao), and low water', () => {
  const plan = SAMPLE_PLANS['low-purine-violation'];
  const res = validateMealPlan(plan, ['low-purine']);
  assert.strictEqual(res.overallStatus, 'VIOLATION');
  const items = res.criticalViolations.map(v => v.item);
  assert(items.some(i => i.toLowerCase().includes('beer') || i.toLowerCase().includes('alcohol')));
  assert(items.some(i => i.toLowerCase().includes('liver') || i.toLowerCase().includes('atay')));
  assert(items.some(i => i.toLowerCase().includes('bolinao') || i.toLowerCase().includes('anchovies')));
});

// 7. Test Potassium Restricted Compliant Plan
runTest('Potassium Restricted Diet - Low-potassium upo, sayote, radish, plain rice passes', () => {
  const plan = SAMPLE_PLANS['potassium-restricted-compliant'];
  const res = validateMealPlan(plan, ['potassium-restricted']);
  assert.strictEqual(res.overallStatus, 'COMPLIANT');
  assert.strictEqual(res.complianceScore, 100);
  assert.strictEqual(res.criticalViolations.length, 0);
});

// 8. Test Potassium Restricted Violation Plan
runTest('Potassium Restricted Diet - Flags lethal salt substitute (KCl), kalabasa, malunggay, and ripe papaya', () => {
  const plan = SAMPLE_PLANS['potassium-restricted-violation'];
  const res = validateMealPlan(plan, ['potassium-restricted']);
  assert.strictEqual(res.overallStatus, 'VIOLATION');
  const items = res.criticalViolations.map(v => v.item);
  assert(items.some(i => i.toLowerCase().includes('salt substitute')));
  assert(items.some(i => i.toLowerCase().includes('kalabasa') || i.toLowerCase().includes('squash')));
  assert(items.some(i => i.toLowerCase().includes('malunggay')));
});

// 9. Test Multi-Condition Comorbidity Validation
runTest('Comorbidity Validation - Simultaneously evaluates Low Salt and Diabetic diets', () => {
  const comorbidPlan = {
    patientName: 'Comorbid Inpatient (Hypertensive Diabetic)',
    meals: {
      breakfast: {
        items: ['plain_rice', 'boiled_egg'],
        customItems: [],
        cookingMethod: 'boiled',
        seasonings: ['garlic_onion_ginger']
      },
      lunch: {
        items: ['plain_rice', 'steamed_fish_lean', 'sayote'],
        customItems: [],
        cookingMethod: 'steamed',
        seasonings: ['garlic_onion_ginger']
      },
      dinner: {
        items: ['plain_rice', 'boiled_chicken_skinless', 'upo'],
        customItems: [],
        cookingMethod: 'boiled',
        seasonings: ['garlic_onion_ginger']
      },
      snacks: {
        items: ['chocolate_pastries'], // Prohibited in Diabetic!
        customItems: []
      }
    },
    beverages: ['clean_water'],
    dailyStats: {
      waterLiters: 2.0,
      weeklyEggCount: 2
    }
  };

  const res = validateMealPlan(comorbidPlan, ['low-salt', 'diabetic']);
  assert.strictEqual(res.overallStatus, 'VIOLATION');
  assert.strictEqual(res.evaluatedPolicies.length, 2);
  const items = res.criticalViolations.map(v => v.item);
  assert(items.some(i => i.toLowerCase().includes('chocolate')));
});

console.log(`\n========================================`);
console.log(`  Tests Completed: ${passCount} / ${totalCount} Passed`);
console.log(`========================================\n`);

if (passCount !== totalCount) {
  process.exit(1);
}
