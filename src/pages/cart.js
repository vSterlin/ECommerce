import React, { useState, useEffect } from "react";

import Layout from "../components/Layout";

import { handleClick } from "../utils/util";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_e6C9ERAGdcn9rxWZx0QT8TU900WUnFSMpL");

const Cart = () => {

  const [cart, setCart] = useState({});
  const [cartArray, setCartArray] = useState([]);

  useEffect(() => {
    const startCart = localStorage.getItem("cart");
    if (startCart !== null) {
      setCart(JSON.parse(startCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const lineItems = [];

    for (const i in cart) {

          lineItems.push({
            price: i,
            quantity: cart[i].quantity,
            name: cart[i].name,

      });
    }
    setCartArray([...lineItems]);
  }, [cart]);

  const inc = (item) => {
    let tempCart = { ...cart };
    tempCart[item.price].quantity = tempCart[item.price].quantity + 1;
    setCart(tempCart);
  };
  const dec = (item) => {
    let tempCart = { ...cart };
    if (tempCart[item.price].quantity > 1) {
      tempCart[item.price].quantity = tempCart[item.price].quantity - 1;
      setCart(tempCart);
    }
  };
  const remove = (item) => {
    let tempCart = { ...cart };
    delete tempCart[item.price];
    setCart(tempCart);
  };

  return (
    <Layout>
      <h1>Items in your cart:</h1>
      <ul>
        {cartArray.map((item) => {
          return (
            <li>
              <h2>
                {item.name} - {item.quantity}
                <button onClick={() => inc(item)}>+</button>
                <button onClick={() => dec(item)}>-</button>
                <button onClick={() => remove(item)}>x</button>
              </h2>
            </li>
          );
        })}
      </ul>
      {cartArray.length !== 0 && (
        <button role="link" onClick={() => handleClick(cart, stripePromise)}>
          Buy
        </button>
      )}
    </Layout>
  );
};

export default Cart;
