const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));

const perf = data.categories.performance.score;
console.log('Performance Score:', perf * 100);
