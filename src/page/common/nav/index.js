require("./index.css")

var mm = require("../../../util/mm")
var user = require("../../../service/user-service")
var cart = require("../../../service/cart-service")
var nav = {
  init : function(){
      this.bindEvent();
      this.loadUserInfo();
      this.loadCartCount();
      return this;
  },
  bindEvent : function(){
      // 登录点击事件
      $('.js-login').click(function(){
          mm.doLogin();
      });
      // 注册点击事件
      $('.js-register').click(function(){
          window.location.href = './user-register.html';
      });
      // 退出点击事件
      $('.js-logout').click(function(){
          user.logout(function(res){
              window.location.reload();
          }, function(errMsg){
              mm.errorTips(errMsg);
          });
      });
  },
  // 加载用户信息
  loadUserInfo : function(){
      user.checkLogin(function(res){
          $('.user.not-login').hide().siblings('.user.login').show()
              .find('.username').text(res.username);
      }, function(errMsg){
          // do nothing
      });
  },
  // 加载购物车数量
  loadCartCount : function(){
      cart.getCartCount(function(res){
          $('.nav .cart-count').text(res || 0);
      }, function(errMsg){
          $('.nav .cart-count').text(0);
      });
  }
};

module.exports = nav.init();