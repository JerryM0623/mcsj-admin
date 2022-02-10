const state = {
    // 当前登陆账户的信息
    userInfo: {},
    // 权限管理方面的数据
    permissionList: {
        originList: [],
        showList: [],
        total: 0
    },
    // 角色权限方面的数据
    rolePermissionList: {
        originList: [],
        showList: [],
        total: 0
    },
    // 账户信息的存储数据
    accountList: {
        originList: [],
        showList: [],
        total: 0
    },
    // 轮播图数据
    carouselList: {
        originList: [],     // 原始数据
        showList: [],       // 表格展示用数据
        onlineList: [],     // 预览图展示用数据
        total: 0            // 后端共计拥有的数据总数
    }
}

export default state;