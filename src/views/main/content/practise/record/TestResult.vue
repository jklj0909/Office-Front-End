<template>
    <div style="width: 700px">
        <div v-for="(selection,index) in selectionList" :index="index">
            <select-question :id="index+1" :stuAnswer="selectionAnswer[index]" :answer="selection.answer"
            :options="selection.questionOptions.split('&')" :title="selection.title" :score="selectionScore[index]"/>
            <Divider size="small"/>
        </div>
    </div>
</template>

<script>
    import {request} from 'network/student';
    import SelectQuestion from 'components/content/main/inner/SelectQuestion';

    export default {
        name: "TestResult",
        components: {
            SelectQuestion
        },
        data() {
            return {
                id: "",
                selectionAnswer: [],
                selectionScore: [],
                selectionList: []
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
                    this.selectionAnswer = data.selectionAnswer;
                    this.selectionScore = data.selectionScore;
                    this.selectionList = data.selectionList;
                }).catch(() => {
                    this.$Message.error("获取数据失败,请返回重试");
                });
            }
        }
    }
</script>
<style scoped>

</style>