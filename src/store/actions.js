import types from './type'

const actions = {
    /**
     * 登录账户之后存储用户信息
     * @param commit
     * @param payload
     */
    setAccountInfo({commit}, payload) {
        commit(types.SET_ACCOUNT_INFO, payload);
    },

    /**
     * 登出账户之后将存储的信息进行删除
     * @param commit
     */
    removeUserInfo({commit}) {
        commit(types.REMOVE_ACCOUNT_INFO);
    },

    /**
     * 添加权限信息
     * @param commit
     * @param payload
     */
    setPermissionData({commit}, payload) {
        commit(types.SET_PERMISSION_DATA, payload);
    },

    /**
     * 检索权限信息
     * @param commit
     * @param payload
     */
    searchPermission({commit}, payload) {
        commit(types.SEARCH_PERMISSION_DATA, payload);
    },

    /**
     * 清除权限检索的痕迹
     * @param commit
     */
    clearSearchPermission({commit}) {
        commit(types.CLEAR_SEARCH_PERMISSION);
    },

    /**
     * 设置角色权限的数据
     * @param commit
     * @param payload
     */
    setRolePermissionData({commit}, payload){
        commit(types.SET_ROLE_PERMISSION_DATA, payload);
    },

    /**
     * 对角色权限信息进行检索
     * @param commit
     * @param keyWord
     */
    searchRolePermission({commit}, keyWord){
        commit(types.SEARCH_ROLE_PERMISSION_DATA, keyWord);
    },

    /**
     * 清除角色权限的搜索痕迹
     * @param commit
     */
    clearSearchRolePermission({commit}){
        commit(types.CLEAR_SEARCH_ROLE_PERMISSION);
    },

    /**
     * 添加全部账户的信息
     * @param commit
     * @param payload
     */
    setAccountData({commit}, payload){
        commit(types.SET_ACCOUNT_DATA, payload);
    },

    /**
     * 根据关键词搜索账户数据
     * @param commit
     * @param payload
     */
    searchAccountRole({commit}, payload) {
        commit(types.SEARCH_ACCOUNT_ROLE, payload);
    },

    /**
     * 清楚搜索的记录
     * @param commit
     */
    clearSearchAccountRole({commit}){
        commit(types.CLEAR_SEARCH_ACCOUNT_ROLE);
    }
}

export default actions;