module.exports = {
  plugins:  [
    require('autoprefixer')({ // 自动添加css前缀
      overrideBrowserslist: ['> 0.15% in CN']
    })
  ]
} 
