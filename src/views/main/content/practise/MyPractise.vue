<template>
    <div>
        <Table :columns="columns" :data="pageInfo"></Table>
        <br/>
        <Page :current="currentPage" :total="total" :page-size="7" @on-change="pageChange" simple/>
    </div>
</template>

<script>
    import qs from 'qs';
    import {request} from "network/student";

    export default {
        name: "MyPractise",
        data() {
            return {
                columns: [
                    {
                        title: "标题",
                        key: "title",
                        tooltip: true
                    },
                    {
                        title: "练习时间",
                        key: "practiseTime",
                    },
                    {
                        title: "题目类型",
                        align: "center",
                        key: "questionType",
                    },
                    {
                        title: '分数',
                        key: 'score',
                        align: "center"
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.checkPractise(params.row);
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }],
                practiseRecord: [],
                pageInfo: [],
                currentPage: 1,
                selectedTypes: [],
                total: 0
            }
        },
        created() {
            this.$store.commit("updateBreadcrumbItems", ['练习', '练习记录']);
            this.getPractiseRecord();
        },
        methods: {
            getPractiseRecord() {
                request({
                    url: '/record/getPractiseRecord',
                    method: 'get',
                    paramsSerializer: function (params) {
                        return qs.stringify(params, {arrayFormat: 'repeat'})
                    }
                }).then(({data}) => {
                    this.practiseRecord = data;
                    this.total = data.length;
                    this.loadPageInfo();
                }).catch(() => {
                    this.$Message.error("无法获取到数据,请刷新后重试");
                })
            },
            loadPageInfo() {
                if (this.total - (this.currentPage - 1) * 7 <= 7) {
                    this.pageInfo = this.practiseRecord.slice((this.currentPage - 1) * 7, this.total);
                } else {
                    this.pageInfo = this.practiseRecord.slice((this.currentPage - 1) * 7, (this.currentPage - 1) * 7 + 7);
                }
            },
            pageChange() {
                this.loadPageInfo();
            },
            checkPractise(row) {
                if (row.recordType == "1") {
                    this.$router.push('/practise/answer/single/' + row.id);
                } else if (row.recordType == "0" || row.recordType == "2") {
                    this.$router.push('/practise/record/test/' + row.id);
                } else {
                    this.$Message.error("数据有误,请刷新再试");
                }
            }
        }
    }
</script>
<style scoped>

</style>