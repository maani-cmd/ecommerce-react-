// src/services/api.js
// Purpose: Handles data fetching for products and categories.
// Fetches from the external Fake Store API (https://fakestoreapi.com)
// and seamlessly falls back to local JSON data (src/data/products.json) if the API fails or is offline.

import fallbackProducts from '../data/products.json';

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products.
 * Attempts to load from Fake Store API with a 6-second timeout.
 * If the fetch fails or times out, returns the local fallback products array.
 */
export async function getAllProducts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${BASE_URL}/products`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with HTTP status ${response.status}`);
    }

    const data = await response.json();
    return { data, isFallback: false };
  } catch (error) {
    console.warn('Fake Store API failed or timed out. Using local fallback products.', error.message);
    return { data: fallbackProducts, isFallback: true };
  }
}

/**
 * Fetch a single product by its numerical ID.
 * Falls back to local data if network request fails.
 */
export async function getProductById(id) {
  const numericId = Number(id);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${BASE_URL}/products/${numericId}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with HTTP status ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.id) {
      throw new Error('Product not found in API response');
    }
    return { data, isFallback: false };
  } catch (error) {
    console.warn(`Failed to fetch product #${numericId} from API. Searching fallback data.`, error.message);
    const found = fallbackProducts.find((item) => item.id === numericId);
    if (!found) {
      throw new Error(`Product with ID ${numericId} not found in fallback catalog.`);
    }
    return { data: found, isFallback: true };
  }
}

/**
 * Fetch all unique product categories.
 */
export async function getCategories() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${BASE_URL}/products/categories`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Categories API responded with HTTP status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Categories API failed. Extracting unique categories from fallback data.', error.message);
    const categoriesSet = new Set(fallbackProducts.map((p) => p.category));
    return Array.from(categoriesSet);
  }
}
