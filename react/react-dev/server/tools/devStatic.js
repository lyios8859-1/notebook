const axios = require('axios');
const webapck = require('webpack');
const path = require('path');
const MemoryFileSystem = require('memory-fs');
const mfs = new MemoryFileSystem();
const ReactDomServer = require('react-dom/server');
// http-proxy-middleware 代理插件
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

// 数据控制中心
let createStoreMap = '';

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
  // 解析javascript代码字符串,生成新的模块 server-entry-app.js 默认导出的
  m._compile(bundle, serverConfig.output.filename);
  // 导出该模块,如果没有导出,会使用客户端的渲染,不从服务端获取去渲染
  serverBundle = m.exports.default;
  // 导出数据控制中心 server-entry-app.js 中 createStoreMap() 函数返回的new AppState()对象
  createStoreMap = m.exports.createStoreMap;
});


const baseUrl = 'http://cnodejs.org/api/v1';
async function initialState(stores, url) {
  const result = await axios.get(`${baseUrl}/topics`);
  return Promise.resolve({result: result, status: 200});
}

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
      // 路由上下文
      const routerContext = {};
      /**
        staticHtml 就是如下这个函数信息(返回的服务断的组件)
        const app = (stores, routerContext, url) => {
          console.log(stores, routerContext, url);
          return (
            <Provider {...stores}>
              <StaticRouter context={routerContext} location={url}>
                <App />
              </StaticRouter>
            </Provider>
          );
        };
       */
      const stores = createStoreMap();
      const staticHtml = serverBundle(stores, routerContext, req.url);

      console.log('stores...1', stores.appState.count);
      // 等数据请求回来才渲染页面返回给客户端
      initialState(stores, req.url).then(() => {
        const content = ReactDomServer.renderToString(staticHtml);
        if (routerContext.url) {
          // issue: 解决访问 '/' 根路径可以获取重定向指定的路由页面静态代码(注意: 会使用客户端渲染的代码麻痹开发者哦), 如果没有这个判断的话,
          // 在页面访问是是没有重定向的指定的路由页面的这里是重定向到 /list 路由的,
          // 这样的话 '/' 就会返回302, Respons eHeaders中的Locations: /list
          res.status(302).setHeader('Location', routerContext.url);
          res.end();
          return;
        }
        res.send(template.replace('<!-- app -->', content));
      });
    });
  });
};
