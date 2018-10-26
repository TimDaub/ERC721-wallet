// @format
import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { connect } from "react-redux";

import TokenAddModal from "./TokenAddModal";
import StyledButton from "./StyledButton";
import { addNameAndSymbolReset } from "../actions/addNameAndSymbol";

const StyledTokenAdder = styled.div`
  margin-left: auto;
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

class TokenAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      show: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    const { isOpen } = this.state;
    const { addNameAndSymbolReset } = this.props;
    if (isOpen) {
      addNameAndSymbolReset();
    }
    this.setState({ isOpen: !isOpen });
  }

  componentDidMount() {
    // NOTE: hashchange doesn't work with react-router. This component
    // additionally isn't part of the react-router tree so cannot use
    // this.props.location.
    const intervalId = setInterval(() => {
      if (window.location.pathname === "/wallet") {
        this.setState({ show: true });
      } else {
        this.setState({ show: false });
      }
    }, 100);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { show } = this.state;
    if (show) {
      return (
        <StyledTokenAdder>
          <StyledButton onClick={this.toggleModal}>Add Token</StyledButton>
          <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.toggleModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <TokenAddModal />
          </Modal>
        </StyledTokenAdder>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = {
  addNameAndSymbolReset
};

TokenAdder = connect(
  null,
  mapDispatchToProps
)(TokenAdder);

export default TokenAdder;
