import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import Beasties from 'beasties';

const htmlPath = new URL('../dist/index.html', import.meta.url);
const distPath = fileURLToPath(new URL('../dist/', import.meta.url));
const navigationCss = await fs.readFile(new URL('../src/components/Navbar.css', import.meta.url), 'utf8');
const html = await fs.readFile(htmlPath, 'utf8');
const beasties = new Beasties({
  path: distPath,
  publicPath: '/',
  preload: 'swap',
  pruneSource: true,
  compress: true,
  logLevel: 'warn',
});

const optimized = await beasties.process(html);
const deferredRendering = '.home-page>section:nth-of-type(n+2){content-visibility:auto;contain-intrinsic-size:auto 900px}';
const criticalNavigation = navigationCss.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim() + deferredRendering;
const output = optimized.replace('</head>', `<style data-critical-navigation>${criticalNavigation}</style></head>`);
await fs.writeFile(htmlPath, output);
