const express = require('express');
const path = require('path');
const { DIETARY_POLICIES } = require('./engine/rules');
const { FOOD_DATABASE } = require('./engine/foodDatabase');
const { validateMealPlan } = require('./engine/validator');
const { SAMPLE_PLANS } = require('./samplePlans');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes

// 1. Get all codified dietary policies
app.get('/api/policies', (req, res) => {
  res.json({
    status: 'success',
    count: Object.keys(DIETARY_POLICIES).length,
    policies: Object.values(DIETARY_POLICIES)
  });
});

// 2. Get categorized food ingredient database
app.get('/api/foods', (req, res) => {
  const { category, search } = req.query;
  let foods = [...FOOD_DATABASE];

  if (category) {
    foods = foods.filter(f => f.category === category);
  }

  if (search) {
    const s = search.toLowerCase();
    foods = foods.filter(f =>
      f.name.toLowerCase().includes(s) ||
      f.cebuano.toLowerCase().includes(s) ||
      (f.tags && f.tags.some(t => t.toLowerCase().includes(s)))
    );
  }

  res.json({
    status: 'success',
    total: foods.length,
    foods
  });
});

// 3. Get preconfigured sample meal plans
app.get('/api/sample-plans', (req, res) => {
  const summaries = Object.values(SAMPLE_PLANS).map(p => ({
    id: p.id,
    title: p.title,
    policyId: p.policyId,
    description: p.description
  }));
  res.json({
    status: 'success',
    samples: summaries
  });
});

// 4. Get specific sample meal plan details
app.get('/api/sample-plans/:id', (req, res) => {
  const sample = SAMPLE_PLANS[req.params.id];
  if (!sample) {
    return res.status(404).json({ status: 'error', message: 'Sample plan not found' });
  }
  res.json({ status: 'success', plan: sample });
});

// 5. Core Compliance Validator Endpoint
app.post('/api/validate', (req, res) => {
  try {
    const { patientName, selectedPolicies, meals, beverages, dailyStats } = req.body;

    if (!selectedPolicies || !Array.isArray(selectedPolicies) || selectedPolicies.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'At least one dietary policy must be selected for validation.'
      });
    }

    const auditResult = validateMealPlan({
      patientName,
      meals: meals || {},
      beverages: beverages || [],
      dailyStats: dailyStats || {}
    }, selectedPolicies);

    res.json({
      status: 'success',
      data: auditResult
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while evaluating dietary compliance.',
      details: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Institutional Dietary Compliance Validation Engine',
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(` Dietary Compliance Validation Engine is running!`);
  console.log(` Server URL: http://localhost:${PORT}`);
  console.log(` Policies Loaded: Low Fat, Low Salt, Low Purine, Potassium Restricted, Diabetic, FNRI`);
  console.log(`================================================================`);
});

module.exports = app;
