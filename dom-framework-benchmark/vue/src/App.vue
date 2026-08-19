<script setup>
import { ref, nextTick } from 'vue';
import {
  makeTasks, mutateFirst50, deleteFirst50,
  afterPaint, heapMB, median, downloadResults
} from './benchmark-utils.js';

const tasks = ref([]);
const name = ref('');
const priority = ref('Medium');
const metrics = ref(null);
const running = ref(false);

function addTask() {
  if (!name.value.trim()) return;
  tasks.value.push({ id: Date.now(), name: name.value.trim(), priority: priority.value });
  name.value = '';
}
function updateTask(id) {
  const task = tasks.value.find(t => t.id === id);
  if (task) task.name += ' edited';
}
function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id);
}
async function sample(operation) {
  const start = performance.now();
  operation();
  await nextTick();
  await afterPaint();
  return performance.now() - start;
}
async function runBenchmark() {
  running.value = true;
  const results = {};

  for (const count of [100, 500, 1000]) {
    const samples = [];
    for (let i = 0; i < 5; i++) {
      tasks.value = [];
      await nextTick(); await afterPaint();
      samples.push(await sample(() => { tasks.value = makeTasks(count); }));
    }
    results[`render_${count}`] = { ms: median(samples), heapMB: heapMB() };
  }

  const updateSamples = [];
  for (let i = 0; i < 5; i++) {
    tasks.value = makeTasks(1000); await nextTick(); await afterPaint();
    updateSamples.push(await sample(() => { tasks.value = mutateFirst50(tasks.value); }));
  }
  results.update_50 = { ms: median(updateSamples), heapMB: heapMB() };

  const deleteSamples = [];
  for (let i = 0; i < 5; i++) {
    tasks.value = makeTasks(1000); await nextTick(); await afterPaint();
    deleteSamples.push(await sample(() => { tasks.value = deleteFirst50(tasks.value); }));
  }
  results.delete_50 = { ms: median(deleteSamples), heapMB: heapMB() };

  metrics.value = results;
  running.value = false;
}
</script>

<template>
  <main class="app">
    <header>
      <div><div class="eyebrow">Vue DOM Benchmark</div><h1>TodoBench</h1><div class="muted">Reactive refs + v-for + stable keys</div></div>
      <button @click="runBenchmark" :disabled="running">{{ running ? 'Benchmarking…' : 'Run benchmark' }}</button>
    </header>

    <form class="form-row" @submit.prevent="addTask">
      <input v-model="name" placeholder="Task name">
      <select v-model="priority"><option>Low</option><option>Medium</option><option>High</option></select>
      <button type="submit">Add task</button>
      <button type="button" class="secondary" @click="tasks = makeTasks(100)">Load 100</button>
      <button type="button" class="secondary" @click="tasks = []">Clear</button>
    </form>

    <section v-if="metrics" class="panel">
      <div class="metrics">
        <div v-for="(value, key) in metrics" :key="key" class="metric">
          <span>{{ key }}</span><strong>{{ value.ms.toFixed(2) }} ms</strong><small>{{ value.heapMB ?? 'n/a' }} MB heap</small>
        </div>
      </div>
      <div class="toolbar"><button @click="downloadResults('Vue', metrics)">Download JSON</button></div>
    </section>

    <section class="panel">
      <strong>{{ tasks.length }} tasks</strong>
      <div class="table-wrap"><table>
        <thead><tr><th>Task</th><th>Priority</th><th>Actions</th></tr></thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.name }}</td><td class="priority">{{ task.priority }}</td>
            <td><div class="task-actions"><button @click="updateTask(task.id)">Edit</button><button @click="removeTask(task.id)">Remove</button></div></td>
          </tr>
        </tbody>
      </table></div>
    </section>
  </main>
</template>
