require('./index.css')
require("../common/index.js")

var mm = require("../../util/mm.js")
var userService = require("../../service/user-service.js")

var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('')
    }
}

// 登录逻辑
var page = {
    init: function() {
        this.bindEvent();
    },
    // 绑定事件
    bindEvent: function() {
        var _this = this;

        // 点击登录按钮提交
        $('#submit').click(function() {
            console.log("click")
            _this.submit();
        })

        // 按下回车键提交
        $('.user-con').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function() {
        var formData = {
            username: $.trim($("#username").val()),
            password: $.trim($("#password").val()),
            passwordConfirm: $.trim($("#password-confirm").val()),
            email: $.trim($("#email").val()),
            phone: $.trim($("#phone").val()),
            question: $.trim($("#question").val()),
            answer: $.trim($("#answer").val())
        };
        console.log(formData)
        var validate = this.formValidate(formData);
        if (!validate.status) {
            formError.show(validate.msg);
        } else {
            userService.register(formData, function(res) {
                window.location.href = mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                formError.show(errMsg);
            })
        }
    },

    // 表单字段验证
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };

        if (!mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }

        if (!mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }

        if (formData.password.length < 6) {
            result.msg = "密码长度不少于6位";
            return result;
        }

        if (formData.password !== formData.passwordConfirm) {
            result.msg = "两次输入密码不一致";
            return result;
        }

        if (!mm.validate(formData.phone, "phone")) {
            result.msg = "手机格式不正确";
            return result;
        }

        if (!mm.validate(formData.email, "email")) {
            result.msg = "邮箱格式不正确";
            return result;
        }

        if (!mm.validate(formData.question, "require")) {
            result.msg = "密码提示问题不能为空";
            return result;
        }

        if (!mm.validate(formData.answer, "require")) {
            result.msg = "密码提示答案不能为空";
            return result;
        }

        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function() {
    page.init()
})