import React from "react";
import product from "./product";

// Displays the product name.
function Name() {
  return <h3 className="product-name">{product.name}</h3>;
}

export default Name;
