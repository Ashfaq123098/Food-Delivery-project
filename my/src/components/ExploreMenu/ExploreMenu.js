import React, { useContext, useRef } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./ExploreMenu.css";

// Category placeholder images
import salad from "../../assets/salad.jpeg";
import desserts from "../../assets/dessets1.jpg";
import vegeterian from "../../assets/vegeterian.jpg";
import pizza from "../../assets/pizza1.jpeg";
import noddles from "../../assets/noddles.jpg";
import fuchka from "../../assets/fuchka3_1.jpg";
import cake from "../../assets/cake1.jpeg";
import juice from "../../assets/juicy.jpeg";

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);
  const { foodlist, addToCart } = useContext(StoreContext);

  const handleClick = (foodCategory) => {
    setCategory(foodCategory);
    // Optional: scroll selected item into view
    const container = scrollRef.current;
    const button = container.querySelector(`button[data-category='${foodCategory}']`);
    if (button) button.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  // Filter foods by selected category
  const filteredFood = category
    ? foodlist.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    : foodlist;

  // Category buttons with placeholder images
  const categories = [
    { img: salad, name: "Salad" },
    { img: fuchka, name: "Street Food" },
    { img: desserts, name: "Desserts" },
    { img: juice, name: "Beverage" },
    { img: cake, name: "Cake" },
    { img: vegeterian, name: "Snacks" },
    { img: pizza, name: "Pizza" },
    { img: noddles, name: "Noodles" },
  ];

  return (
    <div className="menu-content" id="menu">
      <h2>Explore our menu</h2>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      {/* Category buttons */}
      <div className="explore-menu-scroll-container" ref={scrollRef}>
        <div className="explore-menu-list">
          {categories.map((item, index) => (
            <div className="explore-menu-list-item" key={index}>
              <div className="food-image-container">
                <img src={item.img} alt={item.name} />
              </div>
              <button
                data-category={item.name}
                className={`food-name-button ${category === item.name ? "active" : ""}`}
                onClick={() => handleClick(item.name)}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Food items */}
      <div className="explore-foodlist">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <div key={item._id} className="food-item">
              {item.image && (
                <img src={process.env.PUBLIC_URL + "/images/" + item.image} alt={item.name} />
              )}
              <h4>{item.name}</h4>
              <p>Price: Tk {item.price}</p>
              <button onClick={() => addToCart(item._id)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No items found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreMenu;
