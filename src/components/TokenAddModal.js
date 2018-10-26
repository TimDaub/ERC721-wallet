// @format
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";

import StyledButton from "./StyledButton";
import { addTokenBegin } from "../actions/addToken";
import { addNameAndSymbolBegin } from "../actions/addNameAndSymbol";

const StyledInput = styled.input`
  display: block;
  font-size: 1.1em;
  width: 99%;
  height: 2em;
`;

const StyledParagraph = styled.p`
  margin-bottom: 5px;
`;

class TokenAddModal extends Component {
  constructor(props) {
    super(props);

    this.addToken = this.addToken.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  addToken() {
    this.props.addToken(this.refs.contract.value);
  }

  onChange() {
    const contract = this.refs.contract.value;
    this.props.addNameAndSymbol(contract);
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      toast.error(error.message);
    }
  }

  render() {
    const { name, symbol } = this.props;
    return (
      <div>
        <h1>Add Tokens</h1>
        <StyledParagraph>Token</StyledParagraph>
        <StyledInput onChange={this.onChange} type="text" ref="contract" />
        <StyledParagraph>Name</StyledParagraph>
        <StyledInput type="text" value={name} readOnly={name} />
        <StyledParagraph>Symbol</StyledParagraph>
        <StyledInput type="text" value={symbol} readOnly={symbol} />
        <StyledButton float="right" margin="1em 0 0 0" onClick={this.addToken}>
          Add Token
        </StyledButton>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addNameAndSymbol: addNameAndSymbolBegin,
  addToken: addTokenBegin
};

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.contractMetadata.name,
    symbol: state.contractMetadata.symbol,
    error: state.contractMetadata.error
  };
};

TokenAddModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenAddModal);

export default TokenAddModal;
