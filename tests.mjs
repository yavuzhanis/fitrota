// Bağımlılık gerektirmeyen temel kaynak/algoritma kontrolleri.
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const files=['lib/exercises.ts','lib/generator.ts','lib/types.ts','lib/storage.ts','lib/nutrition.ts','lib/progression.ts','app/layout.tsx','app/page.tsx','app/gizlilik/page.tsx','app/kullanim-sartlari/page.tsx','app/saglik-uyarisi/page.tsx','app/sitemap.ts','app/robots.ts'];
for(const file of files){const raw=readFileSync(new URL(file,import.meta.url),'utf8');const result=ts.transpileModule(raw,{fileName:file,reportDiagnostics:true,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});assert.equal(result.diagnostics?.length??0,0,`${file} sözdizimi hatası`)}
const page=readFileSync(new URL('app/page.tsx',import.meta.url),'utf8');
assert.ok(page.includes('saveSetMetric('));assert.ok(page.includes('exerciseDemonstration(e)'));assert.ok(page.includes('alternativesFor('));
console.log('13 TS/TSX dosyası sözdizimi ve temel entegrasyon kontrolleri geçti.');
