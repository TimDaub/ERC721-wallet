// @format
import React from "react";
import Modal from "react-modal";
import { FoldingCube } from "styled-spinkit";

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

const CinemarketAccountsLockedModal = props => (
  <Modal isOpen={props.accountsLocked} style={customStyles} ariaHideApp={false}>
    <h1>Accounts locked</h1>
    <p>
      This website would like to access your Metamask account to load your
      films.
    </p>
    <p>Please unlock your Metamask wallet or click "CONNECT" to load films.</p>
    <FoldingCube color="#000" />
  </Modal>
);

export default CinemarketAccountsLockedModal;
