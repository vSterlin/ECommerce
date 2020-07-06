import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import {FacebookCircle, Twitter, Instagram} from "@styled-icons/boxicons-logos/"

const Heading = styled.div`
position: fixed;
left: 0;
top: 0;
right: 0;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  grid-template-columns: 1fr 0.3fr 1fr;
  align-items: center;
  z-index: 100;
  color: whitesmoke;
`;

const Navigation = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  &> a {
    color: white;
    text-decoration: none;
  }
`;

const Title = styled.div`
  text-align: center;
  border-left: 1px solid black;
  border-right: 1px solid black;
  /* border-left-width: 100%; */
  font-family: cursive;
`;
const SocialMediaTAb = styled.div`
  text-align: center;
  color: white;
  &> svg {
    height: 20px;
    margin: 0 10px;
  }

`;

const Header = () => {
  return (
    <header>
      <Heading>
        <Navigation>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        </Navigation>
        <Title>VS HONEY</Title>
        <SocialMediaTAb>
          <FacebookCircle />
          <Twitter />
          <Instagram />
        </SocialMediaTAb>
      </Heading>
    </header>
  );
};

export default Header;
