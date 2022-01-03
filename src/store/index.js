import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "../utils/request";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo:{
            user_id:null,
            account:null,
            password:null,
            user_avatar:null
        }
    },
    mutations: {
        GETUSERINO(state, payload){
            state.userInfo = {...payload};
        }
    },
    actions: {
        getUserInfo({commit}, {account}) {
            Axios.get('/b/userinfo', {
                params:{
                    account: account
                }
            }).then(res => {
                const resObj = JSON.parse(res.data)
                console.log(resObj)
                // commit
                commit('GETUSERINO',resObj);
            }).catch(err => {
                console.log(err)
            })
        }
    },
    modules: {}
})
