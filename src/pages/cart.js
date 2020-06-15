import React, { useState, useEffect } from "react";

import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";

import {handleClick} from '../utils/util';

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_e6C9ERAGdcn9rxWZx0QT8TU900WUnFSMpL");



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



  const inc = (item) => {

    let tempCart = {...cart};
    tempCart[item.price].quantity = tempCart[item.price].quantity + 1; 
    setCart(tempCart);

  }
  const dec = (item) => {
   
    let tempCart = {...cart};
    tempCart[item.price].quantity = tempCart[item.price].quantity - 1; 
    setCart(tempCart);

    // const tempCartArray = {...cartArray};
    // tempCartArray[item] = tempItem;
    //setCartArray(tempCartArray);

  }

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

        {cartArray.map((item) => {
          return (
            <li>
              <h2>
                {item.name} - {item.quantity} 
                <button onClick={() => inc(item)}>inc</button>
                <button onClick={() => dec(item)}>dec</button>
              </h2>
            </li>
          );
        })}
      </ul>
      <button role="link" onClick={() => handleClick(cart, stripePromise)}>
        Buy
      </button>
    </Layout>
  );
};

export default Cart;
