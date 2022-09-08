<!--手术占比情况：饼图-->
<template>
    <div ref="chartRef" class="surgery-ratio-chart h-220"></div>
</template>

<script lang="ts">
    import { defineComponent, Ref, ref, onMounted } from 'vue'
    import { useECharts } from '@/hooks/useECharts'
    import type { EChartsOption } from 'echarts'

    export default defineComponent({
        name: 'surgery-ratio',
        props: {
            data: Array,
        },
        setup() {
            const chartRef = ref<HTMLDivElement | null>(null)

            const { setOptions, getWidth } = useECharts(chartRef as Ref<HTMLDivElement>)

            const options: EChartsOption = {
                grid: {
                    left: '10%',
                    right: '10%',
                },
                title: {
                    text: '',
                    subtext: '',
                    left: 'center',
                    top: 'center',
                    subtextStyle: {
                        color: '#333',
                        fontWeight: 'bolder',
                        fontSize: 18,
                    },
                },
                legend: {
                    show: false,
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['35%', '80%'],
                        animationDuration: 500,
                        itemStyle: {
                            borderRadius: 0,
                            borderColor: '#fff',
                            borderWidth: 0,
                        },
                        label: {
                            alignTo: 'edge',
                            formatter: '{name|{b}}\n{count|{c} 例}',
                            minMargin: 5,
                            edgeDistance: 10,
                            lineHeight: 20,
                            rich: {
                                name: {
                                    fontSize: 14,
                                },
                                count: {
                                    color: '#999',
                                },
                            },
                        },
                        labelLine: {
                            length: 20,
                            length2: 0,
                            maxSurfaceAngle: 80,
                        },
                        labelLayout(params) {
                            const isLeft = params.labelRect.x < getWidth() / 2
                            const points = params.labelLinePoints
                            // Update the end point.
                            if (points) {
                                points[2][0] = isLeft
                                    ? params.labelRect.x
                                    : params.labelRect.x + params.labelRect.width
                            }

                            return {
                                labelLinePoints: points,
                            }
                        },
                        data: [
                            { value: 36, name: '一级手术' },
                            { value: 97, name: '二级手术' },
                            { value: 378, name: '三级手术' },
                            { value: 283, name: '四级手术' },
                            { value: 1011, name: '未知' },
                        ],
                    },
                ],
            }

            onMounted(() => {
                setOptions(options)
            })

            return {
                chartRef,
            }
        },
    })
</script>

<style lang="less">
    .surgery-ratio-chart {
        padding: 20px;
    }
</style>
