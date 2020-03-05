<template>
    <div>
        <div><h2>注册</h2></div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="用户名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入用户名"/>
            </FormItem>
            <FormItem label="邮箱地址" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入邮箱地址"/>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem label="确认密码" prop="conformPassword">
                <Input type="password" v-model="formValidate.conformPassword" placeholder="请确认密码"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    password: '',
                    conformPassword: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '用户名不可为空', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '邮箱地址不可为空', trigger: 'blur'},
                        {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {type: 'string', trigger: 'blur'}
                    ],
                    conformPassword: [
                        {required: true, message: '请确认密码', trigger: 'blur'},
                        {type: 'string', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid && this.formValidate.password == this.formValidate.conformPassword) {
                        //校验操作
                        this.$Message.success('注册成功');
                    } else {
                        const msg = "密码不一致";
                        this.$Message.error(msg);
                    }
                })
            }
        }
    }
</script>
<style scoped>
</style>