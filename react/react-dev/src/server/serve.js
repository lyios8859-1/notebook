const express = require('express');
const app = express();
const ReactSSR = require('react-dom/server');

const fs = require('fs');
const path = require('path');

const resovePath = function (_path) {
  return path.join(__dirname, _path);
};

const isDev = process.env.NODE_ENV === 'development';
console.log('Environment:', process.env.NODE_ENV);
if (!isDev) {
  // 获取模板
  const templatePath = resovePath('../../dist/index.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  // 获取服务端需要渲染的vue编译后的html
  const serverEntry = require('../../dist/app.server.min.js');

  app.use('/public', express.static(resovePath('../../dist')));

  // * 表示客户端搜有请求
  app.get('*', function (req, res) {
  // commjs2 export default导致: error: Invariant Violation: Objects are not valid as a React child (found: [object Module]). If you meant to render a collection of children, use an array instead.
  // const appString = ReactSSR.renderTotSring(serverEntry);

  // 解决:issue error: Invariant Violation: Objects are not valid as a React child (found: [object Module]). If you meant to render a collection of children, use an array instead.
    const appString = ReactSSR.renderToString(serverEntry.default);
    // <!-- app --> 这个是生成后的文件模板中的
    res.send(template.replace('<!-- app -->', appString));
  });
} else {
  const devStatic = require('./tools/devStatic.js');
  devStatic(app);
}

app.listen(3000, function () {
  console.log('Server is listen: ', 'http://localhost:3000');
});
