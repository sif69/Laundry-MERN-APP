import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  // Helper to get the right key
  const getCartKey = () => auth?.user?._id ? `cart_${auth.user._id}` : "cart_guest";

  useEffect(() => {
    // Load cart for current user
    const cartKey = getCartKey();
    let existingCartItem = localStorage.getItem(cartKey);
    setCart(existingCartItem ? JSON.parse(existingCartItem) : []);
    // Optionally, clear the old generic cart
    localStorage.removeItem("cart");
  // eslint-disable-next-line
  }, [auth?.user?._id, getCartKey]);

  useEffect(() => {
    // Save cart for current user
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, auth?.user?._id]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };