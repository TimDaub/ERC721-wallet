// @format
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";

import StyledButton from "./StyledButton";
import { addTokenBegin } from "../actions/addToken";
import { addNameAndSymbolBegin } from "../actions/addNameAndSymbol";
import config from "../config";

const StyledInput = styled.input`
  display: block;
  font-size: 1.1em;
  width: 99%;
  height: 2em;
  border: 1px solid grey;
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

const StyledParagraph = styled.p`
  margin-bottom: 5px;
`;

const StyledSpan = styled.span`
  color: red;
  font-size: 0.5em;
`;

class TokenAddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validAddress: true
    };

    this.addToken = this.addToken.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  addToken() {
    this.props.addToken(this.refs.contract.value);
  }

  onChange() {
    const contract = this.refs.contract.value;

    const web3 = config.web3;
    const validAddress = web3.utils.isAddress(contract);
    this.setState({ validAddress });

    if (validAddress) {
      this.props.addNameAndSymbol(contract);
    }
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      toast.error(error.message);
    }
  }

  render() {
    const { name, symbol } = this.props;
    const { validAddress } = this.state;
    return (
      <div>
        <h1>Add Tokens</h1>
        <StyledParagraph>Token</StyledParagraph>
        <StyledInput onChange={this.onChange} type="text" ref="contract" />
        {validAddress ? null : <StyledSpan>Invalid Address</StyledSpan>}
        <StyledParagraph>Name</StyledParagraph>
        <StyledInput type="text" value={name} readOnly={name} />
        <StyledParagraph>Symbol</StyledParagraph>
        <StyledInput type="text" value={symbol} readOnly={symbol} />
        <StyledButton float="right" margin="2em 0 0 0" onClick={this.addToken}>
          Next
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
