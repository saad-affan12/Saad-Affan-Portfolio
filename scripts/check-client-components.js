const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const exts = ['.tsx', '.ts', '.jsx', '.js'];
const api = ['window\.', 'document\.', 'localStorage', 'navigator', 'matchMedia', 'requestAnimationFrame'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', '.next', 'scripts'].includes(e.name)) continue;
      files = files.concat(await walk(res));
    } else if (exts.includes(path.extname(e.name))) {
      files.push(res);
    }
  }
  return files;
}

function containsApi(content) {
  return api.some(a => new RegExp(a).test(content));
}

function hasUseClient(content) {
  const lines = content.split(/\r?\n/).map(l => l.trim());
  const re = /^(["'])use client\1;?$/;
  for (let i = 0; i < Math.min(6, lines.length); i++) {
    if (re.test(lines[i])) return true;
    if (lines[i] !== '' && !lines[i].startsWith('//') && !lines[i].startsWith('/*')) break;
  }
  return false;
}

(async () => {
  const files = await walk(ROOT);
  const issues = [];
  for (const f of files) {
    const content = await fs.readFile(f, 'utf8');
    if (containsApi(content) && !hasUseClient(content)) {
      issues.push(f);
    }
  }
  if (issues.length === 0) {
    console.log('All files using browser APIs are client components.');
    process.exit(0);
  }
  console.log('Files using browser APIs but missing "use client":');
  issues.forEach(i => console.log(i));
  process.exit(2);
})();