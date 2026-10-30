// src/pages/Checkout.jsx
// Purpose: Checkout page collecting customer shipping and payment information.
// Implements client-side validation, displays an itemized order summary,
// and submits the order by clearing the cart and navigating to the confirmation page.

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, subtotal, shipping, tax, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Form field state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card'
  });

  // Validation error messages
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user accesses checkout directly with an empty cart
  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="empty-state-box">
          <div className="empty-state-icon">🛒</div>
          <h2 className="empty-state-title">Your Cart is Empty</h2>
          <p className="empty-state-text">
            You need items in your cart to proceed with checkout.
          </p>
          <Link to="/products" className="btn btn-primary">
            Browse Catalog →
          </Link>
        </div>
      </div>
    );
  }

  // Handle standard input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if user starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate all required fields
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-+()]{7,16}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits)';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Shipping address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Please provide a complete street address';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'Please enter a valid city';
    }

    // Payment method
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please choose a payment method';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      return;
    }

    setIsSubmitting(true);

    // Build the order summary object
    const orderData = {
      orderId: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
      customer: { ...formData },
      items: [...cart],
      pricing: {
        subtotal,
        shipping,
        tax,
        grandTotal
      },
      createdAt: new Date().toISOString()
    };

    // Simulate order placement delay, then clear cart & navigate
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate('/order-confirmation', { state: { order: orderData } });
    }, 800);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1 className="section-title">Checkout</h1>
      <p className="section-subtitle">
        Enter your shipping details and select your preferred payment method.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="checkout-layout">
          {/* Left Column: Form Details */}
          <div className="checkout-card">
            <h3>1. Shipping Information</h3>
            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group col-full">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="form-error-msg">{errors.name}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
              </div>

              {/* Street Address */}
              <div className="form-group col-full">
                <label htmlFor="address" className="form-label">Street Address *</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="123 Academic Way, Apt 4B"
                  className={`form-input ${errors.address ? 'is-invalid' : ''}`}
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="form-error-msg">{errors.address}</span>}
              </div>

              {/* City */}
              <div className="form-group col-full">
                <label htmlFor="city" className="form-label">City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="New York"
                  className={`form-input ${errors.city ? 'is-invalid' : ''}`}
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="form-error-msg">{errors.city}</span>}
              </div>
            </div>

            {/* Payment Method */}
            <h3 style={{ marginTop: '2.5rem' }}>2. Payment Method</h3>
            <div className="payment-options-group">
              <label
                className={`payment-radio-label ${
                  formData.paymentMethod === 'card' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                <span>💳 Credit / Debit Card</span>
              </label>

              <label
                className={`payment-radio-label ${
                  formData.paymentMethod === 'cod' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <span>💵 Cash on Delivery</span>
              </label>
            </div>
            {errors.paymentMethod && (
              <span className="form-error-msg" style={{ display: 'block', marginTop: '0.5rem' }}>
                {errors.paymentMethod}
              </span>
            )}
          </div>

          {/* Right Column: Order Review Summary */}
          <div className="summary-card">
            <h3>Order Review</h3>

            {/* Items quick list */}
            <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1.25rem' }}>
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-preview">
                  <div>
                    <p className="preview-item-name">{item.title}</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
                      Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <strong style={{ color: 'var(--color-text-main)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>
                {shipping === 0 ? (
                  <strong style={{ color: 'var(--color-success)' }}>FREE</strong>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax (5%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Total to Pay:</span>
              <span style={{ color: 'var(--color-primary)' }}>
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block btn-lg"
              style={{ marginTop: '1.75rem' }}
            >
              {isSubmitting ? 'Processing Order...' : `Place Order ($${grandTotal.toFixed(2)})`}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-subtle)', marginTop: '0.75rem' }}>
              🔒 256-bit Secure Encryption • Instant Order Confirmation
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
