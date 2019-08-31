<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>首页</title>
  <style>
    * {
      padding: 0;
      margin: 0;
      font-family: "微软雅黑";
    }

    .header {
      height: 72px;
      background: #458fce;
    }

    .header .logo {
      color: #fff;
      line-height: 70px;
      font-size: 30px;
      margin-left: 20px;
      display: inline-block;
      text-align: center;

    }

    a {
      color: #fff;
      text-decoration: none;
    }

    .header .login {
      /* float: right; */
      color: #fff;
      line-height: 72px;
      margin-right: 2px;
      display: inline-block;
    }

    .banner {
      height: 380px;
      overflow: hidden;
      background: #ddd;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">web实践</div>
    <div class="login">
      <a href="javascript:void(0)">登录</a>
      <span>|</span>
      <a href="javascript:void(0)">故事</a>
    </div>
  </div>
</body>
</html>