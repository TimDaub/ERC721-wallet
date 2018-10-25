// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { FoldingCube } from "styled-spinkit";

import Header from "./Header";
import Token from "./Token";
import getWeb3 from "../utils/getWeb3";
import { fetchTransactionsBegin } from "../actions/fetchTransactions";
import TransferModal from "./TransferModal";

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
      modals: {}
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
    this.props.getTransactions(accounts[0]);
    this.setState({ accounts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.contracts !== prevProps.contracts) {
      this.updateTransactions();
    }
  }

  separator(i, name) {
    if (i === 0) {
      return (
        <Separator>
          <SeparatorHeadline>{name}</SeparatorHeadline>
        </Separator>
      );
    }
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
        <StyledLoader>
          <FoldingCube color="#000" />
        </StyledLoader>
      );
    } else if (totalCollectibles === 0) {
      return (
        <div>
          <Header />
          <StyledEmptySet>
            <h1>No collectibles found...</h1>
            <p>Add a token to view your collectibles</p>
          </StyledEmptySet>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          {Object.keys(transactions).map((contractAddress, i) => (
            <div key={i}>
              {this.separator(
                i,
                transactions[contractAddress].length &&
                  transactions[contractAddress][0].name
              )}
              <StyledWallet>
                {transactions[contractAddress].map(
                  ({ token, _tokenId, name, contract }, j) => (
                    <Token
                      key={j}
                      token={token}
                      tokenId={_tokenId}
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
    contracts: state.contracts.items
  };
};
Wallet = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
export default Wallet;
