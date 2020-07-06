import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

const ProductBox = styled.div`
  display: flex;
`;

const Products = () => {
  const data = useStaticQuery(graphql`
    query {
      allStripeProduct (filter: {active: {eq: true}}){
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

  const products = data.allStripeProduct.edges;
  return (
    <Layout>
      <ProductBox>
        {products.map(({ node }) => {
          return (
            <ProductCard
              id={node.id}
              name={node.name}
              stock={node.metadata.stock}
              image={node.image[0].childImageSharp.fluid}
            />
          );
          // return (
          //   <>
          //     <h1>
          //       {node.name}{node.metadata.stock === "no" ? " - Out Of Stock" : null}
          //     </h1>

          //     <Link to={node.id}>More about {node.name}</Link>
          //   </>
          // );
        })}
      </ProductBox>
    </Layout>
  );
};

export default Products;
