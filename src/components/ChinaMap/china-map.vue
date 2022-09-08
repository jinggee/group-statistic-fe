<template>
  <div class="china-map">
    <div  ref="chartRef" :style="{height:  height}">
    </div>
    <div class="title m-t-20">{{title}}</div>
  </div>
</template>

<script lang="ts">
import {
    defineComponent, ref, Ref, PropType, watchEffect,
} from 'vue'
import china from '@/assets/china.json'
import { useECharts, echarts } from '@/hooks/useECharts'

interface MapData {
  name: string,
  value: number
}

export default defineComponent({
    name: 'china-map',
    props: {
        height: {
            type: String,
            default: '300px',
        },
        title: String,
        showTitle: Boolean,
        data: {
            type: Array as PropType<MapData[]>,
        },
    },
    setup(props) {
        const chartRef = ref<HTMLDivElement | null>(null)
        echarts.registerMap('china', china as any)

        const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

        const defaultOptions: any = {
            visualMap: {
                show: false,
                left: 'right',
                min: 0,
                max: 100,
                inRange: {
                    color: ['#ECEEEB', '#B4E3FA', '#62C5F6', '#2998E8'],
                },
                text: ['High', 'Low'],
                calculable: true,
            },
            series: [
                {
                    type: 'map',
                    roam: false, // 不开启鼠标移动和地图滚轮缩放
                    map: 'china', // 这里是你导入echarts的json文件
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '100%',
                    label: { // 地图默认的文本属性
                        show: false,
                        color: '#2998E8',
                    },
                    select: { // 选中的区域文本属性
                        label: {
                            color: '#2998E8',
                        },
                        itemStyle: {
                            color: '#3066ba',
                        },
                    },
                    emphasis: { // 高亮的区域文本属性
                        itemStyle: {
                            areaColor: '#3066ba',
                        },
                        label: {
                            show: true,
                            textStyle: {
                                color: '#2998E8',
                            },
                        },
                    },
                    zoom: 1.1,
                    textFixed: {
                        Alaska: [20, -20],
                    },
                    data: china.features.map((e: any) => {
                        const num = Math.round(Math.random() * Math.random() * 100)
                        return { name: e.properties.name, value: num }
                    }),
                },
            ],
        }

        watchEffect(() => {
            defaultOptions.series[0].data = props.data
            setOptions(defaultOptions)
        })

        return {
            chartRef,
        }
    },
})
</script>

<style lang="less" scoped>
.title {
  color: @theme-color;
  font-size: 14px;
  text-align: center;
}
</style>
