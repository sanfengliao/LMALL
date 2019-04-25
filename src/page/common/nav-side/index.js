require("./index.css")
var mm  = require("../../../util/mm")
var navTemplate = require("./index.string")
var navSide = {
  option : {
    name : '',
    navList : [
        {name : 'user-center', desc : '个人中心', href: './user-center.html'},
        {name : 'order-list', desc : '我的订单', href: './order-list.html'},
        {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
        {name : 'about', desc : '关于MMall', href: './about.html'}
    ]
  },
  init: function(option) {
    $.extend(this.option, option)
    this.renderNav()
  },
  renderNav: function(option) {
    for (var i = 0, iLength = this.option.navList.length; i < iLength; ++i) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true
      }
    }
    var navHtml = mm.readerHtml(navTemplate, {navList: this.option.navList})
    $(".nav-side").html(navHtml)
  }
}

module.exports = navSide