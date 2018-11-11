// @format
import React, { Component } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { FoldingCube } from "styled-spinkit";
import "u2f-api-polyfill";

import getWeb3 from "../utils/getWeb3";
import Headline from "./Headline";
import LedgerModal from "./LedgerModal";

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

const ConnectButton = styled.button`
  display: inline-block;
  font-family: "Ubuntu", sans-serif;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.color};
  color: white;
  border-radius: 1px;
  padding: 0.5em;
  font-size: 1.3em;
  margin: 0.75em;
  &:focus {
    outline: 0;
  }
  &:hover {
    border: 1px solid ${props => props.color};
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50vh"
  }
};

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountsLocked: false,
      ledgerModalOpen: false,
      ledgerLoading: false
    };
    this.checkMetamaskSetup = this.checkMetamaskSetup.bind(this);
    this.checkAccountsLocked = this.checkAccountsLocked.bind(this);
    this.checkLedgerSetup = this.checkLedgerSetup.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  async checkAccountsLocked() {
    const web3 = await getWeb3("metamask");
    const intervalId = setInterval(async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        this.setState({ accountsLocked: false });
        clearInterval(intervalId);
        this.checkMetamaskSetup();
      } else {
        this.setState({ accountsLocked: true });
      }
    }, 100);
  }

  async checkMetamaskSetup() {
    const web3 = await getWeb3("metamask");
    if (web3.currentProvider.isMetaMask) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        this.props.history.push({
          pathname: "wallet",
          search: "?provider=metamask"
        });
      } else {
        toast.warning("Unlock Metamask");
      }
    } else {
      toast.warning("Install Metamask");
    }
  }

  async checkLedgerSetup() {
    this.setState({ ledgerLoading: true });
    if (location.protocol === "http:") {
      toast.warning("Switch to https for Ledger to work");
    } else {
      if (window.u2f && !window.u2f.getApiVersion) {
        // u2f object is found (Firefox with extension)
        this.toggleModal();
      } else {
        // u2f object was not found. Using Google polyfill
        const intervalId = setTimeout(() => {
          toast.warning(
            "U2F is not supported, download plugin for Firefox or use Chrome"
          );
        }, 3000);
        u2f.getApiVersion(async () => {
          clearTimeout(intervalId);
        });
        const web3 = await getWeb3("ledger");
        try {
          const accounts = await web3.eth.getAccounts();
          this.setState({ ledgerLoading: false });
          this.toggleModal();
        } catch (err) {
          this.setState({ ledgerLoading: false });
          toast.warning("Ledger Wallet not connected or locked");
        }
      }
    }
  }

  toggleModal() {
    const { ledgerModalOpen } = this.state;
    this.setState({ ledgerModalOpen: !ledgerModalOpen });
  }

  render() {
    const { ledgerModalOpen, accountsLocked, ledgerLoading } = this.state;

    return (
      <div>
        <Headline />
        <StyledStart>
          <StyledTagLine>
            An open source wallet for your Crypto Collectibles.
          </StyledTagLine>
          <ConnectButton
            color="rgb(246, 133, 27)"
            onClick={this.checkAccountsLocked}
          >
            Connect to Metamask
          </ConnectButton>
          <br />
          <ConnectButton color="black" onClick={this.checkLedgerSetup}>
            {ledgerLoading ? "Loading..." : "Connect to Ledger"}
          </ConnectButton>
        </StyledStart>
        <Modal isOpen={accountsLocked} style={customStyles} ariaHideApp={false}>
          <h1>Accounts locked</h1>
          <p>
            This website would like to access your account to load your
            collectibles.
          </p>
          <p>Please click "CONNECT" to load wallet.</p>
          <FoldingCube color="#000" />
        </Modal>
        <LedgerModal isOpen={ledgerModalOpen} toggleModal={this.toggleModal} />
      </div>
    );
  }
}

export default withRouter(Start);
