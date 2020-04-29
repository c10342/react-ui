const cmd = require("node-cmd");
const path = require("path");
const fs = require("fs");
const entryDir = path.resolve(__dirname, "./src/components");
const outputDir = path.resolve(__dirname, "./dist/components");
function getScssEntry() {
  let entryMap = {};
  fs.readdirSync(entryDir).forEach(function (pathName) {
    const entryName = path.resolve(entryDir, pathName);
    const outputName = path.resolve(outputDir, pathName);
    let entryFileName = path.resolve(entryName, "_style.scss");
    let outputFileName = path.resolve(outputName, "style/index.css");

    entryMap[pathName] = {};
    entryMap[pathName].entry = entryFileName;
    entryMap[pathName].output = outputFileName;
  });

  return entryMap;
}
const entry = getScssEntry();
let buildArr = [];
for (const key in entry) {
  const promise = new Promise((resolve, reject) => {
    cmd.get(`npx node-sass ${entry[key].entry} ${entry[key].output}`, function (
      err,
      data,
      stderr
    ) {
      if (err) {
        reject(err);
        return;
      }
      console.log("the current working dir is : ", data);
      fs.writeFileSync(
        path.join(__dirname, `./dist/components/${key}/style/css.js`),
        "import './index.css'"
      );
      resolve();
    });
  });
  buildArr.push(promise);
}

Promise.all(buildArr)
  .then(() => {
    console.log("build success");
  })
  .catch((e) => {
    console.log(e);
  });
