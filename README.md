# 狼人杀复盘工具

> 基于[Quasar](http://quasar-framework.org/)的狼人杀复盘工具
> vue技术栈 vuex vue-router vue-resource
> 动画使用[Velocity](http://velocityjs.org/)
> 使用cordova编译成原生app

## 安装&编译

``` bash
# 安装依赖
$ npm install

# 安装quasar工具行
$ npm install -g quasar-cli

# 启动开发服务器
$ quasar dev

# build for production with minification
$ quasar build

# cordova安装
$ npm install -g cordova

# 添加平台支持
$ cordova platform add ios

# 生成cordova所需文件
$ quasar wrap cordova

# 使用cordova编译，在模拟器中运行
$ cd cordova
$ cordova run
```

## TODO

功能&bug

### 待添加功能

* 玩家视角
* 游戏回放
* 上传照片&录音
* 生成记分板

### bug&后续开发

* 试着在iOS模拟器上运行了下，底部tab无法固定，[论坛中的相同问题](http://forum.quasar-framework.org/topic/108/tabs-not-working-on-ios-simulator)
* [滚动问题](https://github.com/quasarframework/quasar/issues/218)
* 目前在开发中使用mock数据，后续可能会使用[GraphQL](https://github.com/Akryum/vue-apollo)







