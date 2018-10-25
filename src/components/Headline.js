// @format
import React from "react";
import styled from "styled-components";

import TokenAdder from "./TokenAdder";

const StyledHeader = styled.div`
  margin-left: 15%;
  width: 70%;
  display: flex;
  align-items: center;
`;

const Headline = props => (
  <StyledHeader>
    <h1>💠 MyCollectibles.io</h1>
    <TokenAdder />
  </StyledHeader>
);

export default Headline;
