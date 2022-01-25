<template>
    <div class="permission-management">
        <!--        搜索区域-->
        <!--<search-bar-->
        <!--    title="搜索权限信息"-->
        <!--    :handler-clear="handleSearchClear"-->
        <!--    :handler-search="handleSearch"-->
        <!--    :options="searchBarOptions"-->
        <!--&gt;</search-bar>-->



        <!--        数据展示区域-->
        <data-table
            :column-list="dataTableColumnOptions"
            :data-list="permissionList.originList"
            :handle-open-dialog="openDialog"
            :handle-edit="openDrawer"
            :handle-delete="deletePermission"
            :pagination-options="paginationOptions"
            :handle-current-change="currentPageChange"
        ></data-table>




        <!--<edit-drawer-->
        <!--    :drawer-option="drawerOptions"-->
        <!--&gt;-->
        <!--    <template v-slot:content>-->
        <!--        <div class="drawer-container">-->
        <!--            <el-form :model="editPermission" label-width="100">-->
        <!--                <el-form-item label="权限名称">-->
        <!--                    <el-input v-model="editPermission.permission_name"></el-input>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div class="drawer-footer">-->
        <!--                <el-button @click="closeDrawer">取消</el-button>-->
        <!--                <el-button @click="submitEditPermission" type="primary">确定</el-button>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--    </template>-->
        <!--</edit-drawer>-->
        <!--        添加区域-->
        <!--<add-dialog-->
        <!--    :dialog-options="dialogOptions"-->
        <!--&gt;-->
        <!--    <template v-slot:content>-->
        <!--        <div class="dialog-container">-->
        <!--            <el-form :model="addPermission" label-width="100">-->
        <!--                <el-form-item label="权限名称">-->
        <!--                    <el-input v-model="addPermission.permission_name"></el-input>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div class="dialog-footer">-->
        <!--                <el-button @click="closeDialog">取消</el-button>-->
        <!--                <el-button @click="submitAddPermission" type="primary">确定</el-button>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--    </template>-->
        <!--</add-dialog>-->
        <fzt></fzt>
    </div>
</template>

<script>
import DataTable from '../../../../components/DataTable';
import fzt from '../../../../components/fzt'

import permissionApis from '../../../../apis/permission';
import {mapState} from 'vuex'

export default {
    name: "PermissionManagement",
    components: {
        DataTable,
        fzt
    },
    data() {
        return {
            // 搜索栏options
            searchBarOptions: [
                {value: 'id', label: 'id', data: 'id'},
                {value: '权限名称', label: '权限名称', data: 'permission_name'}
            ],
            // 表格的列属性
            dataTableColumnOptions: [
                {prop: 'id', label: '编号', width: 80, align: 'center'},
                {prop: 'permission_name', label: '权限名称', align: 'center'},
                {prop: 'comment', label: '权限释义', align: 'center'},
            ],
            // dialog的配置属性对象
            dialogOptions: {
                isDialogShow: false,
                title: '添加新的权限信息'
            },
            // 添加信息的数据收集对象
            addPermission: {
                permission_name: ""
            },
            // 编辑信息所使用的 drawer 的属性配置
            drawerOptions: {
                isDrawerShow: false, // 开关
                drawerDirection: 'ltr', // 打开方向
                showClose: false,  // 关闭按钮的开关
                wrapperClosable: false, // 遮罩关闭抽屉开关
                title: '编辑账户数据' // 标题
            },
            // 编辑所使用的数据收集对象
            editPermission: {
                id: '',
                permission_name: ''
            },
            // 分页组件的配置
            paginationOptions:{
                background:true,
                pageSize:10,
                total:0,
                pagerCount:7, // 控制最多显示多少个页，超过这个数就开始隐藏
                layout:'prev, pager, next',
                hideOnSinglePage: true
            }
        }
    },
    methods: {
        /**
         * 获取全部的权限信息
         * @returns {Promise<void>}
         */
        async getPermissionByPageNumber(pageNum = 1, pageSize = this.paginationOptions.pageSize) {
            const {code, msg, data} = await permissionApis.getDataByPageNum(pageNum, pageSize);
            if (!code) {
                this.$message.error('请求失败');
                return;
            }
            if (code === 500) {
                this.$message.error(msg);
                return;
            }
            // 存入 state
            await this.$store.dispatch('setPermissionData', data);
            this.paginationOptions.total = this.permissionList.total;
        },

        /**
         * 分页指示器切换数据的时候的回调函数
         */
        async currentPageChange(pageNum){
            await this.getPermissionByPageNumber(pageNum);
        },

        /**
         * 点击进行搜索的回调函数
         * @param searchType
         * @param searchInput
         */
        handleSearch(searchType, searchInput) {
            const data = this.permission_data.data;
            this.permission_data.show = data.filter(item => {
                return item[searchType].toString() === searchInput;
            })
        },

        /**
         * 点击清除搜索结果的回调函数
         */
        handleSearchClear() {
            // 将数据重新显示回全部数据即可
            this.permission_data.show = this.permission_data.data;
        },

        /**
         * 点击添加按钮打开 dialog 的回调函数
         */
        openDialog() {
            this.dialogOptions.isDialogShow = true;
        },

        /**
         * 点击取消按钮关闭弹窗的回调函数
         */
        closeDialog() {
            this.$confirm('现在退出将会失去全部的数据', '注意', {
                confirmButtonText: "确定退出",
                cancelButtonText: "暂不退出",
                type: "warning"
            }).then(() => {
                this.addPermission.permission_name = '';
                this.dialogOptions.isDialogShow = false;
            })
        },

        /**
         * 点击确认之后进行信息提交添加一条新的权限信息的回调函数
         * @returns {Promise<void>}
         */
        async submitAddPermission() {
            // 获取数据做校验
            const {permission_name} = this.addPermission;
            if (permission_name.length <= 0) {
                this.$message.error('请输入权限名称!');
                return;
            }
            const {code, msg} = await this.$axios.post('/admin/permission/add', {permission_name});
            if (code === 500) {
                this.$message.error(msg);
                return;
            }
            this.$message.success(msg);
            // 清空dialog
            this.addPermission.permission_name = '';
            this.dialogOptions.isDialogShow = false;
            // 更新数据
            await this.getAllPermission();
        },

        /**
         * 点击编辑打开 drawer 的回调函数
         */
        openDrawer(row) {
            const {id, permission_name} = row;
            this.editPermission.id = id;
            this.editPermission.permission_name = permission_name;
            this.drawerOptions.isDrawerShow = true;
        },

        /**
         * 点击取消关闭 drawer 的回调函数
         */
        closeDrawer() {
            this.$confirm('现在退出将会失去全部的数据', '注意', {
                confirmButtonText: "确定退出",
                cancelButtonText: "暂不退出",
                type: "warning"
            }).then(() => {
                this.editPermission.permission_name = '';
                this.drawerOptions.isDrawerShow = false;
            })
        },

        /**
         * 点击确定按钮将最新编辑的数据传递给服务器进行数据修改的回调函数
         * @returns {Promise<void>}
         */
        async submitEditPermission() {
            // 获取数据
            const {id, permission_name} = this.editPermission;
            if (permission_name.trim() === '' || id === '') {
                this.$message.error('参数错误!');
                return;
            }
            // 发送请求
            const {code, msg} = await this.$axios.post('/admin/permission/edit', {id, permission_name});
            if (code === 500) {
                this.$message.error(msg);
                return;
            }
            this.$message.success(msg);
            // 清空 drawer
            this.editPermission.permission_name = '';
            this.drawerOptions.isDrawerShow = false;
            // 更新数据
            await this.getAllPermission();
        },

        /**
         * 点击删除按钮进行权限数据删除的回调函数
         * @param row
         */
        deletePermission(row) {
            this.$confirm('确定删除这条数据?', '注意', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                // 获取数据
                const {id} = row;
                // 判断数据
                if (!id || id === '') {
                    this.$message.error('参数错误!');
                    return;
                }
                // 发起请求
                const {code, msg} = await this.$axios.post('/admin/permission/delete', {id});
                if (code === 500) {
                    this.$message.error(msg);
                    return;
                }
                this.$message.success(msg);
                // 更新数据
                await this.getAllPermission();
            })
        }
    },
    computed:{
        // 将 state 里面的权限列表导出到 computed 里面
        ...mapState(['permissionList'])
    },
    mounted() {
        // 打开页面主动向后台请求第一页权限数据
        this.getPermissionByPageNumber();
    }
}
</script>

<style scoped>
.dialog-container {
    position: relative;
    height: 140px;
}

.dialog-footer {
    position: absolute;
    right: 0;
}

.dialog-footer > button {
    width: 200px;
}

.drawer-container {
    position: relative;
    margin: 0 20px;
    height: 100%;
}

.drawer-footer {
    position: absolute;
    bottom: 20px;
    right: 0;
    width: 100%;
}

.drawer-footer > button {
    width: calc((100% - 10px) / 2);
}
</style>