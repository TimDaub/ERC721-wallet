// @format
import React from "react";
import styled from "styled-components";

const StyledInfo = styled.div`
  background-color: #82cdee;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    background-color: #a8dcf3 !important;
    font-family: "Oswald", sans-serif !important;
    font-size: 40px !important;
    color: black !important;
    font-weight: 500;
    padding: 10px 100px;
    margin: 30px 0 30px 0;
  }
`;

const CinemarketInfo = () => (
  <StyledInfo>
    <p>WALLET</p>
  </StyledInfo>
);

export default CinemarketInfo;
