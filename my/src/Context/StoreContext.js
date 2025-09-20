// src/Context/StoreContext.js
import { createContext, useState } from "react";
import { foodlist } from "../FoodData/FoodData";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

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
      const item = foodlist.find(f => f.id === parseInt(id));
      if (item) total += item.price * cartItems[id];
    }
    return total;
  };

  return (
    <StoreContext.Provider value={{ foodlist, cartItems, addToCart, removeFromCart, getTotalAmountCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
