const mongoose = require('mongoose');
const User = mongoose.model('User');

/* 查找用户 */
exports.findAllUsers = async () => {
  const query = User.find();
  const res = [];
  await query.exec(function (err, users) {
    if (err) {
      res = [];
    } else {
      res = users;
    }
  });
  return res
};

/* 查找特定用户 */
exports.findFilterUsers = async (params) => {
  const nameReg = new RegExp(params.name, 'i');
  const query = User.find({
    name: {
      $regex: nameReg
    }
  });
  const res = [];
  await query.exec(function (err, users) {
    if (err) {
      res = []
    } else {
      res = users;
    }
  });
  return res
};

/* 查找单个用户 */
exports.findUser = async (params) => {
  const query = User.find({
    id: params.id
  });
  const res = {};
  await query.exec(function (err, tUser) {
    if (err) {
      res = '没有该用户';
    } else {
      res = tUser[0];
    }
  });
  return res
};

/* 新增用户 */
exports.addUser = async (user) => {
  user = await user.save();
  return user
};

/* 编辑用户 */
exports.updateUser = async (user) => {
  user = await User.update({ id: user.id }, {
    $set: {
      name: user.name,
      sex: user.sex,
      area: user.area,
      always: user.always,
      relationship: user.relationship,
      phone: user.phone,
      mobile: user.mobile,
      desc: user.desc
    }
  });
  return user
};

/* 删除用户 */
exports.deleteUser = async ({ id }) => {
  const flag = false;
  console.log('flag==========>' + flag);
  await User.remove({ id }, function (err) {
    if (err) {
      flag = false
    } else {
      flag = true
    }

  });
  console.log('flag=====await=====>' + flag);
  return flag
};