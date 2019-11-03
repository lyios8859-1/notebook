const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const resovePath = function (_path) {
  return path.join(__dirname, _path);
};

const config = webpackMerge(baseConfig, {
  entry: {
    app: resovePath('../src/App.js')
  },
  output: {
    filename: '[name].[hash:8].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html', // 生成的入口文件的名字，默认就是index.html
      template: resovePath('../tpl.html'), // 有时候，插件自动生成的html文件，并不是我们需要结构，我们需要给它指定一个模板，让插件根据我们给的模板生成html
      inject: 'body' // true, body, head, false----true:默认值，script标签位于html文件的 body 底部 body:同true head:插入的js文件位于head标签内 false:不插入生成的js文件，只生成一个纯html
    })
  ]
});
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  config.entry = {
    // 热替换(局部替换,不用刷新页面)
    app: [
      'react-hot-loader/patch',
      /** 入口 */
      resovePath('../src/App.js')
    ]
  };
  config.devServer = {
    host: '0.0.0.0', // 任意方式访问,127.0.0.1 或 localhost:
    port: '8888',
    overlay: { // 网页显示错误提示
      errors: true
    },
    contentBase: resovePath('../dist'), // 就是 output.path 值一致, 其实可以不一样(不一样的话对热更替不起作用),如果一样,就把编译成生成dist目录删掉,否这开发环境启动会报找不到静态文件.如 src:'/public/app.3434dfsas.js'
    // historyApiFallback与publicPath 解决开发环境中 html 中的静态引入的路径不对问题, 如 src:'/public/app.3434dfsas.js'
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html' // 请求出错进入的页面
    },
    // 热替换 配合插件 HotModuleReplacementPlugin, 在 plugins 中添加new webpack.HotModuleReplacementPlugin()
    // .babelr 中配置 "plugins": ["react-hot-loader/babel"]
    hot: true,
    open: true,
    hotOnly: true,
    /**
      但是通过日志发现页面先热更新然后又自动刷新，这和自动刷新是一样的。
      如果只需要触发HMR，可以再加个参数 hotOnly:true,这时候只有热更新，禁用了自动刷新功能。
      如果需要自动刷新就不需要设置热更新。
     */
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
  config.resolve = {
    alias: {
    // 解决 issue: React-Hot-Loader: react-hot-dom patch is not detected. React 16.6+ features may not work.
      'react-dom': '@hot-loader/react-dom'
    }
  };
  // 热更替没有起作用的原因(contentBase: resovePath('../dist'), 的路径和output.path的路径不一样)
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
  config.plugins.push(new webpack.NamedModulesPlugin());
}

module.exports = config;
