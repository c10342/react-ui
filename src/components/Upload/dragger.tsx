import React, { FC, useState, DragEvent, MouseEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  /** 拖拽文件的回调函数 */
  onFile: (files: FileList) => void;
  /** 点击拖拽面板的回调函数 */
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children, onClick } = props;
  const [dragOver, setDragOver] = useState(false);
  const klass = classNames("lin-uploader-dragger", {
    "lin-dragger-is-dragover": dragOver,
  });
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleOnclick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
      onClick={handleOnclick}
    >
      {children}
    </div>
  );
};

export default Dragger;
