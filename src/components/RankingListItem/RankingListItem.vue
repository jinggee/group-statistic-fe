<!--排行榜列表项-->
<template>
    <div class="ranking-list-item">
        <div class="item-num">
            <img
                v-if="number === 1"
                alt=""
                src="@/assets/starHospitalNo1.png"
                style="height: 24px"
            />
            <img
                v-else-if="number === 2"
                alt=""
                src="@/assets/starHospitalNo2.png"
                style="height: 24px"
            />
            <img
                v-else-if="number === 3"
                alt=""
                src="@/assets/starHospitalNo3.png"
                style="height: 24px"
            />
            <span v-else>{{ number }}</span>
        </div>
        <div class="item-bar">
            <van-cell :title="title" :is-link="isLink" :to="to" />
            <van-slider
                readonly
                :max="max"
                :button-size="0"
                :active-color="color"
                bar-height="5px"
                v-model="sliderValue"
            />
        </div>
        <div class="item-value">{{ value }}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import { Cell, Slider } from 'vant'

    export default defineComponent({
        name: 'ranking-list-item',
        props: {
            /** 标题右侧是否显示箭头，并开启点击反馈 */
            isLink: {
                type: Boolean,
                default: true,
            },
            // 点击后跳转的目标路由对象
            to: [String, Object],
            /** 进度条颜色 */
            color: {
                type: String,
                default: '#2786E7',
            },
            number: Number,
            title: String,
            value: {
                type: Number,
                required: true,
                default: 0,
            },
            max: [Number, String],
        },
        components: {
            [Cell.name]: Cell,
            [Slider.name]: Slider,
        },
        setup(props) {
            const sliderValue = ref(props.value)
            return { sliderValue }
        },
    })
</script>

<style lang="less" scoped>
    .ranking-list-item {
        // 设置单元格字体大小
        --van-cell-font-size: var(--van-font-size-sm);
        --van-cell-text-color: @text-color;
        --van-cell-right-icon-color: #dcdfe6;
        --van-cell-vertical-padding: 0;
        --van-cell-horizontal-padding: 0;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 10px;

        /** 排序号 */
        .item-num {
            flex-basis: 40px;
            color: @text-color-second;
            font-size: 0.8rem;
            font-weight: bold;
            width: 20px;
            height: 20px;
        }

        .item-bar {
            flex-grow: 1;
            font-weight: 500;
        }

        .item-value {
            padding: 0 20px 0 15px;
            color: @text-color;
            font-weight: bold;
            font-size: 12px;
            text-align: left;
            padding-top: 20px;
        }

        :deep(.van-cell__title) {
            flex: none;
        }

        :deep(.van-cell::after) {
            border-bottom: none;
        }
    }
</style>
