// src/pages/Cart.jsx
// Purpose: Shopping cart page displaying current items in cart,
// quantity modifiers, item removal, cost summary calculations,
// empty state notification, and navigation to checkout.

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cart,
    totalItems,
    subtotal,
    shipping,
    tax,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  // If cart is empty, show modern empty state view
  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="empty-state-box">
          <div className="empty-state-icon">🛒</div>
          <h2 className="empty-state-title">Your Cart is Empty</h2>
          <p className="empty-state-text">
            Looks like you haven't added anything to your cart yet. Explore our catalog and find something you love!
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
        <div>
          <h1 className="section-title">Shopping Cart</h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Review your items and proceed to secure checkout ({totalItems} {totalItems === 1 ? 'item' : 'items'}).
          </p>
        </div>
        <button
          onClick={clearCart}
          className="btn btn-sm btn-danger"
          title="Clear all items from your cart"
        >
          🗑️ Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        {/* Left Column: Cart Items Table */}
        <div className="cart-table-card">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const itemTotal = (item.price * item.quantity).toFixed(2);
                return (
                  <tr key={item.id}>
                    {/* Product info */}
                    <td>
                      <div className="cart-item-info">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart-item-thumb"
                        />
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="cart-item-title"
                            style={{ display: 'block' }}
                          >
                            {item.title}
                          </Link>
                          <span className="cart-item-cat">{item.category}</span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td style={{ fontWeight: 600 }}>
                      ${Number(item.price).toFixed(2)}
                    </td>

                    {/* Quantity Selector */}
                    <td>
                      <div className="quantity-control" style={{ transform: 'scale(0.9)' }}>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          className="qty-input"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val)) updateQuantity(item.id, val);
                          }}
                          aria-label="Quantity"
                        />
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Line Total */}
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      ${itemTotal}
                    </td>

                    {/* Remove Action */}
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                        title="Remove item from cart"
                        aria-label={`Remove ${item.title}`}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Column: Order Summary */}
        <div className="summary-card">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping:</span>
            <span>
              {shipping === 0 ? (
                <strong style={{ color: 'var(--color-success)' }}>FREE</strong>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Estimated Sales Tax (5%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          {subtotal < 50 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', margin: '0.5rem 0' }}>
              💡 Add ${(50 - subtotal).toFixed(2)} more to qualify for FREE shipping!
            </p>
          )}

          <div className="summary-total">
            <span>Grand Total:</span>
            <span style={{ color: 'var(--color-primary)' }}>
              ${grandTotal.toFixed(2)}
            </span>
          </div>

          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-block btn-lg"
            >
              Proceed to Checkout →
            </button>
            <Link
              to="/products"
              className="btn btn-secondary btn-block"
              style={{ textAlign: 'center' }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
