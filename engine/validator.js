/**
 * Rule-Based Compliance Validation Engine
 * Evaluates custom meal plans against institutional hospital dietary policies.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    const { DIETARY_POLICIES } = require('./rules');
    const { FOOD_DATABASE } = require('./foodDatabase');
    module.exports = factory(DIETARY_POLICIES, FOOD_DATABASE);
  } else {
    root.DietaryValidator = factory(root.DIETARY_RULES.DIETARY_POLICIES, root.FOOD_DATA.FOOD_DATABASE);
  }
})(typeof self !== 'undefined' ? self : this, function (DIETARY_POLICIES, FOOD_DATABASE) {

  // Lookup map for fast lookup by food item ID
  const FOOD_MAP = new Map(FOOD_DATABASE.map(f => [f.id, f]));

  // Healthy substitution dictionary
  const HEALTHY_SUBSTITUTIONS = {
    'toyo': 'Fresh calamansi juice, crushed garlic, and black pepper (Kalamansi, ahos, ug paminta)',
    'patis': 'Natural ginger-garlic broth or lemon extract',
    'bagoong': 'Sautéed tomatoes, ginger, and onion without salt or shrimp paste',
    'vetsin': 'Natural aromatics: browned garlic, sweet onions, and lemongrass (Tanglad)',
    'magic_sarap': 'Natural herb blend: garlic, onion, celery seeds, and black pepper',
    'salt_substitute': 'Fresh lemon or calamansi; do NOT use potassium chloride salt substitutes',
    'catsup': 'Fresh pureed tomatoes with herbs (no added sodium or potassium preservatives)',
    'chicharon': 'Roasted unsalted chickpeas or crispy baked tofu (unless on renal diet)',
    'fried_egg': 'Poached or hard-boiled egg without added cooking oil',
    'pork_belly_fried': 'Boiled skinless chicken breast (Tinola) or steamed white fish (Lapu-lapu/Bangus)',
    'pork_liver': 'Lean fresh pork tenderloin or skinless poultry (strictly non-organ meat)',
    'bolinao_anchovies': 'Fresh white fish like Bangus or Lapu-lapu in measured portions',
    'beer_alcohol': 'Infused water with cucumber or fresh ginger tea (Salabat)',
    'coconut_milk': 'Evaporated skim milk or natural clear vegetable broth',
    'instant_noodles': 'Unsalted rice vermicelli (Bihon) or bean threads (Sotanghon) in clear broth',
    'fruit_salad_cream': 'Fresh chilled sliced fruits (Papaya, watermelon, or pomelo depending on potassium allowance)',
    'latundan': 'White guava or small measured slice of watermelon (for potassium restricted patients)',
    'kalabasa': 'Upo (bottle gourd), sayote, or radish (labanos)'
  };

  /**
   * Validate a meal plan against selected dietary policies
   * @param {Object} plan - Meal plan payload
   * @param {Array<string>} policyIds - Selected policy identifiers
   * @returns {Object} Detailed compliance audit result
   */
  function validateMealPlan(plan, policyIds = ['low-salt']) {
    if (!policyIds || policyIds.length === 0) {
      policyIds = ['low-salt'];
    }

    const results = {
      patientName: plan.patientName || 'Hospital Inpatient / Outpatient',
      timestamp: new Date().toISOString(),
      evaluatedPolicies: [],
      overallStatus: 'COMPLIANT', // COMPLIANT, WARNING, VIOLATION
      complianceScore: 100,
      summary: '',
      criticalViolations: [],
      warnings: [],
      compliantHighlights: [],
      cookingMethodAudit: [],
      dailyLimitsAudit: [],
      substitutions: [],
      hospitalGuidance: []
    };

    // Collect all items in the plan
    const allItemIds = [];
    const allCustomItems = [];
    const cookingMethodsUsed = new Set();
    const seasoningsUsed = new Set();

    const meals = plan.meals || {};
    for (const mealKey of Object.keys(meals)) {
      const meal = meals[mealKey];
      if (!meal) continue;

      if (Array.isArray(meal.items)) {
        meal.items.forEach(id => allItemIds.push({ id, mealName: mealKey }));
      }
      if (Array.isArray(meal.customItems)) {
        meal.customItems.forEach(text => allCustomItems.push({ text: text.trim(), mealName: mealKey }));
      }
      if (meal.cookingMethod) {
        cookingMethodsUsed.add(meal.cookingMethod);
      }
      if (Array.isArray(meal.seasonings)) {
        meal.seasonings.forEach(s => seasoningsUsed.add(s));
      }
    }

    // Include beverages
    if (Array.isArray(plan.beverages)) {
      plan.beverages.forEach(b => allItemIds.push({ id: b, mealName: 'Beverages' }));
    }

    // Evaluate for each policy
    for (const policyId of policyIds) {
      const policy = DIETARY_POLICIES[policyId];
      if (!policy) continue;

      results.evaluatedPolicies.push({
        id: policy.id,
        name: policy.name,
        cebuanoName: policy.cebuanoName,
        institution: policy.institution,
        indication: policy.clinicalIndication
      });

      results.hospitalGuidance.push({
        policyName: policy.name,
        cebuano: policy.mgaPahimangno,
        english: policy.mgaPahimangnoEnglish
      });

      // 1. Audit Prohibited & Problematic Food Items
      auditFoodItems(policy, allItemIds, allCustomItems, results);

      // 2. Audit Cooking Methods
      auditCookingMethods(policy, cookingMethodsUsed, results);

      // 3. Audit Seasonings & Condiments
      auditSeasonings(policy, seasoningsUsed, results);

      // 4. Audit Quantitative & Daily/Weekly Limits
      auditQuantitativeLimits(policy, plan.dailyStats || {}, results);
    }

    // Calculate final compliance score and status
    let scoreDeduction = 0;
    scoreDeduction += results.criticalViolations.length * 25;
    scoreDeduction += results.warnings.length * 8;
    results.complianceScore = Math.max(0, 100 - scoreDeduction);

    if (results.criticalViolations.length > 0) {
      results.overallStatus = 'VIOLATION';
      results.summary = `Meal plan NON-COMPLIANT: Found ${results.criticalViolations.length} critical policy violation(s) and ${results.warnings.length} warning(s). Immediate clinical dietary adjustment required.`;
    } else if (results.warnings.length > 0 || results.complianceScore < 85) {
      results.overallStatus = 'WARNING';
      results.summary = `Meal plan CONDITIONALLY COMPLIANT with warnings: Satisfies core restrictions but flagged ${results.warnings.length} clinical cautions/frequency limits.`;
    } else {
      results.overallStatus = 'COMPLIANT';
      results.summary = `Meal plan FULLY COMPLIANT (Score: ${results.complianceScore}%): Meets institutional hospital dietary policy and clinical guidelines.`;
    }

    // De-duplicate substitutions
    const uniqueSubs = new Map();
    results.substitutions.forEach(s => {
      if (!uniqueSubs.has(s.original)) {
        uniqueSubs.set(s.original, s);
      }
    });
    results.substitutions = Array.from(uniqueSubs.values());

    return results;
  }

  /**
   * Check selected and custom food items against policy rules
   */
  function auditFoodItems(policy, allItemIds, allCustomItems, results) {
    // Check predefined food items
    allItemIds.forEach(({ id, mealName }) => {
      const food = FOOD_MAP.get(id);
      if (!food) return;

      let isViolated = false;
      let violationReason = '';
      let isWarning = false;
      let warningReason = '';

      // Check specific policy restrictions
      if (policy.id === 'low-fat') {
        if (food.tags.includes('high-fat') || food.tags.includes('fried') || food.fatLevel === 'high' || food.fatLevel === 'very-high') {
          isViolated = true;
          violationReason = `High fat content in "${food.name}". DOGH Low Fat policy restricts fatty meats, fried items, full-cream dairy, and coconut cream (gata).`;
        } else if (food.tags.includes('controlled-fat')) {
          isWarning = true;
          warningReason = `Controlled fat item "${food.name}". Use only in strictly measured small allowance (1-2 tsp).`;
        }
      } else if (policy.id === 'low-salt') {
        if (food.tags.includes('high-sodium') || food.sodiumLevel === 'high' || food.sodiumLevel === 'very-high' || food.sodiumLevel === 'extremely-high') {
          isViolated = true;
          violationReason = `High sodium in "${food.name}". DOGH Low Salt policy strictly prohibits cured, canned, instant, and high-sodium foods.`;
        } else if (food.sodiumLevel === 'medium') {
          isWarning = true;
          warningReason = `Moderate sodium in "${food.name}". Limit serving size and verify preparation contains no added salt.`;
        }
      } else if (policy.id === 'low-purine') {
        if (food.tags.includes('high-purine') || food.purineLevel === 'high' || food.purineLevel === 'very-high' || food.purineLevel === 'extremely-high') {
          isViolated = true;
          violationReason = `High purine in "${food.name}". DOGH Low Purine policy strictly prohibits organ meats (atay/lamang-loob), anchovies (bolinao), sardines, seafood, and alcohol.`;
        } else if (food.purineLevel === 'medium-high') {
          isWarning = true;
          warningReason = `Moderate-high purine item "${food.name}". Strictly limited to maximum 1 serving per day.`;
        }
      } else if (policy.id === 'potassium-restricted') {
        if (food.tags.includes('high-potassium') || food.potassiumLevel === 'high' || food.potassiumLevel === 'extremely-high' || food.tags.includes('leafy-vegetable')) {
          isViolated = true;
          violationReason = `High potassium in "${food.name}". DOGH Potassium Restricted policy prohibits leafy greens, squash, malunggay, high-potassium fruits, and salt substitutes.`;
        } else if (food.tags.includes('low-potassium-allowed-limited')) {
          // Allowed food according to DOGH Policy Page 4 (Gitugot apan limitado)
          results.compliantHighlights.push({
            item: `${food.name} (Portion-controlled)`,
            meal: mealName,
            approvedFor: `${policy.name} (Gitugot nga prutas)`
          });
          return;
        } else if (food.potassiumLevel === 'medium') {
          isWarning = true;
          warningReason = `Moderate potassium item "${food.name}". Consume strictly in small designated amounts.`;
        }
      } else if (policy.id === 'diabetic') {
        if (food.tags.includes('high-sugar') || food.sugarLevel === 'high' || food.sugarLevel === 'very-high') {
          isViolated = true;
          violationReason = `High sugar in "${food.name}". Diabetic policy strictly eliminates concentrated sweets, syrups, and desserts.`;
        }
      }

      if (isViolated) {
        results.criticalViolations.push({
          item: food.name,
          meal: mealName,
          policy: policy.name,
          rule: violationReason,
          institutionCitation: `${policy.institution} - ${policy.name}`
        });

        // Provide substitution
        for (const [key, sub] of Object.entries(HEALTHY_SUBSTITUTIONS)) {
          if (food.id.includes(key) || food.name.toLowerCase().includes(key)) {
            results.substitutions.push({
              original: food.name,
              recommendedReplacement: sub,
              benefit: `Complies with ${policy.name}`
            });
            break;
          }
        }
      } else if (isWarning) {
        results.warnings.push({
          item: food.name,
          meal: mealName,
          policy: policy.name,
          warning: warningReason
        });
      } else {
        results.compliantHighlights.push({
          item: food.name,
          meal: mealName,
          approvedFor: policy.name
        });
      }
    });

    // Check custom typed items via fuzzy/keyword matching
    allCustomItems.forEach(({ text, mealName }) => {
      const lower = text.toLowerCase();
      policy.prohibitedIngredients.forEach(prohibited => {
        if (lower.includes(prohibited)) {
          results.criticalViolations.push({
            item: `Custom Item: "${text}"`,
            meal: mealName,
            policy: policy.name,
            rule: `Contains prohibited ingredient/keyword "${prohibited}" under ${policy.name} guidelines.`,
            institutionCitation: `${policy.institution} - ${policy.name}`
          });

          // Search substitution
          for (const [key, sub] of Object.entries(HEALTHY_SUBSTITUTIONS)) {
            if (lower.includes(key)) {
              results.substitutions.push({
                original: text,
                recommendedReplacement: sub,
                benefit: `Complies with ${policy.name}`
              });
              break;
            }
          }
        }
      });
    });
  }

  /**
   * Check cooking methods against policy guidelines
   */
  function auditCookingMethods(policy, cookingMethodsUsed, results) {
    cookingMethodsUsed.forEach(method => {
      const lower = method.toLowerCase();
      if (policy.id === 'low-fat') {
        if (lower.includes('fried') || lower.includes('prito') || lower.includes('ginataan') || lower.includes('sauteed-heavy')) {
          results.criticalViolations.push({
            item: `Cooking Method: ${method}`,
            meal: 'Meal Preparation',
            policy: policy.name,
            rule: `Disallowed preparation method "${method}". DOGH Low Fat guidelines mandate cooking via boiling (laga, tinola), steaming, grilling (sinugba), baking, or paksiw/inon-onan.`,
            institutionCitation: `${policy.institution} (Mga Pahimangno)`
          });
        } else {
          results.cookingMethodAudit.push({
            method,
            status: 'APPROVED',
            note: 'Approved low-fat cooking technique (oil-free or minimal oil).'
          });
        }
      } else if (policy.id === 'potassium-restricted' && lower.includes('broth')) {
        results.warnings.push({
          item: `Cooking Method: ${method}`,
          meal: 'Preparation',
          policy: policy.name,
          warning: 'Avoid meat stock / bone extract simmering which leaches concentrated potassium into the broth.'
        });
      }
    });
  }

  /**
   * Audit seasonings and sauces
   */
  function auditSeasonings(policy, seasoningsUsed, results) {
    seasoningsUsed.forEach(seasoningId => {
      const food = FOOD_MAP.get(seasoningId);
      const seasoningName = food ? food.name : seasoningId;

      if (policy.id === 'low-salt') {
        if (['soy_sauce_patis', 'bagoong_shrimp_paste', 'msg_magic_sarap', 'table_salt'].includes(seasoningId) ||
            seasoningName.toLowerCase().includes('salt') || seasoningName.toLowerCase().includes('toyo') || seasoningName.toLowerCase().includes('patis')) {
          results.criticalViolations.push({
            item: `Seasoning: ${seasoningName}`,
            meal: 'Seasoning / Sauce',
            policy: policy.name,
            rule: `Strictly forbidden condiment in Low Salt diet. Contains concentrated sodium chloride / monosodium glutamate.`,
            institutionCitation: `${policy.institution} (Mga Pahimangno)`
          });
          results.substitutions.push({
            original: seasoningName,
            recommendedReplacement: 'Garlic, onion, calamansi, ginger, and black pepper (Ahos, bombay, kalamansi, luy-a, paminta)',
            benefit: '100% sodium-free natural flavor enhancement approved by DOGH.'
          });
        }
      } else if (policy.id === 'potassium-restricted') {
        if (seasoningId === 'salt_substitute' || seasoningName.toLowerCase().includes('salt substitute') || seasoningId === 'catsup_ketchup') {
          results.criticalViolations.push({
            item: `Seasoning: ${seasoningName}`,
            meal: 'Seasoning / Sauce',
            policy: policy.name,
            rule: `CRITICAL DANGER: "${seasoningName}" is strictly contraindicated. Salt substitutes contain concentrated Potassium Chloride, posing acute hyperkalemia / cardiac arrhythmia risk.`,
            institutionCitation: `${policy.institution} - Potassium Restricted Policy`
          });
        }
      }
    });
  }

  /**
   * Check numerical limits (egg count, water, meat servings, coffee)
   */
  function auditQuantitativeLimits(policy, dailyStats, results) {
    // Low Salt: Egg limit up to 3 per week
    if (policy.id === 'low-salt' && dailyStats.weeklyEggCount !== undefined) {
      if (dailyStats.weeklyEggCount > 3) {
        results.criticalViolations.push({
          item: `Egg Intake: ${dailyStats.weeklyEggCount} eggs/week`,
          meal: 'Weekly Intake Tracker',
          policy: policy.name,
          rule: `Exceeds weekly egg limit! DOGH Low Salt policy: "Egg limitado hangtud sa 3 sa usa ka semana lamang" (Eggs strictly limited to maximum 3 per week).`,
          institutionCitation: `${policy.institution} - Karne/Protina Rule`
        });
      } else {
        results.dailyLimitsAudit.push({
          metric: 'Weekly Egg Count',
          value: `${dailyStats.weeklyEggCount} / 3 max`,
          status: 'COMPLIANT'
        });
      }
    }

    // Low Purine: Meat daily servings max 3
    if (policy.id === 'low-purine') {
      if (dailyStats.dailyMeatServings !== undefined) {
        if (dailyStats.dailyMeatServings > 3) {
          results.criticalViolations.push({
            item: `Meat / Poultry / Fish: ${dailyStats.dailyMeatServings} servings/day`,
            meal: 'Daily Intake Tracker',
            policy: policy.name,
            rule: `Exceeds daily meat allowance! DOGH Low Purine policy: "Karne, manok, isda hangtud sa tulo (3) ka sukod lamang sa matag adlaw" (Maximum 3 servings per day).`,
            institutionCitation: `${policy.institution} - Proteina Rule`
          });
        } else {
          results.dailyLimitsAudit.push({
            metric: 'Daily Meat Servings',
            value: `${dailyStats.dailyMeatServings} / 3 max`,
            status: 'COMPLIANT'
          });
        }
      }

      // Low Purine: Coffee / Tea max 2 cups
      if (dailyStats.dailyCoffeeCups !== undefined) {
        if (dailyStats.dailyCoffeeCups > 2) {
          results.warnings.push({
            item: `Coffee/Tea: ${dailyStats.dailyCoffeeCups} cups/day`,
            meal: 'Beverage Tracker',
            policy: policy.name,
            warning: `Exceeds recommended coffee/tea limit. DOGH Low Purine policy: "Kape o tsaa hangtud sa 2 ka tasa lamang matag adlaw" (Max 2 cups/day due to methylated purine).`
          });
        }
      }

      // Low Purine: Water intake minimum 2 to 3 Liters
      if (dailyStats.waterLiters !== undefined) {
        if (dailyStats.waterLiters < 2) {
          results.warnings.push({
            item: `Water Intake: ${dailyStats.waterLiters} Liters/day`,
            meal: 'Hydration Tracker',
            policy: policy.name,
            warning: `Hydration below clinical target! DOGH Low Purine policy: "Inom ug daghang tubig, 2-3 litro kada adlaw" (Drink 2-3 Liters water daily to wash away uric acid crystals).`
          });
        } else {
          results.dailyLimitsAudit.push({
            metric: 'Daily Water Intake',
            value: `${dailyStats.waterLiters} Liters (Target: 2-3L)`,
            status: 'COMPLIANT'
          });
        }
      }
    }
  }

  return {
    validateMealPlan,
    HEALTHY_SUBSTITUTIONS
  };
});
