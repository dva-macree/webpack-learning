<template>
    <section class="topNewsSection">
        <span class="topNewsHead" style="display:none"></span>

        <div class="topNews">
            <span class="noticeIcon"></span>
            <ul class="topNewsContent">
               <li v-for="news in data">
                    <a href="{{news.url}}" mars_sead="{{news.actionPoint}}">{{news.text}}</a>
                    <a class="topNewsHypertext" href="{{news.url}}" mars_sead="{{news.actionPoint}}">{{news.hypertext}}</a></li>
               </li>
            </ul>

        </div>
    </section>
</template>


<script>
    var marqueeHandler = require('../scripts/marquee.js');
    var getters = require('../vuex/getters.js');
    var actions = require('../vuex/actions.js');
    module.exports = {
        vuex : {
            getters : {
                data : getters.getTopNewsDataList
            }
        },
        ready : function(){
            if($(".topNewsSection").length == 0)
                return;
            var $topNews = $(".topNewsContent");

            var topNewsContentWidth = $(".topNews").width() - ( $topNews.offset().left - $(".topNewsHead").offset().left) ;
            var topNewsContentHeight = $topNews.find("li").height();
            marqueeHandler.init({
                marqueeObject : $topNews,
                marqueeDelay : 2000,
                marqueeHeight : topNewsContentHeight,
                marqueeWidth : topNewsContentWidth
            });
        }
        
    }
</script>


<style>
.topNewsSection {
  background-color: #fff;
  position: relative;
  margin-bottom: 0 !important;
}
.topNewsSection .topNews {
  text-align: left;
  font-size: 1.6rem;
  margin: 0;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
}
.topNewsSection .topNews .topNewsHead {
  color: #DC137D;
  border-right: 1px solid;
  padding-right: .3rem;
  border-color: #CACACA;
  font-size: 1.3rem;
  display: inline-block;
  vertical-align: text-top;
  line-height: 2.3rem;
}
.topNewsSection .topNews .noticeIcon {
  background: url("../images/icon_notice.png") no-repeat;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  background-size: 100%;
  vertical-align: text-top;
  margin-top: 0.68rem;
}
.topNewsSection .topNews .topNewsContent {
  font-size: .7rem;
  display: inline-block;
  position: relative;
  /* left: 8.5rem; */
  height: 2.3rem;
  overflow: hidden;
  vertical-align: text-top;
}
.topNewsSection .topNews .topNewsContent li {
  position: relative;
  white-space: nowrap;
  font-size: .3rem;
  color: #666;
}
.topNewsSection .topNews .topNewsContent li a {
  line-height: 2.3rem;
  font-size: 1rem;
}
.topNewsSection .topNews .topNewsContent li .topNewsHypertext {
  color: #e4007f;
  display: inline-block;
  text-indent: .6rem;
}
</style>