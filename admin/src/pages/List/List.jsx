import React, { useState, useEffect } from "react";
import axios from "axios";
import { foodlist as localFoodData } from "../../data/FoodData";
import "./List.css";

const List = () => {
  const [localItems, setLocalItems] = useState([]);
  const [backendItems, setBackendItems] = useState([]);

  
  const fetchBackend = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      setBackendItems(res.data);
    } catch (err) {
      console.error("Failed to fetch backend:", err);
    }
  };

  useEffect(() => {
    setLocalItems(localFoodData);
    fetchBackend();
  }, []);

  // Called from Add page
  const addBackendItem = (newItem) => {
    setBackendItems((prev) => [...prev, newItem]);
  };

  // Remove handlers
  const removeLocal = (id) => {
    setLocalItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeBackend = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/products/${id}`);
      if (res.status === 200) {
        setBackendItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete backend item:", err);
    }
  };

  return (
    <div className="list-page">
      <h1>Menu</h1>

      <h2>Local Items</h2>
      <div className="product-list">
        {localItems.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-img" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
            <button className="remove-btn" onClick={() => removeLocal(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2>Backend Items</h2>
      <div className="product-list">
        {backendItems.map((item) => (
          <div key={item._id} className="product-card">
            <img src={item.image} alt={item.name} className="product-img" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
            <button className="remove-btn" onClick={() => removeBackend(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

