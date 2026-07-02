const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));

const renderBlocking = data.audits['render-blocking-resources'];
if (renderBlocking && renderBlocking.details && renderBlocking.details.items) {
  console.log('\n--- Render Blocking Resources ---');
  renderBlocking.details.items.forEach(item => {
    console.log(`URL: ${item.url} | Wasted Ms: ${item.wastedMs}`);
  });
} else {
  console.log('No render-blocking resources.');
}

const mainThread = data.audits['mainthread-work-breakdown'];
if (mainThread) console.log('Main thread execution ms:', mainThread.displayValue);

const bootup = data.audits['bootup-time'];
if (bootup) console.log('Bootup time:', bootup.displayValue);
