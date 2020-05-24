
## lin-react-ui

这是一套基于react+typescript的ui组件库

### 安装

使用 npm 或 yarn 安装

```shell script
npm install lin-react-ui --save

yarn add lin-react-ui
```

### 使用

- 全量引入

引用样式
```javascript
import 'lin-react-ui/dist/index.css';
```

使用组件
```javascript
import { Button } from 'lin-react-ui';

ReactDOM.render(<Button />, mountNode);
```

- 按需加载

下面两种方式都可以只加载用到的组件。

使用 babel-plugin-import（推荐）
```shell script
npm install babel-plugin-import -D
```
```javascript
// .babelrc.js
  plugins: [
    [
      "import",
      {
        libraryName: "lin-react-ui",
        camel2DashComponentName: false, // 是否需要驼峰转短线
        camel2UnderlineComponentName: false, // 是否需要驼峰转下划线
        libraryDirectory: "dist/components",
        style: "css",
      },
    ],
  ],
```
然后只需从 lin-react-ui 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。
```javascript
// babel-plugin-import 会帮助你加载 JS 和 CSS
import { Button } from 'lin-react-ui';
```


手动引入
```javascript
import Button from 'lin-react-ui/components/Button'; // 加载 JS
import 'lin-react-ui/components/Button/style/css'; // 加载 CSS
```

