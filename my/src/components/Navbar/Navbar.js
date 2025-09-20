import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

import "./Navbar.css";
import IconImg from "../../assets/unnamed.png";
import SearchImg from "../../assets/search.png";
import basketIconImg from "../../assets/basket-icon.jpg";

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  const [activeLink, setActiveLink] = useState("/");
  const { getTotalAmountCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = (value) => setActiveLink(value);

  const handleAnchorClick = (id, linkName = "") => {
    const scrollToSection = () => {
      const element = document.getElementById(id);
      if (element) {
        const offset = document.querySelector(".navbar")?.offsetHeight || 0;
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: "smooth",
        });
      }
      if (linkName) setActiveLink(linkName);
    };

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 300); // wait for Home page to render
    } else {
      scrollToSection();
    }
  };

  return (
    <div className="navbar">
      <NavLink to="/" onClick={() => handleClick("/")}>
        <img src={IconImg} alt="logo" className="navbar-logo" />
      </NavLink>

      {/* Nav items */}
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
          <a
            onClick={() => handleAnchorClick("About-Information", "About")}
            className={activeLink === "About" ? "nav-link active" : "nav-link"}
          >
            About
          </a>
        </li>
        <li>
          <a
            onClick={() =>
              handleAnchorClick("Mobile-app-download", "MobileApp")
            }
            className={
              activeLink === "MobileApp" ? "nav-link active" : "nav-link"
            }
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            onClick={() => handleAnchorClick("footer", "Contacts")}
            className={
              activeLink === "Contacts" ? "nav-link active" : "nav-link"
            }
          >
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

        {isLoggedIn && (
          <div className="user-section">
            <span className="welcome-text">{user?.name || "User"}</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


