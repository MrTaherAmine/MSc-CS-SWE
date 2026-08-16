import React from "react";
import product from "./product";

// Displays the product description.
function Description() {
  return <p className="product-description">{product.description}</p>;
}

export default Description;
