import fs from 'fs';
import path from 'path';
import https from 'https';

const fontsDir = './public/fonts';
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const cssUrl = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap";

const fetchText = (url) => new Promise((resolve, reject) => {
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
  }).on('error', reject);
});

const downloadFile = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest);
  https.get(url, (res) => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      resolve();
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    reject(err);
  });
});

async function main() {
  try {
    console.log('Fetching Google Fonts stylesheet...');
    const originalCss = await fetchText(cssUrl);
    
    // We only want the latin subset definitions
    const regex = /\/\* latin \*\/\s*@font-face\s*\{([^}]+)\}/g;
    let match;
    let localCss = '';
    let fontCount = 0;
    
    while ((match = regex.exec(originalCss)) !== null) {
      const blockContent = match[1];
      
      const familyMatch = blockContent.match(/font-family:\s*['"]?([^'";]+)['"]?/);
      const weightMatch = blockContent.match(/font-weight:\s*([^;]+)/);
      const styleMatch = blockContent.match(/font-style:\s*([^;]+)/);
      const urlMatch = blockContent.match(/url\((https:[^)]+\.woff2)\)/);
      
      if (familyMatch && weightMatch && urlMatch) {
        const family = familyMatch[1];
        const weight = weightMatch[1].trim();
        const style = styleMatch ? styleMatch[1].trim() : 'normal';
        const remoteUrl = urlMatch[1];
        
        const fileName = `${family.toLowerCase().replace(/\s+/g, '-')}-${weight}-${style}.woff2`;
        const localPath = path.join(fontsDir, fileName);
        
        console.log(`Downloading ${family} (weight: ${weight}, style: ${style})...`);
        await downloadFile(remoteUrl, localPath);
        
        localCss += `/* ${family} - ${weight} - ${style} */
@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${fileName}') format('woff2');
}
`;
        fontCount++;
      }
    }
    
    fs.writeFileSync(path.join(fontsDir, 'fonts.css'), localCss);
    console.log(`Downloaded ${fontCount} font files and generated public/fonts/fonts.css successfully!`);
  } catch (err) {
    console.error('Error localizing fonts:', err);
  }
}

main();
