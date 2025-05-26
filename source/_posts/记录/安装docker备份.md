---
title: 安装docker备份
categories: 记录
abbrlink: 9207386a
date: 2024-04-26 15:54:49
---

参考：

> 1.[Windows10环境下Docker安装、改变镜像存储路径并配置WRF的方法](https://zhuanlan.zhihu.com/p/381115119) 
>
> 2.[Docker — 从入门到实践](https://yeasy.gitbook.io/docker_practice)

#### 家庭版系统添加Hyper-V功能

- 新建txt文档

  ```
  pushd "%~dp0"
  dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
  for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
  del hyper-v.txt
  Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
  ```

- 改为bat脚本，管理员运行



#### 更改镜像地址

设置里-Resources-Advanced-Disk Image location

#### 修改镜像源：

在最前面加上：

```json
"registry-mirrors":[
    "https://ccr.ccs.tencentyun.com",
    "https://mirror.baidubce.com",
    "https://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
   ],
```

