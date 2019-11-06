const axios = require('axios')
const baseURL = 'https://cnodejs.org/api'

module.exports = axios.create({
  baseURL
});
