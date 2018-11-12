// @format
import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const StyledNetworkIndicator = styled.div`
  display: inline-block;
  margin-right: 1em;
`;

class NetworkIndicator extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const networkSelected = urlParams.get("network");
    this.state = {
      networkSelected: {
        label:
          networkSelected &&
          networkSelected.charAt(0).toUpperCase() + networkSelected.slice(1),
        value: networkSelected
      }
    };

    this.onNetworkSelected = this.onNetworkSelected.bind(this);
  }

  onNetworkSelected(networkSelected) {
    this.setState({ networkSelected });
  }

  componentDidUpdate(prevProps, prevState) {
    const { networkSelected } = this.state;
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider") || "ledger";
    const path = urlParams.get("path") || "44'/60'/0'/0";

    if (prevState.networkSelected.value !== networkSelected.value) {
      this.props.history.push({
        pathname: "wallet",
        search: `?provider=${provider}&path=${path}&network=${
          networkSelected.value
        }`
      });
      // TODO: Do this in a more graceful way
      window.location.reload();
    }
  }

  render() {
    const { networkSelected } = this.state;
    const options = [
      { value: "mainnet", label: "Mainnet" },
      { value: "rinkeby", label: "Rinkeby" }
    ];

    return (
      <StyledNetworkIndicator>
        <Dropdown
          options={options}
          value={networkSelected}
          defaultValue={options[0]}
          onChange={this.onNetworkSelected}
          placeholder="Select a network"
        />
      </StyledNetworkIndicator>
    );
  }
}

export default withRouter(NetworkIndicator);
