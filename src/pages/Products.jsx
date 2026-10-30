// src/pages/Products.jsx
// Purpose: Catalog listing page with search, category filtering, price sorting,
// dynamic URL query sync, and responsive product grid display.

import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getAllProducts, getCategories } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // Sync category filter with URL query parameter (e.g. ?category=electronics)
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  // State for search box and price sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, catRes] = await Promise.all([
        getAllProducts(),
        getCategories()
      ]);
      setProducts(prodRes.data);
      setIsFallback(prodRes.isFallback);
      setCategories(catRes);
    } catch (err) {
      setError(err.message || 'Failed to fetch catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update URL search params when category changes
  const handleCategoryChange = (cat) => {
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort products using useMemo for high performance
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // 1. Category Filter
        const matchesCategory =
          categoryParam === 'all' ||
          p.category.toLowerCase() === categoryParam.toLowerCase();

        // 2. Search Query Filter
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          query === '' ||
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // 3. Sorting by Price / Rating / Name
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return (b.rating?.rate || 0) - (a.rating?.rate || 0);
          case 'name-asc':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [products, categoryParam, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="section-title">Product Catalog</h1>
        <p className="section-subtitle">
          Explore our wide collection of high-quality apparel, fine jewelry, and cutting-edge tech.
        </p>
      </div>

      {/* Fallback Banner if API was down */}
      {isFallback && (
        <ErrorMessage
          title="Notice"
          message="Showing verified offline catalog products due to remote API unavailability."
          type="warning"
        />
      )}

      {/* Controls Bar: Search, Category Filter, and Price Sort */}
      <div className="controls-bar">
        {/* Search Box */}
        <div className="search-box-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by product name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter & Sort Dropdowns */}
        <div className="filters-group">
          {/* Category Dropdown */}
          <select
            className="custom-select"
            value={categoryParam}
            onChange={(e) => handleCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <select
            className="custom-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Results Bar */}
      <div className="results-count-bar">
        <span>
          Showing <strong>{filteredProducts.length}</strong> of{' '}
          <strong>{products.length}</strong> products
          {categoryParam !== 'all' && ` in "${categoryParam}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(categoryParam !== 'all' || searchQuery || sortBy !== 'default') && (
          <button
            onClick={clearAllFilters}
            className="btn btn-sm btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            Reset Filters ✕
          </button>
        )}
      </div>

      {/* Content Rendering: Loading, Error, Empty, or Product Grid */}
      {loading ? (
        <LoadingSpinner message="Fetching store catalog..." />
      ) : error ? (
        <ErrorMessage
          title="Error loading catalog"
          message={error}
          onRetry={loadData}
          type="danger"
        />
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-state-icon">🔎</div>
          <h2 className="empty-state-title">No products found</h2>
          <p className="empty-state-text">
            No products match your current search and filter criteria. Try searching with different keywords.
          </p>
          <button onClick={clearAllFilters} className="btn btn-primary">
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
