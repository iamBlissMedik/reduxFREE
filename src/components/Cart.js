import React from "react";
import "./Cart.css";
import { useSelector } from "react-redux";
const Cart = () => {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  // const quantity = 5;
  return (
    <div className="cartIcon">
      <h3>Cart: {quantity} Items</h3>
    </div>
  );
};

export default Cart;
