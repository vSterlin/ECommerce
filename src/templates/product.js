import React, { useState, useEffect } from "react";

import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

import Layout from "../components/Layout";

////////////

export const data = graphql`
  query($productId: String) {
    stripePrice(product: { id: { eq: $productId } }) {
      product {
        name
        id
        metadata {
          stock
        }
      }
      id
    }

    stripeProduct(id: { eq: $productId }) {
      image: localFiles {
              childImageSharp {
                fluid(quality: 10) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
    }
  }
`;

const Image = styled(Img)`
  width: 100px;
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

  ///////////////////////////

  useEffect(() => {

    const startCart = localStorage.getItem("cart");
    if (startCart !== null) {
      setCart(JSON.parse(startCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  ///////////////////////////

  return (
    <Layout>
      <Image fluid={data.stripeProduct.image[0].childImageSharp.fluid} />
      <h1>{pageContext.productName}</h1>
      {data.stripePrice.product.metadata.stock === "no" ? (
        <button disabled>Cannot Add to Cart</button>
      ) : (
        <button
          onClick={() => {
            addToCart(data.stripePrice.id, data.stripePrice.product.name);
          }}
        >
          Add to Cart
        </button>
      )}

      <Link to="/cart">
        <button>Go to Cart</button>
      </Link>
    </Layout>
  );
};

export default Product;
