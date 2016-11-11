<template>
    <div class="right-container">
        <div v-for="view in data">
            <component :is="view.category" :data="data"></component>
        </div>
    </div>
    
</template>


<script>
var getters = require('../vuex/getters.js');
var actions = require('../vuex/actions.js');
var Design = require('./design.vue');
var Show = require('./show.vue');
var TopNews = require('./topNews.vue');
var MainSlider = require('./mainslider.vue')


var getters = require('../vuex/getters.js');
var actions = require('../vuex/actions.js');
module.exports = {
    vuex : {
        getters : {
            data : getters.getModuleDataList
        },
        actions : {
            moveUp : actions.upModuleListItem,
            moveDown : actions.downModuleListItem,
            deleTe : actions.delModuleListItem,
            add : actions.addModuleListItem
        }
    },
    components : {
        Design : Design,
        Show   : Show,
        TopNews : TopNews,
        MainSlider : MainSlider
    }
}
</script>