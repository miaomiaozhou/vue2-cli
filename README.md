## 项目使用说明

### 简易vue+webpack+mock脚手架
* `git clone` 克隆项目
* `yarn install ` 安装项目依赖
* `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash` 安装nvm
* `nvm use v4.5.0` 使用v4.4.4版本及以上node，由于webpack-dev-server对node版本要求

* 命令说明

命令 | 功能
--- | ---
npm run start | 运行本地项目
npm run build | 打包项目

---
### 文件结构说明
* src/page/XXX/XXX 如(src/page/test1/index.vue) 存放页面
* src/assets 存放静态资源
* static/ 打包结果

---
### 新建功能页面步骤
* 在src/page目录下新建文件夹

---
### 数据mock
* `npm run mock` 启动mock服务
* 即可以localhost:3000/XXX 访问数据



