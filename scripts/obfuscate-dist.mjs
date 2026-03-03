import fs from 'node:fs';
import path from 'node:path';
import JavaScriptObfuscator from 'javascript-obfuscator';

const rootDir = process.cwd();
const distRoot = path.join(rootDir, 'dist');

function listJsFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...listJsFiles(fullPath));
      continue;
    }
    if (!entry.isFile()) continue;
    if (fullPath.endsWith('.js')) result.push(fullPath);
  }
  return result;
}

function findBuildOutputRoot() {
  if (!fs.existsSync(distRoot)) {
    throw new Error(`No existe la carpeta dist: ${distRoot}`);
  }

  const entries = fs.readdirSync(distRoot, { withFileTypes: true }).filter((e) => e.isDirectory());
  if (entries.length === 0) return distRoot;

  const direct = entries.map((e) => path.join(distRoot, e.name));

  for (const candidate of direct) {
    const browserDir = path.join(candidate, 'browser');
    if (fs.existsSync(browserDir) && fs.statSync(browserDir).isDirectory()) {
      return browserDir;
    }
  }

  if (direct.length === 1) return direct[0];

  return distRoot;
}

const outRoot = findBuildOutputRoot();
const jsFiles = listJsFiles(outRoot);

if (jsFiles.length === 0) {
  console.log(`No se encontraron archivos .js en ${outRoot}`);
  process.exit(0);
}

console.log(`Ofuscando ${jsFiles.length} archivos .js en: ${path.relative(rootDir, outRoot)}`);

for (const filePath of jsFiles) {
  const input = fs.readFileSync(filePath, 'utf8');
  const result = JavaScriptObfuscator.obfuscate(input, {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  });
  fs.writeFileSync(filePath, result.getObfuscatedCode(), 'utf8');
}

console.log('Ofuscación completada.');
