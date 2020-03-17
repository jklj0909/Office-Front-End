<template>
    <div class="outer-page">
        <div class="title">{{title}}
            <Button style="margin-left:10px;float: right" @click="goBack">返回</Button>
            <Button style="float: right" type="primary" @click="downloadFile(0)">我的答案</Button>
        </div>
        <br/>
        <div class="score">成绩&nbsp;<span>{{score}}</span>&nbsp;全站平均成绩&nbsp;<span>{{averageScore}}</span></div>
        <br/>
        <Divider size="small" :dashed="true"/>
        <div class="questionList">
            <div class="questionStep" v-for="(item,index) in stuStepDetail" :index="index">
                <div class="step-title">步骤&nbsp;{{item.step}}</div>
                <br/>
                <Row>
                    <Col span="12">
                    <br/>
                    <div class="step-body">
                        <div>步骤说明</div>
                        <br/>
                        <Input class="input-step" v-model="item.stepDescription" readonly/>
                    </div>
                    </Col>
                    <Col span="12">
                    <div class="step-score">得分&nbsp;<span>{{item.stepScore}}</span>&nbsp;全站平均得分&nbsp;<span>{{item.stepAverageScore}}</span>
                    </div>
                    <br/>
                    <div class="introduction">
                        在此处下载答案示例
                    </div>
                    <br/>
                    <Button type="primary" @click="downloadFile(item.step)">示例</Button>
                    </Col>
                </Row>
                <br/>
                <Divider size="small"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "network/student";

    export default {
        name: "AnswerSingle",
        data() {
            return {
                studentQid: "",
                score: "0.00",
                averageScore: "0.00",
                stuStepDetail: [],
                title: "",
                questionType: "",
                suffix: ""
            }
        },
        created() {
            this.$store.commit("updateBreadcrumbItems", ['练习', '操作题', '答题结果']);
        },
        mounted() {
            this.studentQid = this.$route.params.studentQid;
            this.getStudentResult(this.studentQid);
        },
        methods: {
            getStudentResult(qid) {
                request({
                    url: '/operation/getStudentResult/' + qid,
                    method: 'get'
                }).then(({data}) => {
                    this.score = data.message.split(";")[0];
                    this.averageScore = data.message.split(";")[1];
                    this.title = data.message.split(";")[2];
                    this.questionType = data.message.split(";")[3];
                    if (this.questionType == "word") {
                        this.suffix = ".docx";
                    } else if (this.questionType == "ppt") {
                        this.suffix = ".pptx";
                    } else if (this.questionType == "excel") {
                        this.suffix = ".xlsx";
                    }
                    this.stuStepDetail = data.info;
                }).catch(() => {
                    this.$Message.error("页面不存在");
                })
            },
            goBack() {
                this.$router.push("/practise/my");
            },
            downloadFile(step) {
                let filename = "";
                let url = "";
                if (step == 0) {
                    filename = "stuAnswer" + this.suffix;
                    url = '/operation/downloadStu/' + this.studentQid;
                } else if (step > 0) {
                    filename = "teaAnswer" + step + this.suffix;
                    url = '/operation/downloadTea/' + this.studentQid + "/" + step;
                } else {
                    this.$Message.error("资源不存在");
                    return;
                }
                request({
                    url: url,
                    method: 'get',
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json; application/octet-stream'
                    },
                }).then(res => {
                    let blob = new Blob([res.data]);
                    let downloadElement = document.createElement('a');
                    let href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = filename; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href);
                }).catch(() => {
                    this.$Message.error("请求失败,请刷新重试");
                })
            }
        }
    }
</script>
<style scoped>
    .outer-page {
        margin: 20px;
    }

    .title {
        font-size: 26px;
        font-weight: bold;
    }

    .score {
        float: right;
    }

    .score span {
        color: #ff0000;
        font-size: 23px;
    }

    .questionList {
        margin-right: 50px;
        margin-left: 50px;
    }

    .step-title {
        font-size: 19px;
        font-family: 黑体;
        font-weight: bold;
    }

    .input-step {
        width: 80%;
    }

    .step-score span {
        color: #ff0000;
        font-size: 20px;
    }

    .step-score {
        font-size: 13px;
        float: right;
    }

    .introduction {
        font-weight: bold;
    }
</style>