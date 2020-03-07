<template>
    <Dropdown>
        <Button type="info">
            <Icon type="md-person"></Icon>
            {{username}}
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem>退出</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
    export default {
        name: "DropDownButton",
        data() {
            return {}
        },
        props: {
            username: String
        }
    }
</script>
<style scoped>

</style>