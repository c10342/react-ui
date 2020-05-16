import React from "react";

import { render } from "@testing-library/react";

import { Progress } from "./progress";

describe("Progress组件", () => {
  it("默认属性", () => {
    const wrapper = render(<Progress percent={50} />);

    const innerBar = wrapper.getByText("50%");

    const outBar = wrapper.container.querySelector(
      ".lin-progress-bar-outer"
    ) as HTMLElement;

    expect(innerBar).toBeInTheDocument();

    expect(
      wrapper.container.querySelector(".lin-progress-bar-inner")
    ).toHaveClass("lin-inner-color-primary");

    expect(outBar.style.height).toBe("15px");
  });

  it("其他属性", () => {
    const wrapper = render(
      <Progress showText={false} strokeHeight={20} percent={50} theme="dark" />
    );

    const innerBar = wrapper.queryByText("50%");

    const outBar = wrapper.container.querySelector(
      ".lin-progress-bar-outer"
    ) as HTMLElement;

    expect(innerBar).not.toBeInTheDocument();

    expect(
      wrapper.container.querySelector(".lin-progress-bar-inner")
    ).toHaveClass("lin-inner-color-dark");

    expect(outBar.style.height).toBe("20px");
  });
});
