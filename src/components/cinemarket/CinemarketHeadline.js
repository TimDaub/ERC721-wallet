// @format
import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";

const StyledHeadline = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & a {
    color: #c5c5c5;
    margin-left: 1.5em;
  }
`;

const StyledImage = styled.img`
  display: inline-block;
  margin-left: 25%;
  margin-right: 25%;
  height: 30px;
`;

const CinemarketHeadline = () => (
  <StyledHeadline>
    <StyledImage src="./assets/logo-cinemarket.png" />
    <a href="../cart">
      <FontAwesomeIcon icon={faShoppingCart} />
    </a>
    <a href="../logout">
      <FontAwesomeIcon icon={faSignOutAlt} />
    </a>
  </StyledHeadline>
);

export default CinemarketHeadline;
