import React from "react";

import { render, fireEvent } from "@testing-library/react";

import Alert, { AlertProps } from "./alert";

describe("Alert 组件", () => {
  it("测试默认情况", () => {
    const testProps: AlertProps = {
      message: "alert提示语",
      onClose: jest.fn(),
    };
    const wrapper = render(<Alert {...testProps} />);
    const element = wrapper.getByTestId("alert");
    const closeBtn = wrapper.getByTestId("close");
    expect(element).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(element).toHaveClass("lin-alert-success");

    fireEvent.click(closeBtn);
    expect(testProps.onClose).toHaveBeenCalled();
  });

  it("测试传入type的情况", () => {
    const testProps: AlertProps = {
      message: "alert提示语",
      onClose: jest.fn(),
      type: "warning",
    };
    const wrapper = render(<Alert {...testProps} />);
    const element = wrapper.getByTestId("alert");
    const closeBtn = wrapper.getByTestId("close");
    expect(element).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(element).toHaveClass("lin-alert-warning");

    fireEvent.click(closeBtn);
    expect(testProps.onClose).toHaveBeenCalled();
  });

  it("测试不可关闭的情况", () => {
    const testProps: AlertProps = {
      message: "alert提示语",
      closable: false,
    };
    const wrapper = render(<Alert {...testProps} />);
    const element = wrapper.getByTestId("alert");
    const closeBtn = element.querySelector('[data-testid="close"]');
    expect(element).toBeInTheDocument();
    expect(closeBtn).toBeFalsy();
  });
});
