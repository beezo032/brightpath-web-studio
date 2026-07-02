const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));
const keys = Object.keys(data.audits).filter(k => k.includes('lcp') || k.includes('paint'));
console.log('Keys:', keys);
console.log('LCP Element Details:', JSON.stringify(data.audits['largest-contentful-paint-element'] || {}, null, 2));
