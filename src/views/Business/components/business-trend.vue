<template>
  <div>
    <van-tabs @click-tab="handleTabClick">
      <van-tab title="门急诊" />
      <van-tab title="出院" />
      <van-tab title="手术" />
      <van-tab title="体检" />
    </van-tabs>
    <div ref="chartRef" :style="{height: '240px'}"></div>
  </div>
</template>

<script lang="ts">
import {
    defineComponent, Ref, ref, onMounted,
} from 'vue'
import { Tab, Tabs, Progress } from 'vant'
import { TabsClickTabEventParams } from 'vant/lib/tabs/types'
import { useECharts } from '@/hooks/useECharts'
import type { EChartsOption } from 'echarts'

export default defineComponent({
    name: 'business-trend',
    components: {
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [Progress.name]: Progress,
    },
    props: {
        data: Array,
    },
    setup() {
        const chartRef = ref<HTMLDivElement | null>(null)
        const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

        const data: Ref<Array<any>> = ref([])

        data.value = [{
            title: '门急诊',
            data: [
                ['01', 3812],
                ['02', 2678],
                ['03', 3555],
                ['04', 1998],
                ['05', 6578],
                ['06', 3377],
                ['07', 1988],
            ],
        }, {
            title: '出院',
            data: [
                ['01', 3812],
                ['02', 3434],
                ['03', 3555],
                ['04', 5566],
                ['05', 6578],
                ['06', 6655],
                ['07', 3214],
            ],
        }, {
            title: '手术',
            data: [
                ['01', 3322],
                ['02', 2678],
                ['03', 4321],
                ['04', 1998],
                ['05', 3456],
                ['06', 3377],
                ['07', 5544],
            ],
        }, {
            title: '体检',
            data: [
                ['01', 1812],
                ['02', 2678],
                ['03', 7555],
                ['04', 5998],
                ['05', 6578],
                ['06', 3377],
                ['07', 2988],
            ],
        }]

        const options: EChartsOption = {
            grid: {
                left: '20%',
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                formatter: '{b0}日:{c0}人次',
                // 提示框背景色
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: 'transparent',
                // 提示框文本样式
                textStyle: {
                    color: '#fff',
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    formatter: '{value}日',
                },
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    type: 'line',
                    lineStyle: {
                        //  折线颜色
                        color: '#E8A267',
                    },
                    itemStyle: {
                        // 折线拐点小圆圈样式
                        color: '#987A7B',
                    },
                    areaStyle: {
                        color: '#FBC28A',
                    },
                },
            ],
        }

        function showChart(name: string|number) {
            const index = Number.parseInt(`${name}`, 10)
            if (options.series instanceof Array) {
                options.series[0].data = data.value[index].data
                setOptions(options)
            }
        }

        function handleTabClick(tab: TabsClickTabEventParams) {
            const { name } = tab
            showChart(name)
        }

        onMounted(() => {
            showChart(0)
        })

        return {
            chartRef,
            handleTabClick,
        }
    },
})
</script>
