const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Koa = require('koa');
const app = new Koa();

// 数据库
const db = 'mongodb://localhost/test';

/* 连接数据库 */
mongoose.Promise = require('bluebird');
mongoose.connect(db, { useMongoClient: true });

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, '/app/models');

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
const walk = function (modelPath) {
  fs.readdirSync(modelPath).forEach(function (file) {
    const filePath = path.join(modelPath, '/' + file)
    const stat = fs.statSync(filePath)

    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(filePath)
      }
    }
    else if (stat.isDirectory()) {
      walk(filePath)
    }
  })
};
walk(models_path);


// require('babel-register');
const Koa = require('koa');
const logger = require('koa-logger');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(logger());
app.use(session(app));
app.use(bodyParser());


/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require('./config/router')();

app.use(router.routes()); // 启用路由
app.use(router.allowedMethods()); // 官方推荐配置, 根据 ctx.status 设置响应头


app.listen(3000);
console.log('app started at port 3000...');