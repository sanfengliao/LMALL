require('./index.css')
require('../common/header/index.js')
require('../common/index.js')
require('../common/nav/index.js')

var navSide = require('../common/nav-side/index.js')
var mm = require('../../util/mm.js')
var userService = require('../../service/user-service.js')

var template = require('./index.string')

var page = {
    init: function() {
        this.onLoad()
    },
    onLoad: function() {
        navSide.init({name: 'user-center'})
        this.loadUserInfo()
    },
    loadUserInfo: function() {
        userService.getUserInfo(function(res) {
            mm.readerHtml(template, res)
        }, function(err) {
            //mm.errorTips(err)
        })
    }
}

$(function() {
    page.init()
})