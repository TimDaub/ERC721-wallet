// @format
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { transferTokenBegin } from "../actions/transferToken";
import StyledInput from "./StyledInput";
import StyledParagraph from "./StyledParagraph";
import StyledButton from "./StyledButton";
import StyledSpan from "./StyledSpan";
import getWeb3 from "../utils/getWeb3";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
`;

class TransferModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validAddress: true
    };

    this.transfer = this.transfer.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async transfer() {
    const { from, tokenId, contract } = this.props;
    const web3 = await getWeb3();
    this.props.transfer(web3, from, this.refs.to.value, tokenId, contract);
  }

  async onChange() {
    const to = this.refs.to.value;

    const web3 = await getWeb3();
    const validAddress = web3.utils.isAddress(to);
    this.setState({ validAddress });
  }

  render() {
    const { tokenId, image, name } = this.props;
    const { validAddress } = this.state;
    return (
      <div>
        <h1>Transfer token</h1>
        <StyledContainer>
          <StyledImage src={image} />
        </StyledContainer>
        <StyledParagraph>Name</StyledParagraph>
        <StyledInput type="text" value={name} readOnly={name} />
        <StyledParagraph>Token ID</StyledParagraph>
        <StyledInput type="text" value={tokenId} readOnly={tokenId} />
        <StyledParagraph>Recipient</StyledParagraph>
        <StyledInput type="text" ref="to" autoFocus onChange={this.onChange} />
        {validAddress ? null : <StyledSpan>Invalid Address</StyledSpan>}
        <StyledButton float="right" margin="2em 0 0 0" onClick={this.transfer}>
          Next
        </StyledButton>
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
