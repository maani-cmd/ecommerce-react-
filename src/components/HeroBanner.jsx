// src/components/HeroBanner.jsx
// Purpose: Displays the visual promotional hero banner on the Homepage.
// Includes high-impact headline, subtext, call-to-action buttons, and value propositions.

import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <div className="hero-pill">
          ✨ New Season Collection 2026
        </div>
        <h1 className="hero-title">
          Elevate Your Everyday Style & Tech
        </h1>
        <p className="hero-subtitle">
          Discover handpicked apparel, state-of-the-art electronics, and exquisite jewelry.
          Fast delivery, secure checkout, and instant ordering.
        </p>
        <div className="hero-buttons">
          <Link to="/products" className="btn hero-btn-white btn-lg">
            Shop Catalog →
          </Link>
          <Link to="/products?category=electronics" className="btn hero-btn-trans btn-lg">
            Explore Electronics
          </Link>
        </div>
      </div>
    </div>
  );
}
