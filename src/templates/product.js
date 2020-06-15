import React, { useState, useEffect } from "react";

import { graphql } from "gatsby";

import Layout from "../components/Layout";

import {handleClick} from '../utils/util';

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_e6C9ERAGdcn9rxWZx0QT8TU900WUnFSMpL");

////////////

export const data = graphql`
  query($productId: String) {
    stripePrice(product: { eq: $productId }) {
      product
      id
    }
  }
`;



////////////

const Product = ({ pageContext, data }) => {
  const [cart, setCart] = useState({});
  // const [quantity, setQuantity] = useState(1);

  const addToCart = (item, name) => {
    let newObj = { ...cart };
    if (item in newObj) {
      newObj[item].quantity = newObj[item].quantity + 1;
    } else {
      newObj[item] = {
        quantity: 1,
        name,
      };
    }
    setCart({ ...newObj });
  };

  useEffect(() => {
    const startCart = localStorage.getItem("cart");
    if (startCart !== null) {
      setCart(JSON.parse(startCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Layout>
      <h1>
        ID of {`${pageContext.productName} is ${data.stripePrice.product}`}
      </h1>

      <button
        onClick={() => {
          addToCart(data.stripePrice.id, data.stripePrice.product);
        }}
      >
        Add to Cart
      </button>
      <button role="link" onClick={() => handleClick(cart, stripePromise)}>
        {/* <button role="link" onClick={() => handleClick(data.stripePrice.id)}> */}
        Buy {pageContext.productName}
      </button>
    </Layout>
  );
};

export default Product;
