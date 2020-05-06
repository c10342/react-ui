import React from "react";

import { render, fireEvent } from "@testing-library/react";

import Input,{InputProps} from "./input";

const props:InputProps={
    onChange:jest.fn(),
    placeholder:'test-input'
}

describe("Input 组件", () => {
  it("默认Input", () => {
    const wrapper = render(<Input {...props} />)
    const inputElement = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('lin-input-inner')
    fireEvent.change(inputElement,{target:{value:'123'}})
    expect(props.onChange).toHaveBeenCalled()
    expect(inputElement.value).toEqual('123')
  });

  it("被禁用Input", () => {
    const wrapper = render(<Input disabled placeholder='test-input'/>)
    const inputElement = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(inputElement.disabled).toBeTruthy()
  });

  it("大小不同的Input", () => {
    const wrapper = render(<Input size='lg' placeholder='lg size'/>)
    const container = wrapper.container.querySelector('.lin-input-wrapper')
    expect(container).toHaveClass('lin-input-size-lg')
  });

  it("带前缀或者后缀的Input", () => {
    const wrapper = render(<Input placeholder='pend' prepend='http://' append='.com'/>)
    const container = wrapper.container.querySelector('.lin-input-wrapper')
    expect(container).toHaveClass('lin-input-group')
    expect(wrapper.queryByText('http://')).toBeInTheDocument()
    expect(wrapper.queryByText('.com')).toBeInTheDocument()
  });
});
