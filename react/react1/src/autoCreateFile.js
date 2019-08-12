const path = require("path");
const {
  mkdirs,
  mkdirsSync,
  getFilePath,
  getFileExtName,
  startReadFileContents,
  startWriteFiles,
  replaceContents,
  fileContentsReplace,
  writeFiles,
  fileDisplay
} = require("./fileTools.js");

const tplPath = path.resolve(__dirname, './templates/')
const arrFile = fileDisplay(tplPath);
const reg = RegExp("\\\\", "g");

// 修改该值即可生成新的项目
let myProjecName = "app";

arrFile.forEach(v => {
  let originPath = v.replace(reg, "/"); // ../templates/bulid/README.md
  let filePath = originPath.replace("templates", myProjecName); // ../src/build/README.md
  let uri = filePath.substring(0, filePath.lastIndexOf("/")); // ../src/build
  // let fileName = originPath.substring(originPath.lastIndexOf("/")+1, originPath.length); // README.md

  // 开始读文件
  startReadFileContents(originPath)
    .then(data => {
      // 创建目录
      mkdirsSync(uri);
      // 替换内容
      //let cons = fileContentsReplace(data, "console", "替换后的内容");

      // 写文件
      writeFiles(filePath, data);
    })
    .catch();
});
