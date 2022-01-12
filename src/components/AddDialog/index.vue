<template>
    <el-dialog :title="DialogOptions.title" :visible.sync="DialogOptions.isDialogShow">
        <slot name="content"></slot>
    </el-dialog>
</template>

<script>
export default {
    name: "AddDialog",
    props: {
        DialogOptions:{
            type: Object,
            required: true,
            default: () => {
                return {
                    isDialogShow: false
                }
            }
        }
    }
}
</script>

<style scoped>

</style>