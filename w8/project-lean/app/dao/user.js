// 获取mongoose的连接对象
var mongoose = require('../core/Connection');

// 建立一个Schema的文档对象
var UserSchema = mongoose.Schema({
  username: String, // 用户名
  // account: String,// 昵称
  password: String, // 密码
  ctime: { type: Date, default: Date.now } // 创建时间
});

// 创建集合(创建表)
var User = mongoose.model('User', UserSchema);

module.exports = User;
