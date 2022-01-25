import types from './type'
const mutations = {
    /**
     * 用户信息登录之后进行 state 存储
     * @param state
     * @param payload
     */
    [types.SET_ACCOUNT_INFO](state, payload){
        state.userInfo = payload;
    },

    /**
     * 用户登出之后将用户信息进行清空
     * @param state
     */
    [types.REMOVE_ACCOUNT_INFO](state){
        state.userInfo = {};
    },

    /**
     * 添加权限信息到state中
     * @param state
     * @param payload
     */
    [types.SET_PERMISSION_DATA](state, payload){
        state.permissionList.originList = payload.data;
        state.permissionList.total = payload.total;
    },

    /**
     * 删除存储在state中的权限数据
     * @param state
     */
    [types.REMOVE_PERMISSION_DATA](state){
        state.permissionList = {
            originList: [],
            total: 0
        }
    }

}

export default mutations;