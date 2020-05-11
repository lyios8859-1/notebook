# Typescript+Koa+nodemon

[参考1](https://mssn.midea.com/ask/?/article/244)
[参考2](https://www.jianshu.com/p/037f3c9585b0)
[参考3](https://www.jianshu.com/p/1a91f36e5153)
[参考4](https://github.com/mohuk/koa2-ts-init)

## 基础环境

```bash
mkdir <project-name> && cd <project-name> && mkdir src

git init
npm init [-y]
tslint --init
tsc --init
touch .gitignore

npm i -S koa koa-router koa-hbs
# ts-node: 编译ts，nodemon: 自动重启服务， husky： git commit 自动调用 tslint检测代码规范
npm i -D typescript ts-node nodemon tslint husky
# typescript 更规范
npm i -D @types/koa @types/koa-router
```
