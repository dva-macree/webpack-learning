var Vue = require('vue')
var App = require('./app.vue')
require('./css/app.css')
require('./css/main.css')
new Vue({
    el : 'body',
    components : {
        app : App   
    }
});