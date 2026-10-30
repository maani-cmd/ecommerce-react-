// src/components/Footer.jsx
// Purpose: Global footer component placed at the bottom of every page.
// Provides links, company information, university project credits, and copyright notice.

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Project Info */}
          <div className="footer-col">
            <h4>🛍️ ShopEase</h4>
            <p>
              A modern, high-performance E-Commerce single-page application built with React,
              Vite, React Router, Context API, and useReducer.
            </p>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Academic Project • Department of Computer Science
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=men's clothing">Men's Clothing</Link></li>
              <li><Link to="/products?category=women's clothing">Women's Clothing</Link></li>
              <li><Link to="/products?category=electronics">Electronics</Link></li>
              <li><Link to="/products?category=jewelery">Jewelry</Link></li>
            </ul>
          </div>

          {/* Customer & Academic Info */}
          <div className="footer-col">
            <h4>Features & Tech</h4>
            <p>
              ⚡ Fast Vite Build<br />
              🔄 Live Cart Persistence<br />
              📱 100% Mobile Responsive<br />
              🛡️ Safe LocalStorage Sync
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} ShopEase E-Commerce Store. Built for University Evaluation.</p>
          <p>Powered by React & Fake Store API</p>
        </div>
      </div>
    </footer>
  );
}
