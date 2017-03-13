let _isInitlize = false

// 限制上传字段信息
const _log_required_info = ['url', 'line', 'col', 'msg']
const _namespacereg = /\w{3,}/

export default class Logger {
  constructor(namespace, url) {
    if (_namespacereg.exec(namespace)) {
      this._namespace = namespace
    } else {
      throw Error('logger: The namespace do not conform to the rules ' + _namespacereg.toString())
    }

    if (!url) {
      return
    }
    url += ~url.indexOf('?') ? '&' : '?'
    this._url = url

    this._lastSrc = ''

    this._initialize()
  }

  _initialize() {
    if (_isInitlize === true) {
      return
    }
    _isInitlize = true
    let _onerror = (msg, url, line, col, error) => {
      // 没有URL不上报！上报也不知道错误,首页只要有错误就上传，因为eval执行代码都没有URL
      // if (msg === 'Script error.' && !url) {
      //   // return true 会导致控制台不输出error
      //   return true
      // }
      // 采用异步的方式
      // 我遇到过在window.onunload进行ajax的堵塞上报
      // 由于客户端强制关闭webview导致这次堵塞上报有Network Error
      // 我猜测这里window.onerror的执行流在关闭前是必然执行的
      // 而离开文章之后的上报对于业务来说是可丢失的
      // 所以我把这里的执行流放到异步事件去执行
      // 脚本的异常数降低了10倍
      setTimeout(() => {
        let data = {}
        // 不一定所有浏览器都支持col参数
        col = col || (window.event && window.event.errorCharacter) || 0

        data.url = url
        data.line = line
        data.col = col
        data.msg = 'unknown'
        if (!!error && !!error.stack) {
          // 如果浏览器有堆栈信息
          // 直接使用
          data.msg = error.stack.toString()
        /* eslint-disable no-caller,no-extra-boolean-cast*/
        } else if (!!arguments.callee) {
          // 尝试通过callee拿堆栈信息
          let ext = []
          /* eslint-disable no-caller*/
          let f = arguments.callee.caller
          let c = 3
            // 这里只拿三层堆栈信息
          while (f && (--c > 0)) {
            ext.push(f.toString())
            if (f === f.caller) {
              // 如果有环
              break
            }
            f = f.caller
          }
          ext = ext.join(',')
          data.msg = ext
        }

        // 首页没有值，就给个默认值也要强行上报
        data = extend({url: window.location.href, line: 0, col: 0}, data)
        data.msg = data.msg || navigator.userAgent
        // 把data上报到后台！
        this.fatal(data)
      }, 0)
        //  return true
    }
    window.addEventListener('error', _onerror, false)
  }

  /*
   * 上报服务器致命错误
   * @param data.msg 错误消息
   * @param data.url 发生问题的url
   * @param data.line 错误行数
   * @param data.col 错误列
   */
  fatal(data) {
    this.check(data, 'fatal')
  }
    /*
     * 上报服务器警告错误
     * @param data.msg 错误消息
     * @param data.url 发生问题的url
     * @param data.line 错误行数
     * @param data.col 错误列
     */
  warning(data) {
    this.check(data, 'warning')
  }
    /*
     *
     * 发送前检查
     *
     */
  check(data, logtype) {
    let opt = {
      __logtype: logtype,
      __namespace: this._namespace,
      __errorAction: this._currentAction
    }
      //  必须是对象
    if (Object.prototype.toString.call(data) !== '[object Object]') {
      return
    }
    // 必须有msg参数 和接收统计的url
    if (!data.msg || !this._url) {
      return
    }
    //  只上传需要的参数，其他过滤掉
    for (let i = 0; i < _log_required_info.length; i++) {
      if (_log_required_info[i] in data) {
        opt[_log_required_info[i]] = data[_log_required_info[i]]
      }
    }

    this._request(opt)
  }

  /*
   *
   * 发送日志
   *
   */
  _request(param) {
    let url = this._url
    let _opt = {}
    let paramAry = []
    let linkElement = document.createElement('IMG')

    each(param, function(val, key) {
      if (_opt[key] === undefined) {
        paramAry.push(key + '=' + encodeURIComponent(val))
      }
    })
    linkElement.onload = linkElement.onerror = function() {
      linkElement.onload = linkElement.onerror = null
    }

    let curSrc = url + paramAry.join('&')

    if (this._lastSrc === curSrc) {
      return
    }

    this._lastSrc = curSrc
    linkElement.src = curSrc
  }
  /**
   * 设置页面错误标识字段
   * 通过代码操作前 设置此字段 报错时带上此字段 就能识别报错的阶段
   * 颗粒度越细密，报错收集越精确
   * @param {String} action 标识字段
   */
  saveCurrentAction(action) {
    this._currentAction = action
  }
}

function each(obj, fn) {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      fn(obj[i], i)
    }
  }
}

function extend(target, source) {
  for (let key in source) {
    if (source[key] !== undefined) {
      target[key] = source[key]
    }
  }
  return target
}
