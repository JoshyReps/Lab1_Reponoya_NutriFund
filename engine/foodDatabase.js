/**
 * Categorized Food and Ingredient Database
 * Cross-referenced with Philippine hospital diets and local terminology.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FOOD_DATA = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const FOOD_DATABASE = [
    // --- VEGETABLES ---
    {
      id: 'sayote',
      name: 'Sayote (Chayote)',
      cebuano: 'Sayote',
      category: 'vegetable',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      potassiumLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'upo',
      name: 'Upo (Bottle Gourd)',
      cebuano: 'Upo',
      category: 'vegetable',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      potassiumLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'pipino',
      name: 'Pipino (Cucumber)',
      cebuano: 'Pipino',
      category: 'vegetable',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      potassiumLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'radish',
      name: 'Radish (Labanos)',
      cebuano: 'Labanos / Radish',
      category: 'vegetable',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      potassiumLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'singkamas',
      name: 'Singkamas (Jicama)',
      cebuano: 'Singkamas',
      category: 'vegetable',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      potassiumLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'dabong',
      name: 'Dabong (Bamboo Shoots)',
      cebuano: 'Dabong',
      category: 'vegetable',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      potassiumLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'ubod',
      name: 'Ubod (Heart of Palm)',
      cebuano: 'Ubod',
      category: 'vegetable',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      potassiumLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'malunggay',
      name: 'Malunggay (Moringa leaves)',
      cebuano: 'Malunggay / Kalamunggay',
      category: 'vegetable',
      tags: ['high-potassium', 'leafy-vegetable'],
      potassiumLevel: 'high',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low',
      notes: 'Prohibited in Potassium Restricted Diet; excellent for general and diabetic diets.'
    },
    {
      id: 'kalabasa',
      name: 'Kalabasa (Squash)',
      cebuano: 'Kalabasa',
      category: 'vegetable',
      tags: ['high-potassium'],
      potassiumLevel: 'high',
      sodiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low',
      notes: 'Prohibited in Potassium Restricted Diet.'
    },
    {
      id: 'spinach',
      name: 'Spinach (Espinaka)',
      cebuano: 'Espinaka / Spinaka',
      category: 'vegetable',
      tags: ['high-potassium', 'high-purine', 'leafy-vegetable'],
      potassiumLevel: 'high',
      purineLevel: 'medium-high',
      notes: 'Avoid in Potassium Restricted; max 1 serving/day in Low Purine; limit in Low Salt.'
    },
    {
      id: 'cauliflower',
      name: 'Cauliflower',
      cebuano: 'Cauliflower / Koliplawer',
      category: 'vegetable',
      tags: ['high-potassium', 'high-purine'],
      potassiumLevel: 'high',
      purineLevel: 'medium-high',
      notes: 'Prohibited in Potassium Restricted; max 1 serving/day in Low Purine.'
    },
    {
      id: 'mushroom',
      name: 'Mushroom (Uhong)',
      cebuano: 'Uhong / Mushroom',
      category: 'vegetable',
      tags: ['high-potassium', 'high-purine'],
      potassiumLevel: 'high',
      purineLevel: 'medium-high',
      notes: 'Prohibited in Potassium Restricted; max 1 serving/day in Low Purine.'
    },
    {
      id: 'asparagus',
      name: 'Asparagus',
      cebuano: 'Asparagus',
      category: 'vegetable',
      tags: ['high-purine'],
      purineLevel: 'high',
      notes: 'Max 1 serving/day or avoid in Low Purine.'
    },
    {
      id: 'celery',
      name: 'Celery / Kinchay',
      cebuano: 'Kinchay / Celery',
      category: 'vegetable',
      tags: ['high-potassium', 'moderate-sodium'],
      potassiumLevel: 'high',
      sodiumLevel: 'medium',
      notes: 'Avoid in Potassium Restricted; limit in Low Salt.'
    },
    {
      id: 'canned_vegetables',
      name: 'Canned Mixed Vegetables (with sodium)',
      cebuano: 'De lata nga gulay nga may asin',
      category: 'vegetable',
      tags: ['high-sodium', 'processed', 'canned'],
      sodiumLevel: 'high',
      notes: 'Prohibited in Low Salt Diet.'
    },

    // --- FRUITS ---
    {
      id: 'apple',
      name: 'Apple (Mansanas)',
      cebuano: 'Mansanas / Apple',
      category: 'fruit',
      tags: ['high-potassium'],
      potassiumLevel: 'high',
      purineLevel: 'low',
      notes: 'Prohibited in Potassium Restricted Diet; healthy for Low Salt & Low Fat.'
    },
    {
      id: 'latundan',
      name: 'Latundan Banana',
      cebuano: 'Saging Latundan',
      category: 'fruit',
      tags: ['high-potassium'],
      potassiumLevel: 'high',
      notes: 'Prohibited in Potassium Restricted Diet.'
    },
    {
      id: 'lakatan',
      name: 'Lakatan Banana',
      cebuano: 'Saging Lakatan',
      category: 'fruit',
      tags: ['medium-potassium'],
      potassiumLevel: 'medium',
      notes: 'Strictly limited in Potassium Restricted Diet; allowed in other diets.'
    },
    {
      id: 'papaya_ripe',
      name: 'Ripe Papaya (Kapayas)',
      cebuano: 'Hinog nga Kapayas',
      category: 'fruit',
      tags: ['high-potassium'],
      potassiumLevel: 'high',
      notes: 'Prohibited in Potassium Restricted Diet.'
    },
    {
      id: 'orange',
      name: 'Orange / Orange Juice',
      cebuano: 'Kahel / Orange Juice',
      category: 'fruit',
      tags: ['high-potassium'],
      potassiumLevel: 'high',
      notes: 'Prohibited in Potassium Restricted Diet.'
    },
    {
      id: 'pineapple_juice',
      name: 'Pineapple Juice',
      cebuano: 'Pinya / Pineapple Juice',
      category: 'fruit',
      tags: ['high-potassium'],
      potassiumLevel: 'high',
      notes: 'Prohibited in Potassium Restricted Diet.'
    },
    {
      id: 'watermelon',
      name: 'Watermelon (Pakwan)',
      cebuano: 'Pakwan',
      category: 'fruit',
      tags: ['low-potassium-allowed-limited'],
      potassiumLevel: 'medium-low',
      notes: 'Allowed in moderate limited portions in Potassium Restricted.'
    },
    {
      id: 'pomelo',
      name: 'Pomelo (Suha)',
      cebuano: 'Suha / Pomelo',
      category: 'fruit',
      tags: ['low-potassium-allowed-limited'],
      potassiumLevel: 'medium-low',
      notes: 'Allowed in moderation in Potassium Restricted.'
    },
    {
      id: 'mango',
      name: 'Ripe Mango (Mangga)',
      cebuano: 'Hinog nga Mangga',
      category: 'fruit',
      tags: ['low-potassium-allowed-limited'],
      potassiumLevel: 'medium-low',
      notes: 'Allowed in limited moderation in Potassium Restricted.'
    },
    {
      id: 'fruit_salad_cream',
      name: 'Fruit Salad with Cream & Condensed Milk',
      cebuano: 'Fruit salad nga may cream ug condensed milk',
      category: 'fruit',
      tags: ['high-fat', 'high-sugar', 'high-dairy'],
      fatLevel: 'high',
      sugarLevel: 'high',
      notes: 'Prohibited in Low Fat & Diabetic Diets.'
    },

    // --- GRAINS / CARBOHYDRATES ---
    {
      id: 'plain_rice',
      name: 'Plain Boiled White Rice (Purong Humay)',
      cebuano: 'Linung-ag nga Humay / Kan-on',
      category: 'grain_carbs',
      tags: ['low-sodium', 'low-potassium', 'low-purine', 'low-fat'],
      sodiumLevel: 'low',
      potassiumLevel: 'low',
      purineLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'camote_boiled',
      name: 'Boiled Sweet Potato (Linung-ag nga Camote)',
      cebuano: 'Camote linung-ag',
      category: 'grain_carbs',
      tags: ['low-sodium', 'low-fat', 'low-purine'],
      potassiumLevel: 'medium',
      sodiumLevel: 'low',
      fatLevel: 'low'
    },
    {
      id: 'pandesal_plain',
      name: 'Plain Pandesal (Limited portion)',
      cebuano: 'Pandesal',
      category: 'grain_carbs',
      tags: ['medium-sodium'],
      sodiumLevel: 'medium',
      notes: 'Allowed in small limited portions in Low Salt; check for baking soda/salt.'
    },
    {
      id: 'oatmeal',
      name: 'Oatmeal (Whole grain)',
      cebuano: 'Oatmeal',
      category: 'grain_carbs',
      tags: ['high-purine', 'high-potassium'],
      purineLevel: 'medium-high',
      potassiumLevel: 'medium-high',
      notes: 'Avoid in Low Purine and Potassium Restricted; great for diabetic and low fat.'
    },
    {
      id: 'instant_noodles',
      name: 'Instant Noodles / Miki / Misua with salt',
      cebuano: 'Instant noodles / Misua / Canton nga may asin',
      category: 'grain_carbs',
      tags: ['high-sodium', 'processed'],
      sodiumLevel: 'very-high',
      notes: 'Strictly prohibited in Low Salt Diet.'
    },
    {
      id: 'pancake_mix',
      name: 'Pancakes / Waffles (Commercial mix)',
      cebuano: 'Pancake / Waffle mix nga may baking powder ug mantika',
      category: 'grain_carbs',
      tags: ['high-sodium', 'high-fat', 'processed'],
      sodiumLevel: 'high',
      fatLevel: 'high',
      notes: 'Prohibited in Low Salt and Low Fat Diets.'
    },

    // --- MEATS / PROTEINS ---
    {
      id: 'steamed_fish_lean',
      name: 'Steamed Lean White Fish (Lapu-lapu / Bangus unseasoned)',
      cebuano: 'Isda gi-steam o gipaksiw nga walay mantika',
      category: 'meat_protein',
      tags: ['low-fat', 'low-sodium', 'medium-purine'],
      fatLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'medium',
      notes: 'Healthy staple across Low Fat and Low Salt diets.'
    },
    {
      id: 'boiled_chicken_skinless',
      name: 'Skinless Chicken Breast (Boiled / Tinola without oil)',
      cebuano: 'Unod sa Manok walay panit (Tinola/Laga)',
      category: 'meat_protein',
      tags: ['low-fat', 'low-sodium', 'medium-purine'],
      fatLevel: 'low',
      sodiumLevel: 'low',
      purineLevel: 'medium',
      notes: 'Ideal protein for Low Fat, Low Salt, and Potassium Restricted.'
    },
    {
      id: 'boiled_egg',
      name: 'Boiled Egg (Linung-ag nga Itlog)',
      cebuano: 'Linung-ag nga itlog',
      category: 'meat_protein',
      tags: ['low-purine', 'low-sodium', 'medium-fat'],
      purineLevel: 'low',
      sodiumLevel: 'low',
      fatLevel: 'medium',
      notes: 'Low Salt Policy: limited up to 3 eggs per week maximum. Low Fat: egg white free, limit yolk.'
    },
    {
      id: 'fried_egg',
      name: 'Fried Egg (Piniritong Itlog sa mantika)',
      cebuano: 'Pinirito nga itlog',
      category: 'meat_protein',
      tags: ['high-fat', 'fried'],
      fatLevel: 'high',
      notes: 'Prohibited in Low Fat Diet.'
    },
    {
      id: 'salted_egg',
      name: 'Salted Egg (Itlog na Maalat)',
      cebuano: 'Itlog nga inasinan / Pickled egg',
      category: 'meat_protein',
      tags: ['high-sodium', 'processed'],
      sodiumLevel: 'very-high',
      notes: 'Strictly prohibited in Low Salt Diet.'
    },
    {
      id: 'pork_belly_fried',
      name: 'Fried Pork Belly / Liempo / Lechon Kawali',
      cebuano: 'Piniritong baboy nga may taba / Liempo',
      category: 'meat_protein',
      tags: ['high-fat', 'high-purine', 'fried'],
      fatLevel: 'very-high',
      purineLevel: 'high',
      notes: 'Strictly prohibited in Low Fat and Low Purine Diets.'
    },
    {
      id: 'pork_lean_fresh',
      name: 'Fresh Lean Pork Meat (Purong unod sa baboy)',
      cebuano: 'Purong unod sa baboy linung-ag',
      category: 'meat_protein',
      tags: ['low-potassium', 'medium-purine', 'low-sodium'],
      potassiumLevel: 'low',
      fatLevel: 'low',
      notes: 'Allowed in Potassium Restricted and Low Salt (unsalted).'
    },
    {
      id: 'pork_liver',
      name: 'Pork Liver / Organ Meats (Atay / Lamang-loob)',
      cebuano: 'Atay / Bato / Lapay / Lamang-loob / Utok',
      category: 'meat_protein',
      tags: ['high-purine', 'high-fat', 'organ-meat', 'high-potassium'],
      purineLevel: 'very-high',
      fatLevel: 'high',
      potassiumLevel: 'high',
      notes: 'Strictly prohibited in Low Purine and Low Fat Diets (DOGH Policy).'
    },
    {
      id: 'bolinao_anchovies',
      name: 'Bolinao / Anchovies / Dilis',
      cebuano: 'Bolinao / Lupoy / Dilis',
      category: 'meat_protein',
      tags: ['high-purine'],
      purineLevel: 'very-high',
      notes: 'Strictly prohibited in Low Purine Diet (DOGH Policy).'
    },
    {
      id: 'canned_sardines',
      name: 'Canned Sardines in Tomato Sauce / Oil',
      cebuano: 'Sardinas de lata',
      category: 'meat_protein',
      tags: ['high-sodium', 'high-purine', 'high-fat', 'canned'],
      sodiumLevel: 'very-high',
      purineLevel: 'very-high',
      fatLevel: 'high',
      notes: 'Strictly prohibited in Low Salt, Low Purine, and Low Fat Diets.'
    },
    {
      id: 'processed_meats',
      name: 'Processed Cured Meats (Tocino, Chorizo, Hotdog, Spam)',
      cebuano: 'Tocino, Chorizo, Hotdog, Canned meat',
      category: 'meat_protein',
      tags: ['high-sodium', 'high-fat', 'high-purine', 'processed'],
      sodiumLevel: 'very-high',
      fatLevel: 'very-high',
      notes: 'Strictly prohibited in Low Salt and Low Fat Diets.'
    },
    {
      id: 'crabs_shrimp',
      name: 'Crab & Shrimp Seafood (Alimango / Pasayan)',
      cebuano: 'Alimango, Alimasag, Pasayan, Tahong',
      category: 'meat_protein',
      tags: ['high-purine', 'high-potassium'],
      purineLevel: 'very-high',
      potassiumLevel: 'high',
      notes: 'Prohibited in Low Purine and Potassium Restricted Diets.'
    },
    {
      id: 'tokwa_tofu',
      name: 'Tokwa (Tofu / Soy Curd)',
      cebuano: 'Tokwa',
      category: 'meat_protein',
      tags: ['high-potassium', 'moderate-purine'],
      potassiumLevel: 'high',
      purineLevel: 'medium',
      notes: 'Prohibited in Potassium Restricted Diet; limits in Low Purine.'
    },

    // --- FATS & OILS ---
    {
      id: 'coconut_milk',
      name: 'Coconut Milk / Cream (Gata sa Lubi)',
      cebuano: 'Gata sa lubi',
      category: 'fats_oil',
      tags: ['high-fat', 'high-potassium', 'saturated-fat'],
      fatLevel: 'very-high',
      potassiumLevel: 'high',
      notes: 'Strictly prohibited in Low Fat and Potassium Restricted Diets.'
    },
    {
      id: 'butter_margarine',
      name: 'Butter / Margarine',
      cebuano: 'Butter / Margarine',
      category: 'fats_oil',
      tags: ['high-fat', 'high-sodium'],
      fatLevel: 'very-high',
      sodiumLevel: 'high',
      notes: 'Strictly prohibited in Low Fat and Low Salt Diets.'
    },
    {
      id: 'mayonnaise',
      name: 'Mayonnaise & Cream Salad Dressings',
      cebuano: 'Mayonnaise ug salad dressings',
      category: 'fats_oil',
      tags: ['high-fat', 'high-sodium'],
      fatLevel: 'very-high',
      sodiumLevel: 'medium-high',
      notes: 'Strictly prohibited in Low Fat Diet.'
    },
    {
      id: 'vegetable_oil_measured',
      name: 'Vegetable Cooking Oil (Measured small allowance)',
      cebuano: 'Mantika sa getugot nga sukod lamang',
      category: 'fats_oil',
      tags: ['controlled-fat'],
      fatLevel: 'medium',
      notes: 'Allowed in measured, controlled amounts only.'
    },
    {
      id: 'chicharon',
      name: 'Chicharon (Pork Cracklings)',
      cebuano: 'Chicharon gikan sa pinakupsang taba',
      category: 'fats_oil',
      tags: ['high-fat', 'high-sodium', 'high-purine'],
      fatLevel: 'very-high',
      sodiumLevel: 'very-high',
      purineLevel: 'high',
      notes: 'Strictly prohibited in Low Fat, Low Salt, and Low Purine Diets.'
    },

    // --- SOUPS & BROTHS ---
    {
      id: 'clear_soup_unseasoned',
      name: 'Clear Vegetable / Fish Broth (Natural walay asin/mantika)',
      cebuano: 'Klaro nga sabaw nga walay mantika ug walay asin',
      category: 'soup',
      tags: ['low-fat', 'low-sodium', 'low-potassium'],
      fatLevel: 'low',
      sodiumLevel: 'low',
      notes: 'Approved standard hospital broth.'
    },
    {
      id: 'instant_canned_soup',
      name: 'Instant Canned Soup / Bouillon Cube Broth',
      cebuano: 'Sopas de lata o pouch nga may vetsin ug broth cubes',
      category: 'soup',
      tags: ['high-sodium', 'high-fat', 'processed'],
      sodiumLevel: 'very-high',
      fatLevel: 'high',
      notes: 'Strictly prohibited in Low Salt, Low Purine, and Low Fat Diets.'
    },
    {
      id: 'meat_broth_rich',
      name: 'Rich Meat Bone Broth / Sebohon nga Sabaw',
      cebuano: 'Sebohon nga sabaw sa karne ug bukog',
      category: 'soup',
      tags: ['high-fat', 'high-purine', 'high-potassium'],
      fatLevel: 'high',
      purineLevel: 'high',
      potassiumLevel: 'high',
      notes: 'Prohibited in Potassium Restricted, Low Fat, and Low Purine Diets.'
    },

    // --- CONDIMENTS & SEASONINGS ---
    {
      id: 'garlic_onion_ginger',
      name: 'Garlic, Onion & Ginger (Ahos, Bombay, Luy-a)',
      cebuano: 'Ahos, Bombay, Luy-a, Paminta, Kalamansi',
      category: 'seasoning_spice',
      tags: ['low-sodium', 'natural-herbal', 'allowed-all'],
      sodiumLevel: 'none',
      potassiumLevel: 'low',
      notes: 'Approved natural flavor enhancers for all restricted diets.'
    },
    {
      id: 'soy_sauce_patis',
      name: 'Soy Sauce (Toyo) / Fish Sauce (Patis)',
      cebuano: 'Toyo ug Patis',
      category: 'seasoning_spice',
      tags: ['high-sodium'],
      sodiumLevel: 'extremely-high',
      notes: 'Strictly prohibited in Low Salt and Low Purine Diets.'
    },
    {
      id: 'bagoong_shrimp_paste',
      name: 'Bagoong (Shrimp / Fish Paste) / Ginamos',
      cebuano: 'Bagoong / Ginamos / Alamang',
      category: 'seasoning_spice',
      tags: ['high-sodium', 'high-purine'],
      sodiumLevel: 'extremely-high',
      purineLevel: 'very-high',
      notes: 'Strictly prohibited in Low Salt and Low Purine Diets.'
    },
    {
      id: 'msg_magic_sarap',
      name: 'MSG / Vetsin / Magic Sarap / Broth Cubes',
      cebuano: 'Vetsin, Magic Sarap, Ajinomoto, Broth cubes',
      category: 'seasoning_spice',
      tags: ['high-sodium'],
      sodiumLevel: 'extremely-high',
      notes: 'Strictly prohibited in Low Salt and Low Purine Diets.'
    },
    {
      id: 'catsup_ketchup',
      name: 'Ketchup / Catsup / Tomato Sauce',
      cebuano: 'Catsup / Ketchup',
      category: 'seasoning_spice',
      tags: ['high-potassium', 'high-sodium', 'high-sugar'],
      potassiumLevel: 'high',
      sodiumLevel: 'high',
      notes: 'Strictly prohibited in Potassium Restricted Diet (DOGH Policy).'
    },
    {
      id: 'salt_substitute',
      name: 'Commercial Salt Substitute (Potassium Chloride)',
      cebuano: 'Salt substitute (kapuli sa asin nga may potassium)',
      category: 'seasoning_spice',
      tags: ['high-potassium'],
      potassiumLevel: 'extremely-high',
      notes: 'DANGEROUS: Strictly prohibited in Potassium Restricted Diet!'
    },

    // --- BEVERAGES ---
    {
      id: 'clean_water',
      name: 'Clean Drinking Water (Tubig 2-3 Liters)',
      cebuano: 'Limpyo nga Tubig',
      category: 'beverage',
      tags: ['healthy-hydration', 'low-sodium', 'low-potassium', 'low-fat'],
      notes: 'Essential for Low Purine Diet (2-3L/day required to flush urate).'
    },
    {
      id: 'coffee_plain',
      name: 'Plain Black Coffee (No sugar/cream, max 2 cups)',
      cebuano: 'Klaro nga kape (walay gatas ug asukar)',
      category: 'beverage',
      tags: ['controlled-stimulant'],
      notes: 'Allowed in moderation (max 2 cups/day for Low Purine; avoid excess in Potassium Restricted).'
    },
    {
      id: 'ginger_tea',
      name: 'Ginger Tea (Salabat natural)',
      cebuano: 'Salabat / Tsaa nga luy-a',
      category: 'beverage',
      tags: ['low-sodium', 'natural-herbal'],
      notes: 'Approved in Low Salt and Low Fat Diets.'
    },
    {
      id: 'beer_alcohol',
      name: 'Beer & Alcoholic Beverages',
      cebuano: 'Beer ug ilimnong makahubog',
      category: 'beverage',
      tags: ['high-purine', 'prohibited-substance'],
      purineLevel: 'extremely-high',
      notes: 'Strictly prohibited in Low Purine, Low Fat, and Diabetic Diets.'
    },
    {
      id: 'milk_tea_shakes',
      name: 'Milk Tea / Milk Shakes / Sweetened Drinks',
      cebuano: 'Milk tea, Milk shakes, Malted milk drinks',
      category: 'beverage',
      tags: ['high-fat', 'high-sugar', 'high-dairy'],
      fatLevel: 'high',
      sugarLevel: 'high',
      notes: 'Prohibited in Low Fat, Low Salt, and Diabetic Diets.'
    },

    // --- DESSERTS ---
    {
      id: 'plain_gelatin',
      name: 'Plain Fruit Gelatin / Fruit Ices (Walay gatas)',
      cebuano: 'Gelan / Fruit ices nga walay gatas o tambok',
      category: 'dessert',
      tags: ['low-fat', 'low-purine'],
      fatLevel: 'none',
      notes: 'Approved dessert for Low Fat Diet.'
    },
    {
      id: 'leche_flan',
      name: 'Leche Flan / Custard',
      cebuano: 'Leche flan nga may condensed milk ug itlog',
      category: 'dessert',
      tags: ['high-fat', 'high-sugar', 'high-dairy'],
      fatLevel: 'high',
      sugarLevel: 'high',
      notes: 'Prohibited in Low Fat, Low Salt, and Diabetic Diets.'
    },
    {
      id: 'chocolate_pastries',
      name: 'Chocolate Bars / Pastries / Doughnuts',
      cebuano: 'Chocolates, Cakes, Pastries, Doughnuts',
      category: 'dessert',
      tags: ['high-fat', 'high-sugar', 'high-potassium'],
      fatLevel: 'very-high',
      sugarLevel: 'very-high',
      potassiumLevel: 'high',
      notes: 'Prohibited in Low Fat, Potassium Restricted, and Diabetic Diets.'
    }
  ];

  return {
    FOOD_DATABASE
  };
});
