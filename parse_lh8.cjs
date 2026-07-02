const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));
const metrics = data.audits['metrics'].details.items[0];
console.log(metrics);
