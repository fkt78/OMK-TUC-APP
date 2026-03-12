#!/usr/bin/env node
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Netflix red #E50914
const bg = { r: 229, g: 9, b: 20 };

for (const size of [192, 512]) {
  const buf = await sharp({
    create: { width: size, height: size, channels: 3, background: bg },
  })
    .png()
    .toBuffer();
  const out = join(publicDir, `pwa-${size}x${size}.png`);
  writeFileSync(out, buf);
  console.log(`Created ${out}`);
}
