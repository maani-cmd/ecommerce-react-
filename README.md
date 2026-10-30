# 🛍️ ShopEase — Modern React E-Commerce Web Application

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.28.0-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A complete, responsive, full-featured E-Commerce web application developed as a university term project. Built with **React.js + Vite**, **React Router v6**, **Context API with `useReducer`** for predictable global state management, and custom **mobile-friendly plain CSS** without bloated external UI libraries.

---

## 🔗 Project Links

- **Live Demo Link:** `[Insert Your Vercel / Netlify URL here, e.g., https://ecommerce-react.vercel.app]`
- **GitHub Repository:** `[Insert Your GitHub URL here, e.g., https://github.com/your-username/ecommerce-react]`

---

## ✨ Features Overview

### 1. 🏠 Home Page
- **Hero Promotional Banner:** High-impact call-to-action with navigation shortcuts.
- **Category Navigation Cards:** Quick-access links to filter by *Men's Clothing*, *Women's Clothing*, *Electronics*, and *Jewelry*.
- **Featured Products Section:** Showcases top-rated products with real-time rating stars.
- **Store Trust Badges:** Highlights free shipping, secure checkout, 30-day money-back guarantee, and customer support.

### 2. 📦 Products Catalog (`/products`)
- **Responsive Product Grid:** Dynamic auto-fit cards displaying product image, category, title, rating, price, and quick "Add to Cart" button.
- **Multi-Factor Filtering & Search:**
  - Real-time text search across product titles and descriptions.
  - Category dropdown filter synced bi-directionally with URL query parameters (`?category=electronics`).
  - Price sorting: *Price: Low to High*, *Price: High to Low*, *Highest Rated*, and *Alphabetical (A-Z)*.
- **Robust Network Handling:** Fetches live products from the [Fake Store API](https://fakestoreapi.com/products). If offline or unreachable, seamlessly switches to an internal catalog fallback (`src/data/products.json`) with an informative status banner.
- **Empty & Loading States:** Interactive loading spinner and helpful "No products found" reset screen.

### 3. 🔍 Product Detail View (`/product/:id`)
- Dynamic routing via React Router `useParams()`.
- Breadcrumb navigation for easy backward traversal.
- High-resolution product image, descriptive text, category badge, and customer review count.
- Interactive quantity increment/decrement selector.
- "Add to Cart" with visual feedback and "Buy Now" instant checkout button.

### 4. 🛒 Shopping Cart (`/cart`)
- Clean itemized table showing thumbnail, product title, unit price, quantity modifier (`+` / `-`), line subtotal, and remove button.
- Live cost breakdown: Subtotal, dynamic free shipping calculation (free over $50), 5% estimated tax, and Grand Total.
- Clear cart button to empty all items with a single click.
- Friendly empty-cart state with a direct button back to shopping.

### 5. 💳 Checkout & Validation (`/checkout`)
- Comprehensive checkout form:
  - Full Name (minimum 3 characters)
  - Email Address (RFC-compliant email regex)
  - Phone Number (international phone validation)
  - Street Address & City
  - Payment Method (Credit/Debit Card or Cash on Delivery)
- Instant client-side validation error indicators.
- Live order preview sidebar summarizing selected products and final payable amount.
- On submit: generates a unique Order ID (`ORD-XXXXXX-XXX`), safely clears the cart via `clearCart()`, and navigates to the confirmation page.

### 6. 🎉 Order Confirmation (`/order-confirmation`)
- Celebratory confirmation screen with success checkmark.
- Displays unique Order Reference Number, estimated delivery recipient, shipping address, and chosen payment method.
- Itemized purchase receipt and "Continue Shopping" button.

### 7. 🧭 Global Navigation & Footer
- Sticky responsive navbar with brand logo and mobile hamburger drawer.
- Live animated cart count badge updated instantly via Context API.
- Comprehensive footer with project details, category shortcuts, and academic credits.

### 8. 🛡️ 404 Page & Fallbacks
- Dedicated 404 Not Found page for invalid routes.
- Cart state automatically saved to and retrieved from `localStorage` inside robust `try/catch` blocks.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18 (JavaScript) | Component-based UI library |
| **Build Tool** | Vite 5 | Instant HMR and optimized production bundling |
| **Routing** | React Router DOM v6 | Client-side routing, route params, query sync |
| **State Management** | Context API + `useReducer` | Global predictable cart state & actions |
| **Styling** | Plain CSS3 | Modern CSS variables, flexbox, CSS grid, 100% responsive |
| **Data Source** | Fake Store API | REST API (`https://fakestoreapi.com/products`) |
| **Offline Fallback** | Local JSON (`products.json`) | Fallback data layer in case API fails |
| **Persistence** | Browser `localStorage` | Preserves cart across page refreshes |
| **Deployment** | Vercel (`vercel.json`) | SPA client-side rewrite configuration |

---

## 📁 Project Folder Structure

```
ecommerce-react/
├── docs/
│   ├── REPORT.md              # Complete formal academic project report
│   └── VIVA_NOTES.md          # Viva questions, concepts & defense preparation
├── public/                    # Static public assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ErrorMessage.jsx   # Error & offline fallback banner
│   │   ├── Footer.jsx         # Global footer
│   │   ├── HeroBanner.jsx     # Home promotional banner
│   │   ├── LoadingSpinner.jsx # Data fetching spinner
│   │   ├── Navbar.jsx         # Header navigation with live cart badge
│   │   └── ProductCard.jsx    # Catalog product card item
│   ├── context/
│   │   └── CartContext.jsx    # Context API + useReducer + localStorage sync
│   ├── data/
│   │   └── products.json      # Offline fallback product data
│   ├── pages/                 # Full-page route views
│   │   ├── Cart.jsx           # Cart review & quantity editor
│   │   ├── Checkout.jsx       # Checkout form with client validation
│   │   ├── Home.jsx           # Homepage with hero & categories
│   │   ├── NotFound.jsx       # 404 error page
│   │   ├── OrderConfirmation.jsx # Post-checkout receipt
│   │   ├── ProductDetail.jsx  # /product/:id view
│   │   └── Products.jsx       # Search, filter, and sort catalog
│   ├── services/
│   │   └── api.js             # API service with timeout & fallback logic
│   ├── styles/
│   │   └── main.css           # Plain CSS responsive design system
│   ├── App.jsx                # Route definitions & layout shell
│   └── main.jsx               # Application mount point
├── .gitignore                 # Files ignored by Git
├── index.html                 # Single HTML entry page
├── package.json               # Dependencies & build scripts
├── vercel.json                # Vercel SPA routing rewrite rule
├── vite.config.js             # Vite compiler configuration
└── README.md                  # Project overview documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have **Node.js** (v18 or newer) and **npm** installed on your system.

### Installation Steps

1. **Clone or Download the Project:**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-react
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

4. **Build for Production:**
   ```bash
   npm run build
   ```
   This generates an optimized static production bundle in the `/dist` directory.

5. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions (Vercel)

This project includes a pre-configured `vercel.json` file to ensure that all client-side routes (like `/products`, `/cart`, and `/checkout`) properly route to `index.html` on browser refresh.

### Deploying via Vercel Web Dashboard (Simplest):
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) using your GitHub account.
3. Click **"Add New..."** → **"Project"**.
4. Select your `ecommerce-react` repository from the list.
5. In **Framework Preset**, select **Vite**.
6. Keep the default settings (`Build Command: npm run build`, `Output Directory: dist`).
7. Click **"Deploy"**. Your live URL will be ready in under 1 minute!

---

## 📖 University Submission & Viva Defense
For your project submission and hard copy documentation, please review:
- [`docs/REPORT.md`](file:///c:/Users/hasee/Downloads/maam%20samra%20project/docs/REPORT.md): Complete project report ready for printing.
- [`docs/VIVA_NOTES.md`](file:///c:/Users/hasee/Downloads/maam%20samra%20project/docs/VIVA_NOTES.md): Comprehensive viva defense guide with 15 questions and plain-language concept breakdowns.
