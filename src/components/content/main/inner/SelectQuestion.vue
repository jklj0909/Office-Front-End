<template>
    <div>
        <div style="width: 700px">
            <span style="font-size: 24px;font-weight: bold;width: 20px;padding-right: 10px">{{id}}</span>
            <span style="width: 600px">(2分) {{title}}</span>
            <span style="font-size: 12px;font-weight: bold;float: right;width: 80px;margin-top: 15px">得分/总分</span>
        </div>
        <br/>
        <div>
            <RadioGroup v-model="selected" @click.native.prevent="">
                <div style="line-height: 34px" :class="{'selected':stuAnswer==1}">
                    <Radio :label="'A. '+options[0]"></Radio>
                    <span class="selection-true" v-if="stuAnswer==1&&score==2"><img style="width: 15px" src="~assets/img/icon/check.svg">2.00/2.00</span>
                    <span class="selection-false" v-if="stuAnswer==1&&score==0"><img style="width: 15px" src="~assets/img/icon/close.svg">0.00/2.00</span>
                </div>
                <div style="line-height: 34px" :class="{'selected':stuAnswer==2}">
                    <Radio :label="'B. '+options[1]"></Radio>
                    <span class="selection-true" v-if="stuAnswer==2&&score==2"><img style="width: 15px" src="~assets/img/icon/check.svg">2.00/2.00</span>
                    <span class="selection-false" v-if="stuAnswer==2&&score==0"><img style="width: 15px" src="~assets/img/icon/close.svg">0.00/2.00</span>
                </div>
                <div style="line-height: 34px" :class="{'selected':stuAnswer==3}">
                    <Radio :label="'C. '+options[2]"></Radio>
                    <span class="selection-true" v-if="stuAnswer==3&&score==2"><img style="width: 15px" src="~assets/img/icon/check.svg">2.00/2.00</span>
                    <span class="selection-false" v-if="stuAnswer==3&&score==0"><img style="width: 15px" src="~assets/img/icon/close.svg">0.00/2.00</span>
                </div>
                <div style="line-height: 34px" :class="{'selected':stuAnswer==4}">
                    <Radio :label="'D. '+options[3]"></Radio>
                    <span class="selection-true" v-if="stuAnswer==4&&score==2"><img style="width: 15px" src="~assets/img/icon/check.svg">2.00/2.00</span>
                    <span class="selection-false" v-if="stuAnswer==4&&score==0"><img style="width: 15px" src="~assets/img/icon/close.svg">0.00/2.00</span>
                </div>
            </RadioGroup>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectQuestion",
        data() {
            return {
                selected: "",
                prefixes: ["A. ", "B. ", "C. ", "D. "],
            }
        },
        props: {
            answer: {
                type: String,
                default: "1"
            },
            options: {
                type: Array,
                default() {
                    return ['jack', 'bob', 'jame', 'Mie'];
                }
            },
            title: {
                type: String,
                default: "显示错误"
            },
            id: Number,
            score: String,
            stuAnswer: String
        },
        created() {
            this.selected = this.prefixes[this.stuAnswer - 1] + this.options[this.stuAnswer - 1];
        },
    }
</script>
<style scoped>
    .selected {
        background: #f8f8f9;
        width: 700px;
    }

    .selection-true {
        float: right;
        margin-right: 20px;
        color: #4fbd16;
    }

    .selection-false {
        float: right;
        margin-right: 20px;
        color: #d81e06;
    }
</style>