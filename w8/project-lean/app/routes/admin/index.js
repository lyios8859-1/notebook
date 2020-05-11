const express = require('express');
const router = express.Router();
const User = require('../../dao/user');
// 登录页面
router.get('/login', function(req, res, next) {
  console.log('*'.repeat(100));
  if (req.session.username === req.body.username) {
    console.log('已经登录');
    res.redirect('/');
  } else {
    res.render('admin/login', { title: '请登录', layout: null });
  }
});

// 登录首页
router.post('/logined', function(req, res, next) {
  // new User(req.body).save(function (err, result) {
  //   console.log(">>>>>>>>>>>>>>>>>.")
  //   if (!err) {
  //     res.send(result);
  //   } else {
  //     res.send("fail");
  //   }
  // });
  console.log('>>>>', req.session.username, req.body.username, req.session.username === req.body.username);
  if (req.session.username === req.body.username) {
    console.log('已经登录');
    // next();
    res.send('success');
  } else {
    // 判断用户名密码是否正确
    User.findOne({ 'username': 'tom' }, function(err, user) {
      if (err) return err;
      // 判断该用户是否存在
      if (user.password === req.body.password && user.username === req.body.username) {
        // 将用户信息写入 session
        req.session.username = user.username;
        console.log('登录成功');
        res.send('success');
      } else {
        res.send('用户名或密码不正确');
      }
    });
  }

  // if (req.session.user) {  // 判断用户是否登录
  //   res.render('admin/index', {title: '后台首页', layout: null});
  //   next();
  // } else {
  //   // 解析用户请求的路径
  //   var arr = req.url.split('/');
  //   // console.log("arr>>>", arr)
  //   // 去除 GET 请求路径上携带的参数
  //   for (var i = 0, length = arr.length; i < length; i++) {
  //     arr[i] = arr[i].split('?')[0];
  //   }
  //   // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
  //   if (arr.length > 1 && arr[1] == '') {
  //     console.log("bulanjie1")
  //     next();
  //   } else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
  //     console.log("bulanjie2")
  //     next();
  //   } else {  // 登录拦截
  //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>...lanjie",req.session)
  //     // req.session.originalUrl = req.originalUrl ? req.originalUrl : "/";  // 记录用户原始请求路径
  //     res.send("admin/login");
  //   }
  // }
});

module.exports = router;
