# 🌿 FreshMart – Next.js Ecommerce Frontend

A fully-featured ecommerce frontend for a fruits, vegetables & herbs store. Built with **Next.js** and **CSS Modules** (no TypeScript, no Tailwind).

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
freshmart/
├── components/
│   ├── Layout.js          # Wraps all pages (Navbar + Footer + Modals)
│   ├── Navbar.js          # Sticky navbar with cart count & search
│   ├── CartSidebar.js     # Slide-in cart with qty controls & promo code
│   ├── Footer.js          # Full footer with newsletter & marquee
│   ├── ProductCard.js     # Reusable product card with add-to-cart
│   ├── SearchModal.js     # Full-screen search overlay
│   └── Toast.js           # Toast notification system
│
├── context/
│   ├── CartContext.js     # Cart state (add/remove/qty) + localStorage
│   └── WishlistContext.js # Wishlist state + localStorage
│
├── data/
│   └── products.js        # All product data, categories, testimonials
│
├── pages/
│   ├── index.js           # Homepage (hero, categories, featured, testimonials)
│   ├── shop.js            # Shop with filters, sort, search, grid toggle
│   ├── product/[id].js    # Product detail page
│   ├── checkout.js        # Multi-step checkout (cart → delivery → payment)
│   ├── wishlist.js        # Saved items page
│   ├── categories.js      # Category browse page
│   ├── about.js           # About / our story page
│   ├── account.js         # Account dashboard (profile, orders, addresses)
│   ├── 404.js             # Custom 404 page
│   ├── _app.js            # Global providers
│   └── _document.js       # Custom document (Google Fonts)
│
└── styles/
    ├── globals.css         # Design tokens, animations, utility classes
    └── *.module.css        # Per-component scoped styles
```

---

## ✨ Features

- **Homepage** – Animated hero, stats counter, category grid, featured products, promo banner, testimonials
- **Shop Page** – Sidebar filters (category, price range, organic/in-stock), sort, search, grid size toggle
- **Product Detail** – Large emoji display, quantity selector, add to cart/wishlist, tabs (description, nutrition, reviews), related products
- **Cart Sidebar** – Slide-in panel, qty controls, promo code field, free delivery threshold, order summary
- **Search Modal** – Live search with popular chips, instant results
- **Checkout** – 3-step flow: cart review → delivery form → payment (card/UPI/COD) → confirmation
- **Wishlist** – Persisted to localStorage
- **Account** – Profile, order history, addresses, settings tabs
- **Toast Notifications** – Add to cart, wishlist, order placed
- **Animations** – Floating hero elements, scroll-reveal, hover effects, page transitions

---

## 🔌 Connecting Your Backend

All data currently lives in `data/products.js`. To connect a real backend:

1. Replace imports from `../data/products` with API calls using `getServerSideProps` or `getStaticProps`
2. Cart actions in `context/CartContext.js` can be wired to your API
3. Checkout form in `pages/checkout.js` — replace `handlePlaceOrder` with a real POST request
4. Account page — replace mock data with authenticated user API calls

---

## 🎨 Theming

All colours and design tokens are in `styles/globals.css` under `:root`. Change `--green-mid`, `--orange`, etc. to re-theme the entire site instantly.

---

## 📦 Build for Production

```bash
npm run build
npm start
```
