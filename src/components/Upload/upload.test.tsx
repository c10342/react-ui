import React from "react";

import axios from "axios";

import {
  render,
  RenderResult,
  fireEvent,
  wait,
  createEvent,
} from "@testing-library/react";

import { Upload, UploadProps } from "./upload";

jest.mock("../Icon/icon", () => {
  return ({ icon, onClick }: { icon: string; onClick: () => void }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "uploadurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

let wrapper: RenderResult;
let fileInput: HTMLInputElement;
let uploadArea: HTMLElement;

const testFile = new File(["xyz"], "test.png", { type: "image/png" });

describe("Upload 组件", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>click to upload</Upload>);
    fileInput = wrapper.container.querySelector("input") as HTMLInputElement;
    uploadArea = wrapper.getByText("click to upload");
  });

  it("点击上传文件", async () => {
    const { queryByText, getByText } = wrapper;
    //   模拟axiospost请求
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    // 上传区域在文档中
    expect(uploadArea).toBeInTheDocument();
    // input:file在文档中不可见
    expect(fileInput).not.toBeVisible();
    // 触发input的change事件
    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    //   loading图标在文档中
    expect(queryByText("spinner")).toBeInTheDocument();

    //   等待文件上传
    await wait(() => {
      // 文件名显示在文档中
      expect(queryByText("test.png")).toBeInTheDocument();
    });

    //   上传成功的图标显示在文档中
    expect(queryByText("check-circle")).toBeInTheDocument();

    //   onSuccess事件被调用
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);

    // onChange事件被调用
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    //   删除图标在文档中
    expect(queryByText("times")).toBeInTheDocument();

    // 点击删除图标
    fireEvent.click(getByText("times"));

    // test.png文件不在文档中
    expect(queryByText("test.png")).not.toBeInTheDocument();

    //   onRemove函数被调用
    expect(testProps.onRemove).toHaveBeenCalledWith(
      // objectContaining判断对象中是否包某些特定属性
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  }, 10000);

  it("拖拽上传", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("lin-dragger-is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("lin-dragger-is-dragover");
    // 模拟拖找事件,fireEvent.drop底层是依赖jsdom的，不支持dataTransfer这个属性
    // fireEvent.drop(uploadArea, {
    //   dataTransfer: {
    //     files: [testFile],
    //   },
    // });
    const mockEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockEvent);

    await wait(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });

    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });
});
