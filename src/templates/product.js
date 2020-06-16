import React, { useState, useEffect } from "react";

import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";

////////////

export const data = graphql`
  query($productId: String) {
    stripePrice(product: { id: { eq: $productId } }) {
      product{
        name
      }
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
       {pageContext.productName}
      </h1>

      <button
        onClick={() => {
          addToCart(data.stripePrice.id, data.stripePrice.product.name);
        }}
      >
        Add to Cart
      </button>
      <Link to="/cart">
        <button>Go to Cart</button>
      </Link>
    </Layout>
  );
};

export default Product;
