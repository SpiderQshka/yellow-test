import React from "react";
import { Header, HeaderProps } from "components/Header";
import { shallow, mount } from "enzyme";
import logo from "static/icons/logo.svg";
import filter from "static/icons/filter.svg";
import filterActive from "static/icons/filterActive.svg";

const shallowRender = (params?: HeaderProps) => {
  const mockProps: HeaderProps = {
    isDatePickerOpen: false,
    setIsDatePickerOpen: jest.fn(),
    ...params,
  };
  return shallow(<Header {...mockProps} />);
};

const fullRender = (params?: HeaderProps) => {
  const mockProps: HeaderProps = {
    isDatePickerOpen: false,
    setIsDatePickerOpen: jest.fn(),
    ...params,
  };
  return mount(<Header {...mockProps} />);
};

describe("<Header /> component", () => {
  it("Renders basic layout", () => {
    const wrapper = shallowRender();
    expect(wrapper.find("header.header").hostNodes()).toHaveLength(1);
    expect(
      wrapper.find("header.header .headerContent").hostNodes()
    ).toHaveLength(1);
    expect(
      wrapper.find("header.header .headerContent .navigation").hostNodes()
    ).toHaveLength(1);
  });
  it("Renders logo", () => {
    const wrapper = fullRender();

    expect(
      wrapper.find("header.header .headerContent .logoContainer").hostNodes()
    ).toHaveLength(1);

    expect(
      wrapper
        .find("header.header .headerContent .logoContainer img")
        .hostNodes()
    ).toHaveLength(1);

    expect(
      wrapper
        .find("header.header .headerContent .logoContainer img")
        .hostNodes()
        .prop("src")
    ).toBe(logo);
  });
  it("Renders header buttons", () => {
    const wrapper = shallowRender();
    expect(
      wrapper
        .find("header.header .headerContent .navigation .btnsContainer")
        .hostNodes()
    ).toHaveLength(1);
    expect(
      wrapper
        .find("header.header .headerContent .navigation .btnsContainer .btnFab")
        .hostNodes()
    ).toHaveLength(2);
    expect(
      wrapper
        .find(
          "header.header .headerContent .navigation .btnsContainer .filterBtn"
        )
        .hostNodes()
    ).toHaveLength(1);
    expect(
      wrapper
        .find(
          "header.header .headerContent .navigation .btnsContainer .menuBtn"
        )
        .hostNodes()
    ).toHaveLength(1);
  });
  it("Renders menu", () => {
    const wrapper = shallowRender();
    expect(
      wrapper
        .find("header.header .headerContent .navigation .menuDesktop")
        .hostNodes()
    ).toHaveLength(1);
    expect(
      wrapper
        .find("header.header .headerContent .navigation .menuMobile")
        .hostNodes()
    ).toHaveLength(1);
    expect(
      wrapper
        .find("header.header .headerContent .navigation .menuDesktop .item")
        .hostNodes()
    ).toHaveLength(3);
    expect(
      wrapper
        .find("header.header .headerContent .navigation .menuMobile .item")
        .hostNodes()
    ).toHaveLength(3);
  });
  it("Changing filter button icon depending on prop 'isDatePickerOpen'", () => {
    const wrapper = fullRender();
    expect(wrapper.find(".filterBtn img").hostNodes().prop("src")).toBe(filter);
    wrapper.setProps({
      isDatePickerOpen: true,
    } as HeaderProps);
    expect(wrapper.find(".filterBtn img").hostNodes().prop("src")).toBe(
      filterActive
    );
  });
  it("Calls 'setIsDatePickerOpen' after '.filterBtn' was clicked", () => {
    const mockFunc = jest.fn();
    const wrapper = fullRender({
      isDatePickerOpen: false,
      setIsDatePickerOpen: mockFunc,
    });

    expect(mockFunc.mock.calls.length).toBe(0);
    wrapper.find(".filterBtn").hostNodes().simulate("click");
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
