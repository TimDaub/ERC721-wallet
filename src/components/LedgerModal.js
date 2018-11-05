// @format
import React, { Component } from "react";
import Modal from "react-modal";

class LedgerModal extends Component {
  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
      }
    };

    const { isOpen, toggleModal } = this.props;
    return (
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <h1>Select an Address</h1>
        </Modal>
      </div>
    );
  }
}

export default LedgerModal;
