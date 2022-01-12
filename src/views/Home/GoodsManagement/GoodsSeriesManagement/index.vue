<template>
    <div class="goods-series-management">
        <!--        搜索-->
        <search-bar
            title="搜索系列"
            :options="searchBarOptions"
            :handler-search="filterSeries"
            :handler-clear="clearSearch"
        ></search-bar>
        <!--        表格-->
        <data-table
            class="series-data-table"
            :data-list="seriesDataShow"
            :column-list="DataTableColumn"
            :handle-delete="deleteRow"
            :handle-edit="editRow"
            :handle-open-dialog="openDialog"
        ></data-table>
        <!--        抽屉-->
        <edit-drawer
            :drawer-option="drawerOptions"
        >
            <template v-slot:content>
                <div class="container">
                    <el-form class="drawer-form" label-width="100">
                        <el-form-item label="编辑系列名称">
                            <el-input v-model="editData.series_name" class="series-name-edit"></el-input>
                        </el-form-item>
                        <el-form-item label="所属商品类型">
                            <el-select v-model="editData.type_name">
                                <el-option
                                    v-for="item in goodsTypes"
                                    :key="item.type_name"
                                    :value="item.type_name">{{ item.type_name }}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="buttons">
                        <el-button class="drawer-button" @click="closeWindow">取消</el-button>
                        <el-button class="drawer-button" @click="submitEdit" type="primary">提交</el-button>
                    </div>
                </div>
            </template>
        </edit-drawer>
        <!--        添加-->
        <add-dialog
            :dialog-options="dialogOptions"
        >
            <template v-slot:content>
                <div class="dialog-container">
                    <el-form label-width="150px" :model="addData">
                        <el-form-item label="填写系列名">
                            <el-input v-model="addData.series_name" style="width: 40%"></el-input>
                        </el-form-item>
                        <el-form-item label="选择所属商品类型">
                            <el-select style="width: 40%" v-model="addData.type_name">
                                <el-option
                                    v-for="item in goodsTypes"
                                    :key="item.type_name"
                                    :value="item.type_name">{{ item.type_name }}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="closeWindow">取 消</el-button>
                        <el-button @click="submitAdd" type="primary">添 加</el-button>
                    </div>
                </div>
            </template>
        </add-dialog>
    </div>
</template>

<script>

import SearchBar from '../../../../components/searchBar/index';
import DataTable from '../../../../components/DataTable/index';
import EditDrawer from '../../../../components/EditDrawer/index';
import AddDialog from '../../../../components/AddDialog/index';
import {mapState} from 'vuex'

export default {
    name: "GoodsSeriesManagement",
    components: {
        SearchBar,
        DataTable,
        EditDrawer,
        AddDialog,
    },
    data() {
        return {
            seriesDataShow: [], // 展示在表格中的数据
            // 搜索栏的配置属性
            searchBarOptions: [
                {value: "id", label: "id", data: "id"},
                {value: "所属商品", label: "所属商品类型", data: "type_name"},
            ],
            // 表格列的配置属性
            DataTableColumn: [
                {prop: "id", label: "编号", width: "80", align: "center"},
                {prop: "type_name", label: "所属商品类型", align: "center"},
                {prop: "series_name", label: "系列名称", align: "center"},
            ],
            // 抽屉的配置属性
            drawerOptions: {
                isDrawerShow: false, // 开关
                drawerDirection: 'ltr', // 打开方向
                showClose: false,  // 关闭按钮的开关
                wrapperClosable: false, // 遮罩关闭抽屉开关
                title: '编辑系列数据' // 标题
            },
            // 商品types列表
            goodsTypes: [],
            // 编辑时的数据
            editData: {
                id: '',
                series_name: '',
                type_name: '',
            },
            // 添加系列的配置属性
            dialogOptions: {
                isDialogShow: false,
                title: "添加新系列"
            },
            // 添加的数据
            addData:{
                series_name: '',
                type_name: ''
            }
        }
    },
    computed: {
        ...mapState(['goodsSeriesData'])
    },
    methods: {
        /**
         * 获取全部的商品类型信息
         */
        async getAllGoodsTypes() {
            const {code, msg, data} = await this.$axios.get('/admin/series/allType');
            // 判断响应
            if (code === 500) {
                this.$message.error(msg);
            }
            if (code === 300) {
                this.$message.warning(msg);
            }
            // 配置数据
            this.goodsTypes = data;
        },

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

            // 对 data 按照 id 进行排序
            const newData = data.sort((item, nextItem) => {
                return item.id - nextItem.id;
            })

            // 配置数据
            await this.$store.dispatch('setSeriesData', newData);
        },

        /**
         * 根据传入的数据进行数据过滤并展示的函数
         * @param type -> 搜索的类别
         * @param value -> 输入的数据
         */
        filterSeries(type, value) {
            this.seriesDataShow = this.goodsSeriesData.filter(item => {
                return item[type].toString() === value;
            })
        },

        /**
         * 清除搜索框的所有搜索内容，还原表格内容为初始内容
         */
        clearSearch() {
            this.seriesDataShow = this.goodsSeriesData;
        },

        /**
         * 点击编辑按钮打开抽屉
         */
        editRow(row) {
            // 配置数据
            this.editData.id = row.id;
            this.editData.series_name = row.series_name;
            this.editData.type_name = row.type_name;
            // 开启抽屉
            this.drawerOptions.isDrawerShow = true;
        },

        deleteRow(row) {
            console.log(row)
        },

        /**
         * 点击取消按钮关闭Drawer或者Dialog
         */
        closeWindow() {
            this.$confirm('确定要直接关闭当前窗口?内容将不会被保存!', '注意', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.drawerOptions.isDrawerShow = false;
                this.dialogOptions.isDialogShow = false
            })
        },

        /**
         * 点击提交按钮提交修改
         */
        async submitEdit() {
            // 发请求
            const {code, msg} = await this.$axios.post('/admin/series/edit', this.editData);
            if (code === 500) {
                this.$message.error(msg);
            }
            this.$message.success(msg);
            // 关闭抽屉
            this.drawerOptions.isDrawerShow = false;
            // 更新数据
            await this.getAllSeries();
            this.seriesDataShow = this.goodsSeriesData;
        },

        /**
         * 打开dialog
         */
        openDialog(){
            this.dialogOptions.isDialogShow = true;
        },

        async submitAdd(){
            const { type_name, series_name } = this.addData;
            // 验证
            if (type_name.trim().length <= 0 && series_name.trim().length <= 0){
                this.$message.warning('请填写完整数据!');
                return;
            }
            // 发请求
            const {code, msg} = await this.$axios.post('/admin/series/add',this.addData);
            // 判断
            if (code === 500){
                this.$message.error(msg);
                return;
            }
            this.$message.success(msg)
            // 关闭窗口
            this.dialogOptions.isDialogShow =false;
            // 更新数据(到 store)
            await this.getAllSeries();
            // 更新数据(到 page)
            this.seriesDataShow = this.goodsSeriesData;
        }
    },
    mounted() {
        // 请求目前有多少系列
        this.getAllGoodsTypes();
        // 像后台请求全部数据
        this.getAllSeries();
        // 数据对齐，将显示在页面的数据和 vuex 里面的数据匹配
        this.seriesDataShow = this.goodsSeriesData;
    }
}
</script>

<style scoped>
.series-data-table {
    height: calc(100% - 125px);
}

.container {
    position: relative;
    height: 100%;
}

.drawer-form {
    padding-left: 20px
}

.series-name-edit {
    width: 50%;
}

.buttons {
    position: absolute;
    padding-left: 20px;
    width: 100%;
    bottom: 20px;
}

.buttons > .drawer-button {
    width: 45%;
}

.dialog-footer{
    padding-left: calc(100% - 200px - 20px);
    margin-top: 50px;
}
.dialog-footer > button{
    width: 100px;
}
</style>