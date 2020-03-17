<template>
    <div>
        TestResult
    </div>
</template>

<script>
    import {request} from 'network/student';

    export default {
        name: "TestResult",
        data() {
            return {
                id: ""
            }
        },
        created() {
            this.$store.commit("updateBreadcrumbItems", ['练习', '测试结果']);
            this.id = this.$route.params.id;
            this.getTestResult();
        },
        methods: {
            getTestResult() {
                request({
                    url: '/record/getTestResult/' + this.id,
                    method: 'get'
                }).then(({data}) => {
                    console.log(data);
                }).catch(() => {
                    this.$Message.error("获取数据失败,请返回重试");
                });
            }
        }
    }
</script>
<style scoped>

</style>