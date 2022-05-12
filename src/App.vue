<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: "APP",
    created() {
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("store")) {
            this.$store.replaceState(
                Object.assign(
                    {},
                    this.$store.state,
                    JSON.parse(sessionStorage.getItem("store"))
                )
            );
        }
        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("store", JSON.stringify(this.$store.state));
        });
        // 如果现在已经有userinfo就去验证时间是不是已经超过1天
        if (localStorage.getItem('accountInfo')){
            const accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
            const oneDayMilliSecond = 86400000;
            if (Date.now() - accountInfo.timeStamp > oneDayMilliSecond){
                // 超过了一天
                localStorage.removeItem('accountInfo');
            }
        }
    },
}
</script>

<style>
* {
    box-sizing: border-box;
}

html, body {
    height: 100%;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
    color: white;
}
</style>
