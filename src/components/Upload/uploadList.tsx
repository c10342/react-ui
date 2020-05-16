import React, { FC } from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";

import Progress from "../Progress/progress";

interface UploadListProps {
  /** 文件列表 */
  fileList: UploadFile[];
  /** 文件被移除的时候触发的回调函数 */
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="lin-upload-list">
      {fileList.map((item) => {
        return (
          <li className="lin-upload-list-item" key={item.uid}>
            <span className={`lin-file-name lin-file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="lin-file-status">
              {(item.status === "uploading" || item.status === "ready") && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="lin-file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            <Progress percent={item.percent || 0} />
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
