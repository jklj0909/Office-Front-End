<template>
    <div>
        <h2>
            个人信息
        </h2>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {}
        },
        created() {
            this.$store.commit("updateBreadcrumbItems", ['个人', '信息']);
        }
    }
</script>
<style scoped>

</style>