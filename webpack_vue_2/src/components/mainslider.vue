<template>
     <div class="main-slider">
        <a href="javascript:;" class="main-slider-prev"></a>
        <a href="javascript:;" class="main-slider-next"></a>

        <div class="flicking-con">
            <a></a>
            
            <a></a>
        </div>
        <div class="slider-list">
            <ul>
                <li>
                <a href="" mars_sead="">
                    <img :src=bannerimg></a>
                </li>
                
                <li>
                <a href="" mars_sead="">
                    <img :src=bannerimg2></a>
                </li>
            </ul>
        </div>
    </div>
</template>
      
<script>
var touchSlider = require('imports?jQuery=jquery!../vendors/jquery.touchslider.js')
var imagesLoaded = require('imports?jQuery=jquery!../vendors/imagesloaded.js')
var bannerImg = require('../images/p3.jpg')
var bannerImg2 = require('../images/p4.jpg')
   //设置轮播效果

module.exports = {
    data: function(){
      return {
          bannerimg : bannerImg,
          bannerimg2: bannerImg2
      }  
    },
    ready : function(){
        console.log("main slider is ready");
        var mainSlider = $('.main-slider'),
                navList = $('.flicking-con a', mainSlider),
                sliderPrev = $('.main-slider-prev', mainSlider),
                sliderNext = $('.main-slider-next', mainSlider),
                firstImg = $('.slider-list img:eq(0)', mainSlider);

            if (!firstImg.size()) {
                mainSlider.hide();
                return false
            }

            imagesLoaded(firstImg, function () {
                //重新设置大小

                mainSlider.height(firstImg.height());
                mainSlider.find('.slider-list,.slider-list ul').height(firstImg.height());
                mainSlider.find('.slider-list ul li').height(firstImg.height()).show();

                //只有一个图像的时候不做轮播
                if (navList.length == 1) {
                    navList.hide();
                    return false;
                }

                var sliderList = $(".slider-list", mainSlider).touchSlider({
                    flexible: true,
                    speed: 500,
                    btn_prev: sliderPrev,
                    btn_next: sliderNext,
                    paging: navList,
                    counter: function (e) {
                        navList.removeClass("on").eq(e.current - 1).addClass("on");
                    }
                });

                //自动切换

                var sliderTimer = setInterval(function () {
                    sliderNext.click();
                }, 5000);

                sliderList.bind("touchstart", function () {
                    clearInterval(sliderTimer);
                    sliderTimer = null;

                }).bind("touchend", function () {
                    if (sliderTimer == null) {
                        sliderTimer = setInterval(function () {
                            sliderNext.click();
                        }, 5000);
                    }

                })

            });
    }

}
            
</script>
<style>
    .main-slider {
      overflow: hidden;
      position: relative;
    }
    .main-slider .main-slider-next {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
    }
    .slider-list {
      overflow: hidden;
      position: relative;
    }
    .slider-list ul {
      width: 100%;
    }
    .slider-list ul li {
      width: 100%;
      display: none;
    }
    .slider-list ul li a {
      display: block;
      width: 100%;
    }
    .slider-list ul li a img {
      width: 100%;
      display: block;
    }
    .slider-list ul li:nth-child(1) {
      display: block;
    }
    .flicking-con {
      position: absolute;
      z-index: 10;
      height: 1.2rem;
      bottom: 0.4rem;
      right: 1rem;
      width: 30%;
      text-align: right;
    }
    .flicking-con a {
      width: 0.5rem;
      height: 0.5rem;
      display: inline-block;
      content: "";
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      border: 1px solid #ccc;
      margin-left: 0.1rem;
    }
    .flicking-con a.on {
      background-color: #000000;
    }

</style>
       