import React, { Component } from "react";

export type MessageType = "success" | "error" | "info" | "warning";

export interface NoticesProps {
  key: string;
  type: MessageType;
  message: string;
  duration?: number;
  onClose?: (key: string) => void;
}

export interface StateProps {
  notices: NoticesProps[];
  name?: string;
}

export class Message extends Component {
  state: StateProps = {
    notices: [],
  };

  getNoticeKey() {
    const { notices } = this.state;
    return `notice-${Date.now()}-${notices.length}`;
  }

  addNotice(notice: NoticesProps) {
    let { notices } = this.state;
    notices = notices.slice();
    notice.key = this.getNoticeKey();
    notices.push(notice);
    this.setState({
      notices,
    });
    if (notice.duration && notice.duration > 0) {
      setTimeout(() => {
        this.removeNotice(notice.key);
      }, notice.duration);
    }

    return () => {
      this.removeNotice(notice.key);
    };
  }

  removeNotice(key: string) {
    let { notices } = this.state;
    notices = notices.slice().filter((notice) => {
      if (notice.key === key) {
        if (notice.onClose) notice.onClose(key);
        return false;
      }
      return true;
    });
    this.setState({
      notices,
    });
  }

  render() {
    const { notices } = this.state;
    return (
      <div className="lin-message">
        {notices.map((item) => (
          <div
            className={`lin-message-${item.type} lin-message-item`}
            key={item.key}
          >
            {item.message}
          </div>
        ))}
      </div>
    );
  }
}

export default Message;
