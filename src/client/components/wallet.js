// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTransactionsBegin } from "../actions";

class Wallet extends Component {
  getTransactions = () => {
    return () => {
      this.props.getTransactions("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");
    };
  };
  render() {
    return (
      <div>
        Hello world
        <button onClick={this.getTransactions()}>Fetch</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getTransactions: fetchTransactionsBegin
};
Wallet = connect(
  null,
  mapDispatchToProps
)(Wallet);
export default Wallet;
