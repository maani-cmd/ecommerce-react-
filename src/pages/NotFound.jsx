// src/pages/NotFound.jsx
// Purpose: 404 Error page displayed whenever a user navigates to an invalid or unmapped route.
// Provides a friendly message and a one-click button back to safety.

import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
      <div className="empty-state-box" style={{ maxWidth: '540px' }}>
        <div style={{ fontSize: '5rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
          404
        </div>
        <h2 className="empty-state-title" style={{ marginTop: '1rem' }}>
          Page Not Found
        </h2>
        <p className="empty-state-text">
          Oops! The page you are looking for might have been moved, renamed, or doesn't exist.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            Back to Homepage
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
