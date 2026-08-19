import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of ['index.html', 'styles.css']) {
  fs.copyFileSync(path.resolve('public', file), path.join(dist, file));
}

fs.mkdirSync(path.join(dist, 'src'), { recursive: true });
for (const file of ['app.js', 'gradeCalculator.js']) {
  fs.copyFileSync(path.resolve('src', file), path.join(dist, 'src', file));
}

// Repoint the copied HTML to the production-relative JS path.
const indexPath = path.join(dist, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8')
  .replace('../src/app.js', './src/app.js');

fs.writeFileSync(indexPath, html);

console.log('Build complete: dist/');
