import React from "react";

import { storiesOf } from "@storybook/react";

import Progress from "./progress";

const ProgressWithTheme = () => {
  return (
    <div className="width-500">
      <div className="mb-20">
        <Progress percent={20} theme="success" />
      </div>
      <div className="mb-20">
        <Progress percent={40} theme="warning" />
      </div>
      <div className="mb-20">
        <Progress percent={60} theme="primary" />
      </div>
      <div className="mb-20">
        <Progress percent={80} theme="dark" />
      </div>
      <div className="mb-20">
        <Progress percent={100} theme="info" />
      </div>
    </div>
  );
};

const ProgressWithHeight = () => {
  return (
    <div className="width-500">
      <div className="mb-20">
        <Progress percent={20} theme="success" strokeHeight={10} />
      </div>
      <div className="mb-20">
        <Progress percent={40} theme="warning" strokeHeight={20} />
      </div>
      <div className="mb-20">
        <Progress percent={60} theme="primary" strokeHeight={30} />
      </div>
      <div className="mb-20">
        <Progress percent={80} theme="dark" strokeHeight={40} />
      </div>
      <div className="mb-20">
        <Progress percent={100} theme="info" strokeHeight={50} />
      </div>
    </div>
  );
};

storiesOf("Progress 进度条", module)
  .addParameters({
    info: {
      text: `
    ## 引用方法
    ~~~js
    import {Progress} from 'lin-react-ui
    ~~~
    `,
    },
  })
  .add("不同主题色", ProgressWithTheme)
  .add("不同高度", ProgressWithHeight);
