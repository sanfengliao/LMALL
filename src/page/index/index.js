// 引入导航

require('./index.css')
require('../common/nav/index')
require('../common/header/index.js')
require('../common/index.js')

var mm = require('../../util/mm')


var page = {
    index: 1,
    carouselLength: $('.banner-item').length - 2,
    timeId: null,
    init: function() {
        this.bindEvent()
        this.timeId = setInterval(() => {
            this._carousel(true)
        }, 1000);
    },
    bindEvent: function() {
        var that = this
        $('.banner .dot').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            that.index = $(this).index() + 1;
            that._trasform(that.index);
        });
        $('.banner .banner-arrow.prev').on('click', function() {
            that._carousel(false);
        });
        $('.banner .banner-arrow.next').on('click', function() {
            clearInterval(that.timeId)
            that._carousel(true);
        });

        $('.banner').hover(function() {
            clearInterval(that.timeId)
        }, function() {
            that.timeId = setInterval(() => {
                that._carousel(true)
            }, 5000);
        })
    },
    _carousel: function(next) {
        if(next) {
            this.index += 1;
        }
        else {
            this.index -= 1;
        }
        this._trasform(this.index)
        if (this.index === this.carouselLength + 1) {
            this.index = 1;
            setTimeout(() => {
                $('.banner-list').css({'transform': 'translate3d(' + -this.index * 830 + 'px, 0, 0)', 'transition': 'none'})
            }, 500);
            
        } else if (this.index === 0) {
            this.index = 5;
            setTimeout(() => {
                $('.banner-list').css({'transform': 'translate3d(' + -this.index * 830 + 'px, 0, 0)', 'transition': 'none'})
            }, 500);
        }
        $('.banner .dot').eq((this.index - 1) % 5).addClass('active').siblings().removeClass('active')
    },
    _trasform: function(index) {
        $('.banner-list').css({'transform': 'translate3d(' + -index * 830 + 'px, 0, 0)', 'transition': 'transform .5s'})
        
    } 
}

$(function() {
    page.init()
})