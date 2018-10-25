// @format
import React from "react";
import { ModalProvider } from "styled-react-modal";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Token from "../../src/components/Token";

describe("Token component renders the token correctly", () => {
  it("renders correctly", () => {
    const token = {
      name: "Token",
      image: "https://example.com/image.jpg"
    };
    const tokenId = 123;
    const name = "nft name";
    const contract = "0xabc";
    const modals = {};
    const toggleModal = () => {};
    const account = "0xabc";
    const wrapper = shallow(
      <Token
        token={token}
        tokenId={tokenId}
        name={name}
        contract={contract}
        modals={modals}
        toggleModal={toggleModal}
        account={account}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
