import React from "react";

import ReactDOM from "react-dom";

import Message, { NoticesProps } from "./message";

function createNotification() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const notification: any = ReactDOM.render(<Message />, div);
  return {
    addNotice(notice: NoticesProps) {
      return notification.addNotice(notice);
    },
    destory() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
}

let notification: any;

const notice = ({ type, message, duration = 2000, onClose }: any) => {
  if (!notification) notification = createNotification();

  return notification.addNotice({ type, message, duration, onClose });
};

export default {
  info({ message, duration, onClose }: any) {
    return notice({ type: "info", message, duration, onClose });
  },
  success({ message, duration, onClose }: any) {
    return notice({ type: "success", message, duration, onClose });
  },
  error({ message, duration, onClose }: any) {
    return notice({ type: "error", message, duration, onClose });
  },
  warning({ message, duration, onClose }: any) {
    return notice({ type: "warning", message, duration, onClose });
  },
};
