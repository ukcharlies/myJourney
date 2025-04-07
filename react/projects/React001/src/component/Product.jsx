import React, { useState } from "react";

export const Product = () => {
  const [product, setProduct] = useState({
    title: "6ix Mango",
    price: 220,
    availability: true,
  });

  return (
    <>
      <div>product price : {product.price}</div>
      <div>product title : {product.title}</div>

      <button
        onClick={() => setProduct({ ...product, price: 300 })}
        className=" bg-blue-500 p-2 "
      >
        Update price
      </button>
    </>
  );
};
