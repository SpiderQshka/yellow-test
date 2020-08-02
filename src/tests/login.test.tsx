import React from "react";
import { Login } from "components/Login";
import { shallow } from "enzyme";
import bearFace from "static/icons/bearFace.svg";

const shallowRender = () => shallow(<Login />);

describe("<Login /> component", () => {
  it("Renders basic layout", () => {
    const wrapper = shallowRender();
    expect(wrapper.find(".loginContainer").hostNodes()).toHaveLength(1);
    expect(
      wrapper.find(".loginContainer .loginContent").hostNodes()
    ).toHaveLength(1);
  });
  it("Renders icon", () => {
    const wrapper = shallowRender();
    expect(wrapper.find(".loginContainer").hostNodes()).toHaveLength(1);
    expect(wrapper.find(".iconContainer img").hostNodes().prop("src")).toBe(
      bearFace
    );
  });
});
