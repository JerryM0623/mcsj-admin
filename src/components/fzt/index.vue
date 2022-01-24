<template>
    <div class="container">
        <div class="main">
            <div class="code">403</div>
            <div class="text">oops！当前账户暂无权限查看本页面哦！</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "fzt"
}
</script>

<style scoped>
.container{
    background-color: #f3e5cb;
    /*background-color: #a64006;*/
    height: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.main{
    width: 560px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.text,
.code{
    color: #ca502e;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
}
.code{
    font-size: 60px;
}
</style>