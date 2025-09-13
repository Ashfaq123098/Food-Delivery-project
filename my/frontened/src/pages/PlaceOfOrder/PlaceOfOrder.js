import React, { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import './PlaceOfOrder.css';

const PlaceOfOrder = () => {
  const { getTotalAmountCart, token, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOfOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    const requiredFields = ["firstName","lastName","email","street","city","state","zipcode","country","phone"];
    for (let field of requiredFields) {
      if (!data[field]) {
        alert("Please fill in all delivery information fields!");
        setIsLoading(false);
        return;
      }
    }

    // Map cart items
    const orderItems = Object.keys(cartItems)
      .filter(key => cartItems[key] > 0)
      .map(key => ({
        productId: key,
        quantity: cartItems[key]
      }));

    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      setIsLoading(false);
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmountCart() === 0 ? 0 : getTotalAmountCart() + 2,
      paymentMethod: 'cash_on_delivery'
    };

    try {
      console.log("Sending order data:", orderData);

      // Include token only if it exists
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(`${url}/api/order/place`, orderData, { headers });
      console.log("Backend response:", res.data);

      if (res.data?.success) {
        setPaymentDone(true);
        setTimeout(() => {
          alert("Order placed successfully!");
          window.location.href = '/order-success';
        }, 1000);
      } else {
        alert("Order failed: " + (res.data?.message || "Please try again."));
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("Order failed. Please check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={placeOfOrder} className="order-place">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" type="text" placeholder="First Name" onChange={onChangeHandler} value={data.firstName} />
          <input name="lastName" type="text" placeholder="Last Name" onChange={onChangeHandler} value={data.lastName} />
        </div>
        <input name="email" type="email" placeholder="Email Address" onChange={onChangeHandler} value={data.email} />
        <input name="street" type="text" placeholder="Street Address" onChange={onChangeHandler} value={data.street} />
        <div className="multi-fields">
          <input name="city" type="text" placeholder="City" onChange={onChangeHandler} value={data.city} />
          <input name="state" type="text" placeholder="State" onChange={onChangeHandler} value={data.state} />
        </div>
        <div className="multi-fields">
          <input name="zipcode" type="text" placeholder="Zip Code" onChange={onChangeHandler} value={data.zipcode} />
          <input name="country" type="text" placeholder="Country" onChange={onChangeHandler} value={data.country} />
        </div>
        <input name="phone" type="text" placeholder="Phone" onChange={onChangeHandler} value={data.phone} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{getTotalAmountCart()} Tk</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalAmountCart() === 0 ? 0 : 2} Tk</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalAmountCart() === 0 ? 0 : getTotalAmountCart() + 2} Tk</b>
          </div>
        </div>

        <div className="payment-options">
          <p className="title">Payment Method</p>
          <div className="payment-option selected">
            <span>💵</span> Cash on Delivery
          </div>
        </div>

        {paymentDone && (
          <div className="payment-success">
            Payment Done Successfully!
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Place Order (Cash on Delivery)'}
        </button>
      </div>
    </form>
  );
};

export default PlaceOfOrder;
