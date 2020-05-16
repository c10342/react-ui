import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./upload";
import Icon from "../Icon/icon";
const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];
const SimpleUpload = () => {
  return (
    <Upload
      className="width-500"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onSuccess={action("success")}
      onChange={action("changed")}
      onRemove={action("removed")}
      defaultFileList={defaultFileList}
      multiple={true}
      accept=".png"
    />
  );
};

const DropUpload = () => {
  return (
    <Upload
      className="width-500"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onSuccess={action("success")}
      onChange={action("changed")}
      onRemove={action("removed")}
      defaultFileList={defaultFileList}
      multiple={true}
      drag={true}
      accept=".png"
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

storiesOf("Upload 上传", module)
  .addParameters({
    info: {
      text: `
    ## 引用方法
    ~~~js
    import {Upload} from 'lin-react-ui
    ~~~
    `,
    },
  })
  .add("点击上传", SimpleUpload)
  .add("拖拽上传", DropUpload);
