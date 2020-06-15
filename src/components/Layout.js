import React from "react";

import styled, { createGlobalStyle } from "styled-components";

import Header from "./Header";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Global />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
