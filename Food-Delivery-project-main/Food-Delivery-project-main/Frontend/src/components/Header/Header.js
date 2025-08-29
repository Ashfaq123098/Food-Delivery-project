import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Freshly made dishes, delivered to your doorstep. Explore a variety of meals and enjoy tasty food every day.
        </p>
        <button onClick={() => navigate("/menu")}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
