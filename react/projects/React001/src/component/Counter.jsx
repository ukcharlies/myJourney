import React from "react";

let count = 0;
const Counter = () => {
  count++;
  return <div>Counter: {count}</div>;
};

export default Counter;
