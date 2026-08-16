# CleanKart — Refactor & Iterate an Online Shopping Cart

Submission for:

**Low level design : Refactoring Techniques & Iterative Development**

## Objective

Refactor a messy Shopping Cart implementation through multiple small iterations.

The project demonstrates:

- code smell identification;
- method extraction;
- meaningful naming;
- removal of duplication and dead code;
- modular design;
- Strategy Pattern;
- Observer Pattern;
- Builder Pattern;
- automated verification;
- iterative development.

## Iteration History

See:

```text
ITERATIONS.md
```

The project contains four visible stages:

```text
iteration-0-messy/
iteration-1-cleanup/
iteration-2-strategy/
iteration-3-observer-builder/
```

and a final modular implementation:

```text
final/
```

## Design Patterns

### Strategy

Discount algorithms are interchangeable.

Implemented:

```text
NoDiscountStrategy
StudentDiscountStrategy
VipDiscountStrategy
```

### Observer

Customers can subscribe to Product price changes.

When a price decreases, observers are notified.

Implemented:

```text
Observer
PriceDropObserver
```

### Builder

Complex Product creation is handled by:

```text
ProductBuilder
```

Example:

```js
const laptop = new ProductBuilder()
  .setId("P001")
  .setName("Laptop")
  .setPrice(1200)
  .setCategory("electronics")
  .setDescription("Developer laptop")
  .build();
```

## Final Project Structure

```text
cleankart-refactor-iterate/
├── iteration-0-messy/
├── iteration-1-cleanup/
├── iteration-2-strategy/
├── iteration-3-observer-builder/
├── final/
│   ├── src/
│   │   ├── builders/
│   │   ├── models/
│   │   ├── observers/
│   │   ├── services/
│   │   └── strategies/
│   └── tests/
├── .gitignore
├── ITERATIONS.md
├── SUMMARY_REPORT.md
├── package.json
└── README.md
```

## Run Each Iteration

```bash
npm run messy
npm run clean
npm run strategy
npm run patterns
npm run final
```

## Test Final Version

```bash
npm test
```

## Summary Report

The required final explanation is available in:

```text
SUMMARY_REPORT.md
```

It explains:

- what was changed;
- why the changes were made;
- how clean code principles were applied;
- how Strategy, Observer and Builder improved the design.

## Author

Taher Amine ELHOUARI
