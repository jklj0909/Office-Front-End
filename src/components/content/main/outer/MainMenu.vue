<template>
    <div>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-nav">
                <MenuItem name="1">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                </MenuItem>
            </div>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "MainMenu",
        data() {
            return {}
        }
    }
</script>
<style scoped>
    .layout-nav {
        width: 420px;
        margin: 0 20px 0 auto;
    }
</style>