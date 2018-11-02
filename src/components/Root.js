// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import GithubCorner from "react-github-corner";
import "react-toastify/dist/ReactToastify.css";

import Wallet from "./Wallet";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
    background-color: white;
  }
`;

class Root extends Component {
  componentDidMount() {
    localStorage.setItem(
      "tokens",
      "0x9326f84fcca8a136da3a4f71bbffbde6635c58da"
    );
  }
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <GlobalStyle />
          <Wallet />
          <ToastContainer />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
