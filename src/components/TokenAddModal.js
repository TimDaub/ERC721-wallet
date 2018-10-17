// @format
import React, { Component } from "react";
import { connect } from "react-redux";

import { addTokenBegin } from "../actions/addToken";

class TokenAddModal extends Component {
  constructor(props) {
    super(props);

    this.addToken = this.addToken.bind(this);
  }

  addToken() {
    this.props.addToken(this.refs.contract.value);
  }
  render() {
    return (
      <div>
        <input type="text" ref="contract" placeholder="Contract address" />
        <button onClick={this.addToken}>Add Token</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addToken: addTokenBegin
};

TokenAddModal = connect(
  null,
  mapDispatchToProps
)(TokenAddModal);

export default TokenAddModal;
