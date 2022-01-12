<template>
<!--    -->
    <el-drawer
        :visible.sync="DrawerOption.isDrawerShow"
        :direction="DrawerOption.drawerDirection"
        :show-close="DrawerOption.showClose"
        :wrapperClosable="DrawerOption.wrapperClosable"
        :title="DrawerOption.title"
    >
        <!--        使用插槽实现多元化-->
        <slot name="content"></slot>
    </el-drawer>
</template>

<script>
export default {
    name: "EditDrawer",
    props: {
        // 抽屉的配置属性
        DrawerOption: {
            type: Object,
            required: true,
            default: () => {
                return {
                    isDrawerShow: false,
                    drawerDirection: 'ltr'
                }

            }
        }
    },
    data() {
        return {}
    },
    methods: {
    }
}
</script>

<style scoped>

</style>