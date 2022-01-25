import types from './type'
import permissionApis from '../apis/permission'
import Vue from 'vue'
const vue = new Vue();

const actions = {
    /**
     * 登录账户之后存储用户信息
     * @param commit
     * @param payload
     */
    setAccountInfo({commit},payload){
        commit(types.SET_ACCOUNT_INFO, payload);
    },

    /**
     * 登出账户之后将存储的信息进行删除
     * @param commit
     */
    removeUserInfo({commit}){
        commit(types.REMOVE_ACCOUNT_INFO);
    },

    /**
     * 添加权限信息
     * @param commit
     * @param payload
     */
    setPermissionData({commit}, payload){
        // 请求
        const {pageNum, pageSize} = payload;
        permissionApis.getDataByPageNum(pageNum, pageSize)
            .then((res) => {
                // 判断
                if (res === {}) {
                    vue.$message.error('请求失败');
                    return;
                }
                const {code, msg, data} = res;
                if (code === 500 || code === 400){
                    vue.$message.error(msg);
                    return;
                }
                // 提交
                commit(types.SET_PERMISSION_DATA, data);
            })
    },

    /**
     * 删除已存储的权限信息
     * @param commit
     */
    removePermissionData({commit}){
        commit(types.REMOVE_PERMISSION_DATA);
    }
}

export default actions;