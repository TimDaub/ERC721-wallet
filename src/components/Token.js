// @format
import React, { Component } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import TransferModal from "./TransferModal";

const StyledToken = styled.div`
  margin: 1em;
  border: 1px solid #eee;
  border-radius: 1px;
  padding: 1em;
  background-color: #fafafa;
  text-align: center;
  width: 150px;
`;

const StyledImage = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const Token = props => (
  <StyledToken>
    <StyledImage width="100%" src={props.token && props.token.image} />
    <p>{(props.token && props.token.name) || "<No name given>"}</p>
    <p>
      {(props.token && props.token.description) || "<No description given>"}
    </p>
    {props.link ? (
      <a target="_blank" href={props.link}>
        Visit Website
      </a>
    ) : null}
    <button onClick={props.toggleModal(props.tokenId)}>Transfer</button>
    <Modal
      isOpen={props.modals[props.tokenId]}
      onRequestClose={props.toggleModal(props.tokenId)}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <TransferModal
        tokenId={props.tokenId}
        from={props.account}
        contract={props.contract}
      />
    </Modal>
  </StyledToken>
);

export default Token;
