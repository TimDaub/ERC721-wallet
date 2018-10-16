// @format
import React, { Component } from "react";
import { ModalProvider } from "styled-react-modal";
import Wallet from "./Wallet";
import TokenAdder from "./TokenAdder";

const App = () => (
  <ModalProvider>
    <TokenAdder />
    <Wallet />
  </ModalProvider>
);

export default App;
