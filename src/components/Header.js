import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Heading = styled.div`
  height: 60px;
  background-color: red;
  display: flex;
  justify-content: space-around;
  padding-left: 40%;
  align-items: center;
`;

const Header = () => {
  return (
    <header>
      <Heading>
        <Link to="/">Home</Link>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
      </Heading>
    </header>
  );
};

export default Header;
