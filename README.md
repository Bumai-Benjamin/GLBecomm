# GLBecom — Static Ecommerce Demo


This repository is a small React + Vite ecommerce demo with a hero page (Three.js animated background), store, contact page, and a mini-cart.

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

