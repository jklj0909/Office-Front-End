<template>
    <div>
        <Input style="width: 25%" v-model="search" @on-search="queryBySearch" search placeholder="请输入搜索内容"/><br/><br/>
        <Table :columns="columns" :data="questions" @on-sort-change="sortChanged"></Table>
        <br/>
        <Page :current="currentPage" :total="total" :page-size="7" @on-change="pageChange" simple/>
    </div>
</template>

<script>
    import {requestTeacher} from 'network/teacher';
    import qs from 'qs';

    export default {
        name: "Operation",
        created() {
            this.$store.commit("updateBreadcrumbItems", ['练习', '操作题']);
            this.getQuestionInfoByPage();
        },
        data() {
            return {
                columns: [
                    {
                        title: "标题",
                        key: "title",
                        tooltip: true
                    },
                    {
                        title: "描述",
                        key: "description",
                        tooltip: true
                    },
                    {
                        title: "发布时间",
                        key: "lastUpdatedTime",
                        sortable: "custom"
                    },
                    {
                        title: "练习次数",
                        key: "visitedCount",
                        sortable: "custom"
                    },
                    {
                        align: "center",
                        key: "questionType",
                        renderHeader: (h) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        href: 'javascript:void(0)',
                                    },
                                    on: {
                                        click: () => {
                                            this.typeSelected("word");
                                        }
                                    },
                                    style: {
                                        color: this.selectedTypes.indexOf("word") == -1 ? "#17233d" : ""
                                    },
                                }, "word"),
                                h('span', " | "),
                                h('a', {
                                    props: {
                                        href: 'javascript:void(0)',
                                    },
                                    style: {
                                        color: this.selectedTypes.indexOf("ppt") == -1 ? "#17233d" : ""
                                    },
                                    on: {
                                        click: () => {
                                            this.typeSelected("ppt");
                                        }
                                    }
                                }, "ppt"),
                                h('span', " | "),
                                h('a', {
                                    props: {
                                        href: 'javascript:void(0)',
                                    },
                                    on: {
                                        click: () => {
                                            this.typeSelected("excel");
                                        }
                                    },
                                    style: {
                                        color: this.selectedTypes.indexOf("excel") == -1 ? "#17233d" : ""
                                    },
                                }, "excel"),
                            ])
                        }
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.operationPractise(params.row);
                                        }
                                    }
                                }, '练习')
                            ]);
                        }
                    }
                ],
                questions: [],
                selectedTypes: [],
                currentPage: 1,
                total: 0,
                order: "",
                key: "",
                search: ""
            }
        },
        methods: {
            getQuestionInfoByPage(page, types, sort, column, search) {
                requestTeacher({
                    url: '/mark/getAllQuestionInfo',
                    method: 'get',
                    params: {
                        page: page,
                        types: types,
                        sort: sort,
                        column: column,
                        search: search
                    },
                    paramsSerializer: function (params) {
                        return qs.stringify(params, {arrayFormat: 'repeat'})
                    }
                }).then(({data}) => {
                    this.questions = data.items;
                    this.total = data.total;
                    this.currentPage = data.currentPage;
                }).catch(() => {
                    this.$Message.error("服务器内部请刷新后重试");
                });
            },
            sortChanged(column) {
                this.order = column.order;
                this.key = column.key;
                this.getQuestionInfoByPage(1, this.selectedTypes, column.order, column.key, this.search);
            },
            typeSelected(type) {
                let index = -1;
                if ((index = this.selectedTypes.indexOf(type)) == -1) {
                    this.selectedTypes.push(type);
                } else {
                    this.selectedTypes.splice(index, 1);

                }
                this.getQuestionInfoByPage(1, this.selectedTypes, null, null, this.search);
            },
            pageChange(page) {
                this.getQuestionInfoByPage(page, this.selectedTypes, this.order, this.key, this.search);
            },
            queryBySearch() {
                this.getQuestionInfoByPage(1, this.selectedTypes, this.order, this.key, this.search);
            },
            operationPractise(row) {
                if (row.state < 31) {
                    this.$Message.error("无法访问该试题");
                    this.getQuestionInfoByPage();
                }
                this.$router.push({
                    path: '/practise/operation/single/' + row.id,
                })
            }
        }
    }
</script>
<style scoped>

</style>