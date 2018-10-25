// @format
import React, { Component } from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";

import TokenAddModal from "./TokenAddModal";

const StyledTokenAdder = styled.div`
  margin-left: auto;
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

const StyledButton = styled.button`
  font-family: "Ubuntu", sans-serif;
  background-color: black;
  color: white;
  border: none;
  border-radius: 1px;
  padding: 0.5em;
  font-size: 1em;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
    cursor: pointer;
  }
`;

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
    this.setState({ isOpen: !this.state.isOpen });
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
          <StyledModal
            isOpen={this.state.isOpen}
            onBackgroundClick={this.toggleModal}
            onEscapeKeydown={this.toggleModal}
          >
            <TokenAddModal />
          </StyledModal>
        </StyledTokenAdder>
      );
    } else {
      return null;
    }
  }
}

export default TokenAdder;
