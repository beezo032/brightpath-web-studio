import sharp from 'sharp';
import path from 'node:path';

const publicDir = path.resolve('public');
for (const name of ['aster_house_dental', 'northstar_heating', 'vesper_tattoo']) {
  await sharp(path.join(publicDir, `${name}.png`)).webp({ quality: 82, effort: 6 }).toFile(path.join(publicDir, `${name}.webp`));
}
await sharp(path.join(publicDir, 'favicon.png')).resize(64, 64, { fit: 'inside' }).png({ compressionLevel: 9 }).toFile(path.join(publicDir, 'favicon-64.png'));
console.log('Optimized portfolio images and favicon');
