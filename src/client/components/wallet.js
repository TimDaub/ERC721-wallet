// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTransactionsBegin } from "../actions";

class Wallet extends Component {
  getTransactions = () => {
    return () => {
      this.props.getTransactions("0x50d7826d4a75fc8dcf35146fc909268cccd65d9d");
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
