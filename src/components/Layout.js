import React from "react";

import styled, { createGlobalStyle } from "styled-components";

import Header from "./Header";

import CartContext from "../context/CartContext";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

const App = styled.div``;

const Layout = ({ children }) => {
  return (
    <App>
      <Global />

      {/* <Header /> */}
      {children}
    </App>
  );
};

export default Layout;
