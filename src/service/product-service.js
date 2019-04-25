var mm = require('../util/mm')

var product = {

    // 获取商品列表
    getProductList: function(listParam, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        })
    },

    getProductDetail: function(productId, resolve, reject) {
        mm.request({
            url: mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        })
    }
}

module.exports = product