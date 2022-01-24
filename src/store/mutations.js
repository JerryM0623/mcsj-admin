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
    }

}

export default mutations;