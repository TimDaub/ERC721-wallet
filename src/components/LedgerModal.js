// @format
import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import getWeb3 from "../utils/getWeb3";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
  height: 30px;
`;

const ListElement = styled.li`
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
      accounts: []
    };
  }
  async componentDidMount() {
    const web3 = await getWeb3("ledger");
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts });
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
    const { accounts } = this.state;
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
              <ListElement key={i}>
                <List>
                  <InlineElement width="10%">{i}</InlineElement>
                  <InlineElement width="70%">{account}</InlineElement>
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
        </Modal>
      </div>
    );
  }
}

export default LedgerModal;
