import React, { useState } from 'react';
import './Header.css';
import '../styles/global.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className="site-header">
      <div className="logo-container">
        <div className="logo">
          MoonLight
          <span className="sale-badge">SALE</span>
        </div>

        {/* Burger menu for mobile */}
        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/checkout">Checkout</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;