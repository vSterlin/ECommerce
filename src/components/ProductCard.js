import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import Img from "gatsby-image";

import { InfoCircle } from "@styled-icons/boxicons-regular"
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
  margin: 0 auto;
`;

const Image = styled(Img)`
  height: 15vw;
  width: 15vw;
  position: relative;
`;

const InfoIcon = styled(InfoCircle)`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  color: white;
  &:hover {
    color: black;
    background-color: white;
  }
  border-radius: 100px;
  &::after {
    content: 'x';
    background-color: red;
    z-index: 10;
    width: 100px;
  height: 100px;
  position: absolute;
  right: 10px;
  top: 10px;
  display: block;
  }
`;

const CardInfo = styled.div`
  background-color: grey;
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
      <InfoIcon />
      <Image fluid={props.image} />
      <CardInfo>
        <h3>
          {props.name}<br />${convertToDollars(price)}
          {/* {props.stock === "no" ? " - Out Of Stock" : null} */}
        </h3>

        <Link to={props.id}>More about {props.name}</Link>
      </CardInfo>
    </Card>
  );
};

export default ProductCard;
