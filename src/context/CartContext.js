import React, { useState, useEffect } from "react";

const CartContext = React.createContext({});

const CartProvider = (props) => {
  const [total, setTotal] = useState(0);


  const { children } = props;

  return (
    <CartContext.Provider
      value={{
        total,
        setTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export { CartProvider };
