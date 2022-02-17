<template>
    <div class="window">
        <el-card>
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请输入关键词进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchWindows" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button type="primary">添加新类型</el-button>
                </el-col>
            </el-row>
            <!--表格展示区-->
            <el-table
                class="series-table"
                :data="tableData.showData"
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
                    prop="typeName"
                    label="所属类型"
                    align="center"
                    width="100"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    align="center"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="originPrice"
                    label="初始价格"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scoped">
                        <span>￥{{ scoped.row.originPrice }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="salePrice"
                    label="现售价格"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scoped">
                        <span>￥{{ scoped.row.salePrice }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="preview"
                    label="预览图(点击查看大图)"
                    align="center"
                >
                    <template slot-scope="scoped">
                        <el-image
                            style="width: 100%; height: 100%; max-height: 150px"
                            :src="scoped.row.imgUrl"
                            :preview-src-list="previewList"
                            fit="fill"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isHot"
                    label="是否热门"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.isHot === 1 ? '热门商品' : '非热门商品' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isOnline"
                    label="是否上架"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.isOnline === 0 ? '未上架' : '已上架' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="220"
                    align="center"
                >
                    <template v-slot="scoped">
                        <el-button size="small" @click="checkRow(scoped.row)" type="primary">查看</el-button>
                        <el-button v-if="scoped.row.isOnline === 0" size="small" @click="editRow(scoped.row)"
                                   type="success">上架
                        </el-button>
                        <el-button v-else size="small" @click="editRow(scoped.row)" type="warning">下架</el-button>
                        <el-button size="small" @click="deleteRow(scoped.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页组件区-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="tableData.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import productApis from "../../../../../apis/goods.product.api";

export default {
    name: "Window",
    data() {
        return {
            searchInput: '',
            tableData: {
                showData: [],
                originData: [],
                total: 0
            },
            previewList: [],
            paginationOptions: {
                currentPage: 1,
                pageSize: 10
            }
        }
    },
    methods: {
        /**
         * 分页获取窗户的数据
         * @param pageNum
         * @param pageSize
         * @returns {Promise<void>}
         */
        async getWindowByPageNum(pageNum = 1, pageSize = this.paginationOptions.pageSize) {
            try {
                const {code, msg, data} = await this.$axios.get(productApis.getWindowByPageNum, {
                    params: {
                        pageNum,
                        pageSize
                    }
                })
                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }
                this.tableData = {
                    showData: data.list,
                    originData: data.list,
                    total: data.total
                }
                data.list.forEach(item => {
                    this.previewList.push(item.imgUrl);
                })
            } catch (e) {
                console.log(e);
                this.$message.error('操作失败');
            }
        },

        searchWindows(){
            const key = this.searchInput;
            const list = this.tableData.originData;
            let newArr = [];

            list.forEach(item => {
                if (item.id.toString().indexOf(key) >= 0 || item.typeName.toString().indexOf(key) >= 0 || item.name.toString().indexOf(key) >= 0){
                    newArr.push(item);
                }
            })
            console.log(newArr);
            this.tableData.showData = newArr;
        },

        clearSearch(){
            this.searchInput = '';
            this.tableData.showData = this.tableData.originData;
        },
        /**
         * 分页组件更新页面的时候触发的回调函数
         * 用于触发获取数据的函数进行数据更新
         * @param num
         */
        pageNumChange(num) {
            this.searchInput = '';
            this.getWindowByPageNum(num);
        }
    },
    mounted() {
        this.getWindowByPageNum();
    }
}
</script>

<style scoped>
</style>