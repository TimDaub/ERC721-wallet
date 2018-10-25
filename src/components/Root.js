// @format
import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { ModalProvider } from "styled-react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Wallet from "./Wallet";
import Start from "./Start";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
    background-color: white;
  }
`;

const Root = ({ store }) => (
  <Provider store={store}>
    <ModalProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/wallet" component={Wallet} />
        </Switch>
      </Router>
      <ToastContainer />
    </ModalProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
