import React from "react";

const Cart = ({ items, setCart }) => {
  return (
    <div>
      <h1>Items in the Cart</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setCart([])} className="btn btn-error">
        Update Items
      </button>
    </div>
  );
};

export default Cart;
