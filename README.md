# 介绍

使用 react+antd 组件搭建的一个后台管理框架模板，支持无限嵌套路由，无限级菜单，多语言切换等



# 软件架构

react + antd

# 安装教程

npm install

# 启动

npm run start

# 使用说明

启动完成打开 http://localhost:3000

输入任意账号密码即可

# 大致目录结构

```
├── public                  项目静态资源
├── src                     主要开发
|   ├── assets              静态文件目录
|   ├── components          公共组件
|—— |   └── Frame           admin框架结构
|   |
|   |—— locales             国际化语言配置
|   |—— routers             路由
|   |—— utils               封装的函数方法
|   |   |—— auth.js         登录相关方法
|   |   └── i18n.js         多语言配置文件
|   |—— views               页面视图
|   |—— App.js              App组件
|—— |—— index.js            react组件入口
|   └── serviceWorker.js    react注解使用配置
|—— config-overrides.js     配置文件
|—— package-lock.json       npm 安装的插件包详情
|—— package.json            启动脚本和插件包配置加载
└── 说明文档
```

# 配置多环境

```
修改package.json文件
{
  // ...
  "scripts": {
    "start": "dotenv -e .env.dev react-app-rewired start",
    "build:sit": "dotenv -e .env.sit react-app-rewired build",
    "build:prod": "dotenv -e .env.prod react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  // ...
}
 在index.html中使用%REACT_APP_URL_API%
 在js/jsx中：process.env.REACT_APP_URL_API
```
