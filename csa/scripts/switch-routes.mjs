import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, '..');
const page = path.join(root, 'src/pages/c/[slug].tsx');
const stub = path.join(root, 'src/pages/c/[slug].static.tsx');

if (!fs.existsSync(stub) || !fs.existsSync(page)) {
  if (!fs.existsSync(stub)) {
    console.error(`Stub file not found: ${stub}`);
  }
  if (!fs.existsSync(page)) {
    console.error(`Page file not found: ${page}`);
  }
  console.error('Exiting script because required file(s) are missing.');
  process.exit(0);
}

const backup = path.join(root, 'src/pages/c/[slug].tsx.bak');

fs.copyFileSync(page, backup);
fs.copyFileSync(stub, page);
console.log('Swapped [slug].tsx with static stub for export build.');
