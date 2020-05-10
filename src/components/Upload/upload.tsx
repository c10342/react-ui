import React, { FC, ChangeEvent, useRef } from "react";

import axios from "axios";

import Button from "../Button/button";

export interface UploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (data: any, file: File) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
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

  const post = (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (onProgress) {
            onProgress(percentage, file);
          }
        },
      })
      .then((res) => {
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((error) => {
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
  return (
    <div>
      <Button onClick={handleBtnClick} btnType="primary">
        点击上传
      </Button>
      <input
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
        type="file"
      />
    </div>
  );
};

export default Upload;
