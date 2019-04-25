require("./index.css")

var mm = require("../../../util/mm")

var header = {
  init: function() {
    this.onLoad()
    this.bindEvent()

  },
  onLoad: function() {
    var keyword = mm.getUrlParam("keyword")
    if (keyword) {
      $("#search-input").val(keyword)
    }
  },
  bindEvent: function() {
    var _this = this
    $("#search-btn").click(function() {
      _this.searchSubmit()
    })
    $("#search-input").keyup(function(e) {
      if (e.keyCode === 13) {
        _this.searchSubmit()
      }
    })
  },
  searchSubmit:function() {
    var keyword = $.trim($("#search-input").val())
    if (keyword) {
      window.location.href = "./list.html?keyword=" + keyword
    } else {
      mm.goHome()
    }
  }
}

header.init()