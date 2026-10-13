/**
 * HTTP Integration Test for Express Server Endpoints
 */

const http = require('http');
const app = require('./server');

const server = app.listen(0, async () => {
  const port = server.address().port;
  console.log(`Testing HTTP API on port ${port}...`);

  const request = (path, method = 'GET', body = null) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers: { 'Content-Type': 'application/json' }
      };
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      });
      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  };

  try {
    // 1. Test GET /api/policies
    const policiesRes = await request('/api/policies');
    console.log(`GET /api/policies: Status ${policiesRes.status}, count: ${policiesRes.body.count}`);
    if (policiesRes.status !== 200 || policiesRes.body.count < 4) throw new Error('Policies endpoint failed');

    // 2. Test GET /api/foods
    const foodsRes = await request('/api/foods');
    console.log(`GET /api/foods: Status ${foodsRes.status}, total: ${foodsRes.body.total}`);
    if (foodsRes.status !== 200 || foodsRes.body.total < 10) throw new Error('Foods endpoint failed');

    // 3. Test POST /api/validate
    const validateRes = await request('/api/validate', 'POST', {
      patientName: 'Test Inpatient',
      selectedPolicies: ['low-salt'],
      meals: {
        breakfast: {
          items: ['plain_rice', 'boiled_egg'],
          cookingMethod: 'boiled',
          seasonings: ['garlic_onion_ginger']
        }
      },
      dailyStats: {
        weeklyEggCount: 2
      }
    });
    console.log(`POST /api/validate: Status ${validateRes.status}, compliance: ${validateRes.body.data.overallStatus}, score: ${validateRes.body.data.complianceScore}`);
    if (validateRes.status !== 200 || validateRes.body.data.overallStatus !== 'COMPLIANT') throw new Error('Validation endpoint failed');

    console.log('✅ All HTTP endpoints verified successfully!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ HTTP endpoint test failed:', err);
    server.close();
    process.exit(1);
  }
});
