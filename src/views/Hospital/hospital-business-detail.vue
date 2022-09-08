<template>
    <div>
        <hospital-card :name="hospitalInfo.name" grade="三级医院1" updateType="日更新" />
        <section-view title="业务总览">
            <template #head-tool>
                <span>日更新</span>
            </template>
            <business-summary hospitalId="1" :year="2022" :month="7" :day="21" />
        </section-view>
        <section-view title="基本信息">
            <template #head-tool>
                <span>更新时间：{{ hospitalInfo.update }}</span>
            </template>
            <div class="basic-info">
                <div class="basic-field">
                    <span class="field-name">机构种类</span>
                    <div>{{ hospitalInfo.orgType }}</div>
                </div>
                <div class="basic-field">
                    <span class="field-name">机构性质</span>
                    <div>{{ hospitalInfo.orgNature }}</div>
                </div>
                <div class="basic-field">
                    <span class="field-name">主办单位</span>
                    <div>{{ hospitalInfo.sponsor }}</div>
                </div>
                <div class="basic-field">
                    <span class="field-name">所在地</span>
                    <div>{{ hospitalInfo.location }}</div>
                </div>
            </div>
        </section-view>
        <section-view title="床位">
            <template #head-tool>
                <span>更新时间：{{ hospitalInfo.update }}</span>
            </template>
            <div class="flex align-items-center m-x-20">
                <div class="flex-grow-1 label-name"> 床位数 </div>
                <div class="label-value">
                    {{ hospitalInfo.bedNum }}
                </div>
            </div>
        </section-view>
        <section-view title="员工">
            <template #head-tool>
                <span>更新时间：{{ hospitalInfo.update }}</span>
            </template>
            <div class="flex align-items-center m-x-20">
                <div class="flex-grow-1 label-name"> 在职员工数量 </div>
                <div class="label-value">
                    {{ hospitalInfo.employeeNum }}
                </div>
            </div>
        </section-view>
        <section-view title="业务">
            <template #head-tool>
                <span>更新时间：{{ hospitalInfo.update }}</span>
            </template>
            <div ref="chartRef" style="height: 280px"></div>
        </section-view>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, Ref, onMounted } from 'vue'

    import { getBusinessOverviewByHospital } from '@/api/hospital'
    import { useECharts } from '@/hooks/useECharts'
    import BusinessSummary from '@/components/BusinessSummary/BusinessSummary.vue'
    import SectionView from '@/components/SectionView/sectionView.vue'
    import HospitalCard from '@/components/HospitalCard/HospitalCard.vue'
    import type { EChartsOption } from 'echarts'

    export default defineComponent({
        props: {
            // 查询类型：日更新、月更新、年更新
            queryType: {
                type: [Number, String],
            },
            hospitalId: {
                type: String,
                required: true,
            },
        },
        components: {
            [SectionView.name]: SectionView,
            [HospitalCard.name]: HospitalCard,
            [BusinessSummary.name]: BusinessSummary,
        },
        setup() {
            const chartRef = ref<HTMLDivElement | null>(null)
            const hospitalInfo: Ref<any> = ref({})

            const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

            function loadChart(data: any) {
                const options: EChartsOption = {
                    grid: {
                        left: '20%',
                    },
                    legend: {
                        show: true,
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        triggerOn: 'click',
                        // formatter: '{b0}日:{c0}人次',
                        // // 提示框背景色
                        // backgroundColor: 'rgba(50,50,50,0.7)',
                        // borderColor: 'transparent',
                        // // 提示框文本样式
                        // textStyle: {
                        //   color: '#fff',
                        // },
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            formatter: '{value}月',
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: true,
                        },
                        axisTick: {
                            show: true,
                        },
                    },
                    series: [
                        {
                            type: 'line',
                            name: '门诊',
                            data: [30010, 45625, 191212, 19991, 76661],
                        },
                        {
                            type: 'line',
                            name: '出院',
                            data: [13000, 24565, 13122, 21999, 9666],
                        },
                        {
                            type: 'line',
                            name: '手术',
                            data: [5000, 7565, 9122, 7999, 5666],
                        },
                        {
                            type: 'line',
                            name: '体检',
                            data: [8000, 6565, 7122, 9999, 7666],
                        },
                    ],
                }
                // hospitalInfo.series
                setOptions(options)
            }
            onMounted(() => {
                const params = {
                    hospitalId: '1', // props.hospitalId,
                }
                getBusinessOverviewByHospital(params).then((res: any) => {
                    if (res) {
                        hospitalInfo.value = res.data
                        loadChart(res.data.series)
                    }
                })
            })
            return {
                hospitalInfo,
                chartRef,
            }
        },
    })
</script>

<style lang="less" scoped>
    .basic-info {
        margin: 0 20px;
    }

    .basic-field {
        text-align: left;
        font-size: 14px;
        // font-weight: bold;
        margin-bottom: 10px;

        .field-name {
            color: @text-color-second;
        }
    }

    .label-name {
        color: @text-color-second;
        font-weight: 500;
        text-align: left;
    }

    .label-value {
        font-weight: 500;
    }
</style>
