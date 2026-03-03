import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const rootDir = process.cwd();
const envPath = path.join(rootDir, '.env');

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error(`Failed to load .env from ${envPath}`);
  console.error(result.error);
  process.exit(1);
}

const apiBaseUrl = process.env.API_BASE_URL;
if (!apiBaseUrl) {
  console.error('Missing required env var: API_BASE_URL');
  process.exit(1);
}

const outDir = path.join(rootDir, 'src', 'environments');
const outFile = path.join(outDir, 'environment.generated.ts');

fs.mkdirSync(outDir, { recursive: true });

const content = `export const environment = {\n  apiBaseUrl: ${JSON.stringify(apiBaseUrl)},\n} as const;\n`;
fs.writeFileSync(outFile, content, 'utf8');

console.log(`Generated ${path.relative(rootDir, outFile)}`);
