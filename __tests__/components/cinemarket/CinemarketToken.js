// @format
import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import CinemarketToken from "../../../src/components/cinemarket/CinemarketToken";

describe("Token component renders the token correctly", () => {
  it("renders correctly", () => {
    const token = {
      name: "Token",
      image: "https://example.com/image.jpg",
      description: "nft description"
    };
    const tokenId = 123;
    const name = "nft name";
    const contract = "0xabc";
    const modals = {};
    const toggleModal = () => {};
    const account = "0xabc";
    const wrapper = shallow(
      <CinemarketToken
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
