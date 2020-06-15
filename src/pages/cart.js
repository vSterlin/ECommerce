import React, { useState, useEffect } from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_e6C9ERAGdcn9rxWZx0QT8TU900WUnFSMpL");

const handleClick = async (cart) => {
  // When the customer clicks on the button, redirect them to Checkout.
  const lineItems = [];
  for (const i in cart) {
    lineItems.push({ price: i, quantity: cart[i].quantity });
  }

  // console.log(lineItems);

  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems,
    mode: "payment",
    successUrl: "https://example.com/success",
    cancelUrl: "http://localhost:8000",
    billingAddressCollection: "required",
    shippingAddressCollection: {
      allowedCountries: ["US"],
    },
  });

  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
};

const Cart = () => {
  const data = useStaticQuery(graphql`
    query {
      allStripeProduct {
        edges {
          node {
            name
            id
            metadata {
              stock
            }
          }
        }
      }
    }
  `);

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
      data.allStripeProduct.edges.forEach(({ node }) => {
        if (node.id === cart[i].name) {
          lineItems.push({
            price: i,
            quantity: cart[i].quantity,
            name: node.name,
          });
        }
      });
      // lineItems.push({price: i, quantity: cart[i].quantity, name: cart[i].name})
    }
    setCartArray([...lineItems]);
  }, [cart]);

  return (
    <Layout>
      <h1>Your cart is</h1>
      <ul>
        {/* {
        cartArray.forEach(cartItem => {
      (data.allStripeProduct.edges).forEach(({node}) => {
          if(cartItem.name===node.id){
            console.log(node.name)
          }
        })
      })}
       */}

        {console.log(cartArray)}
        {cartArray.map((item) => {
          return (
            <li>
              <h2>
                {item.quantity} of {item.name}
              </h2>
            </li>
          );
        })}
      </ul>
      <button role="link" onClick={() => handleClick(cart)}>
        Buy
      </button>
    </Layout>
  );
};

export default Cart;
