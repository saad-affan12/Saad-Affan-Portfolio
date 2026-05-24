const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const exts = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'];

async function walk(dir) {
  let entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      files.push(...(await walk(res)));
    } else if (/\.(tsx|ts|jsx|js|mjs|cjs)$/.test(e.name)) {
      files.push(res);
    }
  }
  return files;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch { return false; }
}

async function checkPathCasing(importer, importPath) {
  // only handle @/ alias
  if (!importPath.startsWith('@/')) return null;
  const rel = importPath.replace(/^@\//, '');
  const parts = rel.split('/').filter(Boolean);
  let cur = ROOT;
  for (let i = 0; i < parts.length; i++) {
    const segment = parts[i];
    // If this is the last segment, stop here and try file variants below
    if (i === parts.length - 1) {
      cur = path.join(cur, segment);
      break;
    }
    let entries;
    try {
      entries = await fs.readdir(cur);
    } catch (err) {
      return { importer, importPath, problem: 'missing', detail: cur, expectedSegment: segment };
    }
    // look for exact match directory
    if (!entries.includes(segment)) {
      // case-insensitive match?
      const found = entries.find(e => e.toLowerCase() === segment.toLowerCase());
      if (found) {
        const remaining = parts.slice(i+1).join('/');
        const actualPath = path.join(cur, found, remaining || '');
        return { importer, importPath, problem: 'casing', expected: path.join(cur, segment), actual: actualPath };
      } else {
        // not found at all
        return { importer, importPath, problem: 'missing', detail: path.join(cur, segment) };
      }
    }
    cur = path.join(cur, segment);
  }
  // Now check file existence: maybe it's a dir with index or a file with extension
  // Try file variants
  for (const ext of exts) {
    const p = cur + ext;
    if (await fileExists(p)) return null;
  }
  // index variants
  for (const ext of exts) {
    const p = path.join(cur, 'index' + ext);
    if (await fileExists(p)) return null;
  }
  // If here, path points to an existing directory but no index, or to a file without ext
  // Try to find a case-insensitive file match
  const dir = path.dirname(cur);
  const base = path.basename(cur);
  try {
    const entries = await fs.readdir(dir);
    const found = entries.find(e => e.toLowerCase() === base.toLowerCase());
    if (found) return { importer, importPath, problem: 'casing', expected: cur, actual: path.join(dir, found) };
  } catch {}
  return { importer, importPath, problem: 'missing', detail: cur };
}

(async () => {
  const files = await walk(ROOT);
  const importRegex = /from\s+["'](@\/[^"']+)["']/g;
  const importRegexDefault = /import\s+\(\s*['"](@\/[^'"]+)['"]/g; // dynamic imports
  const issues = [];
  for (const f of files) {
    const content = await fs.readFile(f, 'utf8');
    let m;
    while ((m = importRegex.exec(content))) {
      const res = await checkPathCasing(f, m[1]);
      if (res) issues.push(res);
    }
    while ((m = importRegexDefault.exec(content))) {
      const res = await checkPathCasing(f, m[1]);
      if (res) issues.push(res);
    }
  }
  if (issues.length === 0) {
    console.log('No case-casing issues found for @/ imports.');
    process.exit(0);
  }
  console.log('Case-sensitivity issues found:');
  for (const it of issues) {
    console.log(JSON.stringify(it));
  }
  process.exit(2);
})();
