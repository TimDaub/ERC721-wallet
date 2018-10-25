// @format
import React from "react";
import styled from "styled-components";

import TokenAdder from "./TokenAdder";

const StyledHeader = styled.div`
  top: 0;
  height: 5vh;
  width: 100%;
  background-color: #212121;
  display: flex;
  align-items: center;
`;

const StyledH3 = styled.h3`
  color: white;
  margin-left: 1em;
`;

const Header = props => (
  <StyledHeader>
    <StyledH3>💠 MyCollectibles.io</StyledH3>
    <TokenAdder />
  </StyledHeader>
);

export default Header;
