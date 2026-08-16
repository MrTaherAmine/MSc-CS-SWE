# Refactoring Iterations

## Iteration 0 — Messy Baseline

Purpose: preserve an intentionally poor version for comparison.

Code smells identified:

- vague variable/function names (`c`, `add`, `total`);
- global mutable state;
- duplicated loops;
- long function doing calculation and presentation;
- conditional logic for each discount type;
- tight coupling between pricing logic and cart behavior;
- no encapsulation;
- price-change notification mixed directly with product logic;
- hard-to-test functions.

Run:

```bash
npm run messy
```

## Iteration 1 — Basic Cleanup

Changes:

- renamed variables and functions;
- extracted subtotal and discount calculations;
- removed redundant `t = t`;
- separated printing from calculations;
- replaced manual loops with array methods;
- introduced clearer error handling.

Run:

```bash
npm run clean
```

## Iteration 2 — Strategy Pattern

Problem addressed:

Discount calculation still required conditionals.

Change:

Introduced separate discount strategies:

- NoDiscountStrategy
- StudentDiscountStrategy
- VipDiscountStrategy

Benefit:

The ShoppingCart no longer needs to know the details of each discount algorithm.

Run:

```bash
npm run strategy
```

## Iteration 3 — Observer + Builder

Changes:

### Observer Pattern

Products maintain subscribers. When a product price decreases, registered observers are notified.

### Builder Pattern

Product creation is moved into `ProductBuilder`, allowing complex products to be constructed fluently.

Run:

```bash
npm run patterns
```

## Final Iteration

The final solution separates responsibilities into:

```text
models/
builders/
observers/
services/
strategies/
tests/
```

Run:

```bash
npm run final
npm test
```

This iterative structure follows the requested cycle:

```text
Refactor -> Test -> Add Pattern -> Test -> Repeat
```
