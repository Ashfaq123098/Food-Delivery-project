import React, { useRef } from "react";
import "./ExploreMenu.css";

import salad from "../../assets/salad.jpeg";
import desserts from "../../assets/dessets1.jpg";
import vegeterian from "../../assets/vegeterian.jpg";
import pizza from "../../assets/pizza1.jpeg";
import noddles from "../../assets/noddles.jpg";
import fuchka from "../../assets/fuchka3_1.jpg";
import cake from "../../assets/cake1.jpeg";
import juice from "../../assets/juicy.jpeg";

const ExploreMenu = () => {
  const scrollRef = useRef(null);

  const handleClick = (foodName) => {
    alert(`You clicked on ${foodName}!`);
  };

  return (
    <div className="menu-content">
      <h2>Explore our menu</h2>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      {/* Scrollable Menu List */}
      <div className="explore-menu-scroll-container" ref={scrollRef}>
        <div className="explore-menu-list">
          {[
            { img: salad, name: "Salad" },
            { img: fuchka, name: "Fuchka" },
            { img: desserts, name: "Desserts" },
            { img: juice, name: "Juice" },
            { img: cake, name: "Cake" },
            { img: vegeterian, name: "Pure Veg" },
            { img: pizza, name: "Pizza" },
            { img: noddles, name: "Noodles" }
          ].map((item, index) => (
            <div className="explore-menu-list-item" key={index}>
              <div className="food-image-container">
                <img src={item.img} alt={item.name} />
              </div>
              <button
                className="food-name-button"
                onClick={() => handleClick(item.name)}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
