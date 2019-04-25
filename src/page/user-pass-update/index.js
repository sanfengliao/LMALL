require('./index.css')
require('../common/header/index.js')
require('../common/index.js')
require('../common/nav/index.js')

var navSide = require('../common/nav-side/index.js')
var mm = require('../../util/mm.js')
var userService = require('../../service/user-service.js')

var page = {
    init: function() {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function() {
        navSide.init({name: 'user-pass-update'})
    },
    bindEvent: function() {
        var that = this;
        $('#submit').on('click', function() {
            var userInfo = {
                password: $.trim($("#password").val()),
                passwordNew: $.trim($('password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            }
            var validateResult = that.validateForm(userInfo)
            if (validateResult.status) {
                userService.resetPassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res, msg) {
                    mm.successTips(msg)
                }, function(errMsg) {
                    mm.errorTips(errMsg)
                })
            } else {
                mm.errorTips(validateResult.msg)
            }
        })
    },
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        }

        if (!mm.validate(formData.password, 'require')) {
            result.msg = "密码不能为空"
            return result
        }

        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
}

$(function() {
    page.init()
})