import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import Img from "gatsby-image";
import { convertToDollars } from "../utils/util";

const Card = styled.div`
  width: 15vw;
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const Image = styled(Img)`
  height: 15vw;
  width: 15vw;
  position: relative;
`;

const InfoIcon = styled.div`
  /* width: 20px;
  height: 20px; */
  background-color: white;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
`;

const CardInfo = styled.div`
  background-color: black;
  color: white;
  margin-top: 20px;
  text-align: center;
`;

const getPrice = (name, priceArray, setState) => {
  priceArray.forEach(({ node }) => {
    if (node.product.name === name) {
      setState(node.unit_amount);
    }
  });
};
const ProductCard = (props) => {
  const { allStripePrice } = useStaticQuery(graphql`
    query {
      allStripePrice {
        edges {
          node {
            product {
              name
            }
            unit_amount
          }
        }
      }
    }
  `);

  const priceArray = allStripePrice.edges;
  const [price, usePrice] = useState(0);
  useEffect(() => {
    getPrice(props.name, priceArray, usePrice);
  }, []);
  return (
    <Card>
      <InfoIcon>i</InfoIcon>
      <Image fluid={props.image} />
      <CardInfo>
        <h1>
          {props.name} - ${convertToDollars(price)}
          {/* {props.stock === "no" ? " - Out Of Stock" : null} */}
        </h1>

        <Link to={props.id}>More about {props.name}</Link>
      </CardInfo>
    </Card>
  );
};

export default ProductCard;
