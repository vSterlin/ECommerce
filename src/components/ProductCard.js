import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import styled from "styled-components";

import Img from "gatsby-image";

import { InfoCircle } from "@styled-icons/boxicons-regular";
import { CloseCircle } from "@styled-icons/ionicons-outline";
import { convertToDollars } from "../utils/util";

const desktopImageSize = "15vw";
const phoneImageSize = "60vw";

const Card = styled.div`
  width: ${desktopImageSize};
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  /* border-radius: 10px; */
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: ${phoneImageSize};

  }
`;

const Image = styled(Img)`
  height: ${desktopImageSize};
  width: ${desktopImageSize};
  position: relative;
  @media only screen and (max-width: 768px) {
    height: ${phoneImageSize};
    width: ${phoneImageSize};
  }
`;

const InfoIcon = styled(InfoCircle)`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 3;
  color: white;
  &:hover {
    color: black;
    background-color: white;
    border-radius: 20px;
  }
`;

const CloseIcon = styled(CloseCircle)`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 3;
  color: white;
  &:hover {
    color: black;
    background-color: white;
    border-radius: 20px;
  }
`;

const CardInfo = styled.div`
  color: black;
  text-align: center;
`;

const ProductName = styled.span`
  font-style: italic;
  margin: 10px 0;
`;

const H3 = styled.h3`
  margin-top: 10px;
  line-height: 25px;
`;

const CardOverlay = styled.div`
  content: "";
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  right: 0;
  width: ${desktopImageSize};
  height: ${desktopImageSize};
  transform: scale(0, 0);


  z-index: 2;
  position: absolute;
  @keyframes slideTopRight {
    from {
      /* height: 0%;
      width: 0%; */
      transform: scale(0, 0);
      border-radius: ${phoneImageSize};
    }
    to {
      /* height: 15vw;
      width: 15vw; */
      transform: scale(1, 1);

      border-radius: 0;
    }
  }

  ${({ info }) =>
    info === true ? "animation: slideTopRight 0.1s linear forwards;" : ""}
    @media only screen and (max-width: 768px) {
      width: ${phoneImageSize};
  height: ${phoneImageSize};
    }
`;

const MoreInfo = styled.div`
  color: white;
  padding: 10%;
  text-align: center;
`;

const GoToProductPage = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
  text-align: center;
  text-decoration: underline;
  &> * {
    color: white;
    &:hover {
    color: grey;
  }
  }

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
      allStripePrice (filter: {active: {eq: true}}){
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
  const [info, setInfo] = useState(false);
  // const [buy, setBuy] = useState(false);
  // const openBuy = () => {
  //   setBuy("opening")
  //   setTimeout(() => {
  //     setBuy('open')
  //   }, 300);
  // };
  // const closeBuy = () => {
  //   setBuy("closing")
  //   setTimeout(() => {
  //     setBuy('closed')
  //   }, 300);
  // };
  useEffect(() => {
    getPrice(props.name, priceArray, usePrice);
  }, []);
  return (
    <Card>
      {!info && <InfoIcon onClick={() => setInfo(!info)} />}
      {info && <CloseIcon onClick={() => setInfo(!info)} />}
      <CardOverlay info={info} >
        <MoreInfo>
          <h4>More about {props.name}</h4>
          <p>{props.description}</p>
          <GoToProductPage><Link to={props.id}>
          Go to Product Page
          </Link>
          </GoToProductPage>

        </MoreInfo>
      </CardOverlay>
      {/* <div onMouseEnter={() => console.log('h')} onMouseLeave={() => console.log('b')} > */}
<div>
      <Image info={info} fluid={props.image}  ></Image>
      </div>
      <CardInfo>
        <H3>
          <ProductName>{props.name}</ProductName>
          <br />${convertToDollars(price)}
          {/* {props.stock === "no" ? " - Out Of Stock" : null} */}
        </H3>

        {/* <Link to={props.id}>More about {props.name}</Link> */}
      </CardInfo>
    </Card>
  );
};

export default ProductCard;
