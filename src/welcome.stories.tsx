import React from "react";
import { storiesOf } from "@storybook/react";

const Welcome = () => {
  return (
    <>
      <h1>欢迎来到 lin-react-ui 组件库</h1>
      <p>lin-react-ui 是一套基于react+typescript的ui组件库</p>
      <h3>安装试试</h3>
      <p>npm install lin-react-ui --save</p>
      <div>
        <h3>如果有喜欢的欢迎大家去给我点赞</h3>
        <a target="_blank" href="https://github.com/c10342/lin-ui">
          github地址
        </a>
      </div>
      <p>
        <a target="_blank" href="https://www.npmjs.com/package/lin-react-ui">
          npm地址
        </a>
      </p>
    </>
  );
};

storiesOf("开发指南", module).add("欢迎", Welcome, {
  info: {
    disable: true,
  },
});
