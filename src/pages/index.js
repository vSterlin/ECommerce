import React, {useEffect, useState} from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import styled from "styled-components";

import BackgroundImage from "gatsby-background-image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  background-color: black;
`;

const H1 = styled.h1`
  text-align: center;
  /* font-size: 100px; */
  color: white;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: appear 1s linear forwards;
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
  animation: appear 1s linear forwards;

`;

const LatestProducts = styled.div`
  /* height: 100vh; */
  background-color: whitesmoke;
  padding: 5% 5%;
  /* display: flex;
  justify-content: space-around; */
  text-align: center;
`;

// const DIV = styled.div`
//   border: 1px solid red;
//   height: 100%;
//   width: 100%;
// `;

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  margin-top: 5%;
`;

const SliderCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const H2 = styled.h2`
  text-align: center;
  /* font-size: 100px; */
  color: ${({color}) => color || "white"};
`;


const H2BorderLine = styled.span`
  border-top: 1px solid black;

  width: 80%;
justify-self: center;

`;

const H2Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 0.3fr 1fr;
  width: 100%;
  line-height: 1.5em;

`;

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

      allStripeProduct(sort: { fields: created, order: DESC }, limit: 4, filter: {active: {eq: true}}) {
        edges {
          node {
            name
            id
            description
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
  const length = productArray.length;

  const [width, setWidth] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    })
    return () => {
      window.removeEventListener('resize', () => {})
    }
  }, [])

  const settings = {
    speed: 500,
    slidesToShow: width < 768 ? 1 : 4,
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <Background fluid={image.childImageSharp.fluid}>
        {/* <BackgroundOverlay /> */}
        <H1>
          {" "}
          Sweetest Honey in Los Angeles
          <br />
          Only in <Italic>VS Honey!</Italic>
        </H1>
        <br />
        <StyledLink to="/products">Shop Now</StyledLink>
      </Background>

      <LatestProducts>
        <H2Wrapper>

        <H2BorderLine />

        <H2 color="black"><Italic>New Products</Italic></H2>
        <H2BorderLine />

        </H2Wrapper>
        <StyledSlider {...settings}>
          {productArray.map(({ node }) => {
            return (
                <ProductCard
                  id={node.id}
                  name={node.name}
                  stock={node.metadata.stock}
                  image={node.image[0].childImageSharp.fluid}
                  description={node.description}
                />
            );
          })}
        </StyledSlider>
      </LatestProducts>
    </Layout>
  );
};

export default IndexPage;
