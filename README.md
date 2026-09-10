# Éclat Atelier — Perfume Decant Store

A premium, responsive front-end e-commerce website for designer and niche fragrance decants.

## Included
- Responsive luxury editorial design
- Product catalogue with 8 demo fragrances
- 2ml / €8, 5ml / €20, 10ml / €30 pricing
- Designer / niche / scent-profile filters
- Search
- Sorting
- Quick-view modal
- Wishlist
- Persistent cart using localStorage
- Quantity controls and remove item
- Cart subtotal and free-shipping threshold
- Checkout form with validation
- Demo order-success flow
- Newsletter signup UI
- FAQ accordion
- Mobile navigation
- Keyboard Escape handling
- No external JavaScript dependencies

## Run
Open `index.html` in a browser, or serve the folder with any static web server.

## Important production note
The checkout is intentionally a front-end demo. It does NOT process real card payments or create real shipping orders.

For production:
1. Add a backend/API (Node/Express, PHP, Python, Java/Spring, etc.).
2. Store products/orders in a database.
3. Integrate Stripe Checkout/Payment Element or PayPal.
4. Add server-side stock, order, tax and shipping calculations.
5. Add transactional email.
6. Add legal pages: Terms, Privacy, Cookies, Returns and Shipping.
7. Replace demo fragrance names with your actual authenticated inventory and supplier/brand information.
8. Add analytics, consent management and error monitoring.
