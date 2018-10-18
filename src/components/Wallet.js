// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "styled-react-modal";
import getWeb3 from "../utils/getWeb3";

import { fetchTransactionsBegin } from "../actions/fetchTransactions";
import TransferModal from "./TransferModal";

const StyledWallet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ListElement = styled.div`
  width: 100px;
  height: 100px;
  margin: 1em;
`;

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
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

  async componentDidMount() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    this.props.getTransactions(accounts[0]);
    this.setState({ accounts });
  }

  render() {
    return (
      <StyledWallet>
        {this.props.transactions.map(
          ({ token, _tokenId, name, contract }, i) => (
            <ListElement key={i}>
              <img width="100%" src={token && token.image} />
              <p>{name}</p>
              <p>{_tokenId}</p>
              <button onClick={this.toggleModal(_tokenId)}>Transfer</button>
              <StyledModal
                isOpen={this.state.modals[_tokenId]}
                onBackgroundClick={this.toggleModal(_tokenId)}
                onEscapeKeydown={this.toggleModal(_tokenId)}
              >
                <TransferModal
                  tokenId={_tokenId}
                  from={this.state.accounts[0]}
                  contract={contract}
                />
              </StyledModal>
            </ListElement>
          )
        )}
      </StyledWallet>
    );
  }
}

const mapDispatchToProps = {
  getTransactions: fetchTransactionsBegin
};

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions.items
  };
};
Wallet = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
export default Wallet;
