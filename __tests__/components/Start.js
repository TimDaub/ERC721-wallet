// @format
import React from "react";
import { ModalProvider } from "styled-react-modal";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { withRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

import Start from "../../src/components/Start";

describe("Token component renders the token correctly", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Start />);
    expect(wrapper).toMatchSnapshot();
  });
});
