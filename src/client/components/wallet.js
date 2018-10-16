// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "styled-react-modal";
import getWeb3 from "../utils/getWeb3";

import { fetchTransactionsBegin } from "../actions";
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
      opacity: 0
    };

    this.afterOpen = this.afterOpen.bind(this);
    this.beforeClose = this.beforeClose.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  afterOpen() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    });
  }

  beforeClose() {
    return new Promise(resolve => {
      this.setState({ opacity: 0 });
      setTimeout(resolve, 200);
    });
  }

  toggleModal(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  async componentDidMount() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    this.props.getTransactions(accounts[0]);
    this.setState({ accounts });
  }

  render() {
    return (
      <StyledWallet>
        {this.props.transactions.map(({ token, _tokenId }, i) => (
          <ListElement key={i}>
            <img onClick={this.toggleModal} width="100%" src={token.image} />
            <p>{_tokenId}</p>
            <StyledModal
              isOpen={this.state.isOpen}
              afterOpen={this.afterOpen}
              beforeClose={this.beforeClose}
              onBackgroundClick={this.toggleModal}
              onEscapeKeydown={this.toggleModal}
              opacity={this.state.opacity}
            >
              <TransferModal tokenId={_tokenId} from={this.state.accounts[0]} />
            </StyledModal>
          </ListElement>
        ))}
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
