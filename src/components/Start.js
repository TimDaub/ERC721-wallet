// @format
import React, { Component } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import getWeb3 from "../utils/getWeb3";

const StyledStart = styled.div`
  text-align: center;
  margin: 20vh;
`;

const StyledH1 = styled.h1`
  font-size: 3em;
`;

const MetamaskButton = styled.button`
  background-color: rgb(246, 133, 27);
  color: white;
  border-radius: 0.3em;
  border: none;
  padding: 0.5em;
  font-size: 1.5em;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

class Start extends Component {
  constructor(props) {
    super(props);
    this.checkMetamaskSetup= this.checkMetamaskSetup.bind(this);
  }

  async checkMetamaskSetup() {
    const web3 = await getWeb3();
    if (web3.currentProvider.isMetaMask) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        this.props.history.push("wallet");
      } else {
        toast.warning("Unlock Metamask");
      }
    } else {
      toast.warning("Install Metamask");
    }
  }

  render() {
    return (
      <StyledStart>
        <StyledH1>An open source wallet for your Crypto Collectibles.</StyledH1>
        <MetamaskButton onClick={this.checkMetamaskSetup}>
          Connect to Metamask
        </MetamaskButton>
      </StyledStart>
    );
  }
}

export default withRouter(Start);
