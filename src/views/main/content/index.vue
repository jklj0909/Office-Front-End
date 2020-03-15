<template>
    <div>
        <h1>首页</h1>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {}
        },
        created() {
            this.$store.commit("updateBreadcrumbItems", ['首页']);
        }
    }
</script>
<style scoped>

</style>