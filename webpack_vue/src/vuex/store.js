var Vue = require ('vue');
var Vuex = require('vuex');

Vue.use(Vuex)

var state = {
    moduleDataList : [
        {
            id : '1',
            name: '首页轮播',
            category : 'main-slider'
        },{
            id : '2',
            name: '首页通栏广告',
            category : 'top-news'
        }
    ],
    topNewsDataList : [
        {
            "displayUserTypes": ["notlogin", "new"],
            "hypertext": "立即开通",
            "text": "唯品金融欢迎你",
            "url": "http://www.vip.com"
        },
        {
            "displayUserTypes": ["notlogin", "new"],
            "hypertext": "展现文字",
            "text": "我就是测试一下很长的文字",
            "url": "www.baidu.com"
        },
        {
            "displayUserTypes": ["notlogin", "new"],
            "hypertext": "点击查看详情",
            "text": "我要测试测试测试啊！！！！！！！！！！！",
            "url": "http://baidu.com"
        }
    ]
}

var _swapItems = function(arr,index1, index2){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

var mutations = {
    ADD_MODULEDATALIST_ITEM : function(state){
        console.log('ADD_MODULEDATALIST_ITEM');
        var obejct = {
            id : '1',
            name : 'main-slider'
        }
        state.moduleDataList.push(object);
    },
    DEL_MODULEDATALIST_ITEM  : function(state){
        console.log('DEL_MODULEDATALIST_ITEM');
        state.moduleDataList.splice(param,1);
    },
    UP_MODULEDATALIST_ITEM  : function(state,param){
        console.log(param);
        if(param === 0){
            return ;
        }
        _swapItems(state.moduleDataList,param,param-1);
    },
    DOWN_MODULEDATALIST_ITEM  : function(state,param){
        console.log(param);
        if(param == state.moduleDataList.length - 1){
            return ;
        }
        _swapItems(state.moduleDataList,param,param + 1);  
    }
}

module.exports = new Vuex.Store({
    state,
    mutations
})