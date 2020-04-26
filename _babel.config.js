module.exports = {
  presets: ["react-app"],
  plugins: [
    [
      "import",
      {
        libraryName: "lin-ui",
        camel2DashComponentName: false, // 是否需要驼峰转短线
        camel2UnderlineComponentName: false, // 是否需要驼峰转下划线
        customName: function (name) {
          console.log(name);

          return `lin-ui/dist/components/${name}`;
        },
        style: "css",
      },
    ],
    // ["import", {
    //   "libraryName": "antd",
    //   "libraryDirectory": "es",
    //   "style": "css" // `style: true` 会加载 less 文件
    // }]
  ],
};

// import { BUtton} from 'antd'

// import Button from 'antd/dist/components/button'
// import 'antd/dist/components/button/css'
