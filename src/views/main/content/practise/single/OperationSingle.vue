<template>
    <div>
        <Row>
            <Button style="float: right" type="success" shape="circle" @click="submitAnswer" :disabled="isOk==false">
                提交
            </Button>
        </Row>
        <br>
        <Row type="flex" align="top" :gutter="64">
            <!--左边是关于试题的信息-->
            <Col span="11">
            <Row><span>标题</span></Row>
            <br>
            <Row><Input v-model="title" readonly></Input></Row>
            <br>
            <Row><span>题目详细信息</span></Row>
            <br>
            <Row>
                <Row><Input v-model="description" type="textarea" :rows="8" readonly></Input></Row>
            </Row>
            </Col>
            <Col span="11">
            <div>
                <Row>
                    <div style="font-family: 宋体;color: #464c5b;font-weight: bold">
                        请首先下载素材文件<br/>
                    </div>
                    <br/>
                    <Button type="primary" @click="downloadFile">下载</Button>
                    <br/><br/>
                    <div class="upload-instruction">
                        请在此处上传{{questionType}}文件,请注意:<br/>
                        1.请根据题目要求完成所有操作，之后再上传文件。<br/>
                        2.请上传格式为.{{format}}的文件。<br/>
                        3.文件可多次上传,以最后一次为准。
                    </div>
                    <br/>
                    <Upload :action="uploadStudentPath+'/'+questionType+'/'+id" :max-size="4*1024" :multiple="true"
                            :on-success="onSuccess"
                            :on-error="onError" :on-exceeded-size="exceedSize" :on-format-error="formatError"
                            :format="[format]" :show-upload-list="false" :with-credentials="true">
                        <Button icon="ios-cloud-upload-outline">上传文件</Button>
                        <span v-show="isOk==true"><Icon style="margin-left: 5px"
                                                        type="ios-checkmark-circle"></Icon>ok</span>
                    </Upload>
                </Row>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {request} from "network/student";

    export default {
        name: "OperationSingle",
        data() {
            return {
                title: "",
                description: "",
                id: "",
                questionType: "",
                format: "",
                uploadStudentPath: "http://localhost:8082/operation/uploadAnswer",
                isOk: false
            }
        },
        created() {
            this.$store.commit("updateBreadcrumbItems", ['练习', '操作题', '单题演练']);
        },
        mounted() {
            this.id = this.$route.params.id;
            if (this.id == null || this.id == undefined) {
                this.$Message.error("页面不存在");
                this.$router.push("/practise/operation");
            }
            this.checkIfExists();
        },
        methods: {
            checkIfExists() {
                request({
                    url: '/operation/checkIfExists',
                    method: 'get',
                    params: {
                        id: this.id
                    }
                }).then(({data}) => {
                    this.title = data.title;
                    this.description = data.description;
                    this.questionType = data.questionType;
                    if (this.questionType == "word") {
                        this.format = "docx";
                    } else if (this.questionType == "ppt") {
                        this.format = "pptx";
                    } else if (this.questionType == "excel") {
                        this.format = "xlsx";
                    }
                }).catch(() => {
                    this.$Message.error("页面不存在");
                    this.$router.push("/practise/operation");
                })
            },
            onSuccess(response) {
                this.$Message.success("上传成功");
                this.isOk = true;
            },
            onError() {
                this.$Message.error("上传失败,请刷新后重试");
            },
            exceedSize() {
                this.$Message.error("文件超出限制大小");
            },
            formatError() {
                this.$Message.error("文件格式错误");
            },
            getFilename(questionType, id) {
                return request({
                    url: '/operation/getFilename/' + questionType + '/' + id,
                    method: 'get'
                })
            },
            downloadFile() {
                this.getFilename(this.questionType, this.id).then(({data}) => {
                    let filename = data;
                    request({
                        url: '/operation/download/' + this.questionType + '/' + this.id + '/' + filename,
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
                        this.$Message.error("服务器内部错误");
                    })
                }).catch(() => {
                    this.$Message.error("文件不存在");
                });
            },
            submitAnswer() {
                this.$Spin.show();
                request({
                    url: '/operation/submitAnswer/' + this.questionType + '/' + this.id,
                    method: 'post'
                }).then(({data}) => {
                    this.$Spin.hide();
                    this.$Message.success("成功");
                    this.$router.push("/practise/answer/single/" + data.message);
                }).catch(({response}) => {
                    this.$Spin.hide();
                    if (response.data.message != null && response.data.message != undefined) {
                        this.$Message.error(response.data.message);
                    } else {
                        this.$Message.error("系统内部错误,请刷新后重试");
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .upload-instruction {
        font-family: 宋体;
        font-weight: bold;
        font-size: 15px;
        color: #ff0000;
        line-height: 25px;
    }
</style>