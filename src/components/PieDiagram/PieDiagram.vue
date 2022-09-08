<template>
  <div ref="chartRef" class="hqyl-pie-chart"></div>
</template>

<script lang="ts">
import {
    defineComponent, ref, Ref, watchEffect,
} from 'vue'
import { useECharts } from '@/hooks/useECharts'
import type { EChartsOption } from 'echarts'

export default defineComponent({
    name: 'pie-diagram',
    props: {
        title: String,
        subTitle: String,
        data: Array,
    },
    setup(props) {
        const chartRef = ref<HTMLDivElement | null>(null)

        const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

        const options: EChartsOption = {
            title: {
                text: props.title,
                subtext: props.subTitle,
                left: 'center',
                top: 'center',
                subtextStyle: {
                    color: '#333',
                    fontWeight: 'bolder',
                    fontSize: 18,
                },
            },
            legend: {
                orient: 'vertical',
                top: 'center',
                right: '15%',
                itemGap: 20,
                itemWidth: 14,
            },
            color: ['#3D8EFB', '#01D3B7', '#FCCB82', '#FD7D78', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            series: [
                {
                    type: 'pie',
                    radius: ['35%', '80%'],
                    center: ['35%', '50%'],
                    animationDuration: 500,
                    itemStyle: {
                        borderRadius: 0,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{d}%',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [],
                },
            ],
        }

        watchEffect(() => {
            const { data } = props
            if (options.series instanceof Array) {
                options.series[0].data = data
            }
            setOptions(options)
        })

        return {
            chartRef,
        }
    },
})
</script>

<style lang="less">
  .hqyl-pie-chart {
    width: 100%;
    height: 200px;
  }
</style>
