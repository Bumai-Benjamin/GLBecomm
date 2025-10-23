# Give Love Back — Ecommerce Demo


This is a minimal, high-contrast ecommerce experience built with React + Vite. It features a typographic hero with a subtle particle background, an auto-rotating gallery, a clean store grid, and a lightweight mini-cart.

Run locally
-----------
1. Install dependencies:

```
npm install
```

2. Start dev server:

```
npm run dev
```

Open http://localhost:5173

Design tokens
-------------
Global design tokens live in `src/styles.css` under `:root`:

- `--bg`, `--fg`, `--muted`, `--line`, `--card`
- `--accent`, `--accent-contrast`
- `--radius`, `--shadow-*`, `--trans-*`

Adjusting these will propagate through the app’s components. Static pages (`store.html`, `contact.html`) use the mirrored tokens in the root `styles.css`.

Assets
------
Place product images inside the `assets/` folder at the repository root. The app expects these filenames:

- `bestipink.jpg`
- `bestiepurple.jpg`
- `classicblack.jpg`
- `classicwhite.jpg`
- `totebag.jpg`
- `truckerblack.jpg`
- `truckerwhite.jpg`

If some files are missing the app will still run but product images will show as broken images. Add the image files you already have to the `assets/` folder.

Notes
-----
- The cart state is stored in `localStorage`.
- Checkout/payment is not implemented — it's a demo.
 - Page transitions are powered by Framer Motion; the rotating gallery uses Swiper.

