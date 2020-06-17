import React, { useState, useEffect } from "react";



const CartContext = React.createContext({});

const CartProvider = (props) => {

  
  const [cart, setCart] = useState({});

  useEffect(() => {
    const startCart = localStorage.getItem("cart");
    if (startCart !== null) {
      setCart(JSON.parse(startCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const { children } = props;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export { CartProvider };
