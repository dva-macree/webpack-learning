<template>
    <div class="left-container">
        <div class="border-line"></div>
        
        <div class="zds-row">
             <button class="zds-btn-blue" v-on:click='add'>添加新栏目</button>
        </div>
        
        <table>
            <tr>
                <th>排序</th>
                <th>操作</th>
                <th>栏目id</th>
                <th>栏目名称</th>
                <th>栏目类别</th>
            </tr>
            
            <tr v-for="(index,value) in data" >
                <td>
                    <button class='zds-btn-green' v-on:click='moveUp(index)'>上移动</button>
                    <button class="zds-btn-green" v-on:click='moveDown(index)'>下移动</button>
                </td>
                <td>
                    <a href='javascript:void(0);' >填充</a>
                    <a href='javascript:void(0);' v-on:click='deleTe(index)'>删除</a>
                </td>
                <td>{{ value.id }}</td>
                <td>{{ value.name }}</td>
                <td>{{ value.category }}</td>
            </tr>
        </table>
        
    </div>
</template>

<script>
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
    }
};

</script>