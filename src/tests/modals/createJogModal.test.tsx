import React from "react";
import {
  CreateJogModal,
  CreateJogModalProps,
} from "components/Modals/CreateJogModal";
import { shallow, mount } from "enzyme";

const shallowRender = (params?: CreateJogModalProps) => {
  const mockProps: CreateJogModalProps = {
    addJog: jest.fn(),
    isModalOpen: false,
    setIsModalOpen: jest.fn(),
    ...params,
  };
  return shallow(<CreateJogModal {...mockProps} />);
};

const fullRender = (params?: CreateJogModalProps) => {
  const mockProps: CreateJogModalProps = {
    addJog: jest.fn(),
    isModalOpen: false,
    setIsModalOpen: jest.fn(),
    ...params,
  };
  return mount(<CreateJogModal {...mockProps} />);
};

describe("<CreateJogModal /> component", () => {
  it("Renders basic layout", () => {
    const wrapper = shallowRender({
      isModalOpen: true,
      addJog: () => {},
      setIsModalOpen: () => {},
    });
    expect(wrapper.find(".modalContainer").hostNodes()).toHaveLength(1);
    expect(wrapper.find(".modalContainer .modal").hostNodes()).toHaveLength(1);
    expect(
      wrapper.find(".modalContainer .modal .form").hostNodes()
    ).toHaveLength(1);
    expect(
      wrapper.find(".modalContainer .modal .form .inputContainer").hostNodes()
    ).toHaveLength(3);
    expect(
      wrapper
        .find(".modalContainer .modal .form .inputContainer .inputLabel")
        .hostNodes()
    ).toHaveLength(3);
    expect(
      wrapper
        .find(".modalContainer .modal .form .inputContainer .input")
        .hostNodes()
    ).toHaveLength(3);
  });
  it("Renders modal if prop 'isModalOpen' === true, otherwise doesn't", () => {
    const wrapper = fullRender();
    expect(wrapper.find(".modalContainer").hostNodes()).toHaveLength(0);

    wrapper.setProps({
      isModalOpen: true,
    } as CreateJogModalProps);

    expect(wrapper.find(".modalContainer").hostNodes()).toHaveLength(1);
  });
  it("Calls 'setIsModalOpen' after 'closeModalBtn' was clicked", () => {
    const mockFunc = jest.fn();
    const wrapper = fullRender({
      isModalOpen: true,
      addJog: () => {},
      setIsModalOpen: mockFunc,
    });

    expect(mockFunc.mock.calls.length).toBe(0);
    wrapper.find(".closeModalBtn").hostNodes().simulate("click");
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
