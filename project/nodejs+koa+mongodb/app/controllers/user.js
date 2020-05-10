const xss = require('xss');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const uuid = require('uuid');
import userHelper from '../dbhelper/userHelper.js'

/* 多用户 */
exports.users = async (ctx, next) => {
  const data;
  if (ctx.request.body) {
    data = await userHelper.findFilterUsers(ctx.request.body)
  } else {
    data = await userHelper.findAllUsers()
  }

  ctx.body = {
    success: true,
    data
  }
};
/* 单用户 */
exports.user = async (ctx, next) => {
  const data = await userHelper.findUser(ctx.request.body)

  ctx.body = {
    success: true,
    data
  }
};
/* 添加(更新)用户 */
exports.addUser = async (ctx, next) => {
  const newObj = ctx.request.body,
    user2;
  const id = newObj.id || uuid.v4();
  const user = new User({
    name: newObj.name,
    sex: newObj.sex,
    area: newObj.area,
    always: newObj.always,
    relationship: newObj.relationship,
    phone: newObj.phone,
    mobile: newObj.mobile,
    desc: newObj.desc,
    id: id
  });
  if (newObj.id) {
    user2 = await userHelper.updateUser(user);
  } else {
    user2 = await userHelper.addUser(user);
  }

  if (user2) {
    ctx.body = {
      success: true,
      data: user2
    }
  }
};
/* 删除用户 */
exports.deleteUser = async (ctx, next) => {
  const id = xss(ctx.request.body.id);
  const data = await userHelper.deleteUser({ id });
  ctx.body = {
    success: true,
    data
  }
};