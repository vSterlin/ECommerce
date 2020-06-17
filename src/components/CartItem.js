import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const Image = styled(Img)`
  width: 100px;
`;

const CartItem = ({ item, inc, dec, remove }) => {
  return (
    <li>
      <Image fluid={item.image} />
      <h2>
        {item.name} - {item.quantity}
        <button onClick={() => inc(item)}>+</button>
        <button onClick={() => dec(item)}>-</button>
        <button onClick={() => remove(item)}>x</button>
      </h2>
    </li>
  );
};

export default CartItem;
