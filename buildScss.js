const cmd = require("node-cmd");
const path = require("path");
const fs = require("fs");
cmd.get(
  `npx node-sass ${path.join(
    __dirname,
    "./src/styles/normal.scss"
  )} ${path.join(__dirname, "./dist/normal.css")}`,
  function (err, data, stderr) {
    console.log("the current working dir is : ", data);
  }
);
const entryDir = path.resolve(__dirname, "./src/components");
const outputDir = path.resolve(__dirname, "./dist/components");
function getScssEntry() {
  let entryMap = {};
  fs.readdirSync(entryDir).forEach(function (pathName) {
    const entryName = path.resolve(entryDir, pathName);
    const outputName = path.resolve(outputDir, pathName);
    let entryFileName = path.resolve(entryName, "index.scss");
    let outputFileName = path.resolve(outputName, "style/index.css");

    entryMap[pathName] = {};
    entryMap[pathName].entry = entryFileName;
    entryMap[pathName].output = outputFileName;
  });

  return entryMap;
}
const entry = getScssEntry();
for (const key in entry) {
  cmd.get(`npx node-sass ${entry[key].entry} ${entry[key].output}`, function (
    err,
    data,
    stderr
  ) {
    console.log("the current working dir is : ", data);
    fs.writeFileSync(
      path.join(__dirname, `./dist/components/${key}/style/css.js`),
      `
          import './index.css'
          import '../../../normal.css'
        `
    );
  });
}
