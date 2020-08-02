import React from "react";
import { ContactUs } from "components/ContactUs";
import { shallow } from "enzyme";

const shallowRender = () => shallow(<ContactUs />);

describe("<ContactUs /> component", () => {
  it("Renders basic layout", () => {
    const wrapper = shallowRender();
    expect(wrapper.find(".contactUsContainer").hostNodes()).toHaveLength(1);
    expect(
      wrapper.find(".contactUsContainer .header").hostNodes()
    ).toHaveLength(1);
    expect(
      wrapper.find(".contactUsContainer .content").hostNodes()
    ).toHaveLength(2);
  });
});
