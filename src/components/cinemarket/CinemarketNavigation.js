// @format
import React, { Component } from "react";
import styled from "styled-components";

const StyledNavigationList = styled.ul`
  background-color: ${props => (props.primary ? "#706f6f" : "#4da5d2")}
  margin-bottom:0px;
  width: 27%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledNavigationElement = styled.li`
  font-family: 'Lato', sans-serif;
  height: ${props => (props.height ? props.height : "none")}
  background-color: ${props => (props.primary ? "#706f6f" : "#4da5d2")}
  padding-top: ${props => (props.height ? "none" : "11px")}
  font-size: 15px;
  font-weight: normal;
  color: white;
  display: block;
  &:hover {
    background-color: ${props => (props.primary ? "#706f6f" : "#83c0e0")};
    cursor: pointer;
  }
  & p {
    padding-left: 15px;
    padding-bottom: 11px;
    margin: 0;
  }
  & a {
    color: white;
    text-decoration: none;
    padding-left: 15px;
    padding-bottom: 11px;
    margin: 0;
    display: block;
  }
  &:nth-child(2) {
    margin-top: 20px;
  }
`;

const StyledSubNavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
`;

const StyledSubNavigationElement = styled.li`
  display: block;
  padding-left: 15px;
  padding-top: 6px;
  line-height: 30px;
  color: #337ab7;
  & a {
    text-decoration: none;
    color: #337ab7;
    padding-left: 0;
    padding-bottom: 0;
    &:hover {
      color: #fd6619;
      text-decoration: underline;
    }
  }
`;

class CinemarketNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: {}
    };
  }

  toggleSubmenu(menu) {
    return () => {
      const { menus } = this.state;
      menus[menu] = !menus[menu];
      this.setState({ menus });
    };
  }

  render() {
    return (
      <StyledNavigationList>
        <StyledNavigationElement primary height="60px" />
        <StyledNavigationElement>
          <p onClick={this.toggleSubmenu("dashboard")}>DASHBOARD</p>
          {this.state.menus["dashboard"] ? (
            <StyledSubNavigationList>
              <StyledSubNavigationElement>
                <a href="latest-ads">New listed</a>
              </StyledSubNavigationElement>
              <StyledSubNavigationElement>
                <a href="seller-space/bids-offers">Bids and offers</a>
              </StyledSubNavigationElement>
              <StyledSubNavigationElement>
                <a href="customer-area/wishlist">Followed</a>
              </StyledSubNavigationElement>
              <StyledSubNavigationElement>
                <a href="my-messages">My messages</a>
              </StyledSubNavigationElement>
              <StyledSubNavigationElement>
                <a href="seller-space/catalog">My movies</a>
              </StyledSubNavigationElement>
            </StyledSubNavigationList>
          ) : null}
        </StyledNavigationElement>
        <StyledNavigationElement>
          <a href="customer-area/buy">BUY A LICENSE</a>
        </StyledNavigationElement>
        <StyledNavigationElement>
          <p onClick={this.toggleSubmenu("sell-your-film")}>SELL YOUR FILM</p>
          {this.state.menus["sell-your-film"] ? (
            <StyledSubNavigationList>
              <StyledSubNavigationElement>
                <a href="seller-space/catalog/add">Submission form</a>
              </StyledSubNavigationElement>
            </StyledSubNavigationList>
          ) : null}
        </StyledNavigationElement>
        <StyledNavigationElement>
          <a href="seller-space/pre-sale">PRE-SALES</a>
        </StyledNavigationElement>
        <StyledNavigationElement>
          <a href="customer-area/orders">TRANSACTION HISTORY BUYER</a>
        </StyledNavigationElement>
        <StyledNavigationElement>
          <a href="seller-space/orders">TRANSACTION HISTORY SELLER</a>
        </StyledNavigationElement>
        <StyledNavigationElement>
          <a href="seller-space/payment-information">BANKING INFORMATION</a>
        </StyledNavigationElement>
        <StyledNavigationElement>
          <a href="seller-space/profile">PERSONAL INFORMATION</a>
        </StyledNavigationElement>
      </StyledNavigationList>
    );
  }
}

export default CinemarketNavigation;
