import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import {
  makeTasks, mutateFirst50, deleteFirst50,
  afterPaint, heapMB, median, downloadResults
} from './benchmark-utils.js';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [metrics, setMetrics] = useState(null);
  const [running, setRunning] = useState(false);

  function addTask(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setTasks(old => [...old, { id: Date.now(), name: name.trim(), priority }]);
    setName('');
  }

  function updateTask(id) {
    setTasks(old => old.map(t => t.id === id ? { ...t, name: `${t.name} edited` } : t));
  }

  function removeTask(id) {
    setTasks(old => old.filter(t => t.id !== id));
  }

  async function sample(operation) {
    const start = performance.now();
    flushSync(operation);
    await afterPaint();
    return performance.now() - start;
  }

  async function runBenchmark() {
    setRunning(true);
    const results = {};

    for (const count of [100, 500, 1000]) {
      const samples = [];
      for (let i = 0; i < 5; i++) {
        flushSync(() => setTasks([]));
        await afterPaint();
        samples.push(await sample(() => setTasks(makeTasks(count))));
      }
      results[`render_${count}`] = { ms: median(samples), heapMB: heapMB() };
    }

    flushSync(() => setTasks(makeTasks(1000)));
    await afterPaint();
    const updateSamples = [];
    for (let i = 0; i < 5; i++) {
      flushSync(() => setTasks(makeTasks(1000)));
      await afterPaint();
      updateSamples.push(await sample(() => setTasks(old => mutateFirst50(old))));
    }
    results.update_50 = { ms: median(updateSamples), heapMB: heapMB() };

    const deleteSamples = [];
    for (let i = 0; i < 5; i++) {
      flushSync(() => setTasks(makeTasks(1000)));
      await afterPaint();
      deleteSamples.push(await sample(() => setTasks(old => deleteFirst50(old))));
    }
    results.delete_50 = { ms: median(deleteSamples), heapMB: heapMB() };

    setMetrics(results);
    setRunning(false);
  }

  return <main className="app">
    <header>
      <div><div className="eyebrow">React DOM Benchmark</div><h1>TodoBench</h1><div className="muted">Components + state + stable keys</div></div>
      <button onClick={runBenchmark} disabled={running}>{running ? 'Benchmarking…' : 'Run benchmark'}</button>
    </header>

    <form className="form-row" onSubmit={addTask}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Task name" />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <button type="submit">Add task</button>
      <button type="button" className="secondary" onClick={() => setTasks(makeTasks(100))}>Load 100</button>
      <button type="button" className="secondary" onClick={() => setTasks([])}>Clear</button>
    </form>

    {metrics && <section className="panel">
      <div className="metrics">
        {Object.entries(metrics).map(([key, value]) =>
          <div className="metric" key={key}><span>{key}</span><strong>{value.ms.toFixed(2)} ms</strong><small>{value.heapMB ?? 'n/a'} MB heap</small></div>
        )}
      </div>
      <div className="toolbar"><button onClick={() => downloadResults('React', metrics)}>Download JSON</button></div>
    </section>}

    <section className="panel">
      <strong>{tasks.length} tasks</strong>
      <div className="table-wrap"><table>
        <thead><tr><th>Task</th><th>Priority</th><th>Actions</th></tr></thead>
        <tbody>{tasks.map(task =>
          <tr key={task.id}>
            <td>{task.name}</td><td className="priority">{task.priority}</td>
            <td><div className="task-actions"><button onClick={() => updateTask(task.id)}>Edit</button><button onClick={() => removeTask(task.id)}>Remove</button></div></td>
          </tr>
        )}</tbody>
      </table></div>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
