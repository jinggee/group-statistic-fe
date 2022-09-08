<!--总览-->
<template>
    <div>
        <van-grid :column-num="2">
            <van-grid-item v-for="(item, index) in summary" :key="item.title">
                <indicator-card
                    :isSelected="index === selectedIndex"
                    :name="item.title"
                    :value="`${item.value}${item.unit}`"
                    @click="handleClickCard(item, index)"
                >
                    <template v-if="!hospitalId" #foot>
                        <span>{{ `全年累计${item.total}${item.unit}` }}</span>
                    </template>
                </indicator-card>
            </van-grid-item>
        </van-grid>
        <!--只有查询所有集团时，才显示饼图-->
        <pie-diagram :data="chartData" v-if="showCharts" />
    </div>
</template>

<script lang="ts">
    import { Grid, GridItem } from 'vant'
    import { defineComponent, ref, Ref, computed, onMounted } from 'vue'
    import SectionView from '@/components/SectionView/sectionView.vue'
    import IndicatorCard from '@/components/IndicatorCard/IndicatorCard.vue'
    import PieDiagram from '@/components/PieDiagram/PieDiagram.vue'
    import { getBusinessOverview } from '@/api/business'

    const props = {
        hospitalId: String,
        groupId: {
            type: String,
        },
        /** 查询类型：日查询0、月查询1、年累计查询2 */
        queryType: {
            type: [String, Number],
            required: true,
            default: 1,
        },
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
        },
        day: {
            type: Number,
        },
    }

    export default defineComponent({
        name: 'business-summary',
        components: {
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [SectionView.name]: SectionView,
            [IndicatorCard.name]: IndicatorCard,
            [PieDiagram.name]: PieDiagram,
        },
        props,
        setup(props, context) {
            const showCharts = computed(() => !props.hospitalId)

            console.log(context.attrs, 'ssss')

            /**
             * 业务总览
             */
            const summary: Ref<Array<any>> = ref([])

            const selectedIndex = ref(0)
            // const data = ref(summary.value[0].data)
            const chartData = ref([])

            function handleClickCard(item: any, index: number) {
                selectedIndex.value = index
                chartData.value = item.data
            }

            onMounted(() => {
                const params = {
                    hospitalId: props.hospitalId,
                }
                getBusinessOverview(params).then((res: any) => {
                    const { data } = res
                    summary.value = data
                    if (summary.value?.length > 0) {
                        chartData.value = summary.value[0].data
                    }
                })
            })

            return {
                showCharts,
                summary,
                selectedIndex,
                chartData,
                handleClickCard,
            }
        },
    })
</script>
