// @format
import React, { Component } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";

import TransferModal from "./TransferModal";

const StyledToken = styled.div`
  margin: 1em;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 1em;
  background-color: white;
  text-align: center;
  width: 150px;
`;

const StyledImage = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
`;

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
`;

const Token = props => (
  <StyledToken>
    <StyledImage width="100%" src={props.token && props.token.image} />
    <p>{(props.token && props.token.name) || "No name given"}</p>
    <button onClick={props.toggleModal(props.tokenId)}>Transfer</button>
    <StyledModal
      isOpen={props.modals[props.tokenId]}
      onBackgroundClick={props.toggleModal(props.tokenId)}
      onEscapeKeydown={props.toggleModal(props.tokenId)}
    >
      <TransferModal
        tokenId={props.tokenId}
        from={props.accounts}
        contract={props.contract}
      />
    </StyledModal>
  </StyledToken>
);

export default Token;
