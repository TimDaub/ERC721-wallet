// @format
import React, { Component } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faEye } from "@fortawesome/free-solid-svg-icons";

import TransferModal from "./TransferModal";

const StyledToken = styled.div`
  margin: 1em;
  padding-top: 1em;
  background-color: white;
  box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08),
    0 1px 3px 1px rgba(60, 64, 67, 0.16);
  text-align: center;
  width: 200px;
`;

const StyledTokenControls = styled.ul`
  display: block;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 2em;
  width: 100%;
  border-top: 1px solid #eee;
`;

const StyledTokenElement = styled.li`
  display: inline-block;
  height: 100%;
  width: 50%;
  color: #424242;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #fafafa;
  }
`;

const StyledTokenAnchor = styled.a`
  display: inline-block;
  vertical-align: middle;
  padding-top: 0.35em;
  text-decoration: none;

  &:visited {
    color: #424242;
    text-decoration: none;
  }
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
    transform: "translate(-50%, -50%)",
    width: "50vh"
  }
};

function textEllipsis(text) {
  return text.substring(0, 100) + "...";
}

const Token = props => (
  <StyledToken>
    <StyledImage width="100%" src={props.token && props.token.image} />
    <p>{(props.token && props.token.name) || "<No name given>"}</p>
    <p>
      {(props.token &&
        props.token.description &&
        props.token.description.substring(0, 50) + "...") ||
        "<No description given>"}
    </p>
    <StyledTokenControls>
      <StyledTokenElement>
        <StyledTokenAnchor target="_blank" href={props.link}>
          <FontAwesomeIcon icon={faEye} /> View
        </StyledTokenAnchor>
      </StyledTokenElement>
      <StyledTokenElement onClick={props.toggleModal(props.tokenId)}>
        <StyledTokenAnchor>
          <FontAwesomeIcon icon={faExchangeAlt} /> Transfer
        </StyledTokenAnchor>
      </StyledTokenElement>
    </StyledTokenControls>
    <Modal
      isOpen={props.modals[props.tokenId]}
      onRequestClose={props.toggleModal(props.tokenId)}
      style={customStyles}
      ariaHideApp={false}
    >
      <TransferModal
        toggleModal={props.toggleModal(props.tokenId)}
        tokenId={props.tokenId}
        from={props.account}
        image={props.token && props.token.image}
        name={(props.token && props.token.name) || "<No name given>"}
        contract={props.contract}
      />
    </Modal>
  </StyledToken>
);

export default Token;
