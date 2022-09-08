<template>
    <div class="area-filter">
        <div class="title m-b-10">省份</div>
        <!--省份列表-->
        <div v-if="data && data.length > 0" class="flex area-list">
            <div
                v-for="item in displayedProvince"
                :key="item.name"
                class="area-item"
                :class="{ selected: item === selectedProvince }"
                @click="onClickItem(item, 1)"
            >
                {{ `${item.name}(${item.value})` }}
            </div>
            <div class="area-item expand-area" v-if="showExpand" @click="toogleExpand">
                <span>{{ isExpand ? '收拢<' : '展开>' }} </span>
            </div>
        </div>
        <van-empty v-else description="暂无数据" image-size="80" style="padding: 0" />
        <!--城市列表-->
        <div class="title m-y-10" v-if="showCitys">城市</div>
        <div class="flex area-list" v-if="showCitys">
            <div
                v-for="item in selectedProvince?.children"
                :key="item.name"
                class="area-item"
                :class="{ selected: item === selectedCity }"
                @click="onClickItem(item, 2)"
            >
                {{ `${item.name}(${item.value})` }}
            </div>
        </div>
        <van-row class="footer m-t-20" gutter="20">
            <van-col :span="12">
                <van-button block @click="handleReset">重置</van-button>
            </van-col>
            <van-col :span="12">
                <van-button block type="primary" @click="handleConfirm">确认</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType, Ref, unref, ref, computed } from 'vue'
    import { Col, Row, Empty, Button } from 'vant'

    export default defineComponent({
        name: 'area-filter',
        props: {
            data: {
                type: Array as PropType<KeyValueTree<number>[]>,
            },
            /** 最多展示8项，其余点击‘展开’按钮后显示 */
            max: {
                type: Number,
                default: 8,
            },
        },
        components: {
            [Col.name]: Col,
            [Row.name]: Row,
            [Empty.name]: Empty,
            [Button.name]: Button,
        },
        emits: ['confirmed'],
        setup(props, ctx) {
            /**
             * 当前选择的省份和城市
             */
            const selectedProvince: Ref<KeyValueTree<number> | null> = ref(null)
            const selectedCity: Ref<KeyValueTree<number> | null> = ref(null)

            /**
             * 是否展开
             */
            const isExpand = ref(false)

            /**
             * 是否显示展开按钮
             */
            const showExpand = computed(() => (props?.data?.length || 0) > props.max)

            /** 是否显示城市列表 */
            const showCitys = computed(() => {
                const province = unref(selectedProvince)
                return province && province.children && province.children.length > 0
            })

            const displayedProvince = computed(() => {
                // 如果未设置max，或者max为0则展示所有省份
                if (props.data) {
                    if (isExpand.value || !props.max || props.data.length <= props.max) {
                        return props.data
                    }
                    return props.data.slice(0, props.max)
                }
                return []
            })

            /**
             * 展开/收拢操作
             */
            function toogleExpand() {
                console.log('toogleExpand')
                isExpand.value = !isExpand.value
            }

            function onClickItem(item: KeyValueTree<number>, type: number) {
                if (type === 1) {
                    selectedProvince.value = item
                } else if (type === 2) {
                    selectedCity.value = item
                }
            }

            /**
             * 确认操作
             */
            function handleConfirm() {
                const params = {
                    province: selectedProvince?.value?.name,
                    city: selectedCity?.value?.name,
                }
                ctx.emit('confirmed', params)
            }

            function handleReset() {
                selectedProvince.value = null
                selectedCity.value = null
            }

            return {
                showExpand,
                showCitys,
                displayedProvince,
                selectedProvince,
                selectedCity,
                isExpand,
                onClickItem,
                toogleExpand,
                handleConfirm,
                handleReset,
            }
        },
    })
</script>

<style lang="less" scoped>
    .area-filter {
        padding: 10px 20px 20px;

        .title {
            font-size: 14px;
            font-weight: bold;
        }

        .area-list {
            flex-wrap: wrap;
            max-height: 200px;
            overflow: auto;

            .area-item {
                font-size: 14px;
                flex: 0 0 calc((100% - 20px) / 3);
                background: rgb(244, 244, 245);
                padding: 5px 0;
                text-align: center;
                margin-right: 10px;
                margin-bottom: 10px;

                &:nth-of-type(3n + 0) {
                    margin-right: 0;
                }
            }

            .selected {
                color: @theme-color;
                background-color: rgb(217, 236, 255);
            }

            .expand-area {
                background-color: #fff;
                color: @theme-color;
            }
        }
    }
</style>
