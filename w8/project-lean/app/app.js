var path = require('path');
var express = require('express');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

// 路由引入
var index = require('./routes/index');
var upload = require('./routes/upload');

// 初始化express
var app = express();

// 视图模板handlbars引擎
var tag = require('./core/tag');
var handlebars = require('express3-handlebars').create({
  defaultLayout: 'main',
  extname: '.html',
  helpers: tag
});

// 配置handlbars的局部通用文件
app.use(function(req, res, next) {
  if (!res.locals.commons) res.locals.commons = {};
  res.locals.commons.header = {};
  res.locals.commons.footer = {
    name: '公司',
    publish: '杭州A444CCCC-A'
  };
  res.locals.commons.scripts = '脚本';
  next();
});

app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

app.use(logger('dev'));
// 组件注册
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('1234567890ABCEDFJHIJKLQWERTYZ'));

app.use(cookieSession({
  name: 'lyapp',
  secret: '1234567890ABCEDFJHIJKLQWERTYZ',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // 30天
}));

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

var admin = require('./routes/admin/index');
var music = require('./routes/admin/music');
// 后台进入
app.use('/admin', admin);
app.use('/music', music);

// 登录拦截
app.use(function(req, res, next) {
  var json = req.session.user;
  var url = req.url;
  if (url.indexOf('admin') !== -1 || url.indexOf('user') !== -1) { // 是需要拦截的,如果你URL地址包含admin这个关键词
    if (!json) { // 如果没有登录
      if (req.xhr) {
        res.send('logout');
      } else {
        res.redirect('/login.html');
      }
    }
  }
  res.locals.user = json ? JSON.parse(json) : {};
  next();
});
// 路由注册
app.use('/', index);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(req, res, next) {
  var err = new Error('服务器错误');
  err.status = 500;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
