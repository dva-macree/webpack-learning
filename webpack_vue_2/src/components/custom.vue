<template>
	<div id="custom-panel" :class="{'panel-toggle' : isOpen}">
		<div class="custom-panel-btn" @click="showPanel()">定制
		</div>
		<div class="custom-panel-mask" @click="hidePanel()"></div>
		<div class="custom-panel-content">
			<design></design>
			<div class="custom-panel-toolbar">
				<a class="custom-panel-tool custom-panel-tool-first">RESET</a>
				<a class="custom-panel-tool" @click="hidePanel()">HIDE</a>
			</div>
		</div>
	</div>
	
</template>
<script>
var Design = require('./design.vue');
	module.exports = {
		data : function(){
			return {
				isOpen : false
			}
		},
		components : {
			
	        Design : Design
	    },
	    methods : {
	    	hidePanel : function(){
	    		this.isOpen = false;
	    	},
	    	showPanel : function(){
	    		this.isOpen = true;
	    	}
	    }
	}
</script>
<style>
.custom-panel-btn{
	display: block;
	position: fixed;
	right: 10px;
	bottom: 10px;
	padding: 8px 16px;
	background-color: #e0e0e0;
	box-shadow: 0 0 8px rgba(0,0,0,.4);
}

#custom-panel.panel-toggle .custom-panel-mask {
	display: block;

}

.custom-panel-mask{
	display: none;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.6);
    z-index: 10001;
    overflow-y: scroll;
}
#custom-panel.panel-toggle .custom-panel-content{
	-webkit-transform: translate(0);
    transform: translate(0);
}
.custom-panel-content{
	min-height: 85%;
    z-index: 10002;
    background-color: #efeff4;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    -webkit-transform: translateY(100%);
    transform: translateY(100%)
}
.custom-panel-toolbar{
	border-top: 1px solid #d9d9d9;
    line-height: 39px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    display: -webkit-box;
    flex-direction: row;
}
.custom-panel-tool{
	text-decoration: none;
    color: #000;
    width: 50%;
    flex: 1;
    -webkit-box-flex: 1;
    text-align: center;
    position: relative;
    display: block;
}

.custom-panel-tool-first:after {
    content: " ";
    position: absolute;
    top: 7px;
    bottom: 7px;
    right: 0;
    border-left: 1px solid #d9d9d9;
}
    
</style>