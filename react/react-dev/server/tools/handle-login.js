const router = require('express').Router()
const axios = require('axios')

// // 参考该 https://cnodejs.org/api    API
const baseUrl = 'https://cnodejs.org/api'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken // 客户端请求的token
  }).then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken, // 客户端请求的token
          loginName: resp.data.loginname, // 服务端返回的数据
          id: resp.data.id,  // 服务端返回的数据
          avatarUrl: resp.data.avatar_url // 服务端返回的数据
        }
        res.json({
          sucess: true,
          data: resp.data
        })
      }
    }).catch(err => {
      // 业务逻辑出错
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        // 服务器错误
        next(err); // 抛出给最外的错误处理器处理
      }
    })
})

module.exports = router