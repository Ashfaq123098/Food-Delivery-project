import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

import "./Navbar.css";
import IconImg from "../../assets/unnamed.png";
import SearchImg from "../../assets/search.png";
import basketIconImg from "../../assets/basket-icon.jpg";

const Navbar = ({ setShowLogin, isLoggedIn, user, onLogout, onShowSignUp }) => {
  const [activeLink, setActiveLink] = useState("/");
  const { getTotalAmountCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = (value) => setActiveLink(value);

  
  const handleAnchorClick = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/"); 
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <div className="navbar">
      <NavLink to="/" onClick={() => handleClick("/")}>
        <img src={IconImg} alt="logo" className="navbar-logo" />
      </NavLink>

      <ul className="navbar-menu">
        <li>
          <NavLink
            to="/"
            className={activeLink === "/" ? "nav-link active" : "nav-link"}
            onClick={() => handleClick("/")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/menu"
            className={activeLink === "/menu" ? "nav-link active" : "nav-link"}
            onClick={() => handleClick("/menu")}
          >
            Menu
          </NavLink>
        </li>
        <li>
          <a onClick={() => handleAnchorClick("About-Information")} className="nav-link">
            About
          </a>
        </li>
        <li>
          <a onClick={() => handleAnchorClick("Mobile-app-download")} className="nav-link">
            Mobile App
          </a>
        </li>
        <li>
          <a onClick={() => handleAnchorClick("footer")} className="nav-link">
            Contacts
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={SearchImg} alt="search" className="search-icon" />

        <NavLink to="/cart" className="cart-link">
          <img src={basketIconImg} alt="basket" className="basket-icon" />
          {getTotalAmountCart() > 0 && <div className="dot"></div>}
        </NavLink>

        {isLoggedIn ? (
          <div className="user-section">
            <span className="welcome-text">{user?.name || "User"}</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
