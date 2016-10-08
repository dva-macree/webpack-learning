
<template>
<div>
    <show></show>
    <custom></custom>
</div>
  
</template>
<script>
var Design = require('./components/design.vue');
var Show = require('./components/show.vue');
var TopNews = require('./components/topNews.vue');
var MainSlider = require('./components/mainslider.vue')
var Custom = require('./components/custom.vue')
var Vue = require('vue');

var store = require('./vuex/store.js');
var actions = require('./vuex/actions.js')
    
var cmsColumnsData = require('../mock/store.js');
var newsList = require('../mock/news.js');
module.exports = {
    // data: function(){
    //     return {
    //         data : {
    //             cmsColumnsData : cmsColumnsData.fetch(),
    //             newsList : newsList.fetch(),
    //         }
    //     }  
    // },
    store,
    components : {
        Design : Design,
        Show   : Show,
        TopNews : TopNews,
        MainSlider : MainSlider,
        Custom : Custom
    }
}
</script>