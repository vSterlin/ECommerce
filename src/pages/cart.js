import React from "react";


import Layout from "../components/Layout";
import CartList from "../components/CartList";

import CartContext from "../context/CartContext";




const Cart = () => {

  // const [cart, setCart] = useState({});
  // const [cartArray, setCartArray] = useState([]);
  // const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   const startCart = localStorage.getItem("cart");
  //   let totalItems = 0;
  //   if (startCart !== null) {
  //     const arr = JSON.parse(startCart);
  //     setCart(arr);
  //     for (const i in arr) {
  //       totalItems += arr[i].quantity;
  //     }
  //   }

  //   setTotal(totalItems);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   const lineItems = [];
  //   let totalItems = 0;
  //   for (const i in cart) {
  //     data.allStripeProduct.edges.forEach(({ node }) => {
  //       if (node.name === cart[i].name) {
  //         lineItems.push({
  //           price: i,
  //           quantity: cart[i].quantity,
  //           name: cart[i].name,
  //           image: node.image[0].childImageSharp.fluid,
  //         });
  //         totalItems += cart[i].quantity;
  //       }
  //     });
  //   }
  //   setTotal(totalItems);
  //   setCartArray([...lineItems]);
  // }, [cart]);

  // const inc = (item) => {
  //   let tempCart = { ...cart };
  //   tempCart[item.price].quantity = tempCart[item.price].quantity + 1;
  //   setCart(tempCart);
  // };
  // const dec = (item) => {
  //   let tempCart = { ...cart };
  //   if (tempCart[item.price].quantity > 1) {
  //     tempCart[item.price].quantity = tempCart[item.price].quantity - 1;
  //     setCart(tempCart);
  //   }
  // };
  // const remove = (item) => {
  //   let tempCart = { ...cart };
  //   delete tempCart[item.price];
  //   setCart(tempCart);
  // };

  return (
    <CartContext.Consumer>
      {(context) => (
        <Layout>
          <CartList context={context}/>
          {/* <h1>{total} Items in your cart:</h1>
          <ul>
            {cartArray.map((item) => {
              return (
                <CartItem item={item} inc={inc} dec={dec} remove={remove} />
              );
            })}
          </ul>
          {cartArray.length !== 0 && (
            <button
              role="link"
              onClick={() => handleClick(cart, stripePromise)}
            >
              Buy
            </button>
          )} */}
        </Layout>
      )}
    </CartContext.Consumer>
  );
};

export default Cart;
