// @format
import React, { Component } from "react";
import { connect } from "react-redux";

import { transferTokenBegin } from "../actions";

class TransferModal extends Component {
  constructor(props) {
    super(props);

    this.transfer = this.transfer.bind(this);
  }

  transfer() {
    this.props.transfer(
      this.props.from,
      this.refs.to.value,
      this.props.tokenId
    );
  }
  render() {
    return (
      <div>
        <p>{this.props.tokenId}</p>
        <input type="text" ref="to" placeholder="Address" />
        <button onClick={this.transfer}>Transfer</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  transfer: transferTokenBegin
};

TransferModal = connect(
  null,
  mapDispatchToProps
)(TransferModal);

export default TransferModal;
