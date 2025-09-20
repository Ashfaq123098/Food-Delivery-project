// src/components/MyOrders/MyOrders.js

import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import parcelIcon from '../../assets/parcel-icon.jpeg';
import './MyOrders.css';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { token } }
            );
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders yet.</p>
                ) : (
                    data.map((order) => (
                        <div key={order._id} className="my-orders-order">
                            <img src={parcelIcon} alt="Parcel" />
                            <p>
                                {order.items.map((item, index) => 
                                    `${item.name} x${item.quantity}${index !== order.items.length - 1 ? ', ' : ''}`
                                )}
                            </p>
                            <p> Tk {order.amount}.00</p>
                            <p>Items : {order.items.length}</p>
                            <p> <span>&#x25CF;</span><b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
