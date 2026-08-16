import React from "react";
import product from "./product";

// Displays the product price.
function Price() {
  return <p className="product-price">{product.price}</p>;
}

export default Price;
