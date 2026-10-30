// src/components/Navbar.jsx
// Purpose: Header navigation component displayed across all pages.
// Features responsive navigation links, brand logo, mobile toggle,
// and a live cart item count badge driven by the CartContext.

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
          <div className="brand-icon">🛍️</div>
          <span>ShopEase</span>
        </Link>

        {/* Navigation Links */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            All Products
          </NavLink>
          <NavLink
            to="/products?category=electronics"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Electronics
          </NavLink>
          <NavLink
            to="/products?category=jewelery"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Jewelry
          </NavLink>
        </nav>

        {/* Right side actions: Cart button with live count */}
        <div className="nav-actions">
          <Link to="/cart" className="cart-button-link" onClick={closeMobileMenu}>
            <span>🛒 Cart</span>
            <span className="cart-badge">{totalItems}</span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
