import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, '..');
const page = path.join(root, 'src/pages/c/[slug].tsx');
const backup = path.join(root, 'src/pages/c/[slug].tsx.bak');

if (fs.existsSync(backup)) {
  fs.copyFileSync(backup, page);
  fs.rmSync(backup);
  console.log('Restored [slug].tsx after export build.');
}
