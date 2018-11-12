// @format
import React from "react";
import styled from "styled-components";

import TokenAdder from "./TokenAdder";
import NetworkIndicator from "./NetworkIndicator";

const StyledHeader = styled.div`
  margin-left: 15%;
  width: 70%;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-left: auto;
`;

const Headline = props => (
  <StyledHeader>
    <h1>💠 MyCollectibles.io</h1>
    <Wrapper>
      {window.location.pathname === "/wallet" &&
      new URLSearchParams(window.location.search).get("provider") ===
        "ledger" ? (
        <NetworkIndicator />
      ) : null}
      <TokenAdder />
    </Wrapper>
  </StyledHeader>
);

export default Headline;
