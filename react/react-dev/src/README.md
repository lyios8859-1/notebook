# webpack react mobx

## eslint 常用介绍

```json
{
  // 使用什么解析js代码,babel-eslint
  "parser": "babel-eslint",
  // 检测的运行环境有那些
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  // 使用那种检测规则 airbnb 比较出名的
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module", // 模块型的代码, 默认 script
  },
  // 定义自己规则覆盖airbnb的一些规则
  "rules": {
    "semi": [2]
  }
}
```

## git commit 时自动检测

> 安装 npm i -D husky
> git 提交到远程仓库是会自动调用 `paceage.json` 中的 `"precommit": "npm run lint"` 运行检测指定的文件是否通过 `eslint` 检测

## issue, mobx 使用到装饰器,需要配置 .babelrc 如下信息

```json
{
  "presets": [
    "react-app"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}
```
