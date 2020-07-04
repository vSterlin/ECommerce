import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import styled from "styled-components";

import BackgroundImage from "gatsby-background-image";

import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

const Background = styled(BackgroundImage)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 10%;
  background-attachment: fixed;
`;

const H1 = styled.h1`
  color: white;
  text-align: center;
  /* font-size: 100px; */
`;

const Italic = styled.span`
  font-style: italic;
`;

const StyledLink = styled(Link)`
color: white;
text-decoration: none;
border: 2px solid white;
padding: 15px 20px;
&:hover {
  transform: scale(1.05, 1.05);

}

`;

const LatestProducts = styled.div`
    /* height: 100vh; */
    background-color: whitesmoke;
    padding: 5% 5%;
    display: flex;
    justify-content: space-around;
`;

// const DIV = styled.div`
//   border: 1px solid red;
//   height: 100%;
//   width: 100%;
// `;


const IndexPage = () => {
  const { image, allStripeProduct, allStripePrice } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "background.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      allStripeProduct (sort:{ fields: created, order: DESC}, limit: 4){
    edges {
      node {
        name
        id
        metadata {
          stock
        }
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
const productArray = allStripeProduct.edges;


  return (
    <Layout>
      <Background fluid={image.childImageSharp.fluid}>
        {/* <BackgroundOverlay /> */}
<H1>  Sweetest Honey in Los Angeles
  <br />Only in <Italic>VS Honey!</Italic></H1><br />
        <StyledLink to="/products">
          Shop Now
        </StyledLink>

      </Background>

      <LatestProducts>
          {productArray.map(({node}) => {
            return (            <ProductCard
              id={node.id}
              name={node.name}
              stock={node.metadata.stock}
              image={node.image[0].childImageSharp.fluid}
              
            />);
          })}
      </LatestProducts>
    </Layout>
  );
};

export default IndexPage;
