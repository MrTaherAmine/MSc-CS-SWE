import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Priority = 'Low' | 'Medium' | 'High';
type Task = { id: number; name: string; priority: Priority };

const priorities: Priority[] = ['Low', 'Medium', 'High'];

function makeTasks(count: number): Task[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Task ${index + 1}`,
    priority: priorities[index % priorities.length]
  }));
}
function mutateFirst50(tasks: Task[]): Task[] {
  return tasks.map((task, index) => index < 50 ? ({
    ...task,
    name: `${task.name} updated`,
    priority: priorities[(priorities.indexOf(task.priority) + 1) % priorities.length]
  }) : task);
}
function heapMB(): number | null {
  const perf = performance as Performance & { memory?: { usedJSHeapSize: number } };
  return perf.memory ? Math.round((perf.memory.usedJSHeapSize / 1024 / 1024) * 100) / 100 : null;
}
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function afterPaint(): Promise<void> {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  tasks = signal<Task[]>([]);
  metrics = signal<Record<string, { ms: number; heapMB: number | null }> | null>(null);
  running = signal(false);
  name = '';
  priority: Priority = 'Medium';

  makeTasksForTemplate(count: number) { return makeTasks(count); }
  metricEntries(values: Record<string, { ms: number; heapMB: number | null }>) { return Object.entries(values); }

  addTask() {
    if (!this.name.trim()) return;
    this.tasks.update(old => [...old, { id: Date.now(), name: this.name.trim(), priority: this.priority }]);
    this.name = '';
  }
  updateTask(id: number) {
    this.tasks.update(old => old.map(t => t.id === id ? { ...t, name: `${t.name} edited` } : t));
  }
  removeTask(id: number) {
    this.tasks.update(old => old.filter(t => t.id !== id));
  }
  async sample(operation: () => void) {
    const start = performance.now();
    operation();
    await afterPaint();
    return performance.now() - start;
  }
  async runBenchmark() {
    this.running.set(true);
    const results: Record<string, { ms: number; heapMB: number | null }> = {};

    for (const count of [100, 500, 1000]) {
      const samples: number[] = [];
      for (let i = 0; i < 5; i++) {
        this.tasks.set([]); await afterPaint();
        samples.push(await this.sample(() => this.tasks.set(makeTasks(count))));
      }
      results[`render_${count}`] = { ms: median(samples), heapMB: heapMB() };
    }

    const updates: number[] = [];
    for (let i = 0; i < 5; i++) {
      this.tasks.set(makeTasks(1000)); await afterPaint();
      updates.push(await this.sample(() => this.tasks.update(mutateFirst50)));
    }
    results['update_50'] = { ms: median(updates), heapMB: heapMB() };

    const deletions: number[] = [];
    for (let i = 0; i < 5; i++) {
      this.tasks.set(makeTasks(1000)); await afterPaint();
      deletions.push(await this.sample(() => this.tasks.update(old => old.slice(50))));
    }
    results['delete_50'] = { ms: median(deletions), heapMB: heapMB() };

    this.metrics.set(results);
    this.running.set(false);
  }
  downloadResults() {
    const blob = new Blob([JSON.stringify({ framework: 'Angular', generatedAt: new Date().toISOString(), results: this.metrics() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'angular-results.json'; a.click(); URL.revokeObjectURL(url);
  }
}
