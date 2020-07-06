import React, { useState, useEffect } from "react";
import {graphql, useStaticQuery} from "gatsby";


const CartContext = React.createContext({});

const CartProvider = (props) => {
  const { allStripePrice } = useStaticQuery(graphql`
    query {
      allStripePrice (filter: {active: {eq: true}}){
        edges {
          node {
            id
          }
        }
      }
    }
  `);
  
  const [cart, setCart] = useState({});

  useEffect(() => {
    const startCart = JSON.parse(localStorage.getItem("cart"));
    if (startCart !== null) {
      // for(const i in startCart){
      //   for(const j in allStripePrice.edges){
      //     // if(startCart[i]===allStripePrice.edges[j].node.id){
      //     //   return;
      //     // }
      //     //  console.log('Item in query' + allStripePrice.edges[j].node.id + 'in local' + startCart[i].key);
      //   }
      // }
      const cartArr = allStripePrice.edges.map(({node}) => {
        return node.id;
      }
      )


      Object.keys(startCart).forEach((keyInCart) => {
        const doesInclude = cartArr.includes(keyInCart);
        if(!doesInclude) delete startCart[keyInCart];
      })

      setCart(startCart);
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
