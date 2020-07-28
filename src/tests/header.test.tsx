import React from "react";
import { Header, HeaderProps } from "components/Header";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";

describe("Header component", () => {
  it("Renders self", () => {
    const mockProps: HeaderProps = {
      isDatePickerOpen: false,
      setIsDatePickerOpen: jest.fn(),
    };
    const HeaderComponent = shallow(<Header {...mockProps} />);
    expect(HeaderComponent.find("header.header")).toHaveLength(1);
  });
  it("Renders logo image", () => {
    const mockProps: HeaderProps = {
      isDatePickerOpen: false,
      setIsDatePickerOpen: jest.fn(),
    };
    const HeaderComponent = shallow(<Header {...mockProps} />);
    expect(
      HeaderComponent.find(".headerContent .logoContainer img")
    ).toHaveLength(1);
  });
  it("Renders menu", () => {
    const mockProps: HeaderProps = {
      isDatePickerOpen: false,
      setIsDatePickerOpen: jest.fn(),
    };
    const HeaderComponent = shallow(<Header {...mockProps} />);
    expect(
      HeaderComponent.find(".headerContent .navigation .menuDesktop")
    ).toHaveLength(1);
  });
});
