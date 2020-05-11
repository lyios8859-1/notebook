const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/myblog', {useUnifiedTopology: true, useNewUrlParser: true});

  //创建一个连接对象
  const db = mongoose.connection;
  
  db.on('error', function(error) {
    mongoose.close();
    console.error('connection error:', error);
  });

  db.once('open', function (callback) {
    console.log("数据库连接成功....");
  });
module.exports = mongoose;