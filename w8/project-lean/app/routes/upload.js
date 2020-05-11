var express = require('express');
var router = express.Router();
var path = require('path');
var date = require('../core/tag');
//导入文件上传的模块
var jqupload = require("jquery-file-upload-middleware");
// 上传页面
router.get('/', function (req, res) {
  res.render('upload/upload', {uploadFileName: '上传文件'});
});

/*文件上传的后台代码*/
router.post('/uploadfile', function (req, res, next) {
  var now = date.format(new Date(), 'yyyy/MM/dd');
  jqupload.on('begin', function (fileInfo, req, res) {
    //拿到扩展名
    var extname = path.extname(fileInfo.name);
    // 修改文件名
    fileInfo.name = (now.replace(/\//g, '')) + date.LyUuid(32, 16) + extname;
   // fileInfo.fileInfo; // 原始名字
  });
  jqupload.fileHandler({
    maxFileSize: 1024 * 1024 * 1024 * 2,//限制上传的大小 2G
    // acceptFileTypes: /.+/i,
    // imageTypes: /\.(gif|jpe?g|png)$/i, // 限制类型
    acceptFileTypes: /\.(gif|jpe?g|png)$/i, // 限制类型
    uploadDir: function () {//指明上传的路径
      return path.normalize(__dirname + "../../public/uploads/" + now);
    },
    uploadUrl: function () {// 返回的路径相对路径
      return "/uploads/" + now;
    }
  })(req, res, next);
});
module.exports = router;