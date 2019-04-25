var Hogon = require("hogan.js")
var conf = {
  serverHost: '/api'
}
var _mm = {
  request: function(params) {
    var _this = this
    $.ajax({
      type      : params.method || 'get',
      url       : params.url || '',
      dataType  : params.type || 'json',
      data      : params.data || '',
      success   : function(res) {
        // 请求成功
        if (0 === res.status) {
          typeof params.success === 'function' && params.success(res.data, res.msg)
        } 
        // 未登录，需要登录
        else if (10 === res.status) {
          _this.doLogin()
        }

        else if (1 === res.status) {
          typeof params.error === 'function' && params.error(res.msg)
        }
      },
      error     : function(err) {
        typeof params.error === 'function' && params.error(err.statusText)
      }
    })
  },
  // 获取服务器地址
  getServerUrl: function(path) {
    return conf.serverHost + path
  },
  // 获取url参数
  getUrlParam: function(name) {
    // happymall.com/product/list.do?keyword=xxx&page=1
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg)
    return result ?decodeURIComponent(result[2]) : null
  },
  // 统一登录处理
  doLogin: function() {
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
  },
  // 渲染html
  readerHtml:function (htmlTemplate, data) {
    var template = Hogon.compile(htmlTemplate)
    return template.render(data)
  },
  // 成功提示
  successTips:function(msg) {
    alert(msg || "操作成功")
  },
  errorTips: function(msg) {
    alert(msg || "哪里不对了~")
  },

  // 字段验证，支持非空，手机，手机
  validate: function(value, type) {
    var value = $.trim(value)
    if (type === 'require') {
      return !!value
    } else if (type === 'phone') {
      return /^1\d{10}/.test(value)
    } else if (type === 'email') {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },
  goHome() {
    window.location.href = "./index.html"
  },
  validate: function(value, type) {
    value = $.trim(value)
    if ('require' === type) {
      return !!value
    }

    if ('phone' === type) {
      return /^1\d{10}$/.test(value);
    }

    if ('email' === type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
    }
  }
}

module.exports = _mm