// src/pages/OrderConfirmation.jsx
// Purpose: Displays the successful order confirmation screen after checkout.
// Renders the unique Order ID, shipping address, payment method, itemized receipt,
// and offers navigation back to the store.

import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  // If user navigates directly without placing an order, redirect to home
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const { orderId, customer, items, pricing, createdAt } = order;
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="container">
      <div className="confirmation-card">
        {/* Success Icon */}
        <div className="success-check-icon">✓</div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Thank You For Your Order!
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          We've received your order and have sent a confirmation email to{' '}
          <strong>{customer.email}</strong>.
        </p>

        {/* Order Reference */}
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)', display: 'block' }}>
            ORDER REFERENCE NUMBER
          </span>
          <span className="order-badge-id">{orderId}</span>
        </div>

        {/* Itemized Order Summary Box */}
        <div className="order-summary-box">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            Order Details ({formattedDate})
          </h3>

          <div style={{ marginBottom: '1.25rem', fontSize: '0.92rem' }}>
            <p><strong>Deliver To:</strong> {customer.name}</p>
            <p><strong>Address:</strong> {customer.address}, {customer.city}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Payment:</strong> {customer.paymentMethod === 'card' ? 'Credit/Debit Card (Paid)' : 'Cash on Delivery (COD)'}</p>
          </div>

          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Purchased Items:
          </h4>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem' }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0',
                  fontSize: '0.88rem'
                }}
              >
                <span>
                  {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}{' '}
                  <span style={{ color: 'var(--color-text-subtle)' }}>× {item.quantity}</span>
                </span>
                <span style={{ fontWeight: 600 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: '2px dashed var(--color-border)',
              marginTop: '1rem',
              paddingTop: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.1rem',
              fontWeight: 800
            }}
          >
            <span>Total Amount Paid:</span>
            <span style={{ color: 'var(--color-primary)' }}>
              ${pricing.grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Navigation Action */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary btn-lg">
            Continue Shopping →
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
