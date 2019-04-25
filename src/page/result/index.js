require("./index.css")
require("../common/nav-simple/index.js")
require('../common/index.js')
var mm = require("../../util/mm")
$(function() {
  var type = mm.getUrlParam("type") || "default",
  $el = $("." + type + "-success")
  $el.show()
})