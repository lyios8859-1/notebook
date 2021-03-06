# git commit 提交的一些规范

## 大致分为三个部分(使用空行分割)

- 标题行: 必填, 描述主要修改类型和内容
- 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
- 页脚注释: 放 Breaking Changes 或 Closed Issues

**分别由如下部分构成**:

- type: commit 的类型
- feat: 新特性(添加了XXX功能)
- fix: 修改问题
- refactor: 代码重构（优化相关和代码风格调整）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改
- test: 测试用例修改
- chore: 其他修改, 比如构建流程, 依赖管理.
- scope: commit 影响的范围, 比如: route, component, utils, build
- subject: commit 的概述,
- body: commit 具体修改内容,
- footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.
- perf: 代码的一些性能优化
- revert： 回滚
- conf： 配置修改

git commit 模板

修改 ~/.gitconfig, 添加:

```txt
[commit]
template = ~/.gitmessage
```

新建 ~/.gitmessage 内容可以如下:

```txt
# head: <type>(<scope>): <subject>
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty
#   (eg. if the change is a global or difficult 
    to assign to a single component)
# - subject: start with verb (such as 'change'), 50-character line
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer: 
# - Include a link to the ticket, if any.
# - BREAKING CHANGE
#
```

认真是一种态度
让优秀成为一种习惯
