const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const imagePath = path.join(__dirname, '..', 'assets', 'images', 'world_map.png');
const outPath = path.join(__dirname, '..', 'constants', 'worldmapLandMask.ts');

const LAND_MIN_B = 120;
const LAND_MIN_G = 120;
const LAND_MAX_R = 80;
const STEP = 6;

const png = PNG.sync.read(fs.readFileSync(imagePath));
const points = [];

for (let y = 0; y < png.height; y += STEP) {
  for (let x = 0; x < png.width; x += STEP) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    const a = png.data[idx + 3];

    const isLand = a > 10 && b >= LAND_MIN_B && g >= LAND_MIN_G && r <= LAND_MAX_R;
    if (isLand) {
      points.push([Number((x / png.width).toFixed(4)), Number((y / png.height).toFixed(4))]);
    }
  }
}

const fileContent = `export const WORLDMAP_LAND_MASK: Array<[number, number]> = ${JSON.stringify(points)};\n`;
fs.writeFileSync(outPath, fileContent, 'utf8');

console.log(`Mask generated: ${points.length} points`);
