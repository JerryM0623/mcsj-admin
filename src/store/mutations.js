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
            const judgeOne = item.permissionID.toString() === keyWord;
            const judgeTwo = item.permissionName.toString() === keyWord;
            const judgeThree = item.permissionComment.toString() === keyWord
            if (judgeOne || judgeTwo || judgeThree) {
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
    [types.SET_ROLE_PERMISSION_DATA](state, payload) {
        state.rolePermissionList.originList =
            state.rolePermissionList.showList = payload.list;
        state.rolePermissionList.total = payload.total;
    },

    /**
     * 搜索角色权限的信息
     * @param state
     * @param payload
     */
    [types.SEARCH_ROLE_PERMISSION_DATA](state, payload) {
        const list = state.rolePermissionList.originList;
        let newArr = [];
        list.forEach(item => {
            const judgeOne = item.rolePermissionID.toString() === payload;
            const judgeTwo = item.roleName.toString() === payload;
            const judgeThree = item.Permission.toString() === payload;
            if (judgeOne || judgeTwo || judgeThree) {
                newArr.push(item);
            }
        })
        state.rolePermissionList.showList = newArr;
    },

    /**
     * 清除搜索角色权限的信息
     * @param state
     */
    [types.CLEAR_SEARCH_ROLE_PERMISSION](state) {
        state.rolePermissionList.showList = state.rolePermissionList.originList;
    },

    /**
     * 添加账户列表的数据
     * @param state
     * @param payload
     */
    [types.SET_ACCOUNT_DATA](state, payload) {
        state.accountList.originList =
            state.accountList.showList = payload.list;
        state.accountList.total = payload.total;
    },

    /**
     * 搜索账户信息
     * @param state
     * @param payload
     */
    [types.SEARCH_ACCOUNT_ROLE](state, payload) {
        const originList = state.accountList.originList;
        let newArr = [];
        originList.forEach(item => {
            const checkOne = item.id.toString() === payload;
            const checkTwo = item.account.toString() === payload;
            const checkThree = item.role.toString() === payload;
            if (checkOne || checkTwo || checkThree) {
                newArr.push(item);
            }
        })
        state.accountList.showList = newArr;
    },

    /**
     * 清除搜索记录，回归原始状态
     * @param state
     */
    [types.CLEAR_SEARCH_ACCOUNT_ROLE](state) {
        state.accountList.showList = state.accountList.originList;
    },

    /**
     * 更新carousel的数据
     * @param state
     * @param payload
     */
    [types.SET_CAROUSEL_DATA](state, payload) {
        state.carouselList.originList =
            state.carouselList.showList =
                payload.list;

        state.carouselList.onlineList =
            payload.list.filter(item => {
                return item.isOnline === 1;
            })

        state.carouselList.total = payload.total;
    },

    /**
     * 搜索轮播图的id和简介（imgAlt）
     * @param state
     * @param payload
     */
    [types.SEARCH_CAROUSEL](state, payload){
        const originList = state.carouselList.originList;
        let newArr = [];
        originList.forEach(item => {
            const checkOne = item.id.toString() === payload;
            const checkTwo = item.imgAlt.toString() === payload;
            if (checkOne || checkTwo){
                newArr.push(item);
            }
        })
        state.carouselList.showList = newArr;
    },

    /**
     * 清除轮播图搜索痕迹
     * @param state
     */
    [types.CLEAR_SEARCH_CAROUSEL](state){
        state.carouselList.showList = state.carouselList.originList;
    }

}

export default mutations;