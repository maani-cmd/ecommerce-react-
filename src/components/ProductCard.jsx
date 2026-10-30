// src/components/ProductCard.jsx
// Purpose: Reusable card component for rendering a single product in grids.
// Displays image, title, category, star rating, formatted price,
// and quick 'Add to Cart' functionality using CartContext.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    // Prevent navigating to the product detail page when clicking the Add button
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </div>

        <span className="product-category-tag">{product.category}</span>
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-rating">
          <span>★ {product.rating?.rate || '4.0'}</span>
          <span className="rating-count">({product.rating?.count || 0})</span>
        </div>
      </Link>

      <div className="product-footer">
        <span className="product-price">${Number(product.price).toFixed(2)}</span>
        <button
          onClick={handleAddToCart}
          className={`btn btn-sm ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
          aria-label={`Add ${product.title} to cart`}
        >
          {isAdded ? '✓ Added' : '+ Add'}
        </button>
      </div>
    </article>
  );
}
