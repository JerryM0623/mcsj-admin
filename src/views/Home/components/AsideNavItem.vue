<template>
    <div>
        <el-submenu v-if="item.child" :index="item.url">
            <template slot="title">
                <i :class="item.iconClassName"></i>
                <span>{{ item.title }}</span>
            </template>
            <aside-nav-item
                v-for="childItem in item.child"
                :key="childItem.url"
                :item="childItem"
            ></aside-nav-item>
        </el-submenu>

        <el-menu-item v-else :index="item.url"><i :class="item.iconClassName"></i><span>{{ item.title }}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: "AsideNavItem",
    props: {
        item: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>

</style>