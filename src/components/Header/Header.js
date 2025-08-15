import React from 'react';
import './Header.css';

const Header = () => {
  // Scroll to menu section smoothly when button clicked
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Welcome to Our Store</h2>
        <p>Explore our wide range of products</p>
        <button className="view-menu-btn" onClick={scrollToMenu}>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
