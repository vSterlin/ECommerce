import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import Layout from "../components/Layout";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allStripeProduct {
        edges {
          node {
            name
            id
            metadata {
              stock
            }
          }
        }
      }
    }
  `);

  const products = data.allStripeProduct.edges;
  return (
    <Layout>
      {products.map(({ node }) => {
        return (
          <>
            <h1>
              {node.name} - {node.metadata.stock}
            </h1>

            <Link to={node.id}>More about {node.name}</Link>
          </>
        );
      })}
    </Layout>
  );
};

export default IndexPage;
