// src/components/LoadingSpinner.jsx
// Purpose: Reusable loading indicator displayed during asynchronous data fetching.

import React from 'react';

export default function LoadingSpinner({ message = 'Loading products...' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{message}</p>
    </div>
  );
}
