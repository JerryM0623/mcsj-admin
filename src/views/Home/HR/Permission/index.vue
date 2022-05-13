<template>
    <div class="permission">
        <el-card v-if="roleId === 1">
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请键入数据进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchPermission" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addPermission" type="primary">添加权限</el-button>
                </el-col>
            </el-row>
            <!--显示数据的表格-->
            <permission-table
                :table-data="permissionList.showList"
                :handle-delete="deleteRow"
                :handle-edit="editRow"
            >
            </permission-table>
            <!--分页组件-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="permissionList.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
          <permission-dialog
              :dialog-data="dialogOptions.dialogData"
              :dialog-mode="dialogOptions.dialogMode"
              :dialog-visible="dialogOptions.dialogVisible"
              :handle-close="closeDialog"
              :handle-submit-add="submitNewPermission"
              :handle-submit-edit="submitEditPermission"
          ></permission-dialog>
        </el-card>
      <FZT v-else></FZT>
    </div>
</template>

<script>
import PermissionTable from './components/PermissionTable';
import PermissionDialog from './components/PermissionDialog';
import FZT from '../../../../components/fzt/index';

import {mapState} from 'vuex';

export default {
    name: "Permission",
    components: {
        PermissionTable,
        PermissionDialog,
        FZT
    },
    data() {
        return {
            paginationOptions: {
                pageSize: 10,
                pageNum: 1,
                currentPage: 1
            },
            searchInput: '',
            dialogOptions: {
                dialogData: {
                    permissionID: -1,
                    permissionName: '',
                    permissionComment: ''
                },
                dialogMode: 'pending',
                dialogVisible: false
            },
          roleId: JSON.parse(localStorage.getItem('accountInfo')).roleId
        }
    },
    methods: {
        /**
         * 根据分页数据进行数据查询
         * @param pageNum
         * @param pageSize
         * @returns {Promise<void>}
         */
        async getPermissionByPageNum(pageNum = this.paginationOptions.pageNum,
                                     pageSize = this.paginationOptions.pageSize) {
            try {
                // 发送请求
                const {code, msg, data} = await this.$axios.get('/admin/permission/page', {
                    params: {
                        pageNum,
                        pageSize
                    }
                })
                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }
                await this.$store.dispatch('setPermissionData', data);
            } catch (e) {
                console.log(e);
            }
        },

        /**
         * 点击搜索之后的事件方法
         */
        searchPermission() {
            // 获取数据
            const keyWord = this.searchInput;
            if (keyWord.length <= 0) {
                this.$message.error('请输入内容');
                return;
            }
            this.$store.dispatch('searchPermission', keyWord);
        },

        /**
         * 点击清除搜索信息之后的事件方法
         */
        clearSearch() {
            this.searchInput = '';
            this.$store.dispatch('clearSearchPermission');
        },

        /**
         * 点击添加权限按钮的对应操作方法
         */
        addPermission() {
            this.dialogOptions.dialogMode = 'create';
            this.dialogOptions.dialogData = {
                permissionID: -1,
                permissionName: '',
                permissionComment: ''
            }
            this.dialogOptions.dialogVisible = true;
        },

        /**
         * 添加权限信息
         * @param permissionName
         * @param permissionComment
         * @returns {Promise<void>}
         */
        async submitNewPermission(permissionName, permissionComment) {
            try {
                const {code, msg} = await this.$axios.post('/admin/permission/add', {
                    permissionComment,
                    permissionName
                })
                if (code === 500 || code === 400) {
                    this.$message.error(msg);
                    return;
                }
                this.$message.success(msg);
                const lastPageNum = Math.ceil((this.permissionList.total + 1) / this.paginationOptions.pageSize);
                await this.getPermissionByPageNum(lastPageNum);
                this.closeDialog();
            } catch (e) {
                console.log(e);
            }
        },

        /**
         * 点击表格中的编辑按钮之后的事件方法
         */
        editRow(row) {
            const {permissionID, permissionName, permissionComment} = row;
            if (!permissionID || !permissionName || !permissionComment) {
                this.$message.error('表格行信息错误')
                return;
            }
            this.dialogOptions.dialogData = {
                permissionID,
                permissionName,
                permissionComment
            }
            this.dialogOptions.dialogMode = 'edit';
            this.dialogOptions.dialogVisible = true;
        },

        /**
         * 请求后端实现权限信息的编辑
         * @param permissionID
         * @param permissionName
         * @param permissionComment
         * @returns {Promise<void>}
         */
        async submitEditPermission(permissionID, permissionName, permissionComment) {
            try {
                const {code, msg} = await this.$axios.post('/admin/permission/edit', {
                    permissionID,
                    permissionName,
                    permissionComment
                })
                if (code !== 200) {
                    this.$message.error(msg);
                }
                this.$message.success(msg);
                await this.getPermissionByPageNum(this.paginationOptions.currentPage);
                this.closeDialog();
            } catch (e) {
                console.log(e);
            }
        },

        /**
         * 删除一条权限信息的事件回调函数
         */
        deleteRow(row) {
            this.$confirm('你确定要删除这条数据？删除之后将无法恢复', '注意', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(async () => {
                const permissionID = row.permissionID;
                if (!permissionID) {
                    this.$message.error('数据错误！');
                    return;
                }
                const {code, msg} = await this.$axios.post('/admin/permission/delete', {
                    permissionID
                })
                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }
                this.$message.success(msg);
                await this.getPermissionByPageNum(this.paginationOptions.currentPage);
            })
        },

        /**
         * 分页器的currentPage出现了变动，需要重新加载数据
         * @param pageNum
         */
        pageNumChange(pageNum) {
            this.getPermissionByPageNum(pageNum);
        },

        /**
         * 关闭dialog的事件处理函数
         */
        closeDialog() {
            this.dialogOptions.dialogVisible = false;
            this.dialogOptions.dialogMode = 'pending';
        }
    },
    computed: {
        ...mapState(['permissionList'])
    },
    created() {
        this.getPermissionByPageNum();
    }
}
</script>

<style>
</style>