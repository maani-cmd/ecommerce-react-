// src/pages/ProductDetail.jsx
// Purpose: Detailed view for a specific product (/product/:id).
// Displays high-resolution image, title, rating, category, description,
// interactive quantity selector, and Add to Cart button with feedback.

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((res) => {
        if (isMounted) {
          setProduct(res.data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Product could not be found.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQuantity(val);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <LoadingSpinner message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>Error</span>
        </div>
        <ErrorMessage
          title="Product Not Found"
          message={error || `We couldn't locate product #${id}.`}
          type="danger"
        />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            ← Back to Products Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>
          {product.title}
        </span>
      </nav>

      {/* Product Detail Layout */}
      <article className="product-detail-layout">
        {/* Left Column: Image Box */}
        <div className="detail-image-box">
          <img
            src={product.image}
            alt={product.title}
            className="detail-image"
          />
        </div>

        {/* Right Column: Info & Actions */}
        <div className="detail-info">
          <span className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
            {product.category}
          </span>

          <h1 className="detail-title">{product.title}</h1>

          {/* Rating */}
          <div className="product-rating" style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>
            <span style={{ color: 'var(--color-warning)', fontWeight: 700 }}>
              ★ {product.rating?.rate || '4.0'}
            </span>
            <span className="rating-count" style={{ fontSize: '0.9rem' }}>
              ({product.rating?.count || 0} verified customer reviews)
            </span>
          </div>

          {/* Price */}
          <div className="detail-price-box">
            <span className="detail-price">${Number(product.price).toFixed(2)}</span>
            <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem' }}>
              ● In Stock & Ready to Ship
            </span>
          </div>

          {/* Description */}
          <p className="detail-description">{product.description}</p>

          {/* Quantity Selector */}
          <div className="quantity-row">
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Quantity:</span>
            <div className="quantity-control">
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                className="qty-input"
                value={quantity}
                onChange={handleInputChange}
                aria-label="Item quantity"
              />
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <button
              onClick={handleAddToCart}
              className={`btn btn-lg ${addedNotice ? 'btn-secondary' : 'btn-primary'}`}
              style={{ flex: 1, minWidth: '220px' }}
            >
              {addedNotice ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button
              onClick={() => {
                addToCart(product, quantity);
                navigate('/cart');
              }}
              className="btn btn-secondary btn-lg"
            >
              Buy Now
            </button>
          </div>

          {/* Extra product assurances */}
          <div
            style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              fontSize: '0.88rem',
              color: 'var(--color-text-muted)'
            }}
          >
            <div>⚡ Fast delivery within 2-4 business days</div>
            <div>🛡️ 1-year authentic brand warranty</div>
            <div>🔄 Free returns within 30 days</div>
            <div>💳 100% secure payment processing</div>
          </div>
        </div>
      </article>
    </div>
  );
}
