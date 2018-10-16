// @format
import React, { Component } from "react";
import { ModalProvider } from "styled-react-modal";
import Wallet from "./Wallet";

const App = () => (
  <ModalProvider>
    <Wallet />
  </ModalProvider>
);

export default App;
