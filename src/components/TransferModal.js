// @format
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

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

const SliderWrapper = styled.div`
  margin-top: 1.5em;
`;

class TransferModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validAddress: true,
      gasPrice: 5
    };

    this.transfer = this.transfer.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error) {
      toast.error(this.props.error.message);
    }
    if (prevProps.txHash !== this.props.txHash) {
      toast.success("Transaction successfully submitted");
      this.props.toggleModal();
    }
  }

  async transfer() {
    const { from, tokenId, contract } = this.props;
    const { gasPrice } = this.state;
    const web3 = await getWeb3();

    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const path = urlParams.get("path");
    const network = urlParams.get("network");

    let networkId;
    if (provider === "ledger") {
      if (network === "mainnet") {
        networkId = 1;
      } else if (network === "rinkeby") {
        networkId = 4;
      } else {
        toast.error("Network is not supported currently");
      }
    }

    this.props.transfer(
      web3,
      from,
      this.refs.to.value,
      tokenId,
      contract,
      provider,
      path,
      networkId,
      gasPrice
    );
  }

  async onChange() {
    const to = this.refs.to.value;

    const web3 = await getWeb3();
    const validAddress = web3.utils.isAddress(to);
    this.setState({ validAddress });
  }

  render() {
    const { tokenId, image, name } = this.props;
    const { validAddress, gasPrice } = this.state;
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");

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
        {provider === "ledger" ? (
          <SliderWrapper>
            Gas
            <InputRange
              maxValue={20}
              minValue={0}
              value={gasPrice}
              onChange={gasPrice => this.setState({ gasPrice })}
            />
          </SliderWrapper>
        ) : null}
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

const mapStateToProps = (state, ownProps) => {
  return {
    txHash: state.transfer.txHash,
    error: state.transfer.error
  };
};

TransferModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferModal);

export default TransferModal;
