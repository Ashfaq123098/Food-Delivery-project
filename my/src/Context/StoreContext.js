

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodlist] = useState([]);
  const url = "http://localhost:4000"; // Replace with your actual backend URL

  const addToCart = (id) => {
    setCartItems(prev => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const copy = { ...prev };
      if (copy[id] > 1) copy[id] -= 1;
      else delete copy[id];
      return copy;
    });
  };

  const getTotalAmountCart = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = food_list.find(f => f._id === id || f.id === id);
      if (item) total += item.price * cartItems[id];
    }
    return total;
  };
   
  const fetchFoodlist = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodlist(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []); // Added empty dependency array to run only once

  const contextValue = {
    foodlist: food_list, // Using consistent naming
    cartItems,
    token,
    addToCart,
    removeFromCart,
    getTotalAmountCart,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
