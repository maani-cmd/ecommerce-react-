// src/components/ErrorMessage.jsx
// Purpose: Reusable alert component for rendering API error messages,
// network failure alerts, and fallback notifications with an optional retry button.

import React from 'react';

export default function ErrorMessage({
  title = 'Unable to connect to the store server',
  message = 'We encountered an issue fetching live data. Showing fallback products.',
  onRetry,
  type = 'warning'
}) {
  const alertClass = type === 'danger' ? 'alert-banner alert-danger' : 'alert-banner alert-warning';

  return (
    <div className={alertClass} role="alert">
      <div>
        <strong>⚠️ {title}: </strong>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-secondary">
          Retry
        </button>
      )}
    </div>
  );
}
