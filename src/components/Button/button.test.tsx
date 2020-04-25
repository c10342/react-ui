import React from "react";

import { render, fireEvent } from "@testing-library/react";

import Button, { ButtonProps } from "./button";

describe("Button 组件", () => {
  it("默认Button", () => {
    const testProps: ButtonProps = {
      onClick: jest.fn(),
    };
    const wrapper = render(<Button {...testProps}>hello</Button>);
    const element = wrapper.getByText("hello") as HTMLButtonElement;
    // 元素是否被渲染在文档中
    expect(element).toBeInTheDocument();
    // 判断标签名
    expect(element.tagName).toEqual("BUTTON");
    // 判断是否有类名
    expect(element).toHaveClass("lin-btn-default");
    expect(element).not.toHaveClass("lin-disabled");
    //   触发点击事件
    fireEvent.click(element);
    expect(testProps.onClick).toHaveBeenCalled();

    expect(element.disabled).toBeFalsy();
  });

  it("测试传入不同属性的情况", () => {
    const testProps: ButtonProps = {
      btnType: "primary",
      size: "lg",
      className: "test-name",
    };
    const wrapper = render(<Button {...testProps}>hello</Button>);
    const element = wrapper.getByText("hello") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("lin-btn-primary");
    expect(element).toHaveClass("lin-btn-lg");
    expect(element).toHaveClass("test-name");
  });

  it("测试当btnType为link和href存在的情况", () => {
    const testProps: ButtonProps = {
      btnType: "link",
      href: "http://www.baidu.com",
    };
    const wrapper = render(<Button {...testProps}>Link</Button>);
    const element = wrapper.getByText("Link") as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("lin-btn-link");
  });

  it("测试禁用的情况", () => {
    const testProps: ButtonProps = {
      onClick: jest.fn(),
      disabled: true,
    };
    const wrapper = render(<Button {...testProps}>Disabled</Button>);
    const element = wrapper.getByText("Disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(testProps.onClick).not.toHaveBeenCalled();
  });
});
