import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "../Button/button";

import Message from "./index";
import { MessageType } from "./message";

const MessageWithType = () => {
  const showMessage = (key: MessageType) => {
    Message[key]({
      message: key,
      duration: 1000 * 5,
      onClose: action("onClose"),
    });
  };
  return (
    <div>
      <Button
        className="mr-20"
        onClick={() => {
          showMessage("success");
        }}
      >
        success
      </Button>
      <Button
        className="mr-20"
        onClick={() => {
          showMessage("info");
        }}
      >
        info
      </Button>
      <Button
        className="mr-20"
        onClick={() => {
          showMessage("error");
        }}
      >
        error
      </Button>
      <Button
        className="mr-20"
        onClick={() => {
          showMessage("warning");
        }}
      >
        warning
      </Button>
    </div>
  );
};

storiesOf("Message 全局提示", module)
  .addParameters({
    info: {
      text: `
    ## 引用方法
    ~~~js
    import {Message} from 'lin-react-ui
    ~~~
    `,
    },
  })
  .add("不同类型", MessageWithType);
