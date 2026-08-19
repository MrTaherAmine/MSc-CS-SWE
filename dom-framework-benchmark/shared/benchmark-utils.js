export const priorities = ['Low', 'Medium', 'High'];

export function makeTasks(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Task ${index + 1}`,
    priority: priorities[index % priorities.length]
  }));
}

export function mutateFirst50(tasks) {
  return tasks.map((task, index) =>
    index < 50
      ? {
          ...task,
          name: `${task.name} updated`,
          priority: priorities[(priorities.indexOf(task.priority) + 1) % priorities.length]
        }
      : task
  );
}

export function deleteFirst50(tasks) {
  return tasks.slice(50);
}

export function heapMB() {
  const value = globalThis.performance?.memory?.usedJSHeapSize;
  return typeof value === 'number'
    ? Math.round((value / 1024 / 1024) * 100) / 100
    : null;
}

export function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function afterPaint() {
  return new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

export function downloadResults(framework, results) {
  const blob = new Blob(
    [JSON.stringify({ framework, generatedAt: new Date().toISOString(), results }, null, 2)],
    { type: 'application/json' }
  );
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${framework.toLowerCase()}-results.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
