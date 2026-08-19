import fs from 'node:fs';
import path from 'node:path';

const names = ['react', 'angular', 'vue', 'svelte'];
const rows = [];

for (const name of names) {
  const file = path.resolve('results/raw', `${name}-results.json`);
  if (!fs.existsSync(file)) {
    console.error(`Missing ${file}`);
    process.exitCode = 1;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const r = data.results;
  rows.push({
    framework: data.framework,
    render100: r.render_100.ms,
    render500: r.render_500.ms,
    render1000: r.render_1000.ms,
    update50: r.update_50.ms,
    delete50: r.delete_50.ms,
    heap: r.delete_50.heapMB ?? r.update_50.heapMB ?? r.render_1000.heapMB ?? 'n/a'
  });
}

if (rows.length !== 4) process.exit(1);

const round = value => typeof value === 'number' ? value.toFixed(2) : value;

let md = `# Generated Benchmark Results

Generated from the four JSON exports in \`results/raw/\`.

| Framework | Render 100 | Render 500 | Render 1000 | Update 50 | Delete 50 | Heap MB |
|---|---:|---:|---:|---:|---:|---:|
`;
for (const r of rows) {
  md += `| ${r.framework} | ${round(r.render100)} | ${round(r.render500)} | ${round(r.render1000)} | ${round(r.update50)} | ${round(r.delete50)} | ${round(r.heap)} |\n`;
}

const operations = ['render100','render500','render1000','update50','delete50'];
md += '\n## Fastest by Operation\n\n';
for (const op of operations) {
  const winner = [...rows].sort((a,b) => a[op]-b[op])[0];
  md += `- **${op}:** ${winner.framework} (${round(winner[op])} ms)\n`;
}

fs.writeFileSync('results/GENERATED_RESULTS.md', md);
console.log('Generated results/GENERATED_RESULTS.md');
