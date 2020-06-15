import React, { useState, useEffect } from "react";

import { graphql } from "gatsby";

import Layout from "../components/Layout";

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
      {/* {cart.map(item=> {
      // console.log(item)
      return (
      <div>
        <h2>You are buying {item.quantity} of {item.price}</h2>
        </div>)
    })} */}

      <button
        onClick={() => {
          addToCart(data.stripePrice.id, data.stripePrice.product);
        }}
      >
        Add to Cart
      </button>
      <button role="link" onClick={() => handleClick(cart)}>
        {/* <button role="link" onClick={() => handleClick(data.stripePrice.id)}> */}
        Buy {pageContext.productName}
      </button>
    </Layout>
  );
};

export default Product;
