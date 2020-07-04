import React, { useState, useEffect } from "react";

import CartItem from "../components/CartItem";

import { handleClick } from "../utils/util";

import { loadStripe } from "@stripe/stripe-js";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

const stripePromise = loadStripe("pk_test_51H1IPrKfmz5fDZBxVJ83YhYkjrkSHXo7SYyMgzqdWFQ5cqGICNlu0TqBq5priqVi13h3seDoGyKCCR1K4SC8gEg500pC1Tuz5O");



const CartList = ({ context }) => {
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

  const { cart, setCart } = context;
  const [cartArray, setCartArray] = useState([]);
  const [total, setTotal] = useState(0);
  const [location] = useState(useLocation());
  //   useEffect(() => {
  //     let totalItems = 0;
  //     for (const i in cart) {
  //       totalItems += cart[i].quantity;
  //     }
  // setTotal(totalItems)
  //  }, []);

  // useEffect(() => {
  //   setLocation(useLocation()) 

  // }, [])

  useEffect(() => {
    const lineItems = [];
    let totalItems = 0;
    const products = data.allStripeProduct.edges;

    for (const i in cart) {
      for (const j in products) {
        if (products[j].node.name === cart[i].name) {
          lineItems.push({
            price: i,
            quantity: cart[i].quantity,
            name: cart[i].name,
            image: products[j].node.image[0].childImageSharp.fluid,
          });
          totalItems += cart[i].quantity;
        }
      }
    }
    setTotal(totalItems);
    setCartArray([...lineItems]);
  }, [cart, data.allStripeProduct.edges]);

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
    <>
      <h1>{total} Items in your cart:</h1>
      <ul>
        {cartArray.map((item) => {
          return <CartItem item={item} inc={inc} dec={dec} remove={remove} />;
        })}
      </ul>
      {cartArray.length !== 0 && (
        <button role="link" onClick={() => handleClick(cart, stripePromise, location.origin)}>
          Buy
        </button>
      )}
    </>
  );
};

export default CartList;
