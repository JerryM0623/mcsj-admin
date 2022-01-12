<template>
    <div class="goods-series-management">
        <!--        搜索-->
        <search-bar
            title = "搜索系列"
            :options="searchBarOptions"
            :handler-search="filterSeries"
            :handler-clear="clearSearch"
        ></search-bar>
        <!--        表格-->
        <el-card style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);margin-bottom: 20px;">
            <el-button type="primary" style="margin-bottom: 20px;">添加系列</el-button>
            <!--    数据-->
            <el-table
                v-loading="loading"
                :data="seriesDataShow"
                border
                height="370"
                style="width: 100%;">
                <el-table-column
                    prop="id"
                    label="编号"
                    width="80"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="type_name"
                    label="所属商品类型"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="series_name"
                    label="系列名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="150"
                    align="center"
                >
                    <template v-slot:default="scoped">
                        <el-button @click="openDrawer(scoped)" type="primary" size="small">编辑</el-button>
                        <el-button @click="deleteCarousel(scoped)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

import SearchBar from '../../../../components/searchBar/index';
import { mapState } from 'vuex'

export default {
    name: "GoodsSeriesManagement",
    components: {
        SearchBar,
    },
    data() {
        return {
            seriesDataShow: [], // 战士在表格中的数据
            loading: false,     // 控制表格加载动画
            searchSeries: {},
            searchBarOptions:[
                { value: "id", label:"id", data:"id" },
                { value: "所属商品", label:"所属商品类型", data:"type_name" },
            ]
        }
    },
    computed:{
        ...mapState(['goodsSeriesData'])
    },
    methods: {
        /**
         * 获取系列的数据
         * @returns {Promise<void>}
         */
        async getAllSeries() {
            // 请求服务器
            const {code, msg, data} = await this.$axios.get('/admin/series/all');
            // 判断响应
            if (code === 500) {
                this.$message.error(msg);
            }
            if (code === 300) {
                this.$message.warning(msg);
            }
            // 配置数据
            await this.$store.dispatch('setSeriesData', data);
        },

        /**
         * 根据传入的数据进行数据过滤并展示的函数
         * @param type -> 搜索的类别
         * @param value -> 输入的数据
         */
        filterSeries(type, value){
            this.seriesDataShow = this.goodsSeriesData.filter(item => {
                return item[type].toString() === value;
            })
        },

        clearSearch(){
            this.seriesDataShow = this.goodsSeriesData;
        }
    },
    mounted() {
        // 像后台请求全部数据
        this.getAllSeries();
        // 数据对齐，将显示在页面的数据和 vuex 里面的数据匹配
        this.seriesDataShow = this.goodsSeriesData;
    }
}
</script>

<style scoped>

</style>