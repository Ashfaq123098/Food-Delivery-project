import { createContext, useState } from "react";
import { foodlist } from "../FoodData/FoodData";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  
  // ✅ API Base URL (read from .env or fallback to localhost:4000)
  const url = process.env.REACT_APP_API || "http://localhost:4000";

  // ✅ Example token (replace with real auth later if needed)
  const token = localStorage.getItem("token") || "";

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const getTotalAmountCart = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = foodlist.find(
          (product) => product.id === parseInt(itemId)
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Provide url & token along with cart stuff
  const contextValue = {
    foodlist,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmountCart,
    url,
    token,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;