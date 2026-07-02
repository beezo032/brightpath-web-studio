const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));

console.log('--- Failed Audits ---');
for (const key in data.audits) {
  const audit = data.audits[key];
  if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'notApplicable' && audit.scoreDisplayMode !== 'manual' && audit.scoreDisplayMode !== 'informative') {
    console.log(`${key}: Score ${audit.score} - ${audit.displayValue || audit.title}`);
  }
}

const diagnostics = data.audits['diagnostics'];
if (diagnostics && diagnostics.details && diagnostics.details.items) {
  console.log('\n--- Diagnostics ---');
  console.log(diagnostics.details.items[0]);
}

const network = data.audits['network-requests'];
if (network && network.details && network.details.items) {
  console.log('\n--- Network Requests ---');
  network.details.items.forEach(item => {
    console.log(`${item.url} - ${item.transferSize / 1024} KB - ${item.endTime - item.startTime} ms`);
  });
}
