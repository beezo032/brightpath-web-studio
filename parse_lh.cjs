const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('./lh-report.json', 'utf8'));
  
  // Find LCP element
  const lcpAudit = data.audits['largest-contentful-paint-element'];
  if (lcpAudit && lcpAudit.details && lcpAudit.details.items) {
    const item = lcpAudit.details.items[0];
    if (item && item.node) {
      console.log('--- LCP Node ---');
      console.log(item.node.snippet);
      console.log('Path:', item.node.path);
    }
    
    // Lighthouse often logs phase details here
    console.log('\n--- LCP Timing Breakdown ---');
    if (item.phases) {
      console.log('TTFB:', item.phases.ttfb);
      console.log('Load Delay:', item.phases.loadDelay);
      console.log('Load Time:', item.phases.loadTime);
      console.log('Render Delay:', item.phases.renderDelay);
    }
  }

  // Find LCP trace events or network requests if we can
  const metrics = data.audits['metrics']?.details?.items?.[0];
  if (metrics) {
    console.log('\nLCP:', metrics.largestContentfulPaint, 'ms');
    console.log('FCP:', metrics.firstContentfulPaint, 'ms');
  }

  // Let's dump all LCP related items
  console.log('\nLCP Audit display value:', data.audits['largest-contentful-paint']?.displayValue);
  
} catch(e) {
  console.error(e);
}
