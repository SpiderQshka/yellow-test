import React from "react";
import { Jogs, JogsProps } from "components/Jogs";
import { shallow, mount } from "enzyme";
import { Loader } from "components/Loader";

const shallowRender = (params?: JogsProps) => {
  const mockProps: JogsProps = {
    isDatePickerOpen: false,
    ...params,
  };
  return shallow(<Jogs {...mockProps} />);
};

const fullRender = (params?: JogsProps) => {
  const mockProps: JogsProps = {
    isDatePickerOpen: false,
    ...params,
  };
  return mount(<Jogs {...mockProps} />);
};

describe("<Jogs /> component", () => {
  it("Renders basic layout", () => {
    const wrapper = shallowRender();
    expect(wrapper.find(".jogsPlaceholderContainer").hostNodes()).toHaveLength(
      1
    );
    expect(wrapper.contains(<Loader />)).toBe(true);
  });
});
