import React from "react";
import {
  UpdateJogModal,
  UpdateJogModalProps,
} from "components/Modals/UpdateJogModal";
import { shallow, mount } from "enzyme";
import { FormattedJogItem } from "types";

const shallowRender = (params?: UpdateJogModalProps) => {
  const mockProps: UpdateJogModalProps = {
    updateJog: jest.fn(),
    isModalOpen: false,
    setIsModalOpen: jest.fn(),
    jogForUpdate: {} as FormattedJogItem,
    ...params,
  };
  return shallow(<UpdateJogModal {...mockProps} />);
};

const fullRender = (params?: UpdateJogModalProps) => {
  const mockProps: UpdateJogModalProps = {
    updateJog: jest.fn(),
    isModalOpen: false,
    setIsModalOpen: jest.fn(),
    jogForUpdate: {} as FormattedJogItem,
    ...params,
  };
  return mount(<UpdateJogModal {...mockProps} />);
};

describe("<UpdateJogModal /> component", () => {
  it("Renders basic layout", () => {
    const wrapper = shallowRender({
      isModalOpen: true,
      updateJog: () => {},
      setIsModalOpen: () => {},
      jogForUpdate: {} as FormattedJogItem,
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
    } as UpdateJogModalProps);

    expect(wrapper.find(".modalContainer").hostNodes()).toHaveLength(1);
  });
  it("Calls 'setIsModalOpen' after 'closeModalBtn' was clicked", () => {
    const mockFunc = jest.fn();
    const wrapper = fullRender({
      isModalOpen: true,
      updateJog: () => {},
      setIsModalOpen: mockFunc,
      jogForUpdate: {} as FormattedJogItem,
    });

    expect(mockFunc.mock.calls.length).toBe(0);
    wrapper.find(".closeModalBtn").hostNodes().simulate("click");
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
