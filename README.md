# Dietary Policy Compliance Validation Engine

An institutional rule-based dietary compliance validation engine and clinical meal plan auditor built with **Node.js** and **Express.js**.

Codifies the official clinical dietary guidelines of the **Davao Occidental General Hospital (DOGH) Dietary Services** and national standards from the **Food and Nutrition Research Institute (FNRI-DOST)** into an automated compliance validator.

---

## 🏥 Codified Clinical Policies (DOGH Dietary Services)

The validation engine directly codifies the four specialized hospital diet guidelines from the Davao Occidental General Hospital manual:

### 1. Low Fat Diet (*Giya sa Pagpili sa Pagkaon Alang sa "Low Fat Diet"*)
- **Clinical Target**: Dyslipidemia, Cardiovascular Disease, Gallbladder disorders, Pancreatitis.
- **Gitugot (Allowed)**: Fresh vegetables cooked with minimal oil, fresh fruits (without cream/mayo), skim/non-fat milk, root crops (camote, gabi, cassava), plain pandesal, lean fish, skinless poultry, boiled egg whites.
- **Angay Likayan (Prohibited)**: Deep-fried foods, pork belly/liempo, visible animal fat, organ meats (*lamang-loob: atay, utok, oyuk-oyuk*), coconut cream (*gata*), fruit salads with all-purpose cream, full cream/condensed milk, chicharon, bacon, mayonnaise, milk shakes, milk tea, creamy/oily soups.
- **Approved Cooking Methods**: Boiling (*paglaga*), *tinola*, *sinabaw* without oil, grilling (*sinugba*), baking (*ge-oven*), steaming (*steam*), *gipaksiw / inon-onan*, and wrapped steaming (*pinaisan*).

### 2. Low Salt / Sodium Diet (*Giya sa Pagpili sa Pagkaon Alang sa "Low Salt Diet"*)
- **Clinical Target**: Hypertension, Congestive Heart Failure, Edema, Chronic Kidney Disease, Ascites.
- **Gitugot (Allowed)**: Fresh unseasoned vegetables, fresh unsalted fruits, plain boiled rice, corn, salt-free bihon/sotanghon, unsalted oatmeal, fresh lean meats, low-sodium cheese, ginger tea (*salabat*), natural herbs and spices (garlic/*ahos*, onion/*bombay*, ginger/*luy-a*, calamansi, black pepper/*paminta*).
- **Angay Likayan (Prohibited)**: Table salt, soy sauce (*toyo*), fish sauce (*patis*), shrimp paste (*bagoong/ginamos*), MSG (*vetsin/Magic Sarap*), bouillon cubes, canned fish/sardines, cured meats (*tocino, longganisa, ham, hotdog*), salted egg (*itlog na maalat*), baking powder, baking soda, potato chips, instant noodles, commercial dressings.
- **Quantitative Limit**: **Eggs strictly limited to maximum 3 per week** (*Egg limitado hangtud sa 3 sa usa ka semana lamang*).

### 3. Low Purine Diet (*Giya sa Pagpili sa Pagkaon Alang sa "Low Purine Diet"*)
- **Clinical Target**: Gout, Hyperuricemia, Uric Acid Kidney Stones.
- **Gitugot (Allowed)**: Green and yellow vegetables, all fruits, white rice, root crops, water (2–3 Liters daily), coffee/tea (up to 2 cups/day max).
- **Angay Likayan (Prohibited)**: Internal organ meats (*lamang-loob: atay, bato, lapay, kasing-kasing, utok, bihod*), small oily fish/seafood (*bolinao/anchovies, lupoy, tangige, mackerel, sardines/tamban, hito, mussels/tahong, crab/alimango, shrimp/pasayan*), **beer and alcohol** (inhibits renal uric acid excretion), whole wheat/oatmeal, greasy gravies.
- **Quantitative Limits**:
  - Meat/poultry/fish: Maximum 3 servings per day (*hangtud sa tulo ka sukod lamang sa matag adlaw*).
  - Beans/legumes: Maximum 1 serving per week (*hangtud sa 1 ka sukod sa usa ka semana*).
  - Water intake target: Minimum 2–3 Liters per day (*panghugas sa toxins ug urates*).
  - Coffee/tea: Maximum 2 cups per day (*methylated purines*).

### 4. Potassium Restricted Diet (*Giya sa Pagpili sa Pagkaon Alang sa "Potassium Restricted Diet"*)
- **Clinical Target**: End-Stage Renal Disease (ESRD), Oliguric Acute Kidney Injury, Severe Hyperkalemia.
- **Gitugot (Allowed)**: Upo, singkamas, cucumber (*pipino*), radish (*labanos*), sayote, bamboo shoots (*dabong*), heart of palm (*ubod*), plain white rice (*purong humay*), white rolls, plain fresh pork. Limited portion fruits: white guava, lakatan, pomelo, mango, watermelon, atis.
- **Angay Likayan (Prohibited)**: All leafy vegetables (*tanang dahonon nga gulay*), malunggay (*moringa*), squash (*kalabasa*), cauliflower, celery, mushrooms (*uhong*), high-potassium fruits (latundan banana, ripe papaya, oranges, pineapple juice, cantaloupe, dried fruits, raisins), crabs, coconut milk (*gata*), avocado, peanut butter, ketchup/tomato sauce, **commercial salt substitutes (made of potassium chloride - acute cardiac arrhythmia hazard!)**.

### 5. Complementary Hospital Policies
- **Diabetic Diet**: Strict elimination of simple sugars, soft drinks, candies, condensed milk, syrups; carbohydrate control.
- **FNRI Nutritional Guidelines**: Pinggang Pinoy balance (Go, Grow, Glow), hydration, avoiding ultra-processed foods.

---

## 🚀 Features

- **Rule-Based Engine**: Deterministic compliance auditing with zero hallucination.
- **Comorbidity / Multi-Condition Auditing**: Simultaneously audit meal plans against multiple diagnoses (e.g. Low Salt + Diabetic).
- **Instant Clinical Substitutions**: Provides dietitians with recommended safe alternatives for every flagged ingredient.
- **Bilingual Hospital Guidance**: Displays verbatim Cebuano guidelines (*Mga Pahimangno*) alongside English clinical translations.
- **Interactive Web Interface**: Clean, accessible UI with 1-click test cases (Compliant vs Violation) for immediate demonstration.
- **Print / Clinical Chart Export**: Generates clean clinical audit sheets formatted for patient charts.

---

## 🛠️ Installation & Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22.14.0)

### 2. Install Dependencies
```bash
npm install
```
*(On Windows PowerShell, use `npm.cmd install`)*

### 3. Run Automated Tests
```bash
npm test
```
Runs both the policy rule validation test suite and the HTTP API integration tests.

### 4. Start the Application
```bash
npm start
```
Open your browser at:
```
http://localhost:3000
```

---

## 📡 REST API Documentation

### `GET /api/policies`
Returns all codified dietary policies with clinical descriptions and rules.

### `GET /api/foods`
Returns the categorized clinical ingredient database with nutrient tags and Cebuano terminology. Supports `?category=` and `?search=` query parameters.

### `GET /api/sample-plans`
Returns summaries of preconfigured compliant and violation meal plans.

### `GET /api/sample-plans/:id`
Retrieves full details of a specific sample meal plan.

### `POST /api/validate`
Validates a meal plan payload against one or more dietary policies.
**Request Body**:
```json
{
  "patientName": "Juan Dela Cruz",
  "selectedPolicies": ["low-salt", "diabetic"],
  "meals": {
    "breakfast": {
      "items": ["plain_rice", "boiled_egg"],
      "customItems": [],
      "cookingMethod": "boiled",
      "seasonings": ["garlic_onion_ginger"]
    },
    "lunch": {
      "items": ["plain_rice", "steamed_fish_lean", "sayote"],
      "cookingMethod": "steamed",
      "seasonings": ["garlic_onion_ginger"]
    },
    "dinner": {
      "items": ["plain_rice", "boiled_chicken_skinless", "upo"],
      "cookingMethod": "boiled",
      "seasonings": ["garlic_onion_ginger"]
    },
    "snacks": {
      "items": ["watermelon"]
    }
  },
  "beverages": ["clean_water", "ginger_tea"],
  "dailyStats": {
    "waterLiters": 2.5,
    "weeklyEggCount": 2,
    "dailyMeatServings": 2,
    "dailyCoffeeCups": 1
  }
}
```

---

## 📦 Pushing to Your GitHub Account

A local Git repository has been initialized with all source files. To link and push to your GitHub account:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `Lab1_Reponoya` or `dietary-compliance-engine`).
2. Run the following commands in your terminal (using Git):

```bash
# Add your GitHub repository as the remote origin
& "C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Rename default branch to main (if needed)
& "C:\Program Files\Git\cmd\git.exe" branch -M main

# Push the code to your GitHub repository
& "C:\Program Files\Git\cmd\git.exe" push -u origin main
```
