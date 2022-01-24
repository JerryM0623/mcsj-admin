import types from './type'

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
    }
}

export default actions;