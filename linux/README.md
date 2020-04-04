# Linux 基础学习

## 符号链接和硬链接

> 软链接：ln -s 源文件 目标文件 
> 硬链接：ln 源文件 目标文件 
> 源文件：即你要对谁建立链接

* 符号链接（软链接）

> 软链接可以理解成快捷方式, 它和 windows 下的快捷方式的作用是一样的.

```bash
ln -s /usr/software/nodejs/bin/tsc /usr/local/bin/
```

* 硬链接

> 硬链接等价于 `cp -p` 加同步更新. (copy 一份)

```bash
ln /usr/software/nodejs/bin/tsc /usr/local/bin/
```

