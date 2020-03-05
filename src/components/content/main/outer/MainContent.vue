<template>
    <div>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        Item 1
                    </template>
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                Content
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "MainContent",
    }
</script>
<style scoped>
</style>