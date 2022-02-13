<template>
    <div class="series">
        <el-card class="series-card">
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请输入关键词进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchSeries" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addSeries" type="primary">添加新系列</el-button>
                </el-col>
            </el-row>
            <!--表格展示区-->
            <el-table
                class="series-table"
                :data="seriesData.showData"
                border
                stripe
                style="width: 100%"
            >
                <el-table-column
                    prop="id"
                    label="编号"
                    width="70"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="系列名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="comment"
                    label="系列简介"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="操作"
                    width="150"
                    align="center"
                >
                    <template v-slot="scoped">
                        <el-button size="small" @click="editRow(scoped.row)" type="primary">编辑</el-button>
                        <el-button size="small" @click="deleteRow(scoped.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页组件区-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="seriesData.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
            <!--添加的 dialog 区-->
        </el-card>
    </div>
</template>

<script>
import seriesApis from "../../../../apis/goods.series.api";

export default {
    name: "Series",
    data() {
        return {
            searchInput: '',
            paginationOptions: {
                pageSize: 10,
                currentPage: 1,
            },
            seriesData: {
                originData: [],
                showData: [],
                total: 0
            }
        }
    },
    methods: {
        /**
         * 分页获取数据信息
         * @param pageNum
         * @param pageSize
         * @returns {Promise<void>}
         */
        async getSeriesByPageNum(pageNum = 1, pageSize = this.paginationOptions.pageSize) {
            try {
                const { code, msg, data } = await this.$axios.get(seriesApis.getSeriesByPageNum, {
                    params:{
                        pageSize,
                        pageNum
                    }
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                this.seriesData = {
                    originData: data.list,
                    showData: data.list,
                    total: data.total
                }
            }catch (e) {
                console.log(e);
                this.$message.error('获取数据失败');
            }
        },
        searchSeries() {
            console.log('searchSeries');
        },
        clearSearch() {
            console.log('clearSearch');
        },
        addSeries() {
            console.log('addSeries');
        },
        editRow(row) {
            console.log('editRow', row);
        },
        deleteRow(row) {
            console.log('deleteRow', row);
        },
        pageNumChange(num) {
            console.log('pageNumChange', num);
        }
    },
    mounted() {
        console.log('series show..');
        this.getSeriesByPageNum();
    }
}
</script>

<style scoped>

</style>