// src/context/CartContext.jsx
// Purpose: Provides global cart state management using React Context API and useReducer.
// Manages adding, updating, removing items, calculating totals, and persisting cart data in localStorage.

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create the Cart Context
const CartContext = createContext();

// LocalStorage key for saving cart state
const CART_STORAGE_KEY = 'shopease_cart_items_v1';

// Initial state loader: reads persisted items from localStorage with try/catch safeguard
const getInitialCartState = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    }
  } catch (error) {
    console.error('Failed to load cart state from localStorage:', error);
  }
  return { items: [] };
};

// Reducer action types
export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

/**
 * Pure reducer function handling cart state transitions.
 * @param {Object} state - Current cart state { items: [] }
 * @param {Object} action - Action object with type and payload
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        // Product already in cart -> increase quantity
        const updatedItems = state.items.map((item, index) => {
          if (index === existingIndex) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        return { ...state, items: updatedItems };
      }

      // New product -> append with given quantity
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const idToRemove = action.payload.id;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== idToRemove)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      // If updated quantity is 0 or less, automatically remove the item
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id)
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

/**
 * CartProvider component wraps the application tree and exposes cart state & helpers.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialCartState);

  // Sync state to localStorage whenever items change, wrapped in try/catch
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to persist cart items to localStorage:', error);
    }
  }, [state.items]);

  // Action dispatchers for clean component consumption
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, quantity: Number(quantity) }
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { id }
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity: Number(quantity) }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Derived calculations: total item count, subtotal, shipping, and order total
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Free shipping above $50, else $5 flat rate
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.0;
  // Estimated 5% tax
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + shipping + tax;

  const value = {
    cart: state.items,
    totalItems,
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Custom hook to consume the CartContext easily in any component.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
