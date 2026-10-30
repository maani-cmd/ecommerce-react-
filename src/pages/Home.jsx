// src/pages/Home.jsx
// Purpose: Homepage of the ShopEase e-commerce application.
// Features hero banner, category navigation cards, featured products grid,
// and trust-building feature highlights.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getAllProducts } from '../services/api';

const CATEGORIES_META = [
  {
    name: "men's clothing",
    label: "Men's Fashion",
    icon: '👔',
    desc: 'Casual shirts, jackets & slim-fits'
  },
  {
    name: "women's clothing",
    label: "Women's Fashion",
    icon: '👗',
    desc: 'Tops, jackets & seasonal wear'
  },
  {
    name: 'electronics',
    label: 'Electronics',
    icon: '💻',
    desc: 'SSDs, curved displays & gadgets'
  },
  {
    name: 'jewelery',
    label: 'Jewelry & Accessories',
    icon: '💍',
    desc: 'Gold, silver & precious stones'
  }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeatured = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, isFallback: fallbackUsed } = await getAllProducts();
      setIsFallback(fallbackUsed);
      // Pick top-rated products as featured
      const sortedByRating = [...data].sort(
        (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
      );
      setFeaturedProducts(sortedByRating.slice(0, 8));
    } catch (err) {
      setError(err.message || 'Failed to load featured products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <div className="container">
      {/* 1. Promotional Hero Banner */}
      <HeroBanner />

      {/* 2. Fallback Notice if Live API was unreachable */}
      {isFallback && (
        <ErrorMessage
          title="Offline Fallback Mode"
          message="Live API was unreachable; loaded featured products from local catalog."
          type="warning"
        />
      )}

      {/* 3. Shop by Category Section */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">
          Explore our most popular departments and find exactly what you need.
        </p>

        <div className="categories-grid">
          {CATEGORIES_META.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
            >
              <div className="category-icon">{cat.icon}</div>
              <div>
                <h3>{cat.label}</h3>
                <span>{cat.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Top-rated picks loved by our customers.
            </p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            View All ({featuredProducts.length ? '20+' : '...'}) →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Curating top featured items..." />
        ) : error ? (
          <ErrorMessage
            title="Error loading featured items"
            message={error}
            onRetry={fetchFeatured}
            type="danger"
          />
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Store Benefits / Trust Badges */}
      <section
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🚚</div>
          <h4 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Free Shipping</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            On all qualifying orders over $50
          </p>
        </div>
        <div>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🔒</div>
          <h4 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Secure Checkout</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Encrypted payment handling & privacy
          </p>
        </div>
        <div>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>↩️</div>
          <h4 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>30-Day Returns</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Hassle-free money-back guarantee
          </p>
        </div>
        <div>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>💬</div>
          <h4 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>24/7 Dedicated Support</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Fast responses via chat & email
          </p>
        </div>
      </section>
    </div>
  );
}
