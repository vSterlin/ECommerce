import React, { useState, useEffect } from "react";

import Img from "gatsby-image";

import Layout from "../components/Layout";
import CartItem from "../components/CartItem";

import CartContext from "../context/CartContext";

import { handleClick } from "../utils/util";

import { loadStripe } from "@stripe/stripe-js";
import { useStaticQuery, graphql } from "gatsby";

const stripePromise = loadStripe("pk_test_e6C9ERAGdcn9rxWZx0QT8TU900WUnFSMpL");

const Cart = () => {
  const data = useStaticQuery(graphql`
    query {
      allStripeProduct {
        edges {
          node {
            name
            image: localFiles {
              childImageSharp {
                fluid(quality: 10) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  const [cart, setCart] = useState({});
  const [cartArray, setCartArray] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const startCart = localStorage.getItem("cart");
    let totalItems = 0;
    if (startCart !== null) {
      const arr = JSON.parse(startCart);
      setCart(arr);
      for (const i in arr) {
        totalItems += arr[i].quantity;
      }
    }

    setTotal(totalItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const lineItems = [];
    let totalItems = 0;
    for (const i in cart) {
      data.allStripeProduct.edges.forEach(({ node }) => {
        if (node.name === cart[i].name) {
          lineItems.push({
            price: i,
            quantity: cart[i].quantity,
            name: cart[i].name,
            image: node.image[0].childImageSharp.fluid,
          });
          totalItems += cart[i].quantity;
        }
      });
    }
    setTotal(totalItems);
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
          <h1>{total} Items in your cart:</h1>
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
          )}
        </Layout>
  );
};

export default Cart;
