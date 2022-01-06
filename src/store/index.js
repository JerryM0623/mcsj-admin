import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo:{}
    },
    mutations: {
        'SET_ACCOUNT_INFO':function (state, payload){
            state.userInfo = {...payload}
        }
    },
    actions: {
        setAccountInfo({commit},payload){
            commit('SET_ACCOUNT_INFO',payload)
        }
    },
    modules: {}
})
