// src/Components/Cart.js
import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import './cart.css';

const Cart = () => {
  const { cartItems, foodlist, addToCart, removeFromCart } = useContext(StoreContext);

  const cartArray = Object.entries(cartItems)
    .map(([id, quantity]) => {
      const item = foodlist.find(f => f.id === parseInt(id));
      return item ? { ...item, quantity } : null;
    })
    .filter(Boolean);

  const totalCost = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h3>Cart</h3>

      {cartArray.length === 0 ? (
        <p>No items added.</p>
      ) : (
        <div className="cart-items">
          {cartArray.map((item) => (
            <div key={item.id} className="cart-item-wrapper">
              <hr />
              <div className="cart-item">
                <div className="item-info">
                  <span>{item.name}</span>
                  <span>Tk {item.price * item.quantity}</span>
                </div>
                <div className="item-actions">
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h4>Total: Tk {totalCost}</h4>
    </div>
  );
};

export default Cart;
