<template>
    <div class="search-bar-container">
        <el-card class="search-bar-card">
            <h1 class="tip-title">{{ title }}</h1>
            <el-select
                v-model="selectResultShow"
                class="search-bar-select"
                placeholder="查询类型"
                @change="showChange"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :value = item.value
                    :label = item.label
                ></el-option>
            </el-select>
            <el-input v-model="searchInput" class="search-bar-input" placeholder="请输入信息"></el-input>
            <el-button @click="searchValues" type="primary">搜索</el-button>
            <el-button @click="clearSearch" type="primary">清除搜索结果</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "searchBar",
    props:{
        // 搜索框的标题
        title:{
            required: true,
            type: String,
            default: "搜索"
        },
        // 选项列表数组
        // 数组形式 [{value, label, data},{value, label, data}, ...]
        options:{
            type: Array,
            required: true,
            default: () => []
        },
        // 父组件传入的处理数据的函数
        handlerSearch:{
            type:Function,
            required: true,
        },
        // 父组件传入的清空查询的函数
        handlerClear:{
            type:Function,
            required: true,
        }
    },
    data(){
        return{
            selectResultShow:'', // 展示在界面上的选项值
            selectResult:'',     // 下拉选择的结果存储
            searchInput:'',      // 输入框输入的内容
        }
    },
    methods:{
        /**
         * 转换存储的数据
         * @param value
         */
        showChange(value){
            this.options.forEach(item => {
                if (item.value === value){
                    this.selectResult = item.data;
                }
            })
        },
        /**
         * 触发父组件的数据过滤方法
         */
        searchValues(){
            const { selectResult, searchInput } = this;
            this.handlerSearch(selectResult, searchInput);
        },

        clearSearch(){
            this.searchInput = '';
            this.selectResult = '';
            this.selectResultShow = '';
            this.handlerClear();
        }
    }
}
</script>

<style scoped>
.tip-title {
    font-size: 14px;
    color: #cecfd1;
    margin-bottom: 10px;
}
.search-bar-container{
    margin-bottom: 20px;
}
.search-bar-select{
    width: 15%;
    margin-right: 10px;
}
.search-bar-input{
    width: 20%;
    margin-right: 10px;
}
</style>