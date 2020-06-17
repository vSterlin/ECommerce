import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import styled from "styled-components";

import BackgroundImage from "gatsby-background-image";

import Layout from "../components/Layout";

const Background = styled(BackgroundImage)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndexPage = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "background.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Background fluid={image.childImageSharp.fluid}>
        <Link to="/products">
          <button>Order Online!</button>
        </Link>
      </Background>
    </Layout>
  );
};

export default IndexPage;
