const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));
console.log('--- LCP Breakdown Insight ---');
console.log(JSON.stringify(data.audits['lcp-breakdown-insight'], null, 2));
console.log('\n--- LCP Discovery Insight ---');
console.log(JSON.stringify(data.audits['lcp-discovery-insight'], null, 2));
