// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { FoldingCube } from "styled-spinkit";
import { toast } from "react-toastify";

import CinemarketToken from "./cinemarket/CinemarketToken";
import TransferModal from "./cinemarket/CinemarketTransferModal";

import getWeb3 from "../utils/getWeb3";
import { fetchTransactionsBegin } from "../actions/fetchTransactions";

import CinemarketNavigation from "./cinemarket/CinemarketNavigation";
import CinemarketHeadline from "./cinemarket/CinemarketHeadline";
import CinemarketInfo from "./cinemarket/CinemarketInfo";

const StyledWalletWrapper = styled.div`
  display: flex;
`;

const StyledWallet = styled.div`
  width: 70%;
  margin-left: 15%;
  display: flex;
  align-items: space-between;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const Separator = styled.div`
  width: 70%;
  margin-left: 15%;
  border-bottom: 1px solid black;
`;

const SeparatorHeadline = styled.h3`
  margin-bottom: 0.1em;
`;

const StyledLoader = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledEmptySet = styled.div`
  text-align: center;
  margin-top: 20vh;
`;

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modals: {},
      accounts: []
    };
  }

  toggleModal = tokenId => {
    return () => {
      let modals = this.state.modals;
      modals[tokenId] = !modals[tokenId];
      this.setState({ modals });
    };
  };

  componentDidMount() {
    this.updateTransactions();
  }

  async updateTransactions() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    let contracts = localStorage.getItem("tokens");
    contracts = contracts.split(",");

    this.props.getTransactions(web3, accounts[0], contracts);
    this.setState({ accounts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error) {
      toast.error(this.props.error.message);
    }
  }

  separator(i, name) {
    return (
      <Separator>
        <SeparatorHeadline>{name}</SeparatorHeadline>
      </Separator>
    );
  }

  totalCollectibles(transactions) {
    return Object.keys(transactions).reduce((initVal, currVal) => {
      return initVal + transactions[currVal].length;
    }, 0);
  }

  render() {
    const { modals } = this.state;
    const { transactions, loading } = this.props;
    const totalCollectibles = this.totalCollectibles(transactions);
    if (loading) {
      return (
        <StyledWalletWrapper>
          <CinemarketNavigation />
          <div style={{ width: "100%", minHeight: "100vh" }}>
            <CinemarketHeadline />
            <CinemarketInfo />
            <StyledLoader>
              <FoldingCube color="#000" />
            </StyledLoader>
          </div>
        </StyledWalletWrapper>
      );
    } else if (totalCollectibles === 0) {
      return (
        <StyledWalletWrapper>
          <CinemarketNavigation />
          <div style={{ width: "100%", minHeight: "100vh" }}>
            <CinemarketHeadline />
            <CinemarketInfo />
            <StyledEmptySet>
              <h1>No collectibles found...</h1>
              <p>Add a token to view your collectibles</p>
            </StyledEmptySet>
          </div>
        </StyledWalletWrapper>
      );
    } else {
      return (
        <StyledWalletWrapper>
          <CinemarketNavigation />
          <div style={{ width: "100%", minHeight: "100vh" }}>
            <CinemarketHeadline />
            <CinemarketInfo />
            {Object.keys(transactions).map((contractAddress, i) => (
              <div key={i}>
                {transactions[contractAddress].length > 0 &&
                  this.separator(i, transactions[contractAddress][0].name)}
                <StyledWallet>
                  {transactions[contractAddress].map(
                    ({ token, _tokenId, name, contract, link }, j) => (
                      <CinemarketToken
                        key={j}
                        token={token}
                        tokenId={_tokenId}
                        link={link}
                        name={name}
                        contract={contract}
                        modals={modals}
                        toggleModal={this.toggleModal}
                        account={this.state.accounts[0]}
                      />
                    )
                  )}
                </StyledWallet>
              </div>
            ))}
          </div>
        </StyledWalletWrapper>
      );
    }
  }
}

const mapDispatchToProps = {
  getTransactions: fetchTransactionsBegin
};

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions.items,
    loading: state.transactions.loading,
    error: state.transactions.error
  };
};
Wallet = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
export default Wallet;
