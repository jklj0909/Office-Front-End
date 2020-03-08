<template>
    <Dropdown>
        <Button type="info">
            <Icon type="md-person"></Icon>
            {{username}}
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem @click.native="dropdownClick('logout')">退出</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
    export default {
        name: "DropDownButton",
        props: {
            username: String
        },
        methods: {
            dropdownClick(name) {
                this.$emit("dropdownClick", name);
            }
        }
    }
</script>
<style scoped>

</style>