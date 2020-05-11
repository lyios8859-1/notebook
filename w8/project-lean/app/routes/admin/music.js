const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', function(req, res, next) {
  res.render('admin/music/index', { title: '歌曲欣赏', layout: null });
});

router.get('/getLrc', function(req, res, next) {
  console.log(__dirname);
  res.send('读取歌词文件内容');
});

module.exports = router;
