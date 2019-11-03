const axios = require('axios');
const webapck = require('webpack');
const path = require('path');
const MemoryFileSystem = require('memory-fs');
const mfs = new MemoryFileSystem();
const ReactDomServer = require('react-dom/server');
const proxy = require('http-proxy-middleware');
const serverConfig = require('../../build/webpack.config.server.js');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    // webpack开发的静态文件
    axios.get('http://127.0.0.1:8888/public/index.html').then((res) => {
      resolve(res.data);
    }).catch(err => {
      reject(new Error(err));
    });
  });
};

// 存放读取的内容
let serverBundle = '';
// 获取 module 模块的构造函数
const Module = module.constructor;

// 启动一个webpack的编译
const serverCompiler = webapck(serverConfig);
// 这个绝对不能写错,否在会吧文件写到磁盘
serverCompiler.outputFileSystem = mfs;

// 监听文件变化处理
serverCompiler.watch({
  publicPath: serverConfig.output.path
}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  // 打印提示信息
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(err => console.error(err));
  // 获取编译好的文件路径
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );
  // 不建议把文件写到磁盘,所以使用到插件 memory-fs 模块把文件内容写到内存
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = new Module();
  // 解析javascript代码字符串,生成新的模块
  m._compile(bundle, serverConfig.output.filename);
  // 导出该模块,如果没有导出,会使用客户端的渲染,不从服务端获取去渲染
  serverBundle = m.exports.default;
});

// issue: Uncaught SyntaxError: Unexpected token '<',
// 原因: 是页面index.html的引用这个便以后的app.[hash].js文件问题,它引用的磁盘上的文件,我们把该js文件写到了内存,
// 解决: 因此借助插件处理一下, http-proxy-middleware

module.exports = function (app) {
  // 通过代理到npm run dev:client 启动的服务里
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }));
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle);
      res.send(template.replace('<!-- app -->', content));
    });
  });
};
