// @format
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { transferTokenBegin } from "../../actions/transferToken";
import StyledInput from "../StyledInput";
import StyledParagraph from "../StyledParagraph";
import StyledButton from "../StyledButton";
import StyledSpan from "../StyledSpan";
import getWeb3 from "../../utils/getWeb3";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInput = styled.input`
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
`;

const StyledLabel = styled.label`
  display: inline-block;
  font-family: "Ubuntu", sans-serif;
  background-color: ${props => (props.secondary ? "white" : "black")};
  color: ${props => (props.secondary ? "black" : "white")};
  border: 1px solid black;
  border-radius: 1px;
  padding: 0.5em;
  font-size: 1em;
  float: ${props => props.float};
  margin: ${props => props.margin};
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${props => (props.secondary ? "black" : "white")};
    border: 1px solid black;
    color: ${props => (props.secondary ? "white" : "black")};
    cursor: pointer;
  }
`;

class TransferModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validAddress: true
    };

    this.transfer = this.transfer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { error, loading, toggleModal } = this.props;
    if (error) {
      toast.error(error.message);
    }
    if (prevProps.loading && loading === false) {
      toggleModal();
    }
  }

  async transfer() {
    const { from, token, contract, tokenHash } = this.props;
    const { file, to } = this.refs;
    const web3 = await getWeb3();
    this.props.transfer(web3, from, to.value, token, contract, file, tokenHash);
  }

  async onChange() {
    const to = this.refs.to.value;

    const web3 = await getWeb3();
    const validAddress = web3.utils.isAddress(to);
    this.setState({ validAddress });
  }

  async onFileUpload() {
    const filePath = this.refs.file.value;
    const splitFilePath = filePath.split("\\");
    const fileName = splitFilePath[splitFilePath.length - 1];
    this.setState({ fileName });
  }

  render() {
    const {
      token: { name, image },
      loading
    } = this.props;
    const { validAddress, fileName } = this.state;
    return (
      <div>
        <h1>Sublicense</h1>
        <StyledContainer>
          <StyledImage src={image} />
        </StyledContainer>
        <StyledParagraph>Name</StyledParagraph>
        <StyledInput type="text" value={name} readOnly={name} />
        <FileInput
          type="file"
          name="file"
          id="file"
          ref="file"
          accept="application/pdf"
          onChange={this.onFileUpload}
        />
        <StyledLabel margin="2em 1em 0 0" htmlFor="file">
          Upload License
        </StyledLabel>
        <span>{fileName || "Choose a file..."}</span>
        <StyledParagraph>Recipient</StyledParagraph>
        <StyledInput type="text" ref="to" autoFocus onChange={this.onChange} />
        {validAddress ? null : <StyledSpan>Invalid Address</StyledSpan>}
        <StyledButton float="right" margin="2em 0 0 0" onClick={this.transfer}>
          {loading ? "Loading..." : "Next"}
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
    loading: state.transfer.loading,
    error: state.transfer.error
  };
};

TransferModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferModal);

export default TransferModal;
