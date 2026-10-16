# Ethiopian Crafts

A small online store for Ethiopian handmade crafts, built for the Next.js class (App Router, JavaScript, Tailwind CSS).
Customers browse, filter, add to cart and submit an order. There are no payments.

## Run it

```bash
npm install
cp .env.example .env.local   # then set AUTH_SECRET
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Demo accounts: `user@crafts.et / user123` and `admin@crafts.et / admin123`.

## Where each concept is used

| Concept | Where |
|---|---|
| Layout | `src/app/layout.jsx` (root), `src/app/admin/layout.jsx` (nested) |
| Template | `src/app/template.jsx` (fade-in on every navigation) |
| Zustand | `src/lib/cartStore.js` (cart, saved in localStorage) |
| SWR | `src/lib/useProducts.js`, `src/components/AdminOrders.jsx` |
| Route handlers | `src/app/api/products/route.js`, `src/app/api/orders/route.js` |
| Server actions | `src/lib/actions.js` (login, logout, place order, admin updates) |
| Middleware | `src/middleware.js` (login required for checkout, admin role for /admin) |
| Roles | `user` and `admin`, stored in a signed cookie (`src/lib/session.js`) |

## Roles

- Visitor: browse, filter, cart.
- User: everything above, plus checkout and order confirmation.
- Admin: everything above, plus `/admin` to mark products in/out of stock and update order status.

## Notes

- Products and orders live in memory (`src/lib/db.js`) and reset when the server restarts. Product data starts from `src/data/products.js`.
- Product images are SVG placeholders in `public/images`. Replace them with real photos using the same file names or update `image` in the data file.
- Demo passwords are in source for class use only.
