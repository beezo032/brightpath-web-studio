const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));

const mainThread = data.audits['mainthread-work-breakdown'];
if (mainThread && mainThread.details) {
  console.log('\n--- Main Thread Work Breakdown ---');
  mainThread.details.items.forEach(item => {
    console.log(`${item.groupLabel}: ${item.duration} ms`);
  });
}

const bootup = data.audits['bootup-time'];
if (bootup && bootup.details) {
  console.log('\n--- Script Bootup Time ---');
  bootup.details.items.forEach(item => {
    console.log(`URL: ${item.url} | Total Time: ${item.total} ms | Script Parse/Compile: ${item.scripting} ms`);
  });
}

const tbt = data.audits['total-blocking-time'];
console.log('\nTotal Blocking Time:', tbt.displayValue);
