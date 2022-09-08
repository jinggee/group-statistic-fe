<!--医疗企业核心医院数据接入情况-->
<template>
    <van-grid :border="false" :column-num="displayColumn" style="margin: 0 20px">
        <van-grid-item v-for="(item, index) in list" :key="'business' + index">
            <div class="grid-item-circle">
                <van-circle
                    :text="`${item.value}%`"
                    :speed="0"
                    :color="colors[index]"
                    layer-color="#DCDFE6"
                    :current-rate="item.value"
                    stroke-width="50"
                    size="70px"
                />
                <span class="grid-item-circle-name">{{ item.name }}</span>
            </div>
        </van-grid-item>
    </van-grid>
</template>
<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import { Circle, Grid, GridItem } from 'vant'

    export default defineComponent({
        name: 'business-core-data-join-condition',
        components: {
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Circle.name]: Circle,
        },
        setup() {
            const displayColumn = ref(4)
            const colors = ref(['#1989fa', '#58DAEA', '#E6A23C', '#F56C6C'])
            const list = ref([
                {
                    name: '环球医疗',
                    value: 60,
                },
                {
                    name: '通用医疗',
                    value: 70,
                },
                {
                    name: '国中健康',
                    value: 37,
                },
                {
                    name: '航天医科',
                    value: 91,
                },
            ])
            return {
                colors,
                displayColumn,
                list,
            }
        },
    })
</script>
<style lang="less" scoped>
    .grid-item-circle-name {
        font-size: 14px;
        font-weight: 500;
    }
</style>
