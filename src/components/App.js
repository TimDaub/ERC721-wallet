// @format
import React, { Component } from "react";
import { ModalProvider } from "styled-react-modal";
import Wallet from "./Wallet";
import TokenAdder from "./TokenAdder";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    background-color: #FAFAFA
  }
`;

const App = () => (
  <ModalProvider>
    <GlobalStyle />
    <TokenAdder />
    <Wallet />
  </ModalProvider>
);

export default App;
