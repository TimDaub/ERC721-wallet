// @format
import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import getWeb3 from "../utils/getWeb3";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
  margin: ${props => props.margin};
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

const Select = styled.select``;

class LedgerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountsOffset: 0,
      accountSelected: 0,
      pathSelected: { value: "44'/60'/0'/0", label: "ETH (m/44'/60'/0'/0)*" }
    };

    this.onPathSelect = this.onPathSelect.bind(this);
    this.unlock = this.unlock.bind(this);
  }

  componentDidMount() {
    this.updateAccounts();
  }

  componentDidUpdate(prevProps, prevState) {
    const { accountsOffset, pathSelected } = this.state;

    if (
      accountsOffset !== prevState.accountsOffset ||
      (pathSelected.value !== prevState.pathSelected.value &&
        pathSelected.value !== "custom")
    ) {
      this.updateAccounts();
    }
  }

  selectAccount(accountSelected) {
    return () => {
      this.setState({ accountSelected });
    };
  }

  async updateAccounts() {
    const { accountsOffset, pathSelected } = this.state;
    const web3 = await getWeb3("ledger", accountsOffset, pathSelected.value);
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts });
  }

  changeAccountOffset(offset) {
    return () => {
      const { accountsOffset } = this.state;
      this.setState({ accountsOffset: accountsOffset + offset });
    };
  }

  onPathSelect(pathSelected) {
    this.setState({ pathSelected });
  }

  unlock() {
    const {
      pathSelected: { value },
      accountSelected
    } = this.state;

    // We replace the last value of pathSelected with the account selected.
    const valueSplit = value.split("/");
    valueSplit[3] = accountSelected;
    const actualValue = valueSplit.join("/");

    this.props.history.push({
      pathname: "wallet",
      search: "?provider=ledger&path=" + actualValue + "&network=mainnet"
    });
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
    const {
      accounts,
      accountsOffset,
      accountSelected,
      pathSelected
    } = this.state;

    const options = [{ value: "44'/60'/0'/0", label: "ETH (m/44'/60'/0'/0)*" }];

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
            <InlineElement
              width={pathSelected.value === "custom" ? "50%" : "100%"}
            >
              <Dropdown
                options={options}
                value={pathSelected}
                onChange={this.onPathSelect}
                placeholder="Select a derivation path"
              />
            </InlineElement>
            *{" "}
            <a
              target="_blank"
              href="https://github.com/LedgerHQ/ledgerjs/issues/200#issuecomment-434314003"
            >
              Ledger only allows this derivation path currently.
            </a>
            {pathSelected.value === "custom" ? (
              <InlineElement width="50%">
                <StyledInput type="text" placeholder="44'/60'/0" />
              </InlineElement>
            ) : null}
          </List>
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
          <StyledButton float="right" margin="1em 0 0 0" onClick={this.unlock}>
            Unlock
          </StyledButton>
        </Modal>
      </div>
    );
  }
}

export default withRouter(LedgerModal);
