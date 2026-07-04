import { readFile } from 'node:fs/promises';
import { XMLValidator } from 'fast-xml-parser';

const xml = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const result = XMLValidator.validate(xml);
if (result !== true) {
  console.error(`Invalid sitemap.xml: ${result.err.msg} at line ${result.err.line}`);
  process.exit(1);
}
console.log('sitemap.xml is valid');
