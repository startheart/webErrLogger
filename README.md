# webErrLogger
> web 错误日志上报插件

## 如何安装此插件？
```bash
cd <project_path>
npm install web-error-logger
```
## 使用

在项目任意可编写JS代码处使用

```javascript
//获取组件
var Logger = require('web-error-logger');
/**
 * 实例化logger
 * 初始化并自动监控致命错误
 * @type {Logger}
 * @param namespace {String} 标识此类打点的命名空间
 * @param url {String} 接收log日志服务器地址
 */
var log = new Logger('my_webapp', '//xxx.niubi.com/log/receiver?');

/**
 * 设置现阶段错误事件的标识
 * 通过代码操作前 设置此字段 报错时带上此字段 就能识别报错的阶段
 * 颗粒度越细密，报错收集越精确
 * @param {String} action 标识字段
 */
log.saveCurrentAction('click_btn')

/*
* 上报服务器致命错误
* @param data.msg 错误消息
* @param data.url 发生问题的url
* @param data.line 错误行数
* @param data.col 错误列
*/
log.fatal(data);
/*
+ 上报服务器警告错误
+ @param data.msg  错误消息
+ @param data.url 发生问题的url
+ @param data.line 错误行数
+ @param data.col 错误列
*/
log.warning(data);

```

## 本仓库Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

