import React from "react";
import { Info } from "components/Info";
import { shallow } from "enzyme";

const shallowRender = () => shallow(<Info />);

describe("<Info /> component", () => {
  it("Renders basic layout", () => {
    const wrapper = shallowRender();
    expect(wrapper.find(".infoContainer").hostNodes()).toHaveLength(1);
    expect(wrapper.find(".infoContainer .header").hostNodes()).toHaveLength(1);
    expect(wrapper.find(".infoContainer .content").hostNodes()).toHaveLength(2);
  });
});
