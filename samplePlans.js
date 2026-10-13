/**
 * Preconfigured Clinical Meal Plans for Testing and Demonstration
 * Covers Compliant and Non-Compliant cases for each hospital policy.
 */

const SAMPLE_PLANS = {
  'low-salt-compliant': {
    id: 'low-salt-compliant',
    title: 'Low Salt Diet - Hospital Inpatient Compliant Menu',
    policyId: 'low-salt',
    patientName: 'Eduardo Santos (Hypertension Room 204)',
    description: 'Freshly prepared natural foods, unseasoned lean proteins, zero soy sauce/MSG, natural ginger-garlic aromatics, strictly within weekly egg allowance.',
    meals: {
      breakfast: {
        items: ['plain_rice', 'boiled_egg'],
        customItems: [],
        cookingMethod: 'boiled',
        seasonings: ['garlic_onion_ginger']
      },
      lunch: {
        items: ['plain_rice', 'steamed_fish_lean', 'sayote', 'clear_soup_unseasoned'],
        customItems: [],
        cookingMethod: 'steamed',
        seasonings: ['garlic_onion_ginger']
      },
      dinner: {
        items: ['plain_rice', 'boiled_chicken_skinless', 'upo'],
        customItems: [],
        cookingMethod: 'tinola',
        seasonings: ['garlic_onion_ginger']
      },
      snacks: {
        items: ['watermelon'],
        customItems: []
      }
    },
    beverages: ['clean_water', 'ginger_tea'],
    dailyStats: {
      waterLiters: 2.0,
      weeklyEggCount: 2, // Compliant with <= 3 / week limit
      dailyMeatServings: 2,
      dailyCoffeeCups: 1
    }
  },

  'low-salt-violation': {
    id: 'low-salt-violation',
    title: 'Low Salt Diet - High Sodium Non-Compliant Menu (Violation Case)',
    policyId: 'low-salt',
    patientName: 'Test Patient A (Non-Compliant Sodium Intake)',
    description: 'Contains prohibited canned sardines, instant noodles, toyo, bagoong, chicharon, and exceeds weekly egg limit.',
    meals: {
      breakfast: {
        items: ['instant_noodles', 'salted_egg'],
        customItems: ['pandesal with salted butter'],
        cookingMethod: 'boiled',
        seasonings: ['soy_sauce_patis']
      },
      lunch: {
        items: ['plain_rice', 'canned_sardines', 'instant_canned_soup'],
        customItems: [],
        cookingMethod: 'pan-fried',
        seasonings: ['bagoong_shrimp_paste', 'msg_magic_sarap']
      },
      dinner: {
        items: ['plain_rice', 'processed_meats'],
        customItems: ['pork tocino with extra salt'],
        cookingMethod: 'fried',
        seasonings: ['soy_sauce_patis']
      },
      snacks: {
        items: ['chicharon'],
        customItems: ['salted potato chips']
      }
    },
    beverages: ['milk_tea_shakes'],
    dailyStats: {
      waterLiters: 1.0,
      weeklyEggCount: 6, // VIOLATION (> 3)
      dailyMeatServings: 4,
      dailyCoffeeCups: 3
    }
  },

  'low-fat-compliant': {
    id: 'low-fat-compliant',
    title: 'Low Fat Diet - Compliant Clinical Menu',
    policyId: 'low-fat',
    patientName: 'Maria Clara (Cardiovascular Unit)',
    description: 'Oil-free preparation (tinola, steamed fish, sinugba), skinless chicken breast, plain boiled root crops, fresh fruit gelatin.',
    meals: {
      breakfast: {
        items: ['plain_rice', 'boiled_chicken_skinless'],
        customItems: ['boiled saba banana'],
        cookingMethod: 'steamed',
        seasonings: ['garlic_onion_ginger']
      },
      lunch: {
        items: ['plain_rice', 'steamed_fish_lean', 'sayote', 'clear_soup_unseasoned'],
        customItems: [],
        cookingMethod: 'paksiw/inon-onan',
        seasonings: ['garlic_onion_ginger']
      },
      dinner: {
        items: ['camote_boiled', 'steamed_fish_lean', 'radish'],
        customItems: [],
        cookingMethod: 'sinugba/grilled',
        seasonings: ['garlic_onion_ginger']
      },
      snacks: {
        items: ['plain_gelatin', 'pomelo'],
        customItems: []
      }
    },
    beverages: ['clean_water', 'coffee_plain'],
    dailyStats: {
      waterLiters: 2.2,
      weeklyEggCount: 1,
      dailyMeatServings: 2,
      dailyCoffeeCups: 1
    }
  },

  'low-fat-violation': {
    id: 'low-fat-violation',
    title: 'Low Fat Diet - High Lipid Non-Compliant Menu (Violation Case)',
    policyId: 'low-fat',
    patientName: 'Test Patient B (High Lipid Diet Violation)',
    description: 'Contains deep-fried pork belly, lechon kawali, coconut cream (gata), mayonnaise salad, full cream milk, and organ meats.',
    meals: {
      breakfast: {
        items: ['fried_egg', 'processed_meats'],
        customItems: ['crispy bacon in lard'],
        cookingMethod: 'deep-fried',
        seasonings: []
      },
      lunch: {
        items: ['plain_rice', 'pork_belly_fried', 'coconut_milk'],
        customItems: ['ginataang pork belly with chicharon topping'],
        cookingMethod: 'ginataan',
        seasonings: []
      },
      dinner: {
        items: ['plain_rice', 'pork_liver'],
        customItems: ['lechon kawali with gravy'],
        cookingMethod: 'crispy-fried',
        seasonings: []
      },
      snacks: {
        items: ['fruit_salad_cream', 'leche_flan', 'chocolate_pastries'],
        customItems: ['doughnuts with buttercream']
      }
    },
    beverages: ['milk_tea_shakes'],
    dailyStats: {
      waterLiters: 1.0,
      weeklyEggCount: 4,
      dailyMeatServings: 4,
      dailyCoffeeCups: 2
    }
  },

  'low-purine-compliant': {
    id: 'low-purine-compliant',
    title: 'Low Purine Diet - Compliant Hyperuricemia Menu',
    policyId: 'low-purine',
    patientName: 'Romeo Gonzaga (Gout Management Clinic)',
    description: 'Controlled meat portion (<= 3 servings/day), 2.5L water hydration to flush urate, zero organ meats, zero beer/alcohol, zero anchovies.',
    meals: {
      breakfast: {
        items: ['plain_rice', 'boiled_egg'],
        customItems: ['plain white toast'],
        cookingMethod: 'boiled',
        seasonings: ['garlic_onion_ginger']
      },
      lunch: {
        items: ['plain_rice', 'boiled_chicken_skinless', 'upo', 'clear_soup_unseasoned'],
        customItems: [],
        cookingMethod: 'steamed',
        seasonings: ['garlic_onion_ginger']
      },
      dinner: {
        items: ['plain_rice', 'steamed_fish_lean', 'sayote'],
        customItems: [],
        cookingMethod: 'tinola',
        seasonings: ['garlic_onion_ginger']
      },
      snacks: {
        items: ['watermelon', 'plain_gelatin'],
        customItems: []
      }
    },
    beverages: ['clean_water'],
    dailyStats: {
      waterLiters: 2.8, // Compliant with >= 2-3L target
      weeklyEggCount: 2,
      dailyMeatServings: 2, // Compliant with <= 3 servings/day
      dailyCoffeeCups: 1, // Compliant with <= 2 cups/day
      weeklyLegumeServings: 0
    }
  },

  'low-purine-violation': {
    id: 'low-purine-violation',
    title: 'Low Purine Diet - High Uric Acid Non-Compliant Menu (Violation Case)',
    policyId: 'low-purine',
    patientName: 'Test Patient C (Severe Uric Acid Spike Risk)',
    description: 'Contains high-purine organ meats (atay/liver), bolinao (anchovies), beer, greasy meat broth, excessive meat portions, and low hydration.',
    meals: {
      breakfast: {
        items: ['oatmeal', 'canned_sardines'],
        customItems: ['bolinao dilis fried'],
        cookingMethod: 'pan-fried',
        seasonings: ['bagoong_shrimp_paste']
      },
      lunch: {
        items: ['plain_rice', 'pork_liver', 'meat_broth_rich'],
        customItems: ['isaw and liver adobo'],
        cookingMethod: 'sauteed',
        seasonings: ['soy_sauce_patis']
      },
      dinner: {
        items: ['plain_rice', 'crabs_shrimp', 'bolinao_anchovies'],
        customItems: ['steamed alimango and tahong'],
        cookingMethod: 'boiled',
        seasonings: []
      },
      snacks: {
        items: ['chicharon'],
        customItems: ['roasted peanuts and beer']
      }
    },
    beverages: ['beer_alcohol', 'coffee_plain'],
    dailyStats: {
      waterLiters: 0.8, // VIOLATION (< 2L)
      weeklyEggCount: 2,
      dailyMeatServings: 5, // VIOLATION (> 3)
      dailyCoffeeCups: 4 // VIOLATION (> 2)
    }
  },

  'potassium-restricted-compliant': {
    id: 'potassium-restricted-compliant',
    title: 'Potassium Restricted Diet - Compliant Renal Menu',
    policyId: 'potassium-restricted',
    patientName: 'Danilo Ramos (Renal Dialysis Ward)',
    description: 'Strictly features low-potassium vegetables (upo, sayote, radish), white rice, plain boiled pork, measured apple/watermelon, zero salt substitutes.',
    meals: {
      breakfast: {
        items: ['plain_rice', 'pork_lean_fresh'],
        customItems: ['plain white bread rolls'],
        cookingMethod: 'boiled',
        seasonings: ['garlic_onion_ginger']
      },
      lunch: {
        items: ['plain_rice', 'pork_lean_fresh', 'upo'],
        customItems: [],
        cookingMethod: 'steamed',
        seasonings: ['garlic_onion_ginger']
      },
      dinner: {
        items: ['plain_rice', 'steamed_fish_lean', 'sayote', 'radish'],
        customItems: [],
        cookingMethod: 'boiled',
        seasonings: ['garlic_onion_ginger']
      },
      snacks: {
        items: ['watermelon'],
        customItems: []
      }
    },
    beverages: ['clean_water'],
    dailyStats: {
      waterLiters: 1.5,
      weeklyEggCount: 1,
      dailyMeatServings: 2,
      dailyCoffeeCups: 0
    }
  },

  'potassium-restricted-violation': {
    id: 'potassium-restricted-violation',
    title: 'Potassium Restricted Diet - Hyperkalemia Hazard Menu (Violation Case)',
    policyId: 'potassium-restricted',
    patientName: 'Test Patient D (Acute Hyperkalemia Risk)',
    description: 'Contains high-potassium malunggay, kalabasa (squash), ripe papaya, latundan banana, coconut milk (gata), and lethal salt substitute (KCl).',
    meals: {
      breakfast: {
        items: ['latundan', 'tokwa_tofu'],
        customItems: ['ripe latundan banana with peanut butter'],
        cookingMethod: 'boiled',
        seasonings: ['salt_substitute'] // CRITICAL VIOLATION
      },
      lunch: {
        items: ['kalabasa', 'malunggay', 'coconut_milk'],
        customItems: ['ginataang kalabasa with malunggay leaves'],
        cookingMethod: 'ginataan',
        seasonings: ['catsup_ketchup'] // CRITICAL VIOLATION
      },
      dinner: {
        items: ['spinach', 'mushroom', 'meat_broth_rich', 'crabs_shrimp'],
        customItems: ['spinach soup with crabs'],
        cookingMethod: 'boiled',
        seasonings: []
      },
      snacks: {
        items: ['papaya_ripe', 'chocolate_pastries', 'orange'],
        customItems: ['orange juice and raisins']
      }
    },
    beverages: ['pineapple_juice'],
    dailyStats: {
      waterLiters: 1.2,
      weeklyEggCount: 1,
      dailyMeatServings: 3,
      dailyCoffeeCups: 3
    }
  }
};

module.exports = {
  SAMPLE_PLANS
};
