require('./index.css')

var mm = require('../../util/mm')
var productService = require('../../service/product-service')
var template = require('./index.string')

var page = {
    data: {
        listParam: {
            keyword: mm.getUrlParam('keyword') || '',
            categoryId: mm.getUrlParam('categoryId') || '',
            orderBy: mm.getUrlParam('orderBy') || 'default',
            pageNum: mm.getUrlParam('pageNum') || 1,
            pageSize: mm.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.loadList()
        this.bindEvent()
    },
    loadList: function() {
        var that = this, listHtml = '', listParam = this.data.listParam, $pListCon = $('.p-list-con')
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
        productService.getProductList(listParam, function(res) {
            listHtml = mm.readerHtml(template, {
                list: res.list
            })
            $pListCon.html(listHtml)
        }, function(err) {
            console.log(err)
        })
    },
    bindEvent: function() {
        var that = this
        $('.sort-item').click(function() {
            var $this = $(this)
            that.data.listParam.pageNum = 1
            if ($this.data('type')=== 'default') {
                if ($this.hasClass('active')) {
                    return
                }
                else {
                    $this.addClass('active').siblings().removeClass('active asc desc')
                    that.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type') === 'price') {
                console.log('==')
                $this.addClass('active').siblings('')
                        .removeClass('active asc desc');
                if ($this.hasClass('asc')) {
                    $this.addClass('desc').removeClass('asc')
                    that.data.listParam.orderBy = 'price_desc'
                }
                else {
                    $this.addClass('asc').removeClass('desc')
                    that.data.listParam.orderBy = 'price_asc'
                }
            }



            that.loadList()
        })
    }
}

$(function() {
    page.init()
})