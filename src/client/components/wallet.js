// @format
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTransactionsBegin } from "../actions";

class Wallet extends Component {
  componentDidMount() {
    this.props.getTransactions("0x04b38b5c09e4ec66dd14350393813afba0e60499");
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.transactions.map((token, i) => (
            <li key={i}>
              <img width="10%" src={token.image} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getTransactions: fetchTransactionsBegin
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    transactions: state.transactions.items
  };
};
Wallet = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
export default Wallet;
