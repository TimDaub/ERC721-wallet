// @format
import React, { Component } from "react";
import { ModalProvider } from "styled-react-modal";
import { createGlobalStyle } from "styled-components";

import Wallet from "./Wallet";
import Header from "./Header";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    background-color: #FAFAFA
  }
`;

const App = () => (
  <ModalProvider>
    <Header />
    <GlobalStyle />
    <Wallet />
  </ModalProvider>
);

export default App;
