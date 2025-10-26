"use client";

import { CartProvider } from "../src/state/CartContext";

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
