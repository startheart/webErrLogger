

const Logger = window.Logger
const data = {
  msg: '错误消息',
  url: '发生问题的url',
  line: '错误行数',
  col: '错误列'
}
/*
* 初始化并自动监控致命错误
* @param namespace String 错误命名空间
* @param url String 接收统计的url服务器接口
*/
let log = new Logger('my_webapp', '//xxx.niubi.com/log/receiver?');

const J_btn = document.getElementById('J_btn')

J_btn.addEventListener('click', (e) => {
  // 设置现阶段错误事件的标识
  log.saveCurrentAction('click_btn')
  // 触发js报错 由于webpack的构建环境原因 导致此报错没有当前url 信息 所以不会发送统计
  adddlert("Welcome guest!")
})
//adddlert("Welcome guest!")
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
