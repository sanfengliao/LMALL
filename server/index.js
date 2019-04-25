var Axios = require("axios")

Axios.get('http://www.happymmall.com/cart/get_cart_product_count.do').then(res => {
    console.log(res.data)
})