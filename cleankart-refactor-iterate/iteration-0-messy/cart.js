// Iteration 0: intentionally messy baseline.
// Code smells: vague names, duplication, long method, tight coupling, mixed concerns.

let c = [];

function add(n, p, q, cat) {
  c.push({ n: n, p: p, q: q, cat: cat });
}

function total(discountType) {
  let t = 0;

  for (let i = 0; i < c.length; i++) {
    t = t + c[i].p * c[i].q;
  }

  if (discountType === "student") {
    t = t - t * 0.1;
  }

  if (discountType === "vip") {
    t = t - t * 0.2;
  }

  if (discountType === "none") {
    t = t;
  }

  console.log("Items:");
  for (let i = 0; i < c.length; i++) {
    console.log(c[i].n + " x" + c[i].q + " = " + c[i].p * c[i].q);
  }

  console.log("Total = " + t);
  return t;
}

function changePrice(name, newPrice) {
  for (let i = 0; i < c.length; i++) {
    if (c[i].n === name) {
      c[i].p = newPrice;
      console.log("Price changed for " + name);
    }
  }
}

add("Laptop", 1200, 1, "electronics");
add("Mouse", 30, 2, "electronics");
total("student");
changePrice("Laptop", 1100);
total("student");
