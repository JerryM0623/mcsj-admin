import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo:{}
    },
    mutations: {
        'SET_USER_INFO':function (state, payload){
            // 存 state 一份
            state.userInfo = {...payload};
        },
        'REMOVE_USER_INFO':function (state){
            state.userInfo = {};
        }
    },
    actions: {
        setAccountInfo({commit},payload){
            commit('SET_USER_INFO',payload)
        },
        removeUserInfo({commit}){
            commit('REMOVE_USER_INFO');
        }
    },
    modules: {}
})
