import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import parcelicon from "../../assets/parcel-icon.jpeg";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error in fetching orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const reponse=await axios.put(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (reponse.data.success) {
      await fetchAllOrders();
      toast.success("Status updated");
    } else {
      toast.error("Error in updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcelicon} alt="parcel" />

            <div className="order-details">
              {/* Food items */}
              <p className="order-item-food">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              {/* Customer name */}
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>

              {/* Address */}
              <div className="order-item-address">
                {order.address.street}, {order.address.city},{" "}
                {order.address.state}, {order.address.postcode}
              </div>
            </div>

            {/* Phone */}
            <p className="order-item-phone">{order.address.phone}</p>

            {/* Items count & amount */}
            <p>Items: {order.items.length}</p>
            <p>Tk {order.amount}</p>

            {/* Order status */}
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} defaultValue={order.status || "Food processing"}>
              <option value="Food processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
