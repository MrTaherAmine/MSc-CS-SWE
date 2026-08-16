import React from "react";
import product from "./product";

// Displays the product image.
function Image() {
  return (
    <img
      src={product.image}
      alt={product.name}
      className="product-image"
    />
  );
}

export default Image;
