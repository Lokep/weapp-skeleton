# JustFE Mobile Cli

## 技术栈

* uni-app

* vue3

* vite

* typescript

* tailwind css

* pinia

---

## 项目结构设计

> 仅介绍核心目录

* api --- 所有的请求方法

* constants 常量

* hooks hooks函数管理，默认会有uni-app api 的hooks

* pages 页面

* static 所有的images、scss都会放在这个目录中(静态资源（图片视频等）只能存放于 static 目录)

* store 用于存放pinia所创建的store

* types 用于存放 ts 所需的类型文件

* utils 各种工具方法，包含 请求方法、js工具方法、请求多环境的配置文件、内置了图片上传的方法、

  小程序检查更新的方法、uni-app promisfy方法、 request的日志方法（方便真机体验时查看）、

  还有一个pinia插件，用于在开发工具中对pinia进行调试

---
