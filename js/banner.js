$(function () {
    // 获取banner可视区域大小
    var banner_w = $(".banner").width()+1;
    console.log("banner_w:",banner_w);

    $('.banner .img li img').css('width',`${banner_w}px`);
    var banner_h = $('.banner .img li img').height();
    $('.banner').css('height',`${banner_h}px`);
    var banner_box_h = $('.banner_box').height();
    $('.req_box').css('height',`${banner_box_h}px`);

    var i = 0;
    var clone = $(".banner .img li").first().clone();
    $(".banner .img").append(clone);
    var size = $(".banner .img li").size();
    for (var j = 0; j < size - 1; j++) {
        $(".banner .num").append("<li></li>");
    }
    $(".banner .num li").first().addClass('on');
    //鼠标划入圆点
    $(".banner .num li").hover(function () {
        var index = $(this).index();
        i = index;
        $(".banner .img").stop().animate({
            left: -index * banner_w
        }, 500);
        $(this).addClass('on').siblings().removeClass('on');
    })
    /*轮播图自动轮播*/
    var t = setInterval(function () {
        i++;
        move();
    }, 2000);
    //对banner定时器的操作
    $(".banner").hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval(move, 2000);
    })
    /*左箭头*/
    $(".banner .btn_l").click(function () {
        i--;
        move();
    })
    /*右箭头*/
    $(".banner .btn_r").click(function () {
        i++;
        move();
    })
    /*封装函数*/
    function move() {
        if (i == size) {
            $(".banner .img").css({
                left: 0
            });
            i = 1;
        }
        if (i == -1) {
            $(".banner .img").css({
                left: -(size - 1) * banner_w
            });
            i = size - 2;
        }
        $(".banner .img").stop().animate({
            left: -i * banner_w
        }, 500);
        if (i == size - 1) {
            $(".banner .num li").eq(0).addClass('on').siblings().removeClass('on');
        } else {
            $(".banner .num li").eq(i).addClass('on').siblings().removeClass('on');
        }
    }
    })