import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import "./cart.css";

const Cart = () => {
  const { cartItems, foodlist, addToCart, removeFromCart } = useContext(StoreContext);

  // Fix _id comparison by converting to string
  const cartArray = Object.entries(cartItems)
    .map(([id, quantity]) => {
      const item = foodlist.find((f) => f._id.toString() === id.toString());
      return item ? { ...item, quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart">
      <h3>Your Cart</h3>

      {cartArray.length === 0 ? (
        <p>No items added.</p>
      ) : (
        <>
          {/* Cart Header */}
          <div className="cart-table-header">
            <span>Title</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total Price</span>
            <span>Remove</span>
          </div>

          {/* Cart Items */}
          {cartArray.map((item) => (
            <div key={item._id} className="cart-item">
              <span>{item.name}</span>
              <span>{item.price} Tk</span>
              <span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                {item.quantity}
                <button onClick={() => addToCart(item._id)}>+</button>
              </span>
              <span>{item.price * item.quantity} Tk</span>
              <span>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </span>
            </div>
          ))}

          {/* Cart Totals */}
          <div className="cart-totals">
            <div>
              <span>Subtotal:</span>
              <span>{subtotal} Tk</span>
            </div>
            <div>
              <span>Delivery Fee:</span>
              <span>{deliveryFee} Tk</span>
            </div>
            <div className="cart-grand-total">
              <strong>Total:</strong>
              <strong>{total} Tk</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

