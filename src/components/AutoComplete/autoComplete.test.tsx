import React from "react";

import { config } from "react-transition-group";

import {
  render,
  RenderResult,
  fireEvent,
  wait,
  cleanup,
} from "@testing-library/react";

import { AutoComplete, AutoCompleteProps } from "./autoComplete";

const mockData = () => {
  const arr = [];
  for (let i = 0; i < 11; i++) {
    arr.push({
      login: i,
    });
  }
  return arr;
};

config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe("AutoComplete 组件", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });

  it("基本行为", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    expect(
      wrapper.container.querySelectorAll(".lin-suggstions-item").length
    ).toBe(2);
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("ab");
  });

  it("键盘事件", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");

    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("lin-suggstions-active");
    expect(secondResult).not.toHaveClass("lin-suggstions-active");

    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).not.toHaveClass("lin-suggstions-active");
    expect(secondResult).toHaveClass("lin-suggstions-active");

    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("lin-suggstions-active");
    expect(secondResult).not.toHaveClass("lin-suggstions-active");

    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(firstResult).not.toBeInTheDocument();
  });

  it("鼠标点击外面，下拉菜单收起", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("自定义下拉选项", async () => {
    cleanup();
    const wrapper = render(
      <AutoComplete
        {...testProps}
        renderOptions={(item) => <h1>{item.value}</h1>}
      />
    );
    const inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.container.querySelector("h1")).toBeTruthy();
    });
  });

  it("异步操作", async () => {
    cleanup();
    const fetch1 = (url: string) => {
      return Promise.resolve({ items: mockData() });
    };
    const testProps: AutoCompleteProps = {
      fetchSuggestions: (query: string) => {
        return fetch1("https://api.github.com/search/users?q=" + query).then(
          ({ items }) => {
            return items
              .slice(0, 10)
              .map((item: any) => ({ value: item.login, ...item }));
          }
        );
      },
      onSelect: jest.fn(),
      placeholder: "auto-complete",
    };
    const wrapper = render(<AutoComplete {...testProps} />);
    const inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(
        wrapper.container.querySelectorAll(".lin-suggstions-item").length
      ).toBe(10);
    });
  }, 100000);
});
