# Checkpoint Building React Apps with TypeScript

This project converts the two JavaScript React examples provided in the checkpoint into TypeScript.

## What was changed

### Code 01 — Greeting

The original component received a `name` prop without any type information.

Changes made:

1. Renamed the component file to `Greeting.tsx`.
2. Created a `GreetingProps` interface.
3. Declared `name` as a `string`.
4. Applied the interface to the destructured props parameter.
5. Kept the JSX behavior unchanged.

Converted version:

```tsx
interface GreetingProps {
  name: string;
}

const Greeting = ({ name }: GreetingProps) => {
  return <div>Hello, {name}!</div>;
};
```

### Code 02 — Counter

The original class component stored `count` in state without type information.

Changes made:

1. Renamed the component file to `Counter.tsx`.
2. Created `CounterState` with `count: number`.
3. Created an empty `CounterProps` interface because the component receives no props.
4. Declared the class as:

```tsx
Component<CounterProps, CounterState>
```

5. Explicitly typed the component state.
6. Added a `void` return type to the `increment` method.
7. Added a return type to `render()`.
8. Preserved the original increment behavior.

## Why these changes matter

TypeScript adds static type checking to React code.

This helps detect problems earlier, such as:

- passing the wrong type of prop;
- assigning an invalid value to state;
- using properties that do not exist;
- introducing errors during refactoring.

## Project structure

```text
react-typescript-checkpoint/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Counter.tsx
│   │   └── Greeting.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.tsx
│   └── react-app-env.d.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Run locally

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

The application normally runs at:

```text
http://localhost:3000
```

## Author

Taher Amine ELHOUARI
