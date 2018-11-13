// @format
import styled from "styled-components";

export default styled.button`
  font-family: "Ubuntu", sans-serif;
  background-color: ${props => (props.secondary ? "white" : "black")};
  color: ${props => (props.secondary ? "black" : "white")};
  border: 1px solid black;
  border-radius: 1px;
  padding: 0.5em;
  font-size: 1em;
  float: ${props => props.float};
  margin: ${props => props.margin};
  width: ${props => props.width};
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${props => (props.secondary ? "black" : "white")};
    border: 1px solid black;
    color: ${props => (props.secondary ? "white" : "black")};
    cursor: pointer;
  }
  &:disabled {
    background-color: #fafafa;
    border: 1px solid #bdbdbd;
    color: #bdbdbd;
    &:hover {
      color: #bdbdbd;
      cursor: not-allowed !important;
    }
  }
`;
