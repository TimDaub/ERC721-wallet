// @format
import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import getWeb3 from "../utils/getWeb3";
import StyledButton from "./StyledButton";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

const ListElement = styled.li`
  height: 30px;
  padding: 5px 0 5px 0;
  &: nth-child(even) {
    background-color: #f5f5f5;
  }
  &: hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
`;

const InlineElement = styled.li`
  font-weight: ${props => (props.bold ? "bold" : "normal")}
  display: inline-block;
  float: left;
  width: ${props => props.width};
  padding-top: 5px;
  text-align: center;
`;

class LedgerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountsOffset: 0,
      accountSelected: 0
    };
  }

  componentDidMount() {
    this.updateAccounts();
  }

  componentDidUpdate(prevProps, prevState) {
    const { accountsOffset } = this.state;

    if (accountsOffset !== prevState.accountsOffset) {
      this.updateAccounts();
    }
  }

  selectAccount(accountSelected) {
    return () => {
      this.setState({ accountSelected });
    };
  }

  async updateAccounts() {
    const { accountsOffset } = this.state;
    const web3 = await getWeb3("ledger", accountsOffset);
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts });
  }

  changeAccountOffset(offset) {
    return () => {
      const { accountsOffset } = this.state;
      this.setState({ accountsOffset: accountsOffset + offset });
    };
  }

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
      }
    };

    const { isOpen, toggleModal } = this.props;
    const { accounts, accountsOffset, accountSelected } = this.state;
    return (
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <h1>Select an Address</h1>
          <List>
            <ListElement>
              <List>
                <InlineElement bold width="10%">
                  #
                </InlineElement>
                <InlineElement bold width="70%">
                  Address
                </InlineElement>
                <InlineElement bold width="20%">
                  More
                </InlineElement>
              </List>
            </ListElement>
            {accounts.map((account, i) => (
              <ListElement key={i} onClick={this.selectAccount(i)}>
                <List>
                  <InlineElement width="10%">
                    {i + accountsOffset}
                  </InlineElement>
                  <InlineElement width="10%">
                    <input
                      type="radio"
                      onChange={this.selectAccount(i)}
                      checked={accountSelected === i}
                      value={i}
                    />
                  </InlineElement>
                  <InlineElement width="60%">{account}</InlineElement>
                  <InlineElement width="20%">
                    <a
                      target="_blank"
                      href={"https://etherscan.io/address/" + account}
                    >
                      more...
                    </a>
                  </InlineElement>
                </List>
              </ListElement>
            ))}
          </List>
          <StyledButton
            onClick={this.changeAccountOffset(-5)}
            width="49%"
            secondary
            margin="0 1% 0 0"
            disabled={accountsOffset - 5 < 0}
          >
            ← Back
          </StyledButton>
          <StyledButton
            onClick={this.changeAccountOffset(5)}
            width="49%"
            secondary
            margin="0 0 0 1%"
          >
            More →
          </StyledButton>
        </Modal>
      </div>
    );
  }
}

export default LedgerModal;
