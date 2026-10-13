/**
 * Institutional Dietary Policy Rules Matrix
 * Sources:
 * 1. Davao Occidental General Hospital (DOGH) Dietary Services Manual
 *    - Low Fat Diet (Giya sa Pagpili sa Pagkaon Alang sa "Low Fat Diet")
 *    - Low Salt Diet (Giya sa Pagpili sa Pagkaon Alang sa "Low Salt Diet")
 *    - Low Purine Diet (Giya sa Pagpili sa Pagkaon Alang sa "Low Purine Diet")
 *    - Potassium Restricted Diet (Giya sa Pagpili sa Pagkaon Alang sa "Potassium Restricted Diet")
 * 2. FNRI-DOST Nutritional Guidelines for Filipinos (NGF) / Clinical Diet Manual (Diabetic Diet)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DIETARY_RULES = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const DIETARY_POLICIES = {
    'low-fat': {
      id: 'low-fat',
      name: 'Low Fat Diet',
      cebuanoName: 'Giya sa Pagpili sa Pagkaon Alang sa "Low Fat Diet"',
      institution: 'Davao Occidental General Hospital - Dietary Services',
      description: 'Restricts saturated fats, cholesterol, fried foods, gravies, full-cream dairy, and coconut milk (gata) to reduce lipid levels and cardiovascular strain.',
      clinicalIndication: 'Dyslipidemia, Cardiovascular disease, Gallbladder diseases, Pancreatitis, Hepatic disorders.',
      mgaPahimangno: [
        'Mas maayo kon ang pagkaluto sa mga pagkaon pinaagi sa paglaga, tinola o sinabaw nga wala giagi ug mantika, sinugba, ge-oven, steam, gipaksiw o inon-onan ug pinaisan.',
        'Himoa nga e-tsek kanunay ang mga label sa pinalit na pagkaon, likaye ang adunay halo nga mga gibawal nga nalista sa taas.',
        'Kon mokaon sa mga karne o manok kuhaon ang makitang taba ug panit.'
      ],
      mgaPahimangnoEnglish: [
        'Cooking methods should prioritize boiling, tinola or clear broths without oil, grilling, oven-baking, steaming, paksiw, or wrapped steaming (pinaisan).',
        'Always check ingredient labels of purchased products; avoid items containing prohibited fats.',
        'Trim all visible fat and remove poultry skin before cooking or consumption.'
      ],
      prohibitedIngredients: [
        'butter', 'margarine', 'lard', 'cream', 'all purpose cream', 'mayonnaise',
        'full cream milk', 'condensed milk', 'carabao milk', 'gatas sa carabao',
        'chicharon', 'bacon', 'tocino', 'chorizo', 'pork belly', 'liempo',
        'deep fried', 'pinirito', 'fried egg', 'fried chicken', 'french fries',
        'coconut cream', 'gata', 'ginataan', 'leche flan', 'yema',
        'chocolate bar', 'pastries', 'doughnut', 'sweet rolls', 'torta', 'mamon',
        'organ meat', 'lamang-loob', 'bone marrow', 'utok', 'oyuk-oyuk', 'liver', 'atay',
        'milk shake', 'milk tea', 'malted milk', 'chocolate drink', 'cheese',
        'canned sardines in oil', 'corned beef'
      ],
      disallowedCookingMethods: ['deep-fried', 'pan-fried', 'crispy-fried', 'ginataan', 'sauteed-heavy-oil'],
      allowedCookingMethods: ['boiled', 'tinola', 'steamed', 'sinugba/grilled', 'baked', 'paksiw/inon-onan', 'pinaisan'],
      portionLimits: {
        fatsOil: '1-2 teaspoons measured vegetable oil per day max',
        egg: 'Egg whites free; whole eggs boiled without oil, maximum 1 per day'
      }
    },

    'low-salt': {
      id: 'low-salt',
      name: 'Low Salt Diet (Low Sodium)',
      cebuanoName: 'Giya sa Pagpili sa Pagkaon Alang sa "Low Salt Diet"',
      institution: 'Davao Occidental General Hospital - Dietary Services',
      description: 'Strictly limits sodium chloride, MSG, commercial seasoning cubes, patis, toyo, bagoong, and canned/cured processed foods to prevent fluid retention and hypertension.',
      clinicalIndication: 'Hypertension, Congestive Heart Failure, Chronic Kidney Disease, Edema/Fluid Retention, Liver Cirrhosis with Ascites.',
      mgaPahimangno: [
        'Magmaigmat sa pagbasa sa mga sagul sa mga pagkaon nga gipalit sa tindahan, seguradohon nga walay nakabutang nga bisan unsang klaseng "sodium". Adunay mga pagkaon nga naglabaw ang tam-is apan dunay sagol nga sodium.',
        'Likayan ang pagkaon sa gawas o pagkaon sa mga komersyal nga pagkaon ug linuto sa mga kan-anan o restaurants.',
        'Kanunayon ang pagkaon sa mga pagkaong natural ug linuto sa balay.'
      ],
      mgaPahimangnoEnglish: [
        'Be vigilant when reading nutrition facts and ingredient labels; verify zero added sodium or sodium compounds (baking powder, MSG, sodium benzoate). Some sweet snacks contain high sodium.',
        'Avoid dining out, commercial fast foods, and restaurant meals where sodium levels cannot be controlled.',
        'Always prepare natural, whole foods cooked at home without added salt or seasonings.'
      ],
      prohibitedIngredients: [
        'table salt', 'asin', 'iodized salt', 'rock salt',
        'toyo', 'soy sauce', 'patis', 'fish sauce', 'bagoong', 'alamang', 'ginamos',
        'vetsin', 'msg', 'monosodium glutamate', 'magic sarap', 'ajinomoto', 'broth cube', 'beef cube', 'chicken cube', 'sinigang mix',
        'worcestershire sauce', 'commercial mustard', 'tausi', 'salted black beans',
        'baking soda', 'baking powder', 'sodium bicarbonate', 'lye water', 'lihia',
        'chicharon', 'bacon', 'ham', 'hotdog', 'tocino', 'longganisa', 'chorizo', 'spam', 'canned meat', 'corned beef',
        'canned sardines', 'salted fish', 'buwad', 'tuyo', 'daing', 'salted egg', 'itlog na maalat', 'pickled egg',
        'canned vegetables with sodium', 'instant noodles', 'pancake mix', 'potato chips', 'pretzels', 'salted nuts', 'salted crackers',
        'maraschino cherries', 'high sodium mineral water', 'brine solution'
      ],
      disallowedCookingMethods: ['salted-curing', 'brine-pickled', 'seasoned-with-cubes', 'deep-fried-salted'],
      allowedCookingMethods: ['boiled', 'steamed', 'grilled', 'baked', 'freshly-cooked-unseasoned'],
      portionLimits: {
        eggLimitWeekly: 3,
        notes: 'Limit bread with baking soda/powder (pan de sal, loaf bread) to small controlled portions.'
      }
    },

    'low-purine': {
      id: 'low-purine',
      name: 'Low Purine Diet',
      cebuanoName: 'Giya sa Pagpili sa Pagkaon Alang sa "Low Purine Diet"',
      institution: 'Davao Occidental General Hospital - Dietary Services',
      description: 'Eliminates high-purine foods (internal organ meats, small oily fish like anchovies and sardines, gravies, and beer) to prevent uric acid accumulation and gout flare-ups.',
      clinicalIndication: 'Gout, Hyperuricemia, Uric Acid Nephrolithiasis (Kidney Stones).',
      mgaPahimangno: [
        'Likayan ang mga pagkaon nga taas ug purine (MGA PAGKAON NGA NKALISTA SA DAPAT LIKAYAN).',
        'Kaon sa mga pagkaon nga taas ug karbohaydrets (Kon dili diabetiko), pagkaon nga lanuton o taas ug "Fiber" kay mao kani makatabang pagpagawas sa uric acid sa lawas.',
        'Limitahan ang pagkaon sa mantikaon sanglit ang mantika o taba magapapundo sa Uric acid sa lawas.',
        'Likayan ang pag-inom sa ilimnong makahubog o dunay alcohol kay ang alcohol mopugong pagpagawas sa uric acid.',
        'Kape o tsaa hangtud sa 2 ka tasa lamang matag adlaw. Ang kape ug tsaa adunay methylated purine nga mahimong methyl uric acid sa lawas.',
        'Inom ug daghang tubig, 2-3 litro kada adlaw, hinumdoman nga ang tubig maoy panghugas sa atong lawas, ianod niini tanan toxins.',
        'Likayan ang mga parat nga pagkaon o taas ug sodium kay mao kini ang mopugong pagpagawas sa tubig o ihi nga maoy hinungdan nga mopundo ang "urates" sa lawas.',
        'E-mentenar ang ensaktong gibug-aton o timbang.',
        'Mag-exercise matag adlaw ug kanunay sundon ang "Healthy lifestyle".'
      ],
      mgaPahimangnoEnglish: [
        'Strictly avoid high-purine foods listed in the avoidance guidelines.',
        'Eat complex carbohydrate and fiber-rich foods (if not diabetic) to assist uric acid excretion.',
        'Restrict fatty and oily foods, as lipids impede uric acid clearance.',
        'Completely abstain from alcoholic beverages and beer; alcohol directly blocks kidney clearance of uric acid.',
        'Limit coffee and tea to a maximum of 2 cups per day (contains methylated purines).',
        'Drink 2 to 3 Liters of clean water daily to flush uric acid deposits and prevent stone formation.',
        'Avoid high-sodium foods which promote fluid retention and urate deposition.',
        'Maintain healthy body weight and engage in daily physical exercise.'
      ],
      prohibitedIngredients: [
        'beer', 'alcohol', 'liquor', 'wine',
        'internal organs', 'lamang-loob', 'liver', 'atay', 'kidney', 'bato', 'spleen', 'lapay', 'heart', 'kasing-kasing', 'brain', 'utok', 'intestines', 'nae', 'ilogon', 'bihod', 'fish roe', 'bagaybay',
        'bolinao', 'anchovies', 'dilis', 'lupoy', 'tangige', 'mackerel', 'carabalyas', 'anduhaw', 'tamban', 'sardines', 'canned sardines', 'hito', 'catfish', 'tahong', 'mussels', 'alimango', 'crab', 'pasayan', 'shrimp',
        'whole wheat bread', 'wheat crackers', 'oatmeal', 'whole grain',
        'commercial soup', 'meat extracts', 'greasy gravy', 'sebohon nga sabaw',
        'canned meat', 'marinated foods'
      ],
      restrictedVegetablesDailyMax1: ['asparagus', 'cauliflower', 'mushroom', 'spinach', 'espinaka'],
      portionLimits: {
        meatDailyServingsMax: 3,
        legumesWeeklyMax: 1,
        coffeeTeaDailyCupsMax: 2,
        waterDailyLitersMin: 2
      }
    },

    'potassium-restricted': {
      id: 'potassium-restricted',
      name: 'Potassium Restricted Diet',
      cebuanoName: 'Giya sa Pagpili sa Pagkaon Alang sa "Potassium Restricted Diet"',
      institution: 'Davao Occidental General Hospital - Dietary Services',
      description: 'Strictly monitors and restricts dietary potassium intake from high-potassium fruits, leafy greens, squash, salt substitutes, and organ meats to avoid life-threatening hyperkalemia.',
      clinicalIndication: 'End-Stage Renal Disease (ESRD), Oliguric Acute Kidney Injury, Severe Hyperkalemia, Dialysis Patients.',
      mgaPahimangno: [
        'Likayi ang tanang dahonon nga gulay, kalabasa, malunggay, cauliflower, celery, ug uhong/mushroom.',
        'Likayi ang mga prutas nga taas sa potassium sama sa latundan, kapayas/papaya, kahel/orange, pinya, santol, lanzones, prunes, pasas/raisins.',
        'Ayaw paggamit ug salt substitute (kapuli sa asin) tungod kay kini sagad ginama gikan sa potassium chloride.',
        'Likayi ang sabaw sa karne, yeast extracts, ketchup/catsup, ug coconut milk/gata.'
      ],
      mgaPahimangnoEnglish: [
        'Avoid all leafy green vegetables, squash, moringa (malunggay), cauliflower, celery, and mushrooms.',
        'Avoid high-potassium fruits including latundan banana, ripe papaya, oranges/orange juice, pineapple juice, santol, lanzones, prunes, and raisins.',
        'Never consume commercial salt substitutes as they are primarily composed of potassium chloride (KCl).',
        'Avoid meat broth extracts, yeast extracts, ketchup, and coconut milk (gata).'
      ],
      prohibitedIngredients: [
        'leafy vegetables', 'tanang dahonon nga gulay', 'kangkong', 'pechay', 'spinach', 'espinaka', 'malunggay', 'moringa', 'cauliflower', 'celery', 'mushroom', 'uhong', 'squash', 'kalabasa',
        'apple', 'mansanas', 'latundan', 'banana', 'kamatsili', 'langka', 'jackfruit', 'orange', 'kahel', 'orange juice', 'pineapple juice', 'strawberry', 'mabolo', 'santol', 'anona', 'balimbing', 'starfruit', 'kamias', 'melon', 'cantaloupe', 'grapefruit juice', 'guyabano', 'soursop', 'kasuy', 'cashew', 'ripe papaya', 'kapayas', 'lanzones', 'prunes', 'apricots', 'raisins', 'pasas',
        'crabs', 'alimango', 'alimasag', 'dried beans', 'legumes', 'lentils', 'sardines', 'oysters', 'talaba', 'kesong puti', 'cottage cheese', 'tokwa', 'tofu', 'bologna', 'frankfurters',
        'butong pakwan', 'watermelon seeds', 'coconut milk', 'gata sa lubi', 'avocado', 'peanut butter', 'kinugay', 'muscovado sugar', 'molasses',
        'catsup', 'ketchup', 'tomato sauce', 'cream of tartar', 'yeast', 'salt substitute', 'potassium chloride', 'meat broth', 'sabaw sa karne', 'yeast extract'
      ],
      allowedVegetables: ['upo', 'singkamas', 'pipino', 'cucumber', 'radish', 'labanos', 'sayote', 'chayote', 'dabong', 'bamboo shoots', 'ubod', 'heart of palm'],
      allowedFruitsLimited: ['white guava', 'lakatan', 'pomelo', 'suha', 'mango', 'mangga', 'atis', 'watermelon', 'pakwan', 'makopa', 'sinigwelas', 'sampalok'],
      portionLimits: {
        coffeeTeaAllowance: 'Strictly within daily hospital allowance only',
        soups: 'Meat broths contraindicated; use plain water or low-potassium vegetable boil'
      }
    },

    'diabetic': {
      id: 'diabetic',
      name: 'Diabetic Hospital Diet (Controlled Carbohydrate)',
      cebuanoName: 'Giya sa Pagkaon Alang sa May Diabetes',
      institution: 'Department of Health & Clinical Diet Manual',
      description: 'Controls simple carbohydrates and glycemic load, eliminates refined sugars and sweets, ensures high dietary fiber, and monitors caloric distribution.',
      clinicalIndication: 'Type 1 and Type 2 Diabetes Mellitus, Impaired Glucose Tolerance, Gestational Diabetes.',
      mgaPahimangno: [
        'Likayan ang mga pagkaon ug ilimnon nga adunay refined sugar, syrup, condensed milk, ug softdrinks.',
        'Pilion ang complex carbohydrates sama sa brown rice, oatmeal, ug lagutmon basta masukod ang gidaghanon.',
        'Kaon og daghang gulay nga lanuton (fiber) aron makatabang sa pagkontrol sa asukar sa dugo.'
      ],
      mgaPahimangnoEnglish: [
        'Strictly avoid refined sugars, confectionery, syrups, condensed milk, sweetened desserts, and sodas.',
        'Choose high-fiber, low-glycemic complex carbohydrates in measured portions.',
        'Incorporate non-starchy vegetables and lean proteins at every meal to stabilize blood glucose curves.'
      ],
      prohibitedIngredients: [
        'refined sugar', 'asukar', 'white sugar', 'brown sugar', 'corn syrup', 'glucose',
        'condensed milk', 'chocolate bar', 'candy', 'kende', 'softdrinks', 'soda', 'sweetened tea', 'milk tea',
        'leche flan', 'yema', 'cake', 'cookies', 'pastries', 'doughnut', 'ice cream', 'halo-halo with syrup',
        'sweetened canned fruit', 'maraschino cherries', 'jam with sugar', 'jelly with sugar', 'sweetened commercial juice'
      ],
      portionLimits: {
        carbs: 'Measured portions per meal (e.g. 1 cup cooked rice)',
        sweets: 'Zero refined sugars; artificial non-caloric sweetener in moderation if allowed'
      }
    },

    'fnri-general': {
      id: 'fnri-general',
      name: 'FNRI Nutritional Guidelines for Filipinos (Pinggang Pinoy)',
      cebuanoName: 'Nasudnong Giya sa Nutrisyon (FNRI Pinggang Pinoy)',
      institution: 'Food and Nutrition Research Institute - DOST',
      description: 'Promotes holistic nutritional balance based on the 10 Nutritional Guidelines for Filipinos (NGF) and Pinggang Pinoy: 1/2 plate vegetables & fruits (Glow), 1/4 plate protein (Grow), 1/4 plate carbohydrates (Go).',
      clinicalIndication: 'General Health Maintenance, Preventative Nutrition, Post-discharge wellness.',
      mgaPahimangno: [
        'Kaon ug nagkalain-laing pagkaon matag adlaw (Go, Grow, Glow).',
        'Kaon ug daghang gulay ug prutas kada adlaw.',
        'Limitahi ang pagkaon sa parat, mantikaon, prito, ug tam-is.',
        'Inom ug limpyo nga tubig 8 o labaw pa ka baso kada adlaw.'
      ],
      mgaPahimangnoEnglish: [
        'Eat a variety of foods every day incorporating Go, Grow, and Glow food groups.',
        'Eat plenty of fresh vegetables and fruits daily.',
        'Limit intake of salty, fried, fatty, and sugar-rich foods.',
        'Drink 8 or more glasses of safe water daily, stay active, and avoid alcoholic beverages.'
      ],
      prohibitedIngredients: [
        'excessive deep fried foods', 'alcohol abuse', 'ultra processed foods with high trans-fat', 'excessive table salt'
      ],
      portionLimits: {
        waterDailyGlassesMin: 8
      }
    }
  };

  return {
    DIETARY_POLICIES
  };
});
