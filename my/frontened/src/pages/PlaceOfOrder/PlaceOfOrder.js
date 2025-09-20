import React, { useContext,  useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import "./PlaceOfOrder.css";
//import { useNavigate } from "react-router-dom";


const PlaceOfOrder = () => {
  const { getTotalAmountCart, token, cartItems, url } = useContext(StoreContext);

  // 🔍 Debug: check if frontend can read API URL
  console.log("Frontend sees API URL:", url);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postcode: "",   // ✅ changed from zipcode
    country: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOfOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "state",
      "postcode", // ✅ changed here too
      "country",
      "phone",
    ];
    for (let field of requiredFields) {
      if (!data[field]) {
        alert("Please fill in all delivery information fields!");
        setIsLoading(false);
        return;
      }
    }

    // ✅ Prepare cart items
    const orderItems = Object.keys(cartItems)
      .filter((key) => cartItems[key] > 0)
      .map((key) => ({ productId: key, quantity: cartItems[key] }));

    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      setIsLoading(false);
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmountCart() === 0 ? 0 : getTotalAmountCart() + 2,
    };

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.post(`${url}/api/order/place`, orderData, { headers });

      if (res.data?.url) {
        window.location.href = res.data.url; // redirect to SSLCommerz
      } else {
        alert("Payment failed to initialize.");
      }
    } catch (err) {
      console.error("Axios error:", err);
      alert("Payment request failed. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

 /* const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      alert("Please log in to place an order.");
      navigate("/");
    } else if (getTotalAmountCart() === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
    }
  }, [token]);*/

  return (
    <form onSubmit={placeOfOrder} className="order-place">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={data.firstName}
            onChange={onChangeHandler}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={data.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={onChangeHandler}
        />
        <input
          name="street"
          type="text"
          placeholder="Street"
          value={data.street}
          onChange={onChangeHandler}
        />
        <div className="multi-fields">
          <input
            name="city"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={data.state}
            onChange={onChangeHandler}
          />
        </div>
        <div className="multi-fields">
          <input
            name="postcode"  // ✅ updated
            type="text"
            placeholder="Post Code"
            value={data.postcode}
            onChange={onChangeHandler}
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={data.country}
            onChange={onChangeHandler}
          />
        </div>
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={data.phone}
          onChange={onChangeHandler}
        />
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
            <b>
              {getTotalAmountCart() === 0 ? 0 : getTotalAmountCart() + 2} Tk
            </b>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOfOrder;
