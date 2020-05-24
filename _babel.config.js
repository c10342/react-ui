module.exports = {
  presets: ["react-app"],
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
};

// import { BUtton} from 'antd'

// import Button from 'antd/dist/components/button'
// import 'antd/dist/components/button/css'
