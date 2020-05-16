import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

jest.mock("../Icon/icon", () => {
  return () => <i className="fa" />;
});

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const testMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>sub-menu-1</MenuItem>
        <MenuItem disabled>sub-menu-2</MenuItem>
        <MenuItem>sub-menu-3</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
      .lin-submenu {
        display: none;
      }
      .lin-submenu.lin-submenu-open {
        display:block;
      }
    `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disableElement: HTMLElement;

describe("Menu组件和MunuItem组件", () => {
  beforeEach(() => {
    wrapper = render(testMenu(testProps));
    //   添加样式
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disableElement = wrapper.getByText("disabled");
    // jest.useFakeTimers();
  });
  it("默认属性", () => {
    expect(menuElement).toBeInTheDocument();
    //   :scope>li获取当前元素下的子节点li
    expect(menuElement.querySelectorAll(":scope>li").length).toEqual(4);
    expect(activeElement).toHaveClass("lin-menu-item-is-active");
    expect(disableElement).toHaveClass("lin-menu-item-is-disabled");
  });
  it("点击菜单，菜单是否被激活，以及onSelect函数是否被调用", () => {
    const thirdElement = wrapper.getByText("xyz");
    fireEvent.click(thirdElement);
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    expect(activeElement).not.toHaveClass("lin-menu-item-is-active");
    expect(thirdElement).toHaveClass("lin-menu-item-is-active");

    fireEvent.click(disableElement);
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("垂直菜单", () => {
    // 清空之前渲染的节点
    cleanup();
    const wrapper = render(testMenu(testVerProps));
    const menuElemtnt = wrapper.getByTestId("test-menu");
    expect(menuElemtnt).toHaveClass("lin-menu-vertical");
  });

  it("水平下拉菜单", async () => {
    const subMenuElement = wrapper.queryByText("sub-menu-1");
    expect(subMenuElement).toBeFalsy();
    const dropdownElement = wrapper.getByTestId("test-submenu");
    fireEvent.mouseEnter(dropdownElement);

    await wait(() => {
      const subMenuElement = wrapper.getByText("sub-menu-1");
      expect(subMenuElement).toBeVisible();
    });

    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      const subMenuElement = wrapper.getByText("sub-menu-1");
      expect(subMenuElement).not.toBeVisible();
    });
  });

  it("点击水平下拉菜单", async () => {
    const dropdownElement = wrapper.getByTestId("test-submenu");
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      const subMenuElement = wrapper.getByText("sub-menu-1");
      fireEvent.click(subMenuElement);
      expect(subMenuElement).toHaveClass("lin-menu-item-is-active");
      expect(testProps.onSelect).toHaveBeenLastCalledWith("3-0");
    });
  });
});
