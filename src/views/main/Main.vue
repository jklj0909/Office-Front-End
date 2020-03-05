<template>
    <div class="layout">
        <Layout>
            <!--顶部菜单栏-->
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <a @click="goToIndex">
                        <div class="layout-logo">Office自动判卷系统</div>
                    </a>
                    <div class="layout-nav">
                        <div class="layout-nav-buttons" v-show="isLogin===false">
                            <Button @click="goToRegister">注册</Button>
                            <Button type="primary" @click="goToLogin">登录</Button>
                        </div>
                    </div>
                </Menu>
            </Header>

            <Layout>
                <!--左侧列表-->
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" width="auto">
                        <Submenu :name="item.name" v-for="(item,index) in slider" :key="index"
                                 v-show="isLogin==item.requireLogin">
                            <template slot="title">
                                <Icon :type="item.iconType"></Icon>
                                {{item.content}}
                            </template>
                            <MenuItem :name="itemList.name" v-for="(itemList,i) in item.childList" :key="i"
                                      v-show="isLogin==itemList.requireLogin" :to="itemList.link">
                                {{itemList.content}}
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <!--当前所在页面路径-->
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem v-for="(item,index) in breadcrumbItems" :key="index">{{item}}</BreadcrumbItem>
                    </Breadcrumb>
                    <!--路由的页面-->
                    <Content :style="{padding: '24px', minHeight: '300px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="layout-footer-right">2020 &copy; Office</Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                slider: [
                    {
                        childList: [{
                            name: 'register',
                            content: '注册',
                            requireLogin: false,
                            link: '/profile/register'
                        }, {name: 'login', content: '登录', requireLogin: false, link: '/profile/login'}],
                        iconType: 'md-person',
                        content: '账户',
                        name: 'profile',
                        requireLogin: false
                    }
                ],
                isLogin: false
            }
        },
        computed: {
            breadcrumbItems() {
                return this.$route.path.split('/');
            }
        },
        methods: {
            goToIndex() {
                this.$router.push('/index');
            },
            goToRegister() {
                this.$router.push('/profile/register');
            },
            goToLogin() {
                this.$router.push('/profile/login');
            }
        },
    }
</script>
<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 200px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 5px;
        left: 5px;
        color: #d7dde4;
        font-size: 15px;
    }

    .layout-nav {
        width: 500px;
        float: right;
        right: 0;
    }

    .layout-nav-buttons {
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .layout-nav button {
        margin: 10px;
    }

    .layout-footer-right {
        text-align: right;
        font-size: 13px;
    }
</style>