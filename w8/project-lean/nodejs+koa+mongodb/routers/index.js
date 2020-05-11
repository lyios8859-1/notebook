const Router = require('koa-router');
const User = require('../app/controllers/user');

module.exports = function () {
  const router = new Router({
    prefix: '/api'
  });
  router.post('/user/add', User.addUser);
  router.post('/user/delete', User.deleteUser);
  router.post('/user/find', User.deleteUser);
  return router
};
