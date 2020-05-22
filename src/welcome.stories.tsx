import React from "react";
import { storiesOf } from "@storybook/react";

const Welcome = () => {
  return (
    <>
      <h1>欢迎来到 lin-react-ui 组件库</h1>
      <p>lin-react-ui 是一套基于react+typescript的ui组件库</p>
      <h3>安装试试</h3>
      <code>npm install lin-react-ui --save</code>
    </>
  );
};

const UseGuide = () => {
  return <p></p>;
};

storiesOf("开发指南", module).add("欢迎", Welcome, {
  info: {
    disable: true,
  },
});
// .add("快速上手", UseGuide, {
//   info: {
//     // disable: true,
//     text: `
//     ## 安装
//     ~~~js
//     npm install lin-react-ui --save
//     ~~~
//     ~~~js
//     yarn add lin-react-ui
//     ~~~
//     `,
//   },
// });
