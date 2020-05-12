import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./upload";
//import Button from '../Button/button'
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
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false;
//   }
//   return true;
// }
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', {type: file.type})
//   return Promise.resolve(newFile)
// }
const SimpleUpload = () => {
  return (
    <Upload
      className="width-500"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("changed")}
      onRemove={action("removed")}
      defaultFileList={defaultFileList}
      multiple={true}
      accept=".png"
    ></Upload>
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
  .add("Upload", SimpleUpload);
