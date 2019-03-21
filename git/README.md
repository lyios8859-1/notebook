# git 工作流程

![git 工作流程](./git工作流程.png)

说明：

- 工作区就是创建仓库的文件夹如（notebook 文件夹就是一个工作区）
- 版本库就是工作区的隐藏目录.git,版本库中有暂存区（stage/index）和分支（master）
- git add 实际是把文件添加到暂存区，git commit 把暂存区的内容提交到当前分支

## 创建版本库

1. 创建 git 仓库文件夹（工作区）并进入到文件夹（工作区），名为: notebook

```shell
mkdir notebook && cd notebook
```

2. 初始化仓库 notebook

```shell
git init
```

3. 工作区添加文件并提交到暂存区

```shell
# 创建文件并添加一些内容
echo "lean git" >> README.md

# 添加到仓库暂存区，在暂存区的文件会变绿
git add README.md   （如果是 “.” 表示修改的文件全部添加到赞存区）

# 提交 README.md 文件到当前分支, -m "提交说明"(只有进行 git add 后 go commit 命令才有效)
git commit -m "add README.md"
```

4. 工作区修改文件

```shell
# 修改完成文件后，执行 git status 查看仓库状态
git status

# 添加到仓库暂存区，并提交到当前分支（这里需要多次的添加到暂存区并提交到当前分支，因为需要不断的修改文件）
git add README.md
# 提交到当前分支
git commit -m "modify README.md"
```

5. 撤销修改文件（未提交到分支）

- **当文件在工作区时**，执行撤销命令

```shell
git checkout -- README.md
```

- **当文件在暂存区时**, 首先使文件回到工作区， 再执行撤销命令

```shell
# 使文件返回到工作区
git reset HEAD README.md

# 再执行撤销命令
git checkout -- README.md
```
