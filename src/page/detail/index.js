require('./index.css')
require('../common/nav/index.js')
require('../common/header/index.js')
var mm = require('../../util/mm')
var productService = require('../../service/product-service')
var template = require('./index.string')
var _cart = require('../../service/cart-service')
var page = {
    data: {
        productId: mm.getUrlParam('productId')
    },
    init: function() {
        this.loadData()
        this.bindEvent()
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                mm.errorTips(errMsg);
            });
        });
    },
    loadData: function() {
        if (!this.data.productId) {
            mm.goHome()
        }
        var that = this, html = '', $pageWrap = $('.page-wrap')
        productService.getProductDetail(this.data.productId, function(res) {
            that.filter(res)
            that.data.detailInfo = res;
            // render
            html = mm.readerHtml(template, res)
            $pageWrap.html(html);
        }, function() {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        })
    },

    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
}

$(function() {
    page.init()
})