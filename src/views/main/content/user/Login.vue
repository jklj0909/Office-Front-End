<template>
    <div class="login-form">
        <h2 style="text-align: left;padding: 10px">登录</h2>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入用户名"
                       @on-enter="handleSubmit(formInline.user,formInline.password,formInline.validCode)">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="请输入密码"
                       @on-enter="handleSubmit(formInline.user,formInline.password,formInline.validCode)">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="validCode">
                <Input type="text" v-model="formInline.validCode" placeholder="请输入验证码"
                       @on-enter="handleSubmit(formInline.user,formInline.password,formInline.validCode)">
                <Icon type="ios-arrow-round-forward" slot="prepend"></Icon>
                </Input>
                <valid-code :value.sync="validCode" class="valid-code" ref="validCode"></valid-code>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit(formInline.user,formInline.password,formInline.validCode)">
                    登录
                </Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import ValidCode from 'components/common/valid/ValidCode';
    import {request} from 'network/student';

    export default {
        name: "Login",
        components: {
            ValidCode
        },
        data() {
            return {
                formInline: {
                    user: '',
                    password: '',
                    validCode: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}, {type: 'string', trigger: 'blur'}
                    ],
                    validCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                validCode: ''
            }
        },
        methods: {
            login(user, password) {
                return request({
                    url: '/student/login',
                    method: "post",
                    data: {
                        username: user,
                        password: password
                    }
                })
            },
            handleSubmit(name, password, validCode) {
                if (validCode.toLowerCase() != this.validCode.toLowerCase()) {
                    this.$Message.error("验证码错误");
                    this.$refs.validCode.refreshCode();
                    return;
                }
                this.$refs["formInline"].validate((valid) => {
                    if (valid) {
                        this.login(name, password).then(({data}) => {
                            this.$Message.success("登录成功");
                            this.$store.commit("afterLogin", data.info);
                            this.$router.push('/index');
                        }).catch(({response}) => {
                            this.$Message.error(response.data.message);
                            this.$refs.validCode.refreshCode();
                        });
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .login-form {
        width: 45%;
        margin-left: 25%;
    }

    .valid-code {
        float: right;
        margin-top: 15px;
    }
</style>