import types from './type'

const mutations = {
    /**
     * 用户信息登录之后进行 state 存储
     * @param state
     * @param payload
     */
    [types.SET_ACCOUNT_INFO](state, payload) {
        state.userInfo = payload;
    },

    /**
     * 用户登出之后将用户信息进行清空
     * @param state
     */
    [types.REMOVE_ACCOUNT_INFO](state) {
        state.userInfo = {};
    },

    /**
     * 添加权限信息到state中
     * @param state
     * @param payload
     */
    [types.SET_PERMISSION_DATA](state, payload) {
        state.permissionList.originList
            = state.permissionList.showList
            = payload.data;
        state.permissionList.total = payload.total;
    },

    /**
     * 根底传递的 keyWord 检索权限信息并展示
     * @param state
     * @param payload
     */
    [types.SEARCH_PERMISSION_DATA](state, payload) {
        const list = state.permissionList.originList;
        const keyWord = payload;
        let newArr = [];
        list.forEach(item => {
            if (item.permissionID.toString() === keyWord) {
                newArr.push(item);
            }
            if (item.permissionName.toString() === keyWord) {
                newArr.push(item);
            }
            if (item.permissionComment.toString() === keyWord) {
                newArr.push(item);
            }
        })
        state.permissionList.showList = newArr;
    },

    /**
     * 清除权限检索的所有痕迹
     * @param state
     */
    [types.CLEAR_SEARCH_PERMISSION](state) {
        state.permissionList.showList = state.permissionList.originList;
    },

    /**
     * 设置角色权限的数据
     * @param state
     * @param payload
     */
    [types.SET_ROLE_PERMISSION_DATA](state, payload){
        state.rolePermissionList.originList =
            state.rolePermissionList.showList = payload.list;
        state.rolePermissionList.total = payload.total;
    },

    /**
     * 搜索角色权限的信息
     * @param state
     * @param payload
     */
    [types.SEARCH_ROLE_PERMISSION_DATA](state, payload){
        const list = state.rolePermissionList.originList;
        let newArr = [];
        list.forEach(item => {
            const judgeOne = item.rolePermissionID.toString() === payload;
            const judgeTwo = item.roleName.toString() === payload;
            const judgeThree = item.Permission.toString() === payload;
            if (judgeOne || judgeTwo || judgeThree){
                newArr.push(item);
            }
        })
        state.rolePermissionList.showList = newArr;
    },

    /**
     * 清除搜索角色权限的信息
     * @param state
     */
    [types.CLEAR_SEARCH_ROLE_PERMISSION](state){
        state.rolePermissionList.showList = state.rolePermissionList.originList;
    }

}

export default mutations;