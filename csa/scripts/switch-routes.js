/*
  Switch dynamic routes for static export by copying static stub over runtime SSR page.
  Intended only for BUILD_TARGET=export.
*/
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const page = path.join(root, 'src/pages/c/[slug].tsx');
const stub = path.join(root, 'src/pages/c/[slug].static.tsx');

if (!fs.existsSync(stub)) {
  console.log('No static stub found, skipping.');
  process.exit(0);
}

if (!fs.existsSync(page)) {
  console.log('No dynamic page found, skipping.');
  process.exit(0);
}

const backup = path.join(root, 'src/pages/c/[slug].tsx.bak');

fs.copyFileSync(page, backup);
fs.copyFileSync(stub, page);
console.log('Swapped [slug].tsx with static stub for export build.');
