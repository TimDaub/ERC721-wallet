// @format
import React, { Component } from "react";
import Modal from "styled-react-modal";

import TokenAddModal from "./TokenAddModal";

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

class TokenAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Add Token</button>
        <StyledModal
          isOpen={this.state.isOpen}
          onBackgroundClick={this.toggleModal}
          onEscapeKeydown={this.toggleModal}
        >
          <TokenAddModal />
        </StyledModal>
      </div>
    );
  }
}

export default TokenAdder;
