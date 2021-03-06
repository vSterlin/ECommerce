import React from "react";

import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ProductScreen from "../components/ProductScreen";
import CartContext from "../context/CartContext";

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


const Product = ({ pageContext, data }) => {
  // const [cart, setCart] = useState({});
  // // const [quantity, setQuantity] = useState(1);

  // const addToCart = (item, name) => {
  //   let newObj = { ...cart };
  //   if (item in newObj) {
  //     newObj[item].quantity = newObj[item].quantity + 1;
  //   } else {
  //     newObj[item] = {
  //       quantity: 1,
  //       name,
  //     };
  //   }
  //   setCart({ ...newObj });
  // };

  ///////////////////////////

  // useEffect(() => {

  //   const startCart = localStorage.getItem("cart");
  //   if (startCart !== null) {
  //     setCart(JSON.parse(startCart));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  ///////////////////////////

  return (
    <CartContext.Consumer>

{context => (    <Layout>
      {/* <Image fluid={data.stripeProduct.image[0].childImageSharp.fluid} />
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
      </Link> */}
      <ProductScreen pageContext={pageContext} data={data} context={context}/>
    </Layout>)}
    </CartContext.Consumer>

  );
};

export default Product;
