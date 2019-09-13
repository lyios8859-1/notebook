# Ubuntu 安装 mongodb

> 1、使用 Ubuntu 仓库的话，简单但不是最新版。
> 2、使用官方仓库安装，复杂。

## 安装

```shell

sudo apt-get update && sudo apt-get upgrade -y

# 安装
sudo apt-get install mongodb

# 检查，启动，停止，重启服务
sudo systemctl status mongodb
sudo systemctl start mongodb
sudo systemctl stop mongodb
sudo systemctl restart mongodb

# 修改 MongoDB 是否自动随系统启动（默认：启用）
sudo systemctl disable mongodb
sudo systemctl enable mongodb


# 完全卸载 MongoDB
sudo systemctl stop mongodb
sudo apt-get purge mongodb
sudo apt-get autoremove


# 查看进程是否已经启动
pgrep mongo -l

# 系统默认把mongo装到了哪里
locate mongo

# 进入mongo
mongo
```
