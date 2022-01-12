import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo:{},
        goodsSeriesData:[]
    },
    mutations: {
        'SET_ACCOUNT_INFO':function (state, payload){
            state.userInfo = {...payload}
        },
        'SET_SERIES_DATA':function (state, payload){
            state.goodsSeriesData = payload;
        }
    },
    actions: {
        setAccountInfo({commit},payload){
            commit('SET_ACCOUNT_INFO',payload)
        },
        setSeriesData({ commit }, payload){
            commit('SET_SERIES_DATA', payload);
        }
    },
    modules: {}
})
