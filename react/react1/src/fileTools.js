/**
 * 文件的操作函数
 */
const fs = require("fs");
const path = require("path");

/**
 *  异步的递归创建目录
 *
 * @param {目录名} dirname
 * @param {回调函数} callback
 */
function mkdirs(dirname, callback) {
  fs.exists(dirname, function(exists) {
    if (exists) {
      const isFunction = Object.is(typeof callback, "function");
      callback && isFunction && callback();
    } else {
      let paths = path.dirname(dirname);
      console.info("dirname: ", paths);
      mkdirs(paths, function() {
        fs.mkdir(dirname, callback);
      });
    }
  });
}

/**
 * 同步的递归创建目录
 *
 * @param {目录名} dirname
 * @return 返回值 boolean
 */
function mkdirsSync(dirname) {
  let isExists = fs.existsSync(dirname);
  console.log(isExists, dirname);
  if (isExists) {
    return true;
  } else {
    let flag = mkdirsSync(path.dirname(dirname));
    if (flag) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

/**
 * 获取文件的绝对路径
 *
 * @param {文件名} fileName
 */
function getFilePath(fileName) {
  return path.normalize(`${__dirname}/${fileName}`);
}

/**
 * 获取文件的后缀和名称
 *
 * @param {文件的路径} fileUrl
 */
function getFileExtName(fileUrl) {
  const fileInfo = path.parse(fileUrl);
  return {
    ext: fileInfo.ext,
    name: fileInfo.name
  };
}

/**
 * 异步读取文件内容
 *
 * @param {文件的路径} fileUrl
 */
function readFileContentsSync(fileUrl) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileUrl, "UTF-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * 提供给外界的读文件接口
 *
 * @param {文件的路径} fileUrl
 */
async function startReadFileContents(fileUrl) {
  let contents = await readFileContentsSync(fileUrl);
  return contents;
}

/**
 * 异步写文件内容
 *
 * @param {文件的路径} fileUrl
 */
function writeFilesSync(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, "UTF-8", err => {
      if (err) {
        reject(err);
      } else {
        resolve("写入完成！");
      }
    });
  });
}

/**
 * 提供给外界的写文件接口
 *
 * @param {文件的路径} fileUrl
 */
async function startWriteFiles(fileName, data) {
  if (!fileName && !data) {
    return "Fail...";
  }
  let contents = await writeFilesSync(fileName, data);
  return contents;
}

/**
 * 同步写文件
 *
 * @param {文件路径} fileUrl
 * @param {文件内容} data
 */
function writeFiles(fileUrl, data) {
  if (!fileUrl && !data) {
    return "Fail...";
  }
  let i = 0;
  fs.writeFile(fileUrl, data, "UTF-8", err => {
    if (err) {
      console.error(err);
      return false;
    }
    console.info("Write File Complated...");
    return true;
  });
}

/**
 * 文件内容替换
 * @param {*} data
 * @param {*} originCon
 * @param {*} nowCon
 */
function fileContentsReplace(data, originCon, nowCon) {
  const reg = new RegExp(originCon, "g");
  let result = data.replace(reg, nowCon);
  return result;
}

async function replaceContents(data, originCon, nowCon) {
  return await fileContentsReplace(data, originCon, nowCon);
}

/**
 * 解析需要遍历的文件夹
 * 例如： let filePath = path.resolve("E:");
 *      调用遍历的方法： fileDisplay(filePath);
 * @param {需要遍历的文件路径} filePath
 * @param {*} collection
 */
function fileDisplay(filePath, collection = []) {
  // 根据文件路径读取文件，返回文件列表
  let list = fs.readdirSync(filePath);
  // 遍历读取文件列表
  list.forEach(function(fileName) {
    // 获取当前的绝对路径
    let filedir = path.join(filePath, fileName);
    // 根据文件路径获取文件信息，返回一个 fs.Stats 对象
    let stat = fs.statSync(filedir);
    let isFile = stat.isFile(); // 是文件
    let isDir = stat.isDirectory(); // 是文件夹
    if (isFile) {
      collection.push(filedir);
    }
    if (isDir) {
      // 递归遍历下面的文件
      fileDisplay(filedir, collection);
    }
  });
  return collection;
}
/**
 * 解析需要遍历的文件
 *
 * @param {文件夹} dir
 */
function filePath(dir) {
  return path.resolve(dir);
}

module.exports = {
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
};
