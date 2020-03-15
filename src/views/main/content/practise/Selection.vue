<template>
    <div>
        Selection
    </div>
</template>

<script>
    export default {
        name: "Selection",
        data() {
            return {}
        },
        created() {
            this.$store.commit("updateBreadcrumbItems", ['练习', '选择题']);
        },
    }
</script>
<style scoped>

</style>