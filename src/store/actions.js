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
     * 删除已存储的权限信息
     * @param commit
     */
    removePermissionData({commit}) {
        commit(types.REMOVE_PERMISSION_DATA);
    }
}

export default actions;