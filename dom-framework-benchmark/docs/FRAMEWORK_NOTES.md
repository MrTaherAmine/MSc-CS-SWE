# Framework Implementation Notes

## React

- Functional component
- `useState`
- Stable `key={task.id}`
- ReactDOM `flushSync` around measured state commits
- Array `map` / `filter` for immutable updates

## Angular

- Standalone component
- Signals
- Modern template `@for`
- `track task.id`
- FormsModule for manual task CRUD

## Vue

- Composition API
- `ref`
- `v-for`
- `:key="task.id"`
- `nextTick()` before paint wait

## Svelte

- Svelte 5 runes (`$state`)
- keyed `{#each tasks as task (task.id)}`
- `tick()` before paint wait

All implementations provide the same user-facing functionality: add, view, edit, and remove tasks with priorities.
