import React, { FC, ChangeEvent, useRef, useState } from "react";

import axios from "axios";

import UploadList from "./uploadList";

import Button from "../Button/button";

import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  /** 文件的唯一标识 */
  uid: string;
  /** 文件的大小 */
  size: number;
  /** 文件名 */
  name: string;
  /** 文件的上传状态 */
  status?: UploadFileStatus;
  /** 文件上传的百分比 */
  percent?: number;
  /** 正在上传的文件对象 */
  raw?: File;
  /** 成功返回的数据 */
  response?: any;
  /** 失败返回的数据 */
  error?: any;
}

export interface UploadProps {
  /** 可扩展类名 */
  className?: string;
  /** 图片上传地址 */
  action: string;
  /** 默认展示的文件列表 */
  defaultFileList?: UploadFile[];
  /** 上传事件 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败回调 */
  onError?: (data: any, file: File) => void;
  /** 文件上传前的回调，返回false则不上传，返回true则继续上传，返回Promise对象则调用Promise返回的文件对象进行上传 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 文件发生变化，上传失败或者上传成功都会触发该回调 */
  onChange?: (file: File) => void;
  /** 删除文件列表项的时候触发 */
  onRemove?: (file: UploadFile) => void;
  /** 上传的请求头 */
  headers?: { [key: string]: any };
  /** 上传的文件名 */
  name?: string;
  /** 其他需要上传的数据 */
  data?: { [key: string]: any };
  /** 是否带上cookie */
  withCredentials?: boolean;
  /** input可接受的文件类型 */
  accept?: string;
  /** 是否支持多文件上传 */
  multiple?: boolean;
  /** 是否可拖拽 */
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    className,
    action,
    defaultFileList,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFile(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const uploadFile = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => post(processedFile));
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObj,
          };
        } else {
          return file;
        }
      });
    });
  };

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
        withCredentials,
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          updateFileList(_file, { percent: percentage, status: "uploading" });
          if (onProgress) {
            onProgress(percentage, file);
          }
        },
      })
      .then((res) => {
        updateFileList(_file, { status: "success", response: res.data });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((error) => {
        updateFileList(_file, { status: "error", error: error });
        if (onError) {
          onError(error, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };

  const handleBtnClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const renderUploadConten = () => {
    if (children) {
      if (drag) {
        return (
          <Dragger onClick={handleBtnClick} onFile={uploadFile}>
            {children}
          </Dragger>
        );
      } else {
        return (
          <div className="lin-upload-content" onClick={handleBtnClick}>
            {children}
          </div>
        );
      }
    } else {
      return (
        <Button onClick={handleBtnClick} btnType="primary">
          点击上传
        </Button>
      );
    }
  };
  return (
    <div className={className}>
      {renderUploadConten()}
      <input
        accept={accept}
        multiple={multiple}
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
        type="file"
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;
