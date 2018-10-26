// @format
import styled from "styled-components";

export default styled.button`
  font-family: "Ubuntu", sans-serif;
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 1px;
  padding: 0.5em;
  font-size: 1em;
  float: ${props => props.float};
  margin: ${props => props.margin};
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
