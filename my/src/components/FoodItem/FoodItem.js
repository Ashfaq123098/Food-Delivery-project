import React, { useContext } from "react";
import "./FoodItem.css";
import star from "../../assets/rating_starts.png";
import addicon from "../../assets/add_icon_white.png";
import removeicon from "../../assets/remove_icon_red.png";
import addicongreen from "../../assets/add_icon_green.png";
import { StoreContext } from "../../Context/StoreContext"; // ✅ import context

const FoodItem = ({ id, image, name, description, price, quantity }) => {
  const { addToCart, removeFromCart } = useContext(StoreContext); // ✅ get functions from context

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={image} alt={name} />
        {!quantity ? (
          <img className="add" onClick={() => addToCart(id)} src={addicon} alt="Add" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={removeicon} alt="Remove" />
            <p>{quantity}</p>
            <img onClick={() => addToCart(id)} src={addicongreen} alt="Add" />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-ratings">
          <p>{name}</p>
          <img src={star} alt="rating" className="star-icon" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">Tk {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

