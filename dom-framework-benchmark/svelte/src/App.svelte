<script>
  import { tick } from 'svelte';
  import {
    makeTasks, mutateFirst50, deleteFirst50,
    afterPaint, heapMB, median, downloadResults
  } from './benchmark-utils.js';

  let tasks = $state([]);
  let name = $state('');
  let priority = $state('Medium');
  let metrics = $state(null);
  let running = $state(false);

  function addTask(event) {
    event.preventDefault();
    if (!name.trim()) return;
    tasks = [...tasks, { id: Date.now(), name: name.trim(), priority }];
    name = '';
  }
  function updateTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, name: `${t.name} edited` } : t);
  }
  function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
  }
  async function sample(operation) {
    const start = performance.now();
    operation();
    await tick();
    await afterPaint();
    return performance.now() - start;
  }
  async function runBenchmark() {
    running = true;
    const results = {};

    for (const count of [100, 500, 1000]) {
      const samples = [];
      for (let i = 0; i < 5; i++) {
        tasks = []; await tick(); await afterPaint();
        samples.push(await sample(() => { tasks = makeTasks(count); }));
      }
      results[`render_${count}`] = { ms: median(samples), heapMB: heapMB() };
    }

    const updateSamples = [];
    for (let i = 0; i < 5; i++) {
      tasks = makeTasks(1000); await tick(); await afterPaint();
      updateSamples.push(await sample(() => { tasks = mutateFirst50(tasks); }));
    }
    results.update_50 = { ms: median(updateSamples), heapMB: heapMB() };

    const deleteSamples = [];
    for (let i = 0; i < 5; i++) {
      tasks = makeTasks(1000); await tick(); await afterPaint();
      deleteSamples.push(await sample(() => { tasks = deleteFirst50(tasks); }));
    }
    results.delete_50 = { ms: median(deleteSamples), heapMB: heapMB() };

    metrics = results;
    running = false;
  }
</script>

<main class="app">
  <header>
    <div><div class="eyebrow">Svelte DOM Benchmark</div><h1>TodoBench</h1><div class="muted">Compiled reactivity + keyed each blocks</div></div>
    <button onclick={runBenchmark} disabled={running}>{running ? 'Benchmarking…' : 'Run benchmark'}</button>
  </header>

  <form class="form-row" onsubmit={addTask}>
    <input bind:value={name} placeholder="Task name">
    <select bind:value={priority}><option>Low</option><option>Medium</option><option>High</option></select>
    <button type="submit">Add task</button>
    <button type="button" class="secondary" onclick={() => tasks = makeTasks(100)}>Load 100</button>
    <button type="button" class="secondary" onclick={() => tasks = []}>Clear</button>
  </form>

  {#if metrics}
    <section class="panel">
      <div class="metrics">
        {#each Object.entries(metrics) as [key, value] (key)}
          <div class="metric"><span>{key}</span><strong>{value.ms.toFixed(2)} ms</strong><small>{value.heapMB ?? 'n/a'} MB heap</small></div>
        {/each}
      </div>
      <div class="toolbar"><button onclick={() => downloadResults('Svelte', metrics)}>Download JSON</button></div>
    </section>
  {/if}

  <section class="panel">
    <strong>{tasks.length} tasks</strong>
    <div class="table-wrap"><table>
      <thead><tr><th>Task</th><th>Priority</th><th>Actions</th></tr></thead>
      <tbody>
        {#each tasks as task (task.id)}
          <tr>
            <td>{task.name}</td><td class="priority">{task.priority}</td>
            <td><div class="task-actions"><button onclick={() => updateTask(task.id)}>Edit</button><button onclick={() => removeTask(task.id)}>Remove</button></div></td>
          </tr>
        {/each}
      </tbody>
    </table></div>
  </section>
</main>
