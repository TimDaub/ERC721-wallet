// @format
import React, { Component } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import getWeb3 from "../utils/getWeb3";
import Headline from "./Headline";

const StyledStart = styled.div`
  text-align: center;
`;

const StyledTagLine = styled.h1`
  font-size: 3em;
  padding-top: 20vh;
  padding-bottom: 7.5vh;
  padding-left: 50vh;
  padding-right: 50vh;
`;

const MetamaskButton = styled.button`
  font-family: "Ubuntu", sans-serif;
  background-color: rgb(246, 133, 27);
  color: white;
  border: none;
  border-radius: 1px;
  padding: 0.5em;
  font-size: 1.3em;
  &:focus {
    outline: 0;
  }
  &:hover {
    border 1px solid rgb(246, 133, 27);
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

class Start extends Component {
  constructor(props) {
    super(props);
    this.checkMetamaskSetup = this.checkMetamaskSetup.bind(this);
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
      <div>
        <Headline />
        <StyledStart>
          <StyledTagLine>
            An open source wallet for your Crypto Collectibles.
          </StyledTagLine>
          <MetamaskButton onClick={this.checkMetamaskSetup}>
            Connect to Metamask
          </MetamaskButton>
        </StyledStart>
      </div>
    );
  }
}

export default withRouter(Start);
