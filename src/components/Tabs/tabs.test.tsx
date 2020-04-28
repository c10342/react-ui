import React from "react";

import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";

import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";

const testTabs = (props: TabsProps = {}) => {
  return (
    <Tabs {...props}>
      <TabItem label="tab1">tab1tab1</TabItem>
      <TabItem label="tab2">tab2tab2</TabItem>
      <TabItem disabled label="tab3">
        tab3tab3
      </TabItem>
    </Tabs>
  );
};

let wrapper: RenderResult;
let element: HTMLElement;
let activeTab: HTMLElement;
let otherTab: HTMLElement;
let disabledTab: HTMLElement;
let content: HTMLElement;

let testProps: TabsProps = {
  onSelect: jest.fn(),
};

describe("Tabs组件和TabItem组件", () => {
  beforeEach(() => {
    wrapper = render(testTabs(testProps));
    element = wrapper.getByTestId("test-tabs");
    activeTab = wrapper.getByText("tab1");
    otherTab = wrapper.getByText("tab2");
    disabledTab = wrapper.getByText("tab3");
    content = wrapper.getByTestId("test-tabs-content");
  });
  it("默认属性", () => {
    // const wrapper = render(testTabs());
    // const element = wrapper.getByTestId("test-tabs");
    // const activeTab = wrapper.getByText("tab1");
    // const otherTab = wrapper.getByText("tab2");
    // const content = wrapper.getByTestId("test-tabs-content");
    expect(element).toBeInTheDocument();
    expect(activeTab).toHaveClass("lin-tab-item-active");
    expect(activeTab).toHaveClass("lin-tab-item-line");
    expect(otherTab).toHaveClass("lin-tab-item-line");
    expect(otherTab).not.toHaveClass("lin-tab-item-active");
    expect(disabledTab).toHaveClass("lin-tab-item-disabled");
    expect(content).toHaveTextContent("tab1tab1");
  });

  it("点击菜单，菜单是否被激活，onSelect函数是否被调用", () => {
    fireEvent.click(otherTab);

    expect(otherTab).toHaveClass("lin-tab-item-active");
    expect(activeTab).not.toHaveClass("lin-tab-item-active");
    expect(content).toHaveTextContent("tab2tab2");

    expect(testProps.onSelect).toHaveBeenCalledWith(1);

    fireEvent.click(disabledTab);
    expect(otherTab).toHaveClass("lin-tab-item-active");
    expect(disabledTab).not.toHaveClass("lin-tab-item-active");
    expect(testProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("type=card的情况", () => {
    cleanup();
    const wrapper = render(testTabs({ type: "card" }));
    const element = wrapper.getByTestId("test-tabs");
    const activeTab = wrapper.getByText("tab1");
    const otherTab = wrapper.getByText("tab2");
    expect(element).toBeInTheDocument();
    expect(activeTab).toHaveClass("lin-tab-item-card");
    expect(otherTab).toHaveClass("lin-tab-item-card");
  });
});
