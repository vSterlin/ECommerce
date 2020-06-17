import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import styled from "styled-components";


import Img from "gatsby-image";


const Card = styled.div`
  width: 15vw;
  height: 350px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;



const ProductCard = (props) => {
  
  return (
    <Card>
      <Img fluid={props.image}/>
      <h1>
        {props.name}
        {props.stock === "no" ? " - Out Of Stock" : null}
      </h1>

      <Link to={props.id}>More about {props.name}</Link>
    </Card>
  );
};

export default ProductCard;
