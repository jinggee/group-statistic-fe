<template>
    <div class="hospital-list">
        <section-view title="医疗机构列表" v-show="!show">
            <china-map :data="medicalDistributions" />
        </section-view>
        <van-tabs
            sticky
            v-model:active="activeTab"
            @click-tab="onClickTab"
            :class="{ 'is-fixed': show }"
            offset-top="46px"
            title-active-color="#2979ff"
        >
            <van-tab title="业务量" name="business" :disabled="show">
                <div>
                    <sort-fields :columns="fields" @sort="handleSortBusiness" />
                    <hospital-list />
                </div>
            </van-tab>
            <van-tab title="机构等级" name="orgGrade" :disabled="show">
                <hospital-list />
            </van-tab>
            <van-tab title="地域" name="area" :disabled="show">
                <hospital-list />
            </van-tab>
        </van-tabs>

        <van-popup
            position="top"
            v-model:show="show"
            :close-on-click-overlay="false"
            class="area-popup"
            overlay-class="area-popup-overlay"
        >
            <area-filter :data="medicalDistributions" @confirmed="onConfirmAreaFilter" />
        </van-popup>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, Ref, onMounted } from 'vue'
    import { Tab, Tabs, DropdownMenu, DropdownItem, Popup, Col, Row } from 'vant'

    import { getHospitalDistribution } from '@/api/hospital'
    import SectionView from '@/components/SectionView/sectionView.vue'
    import ChinaMap from '@/components/ChinaMap/china-map.vue'
    import SortFields from '@/components/SortFields/SortFields.vue'
    import AreaFilter from './components/area-filter.vue'
    import HospitalList from './components/hospital-list.vue'

    export default defineComponent({
        name: 'hospital-distribution',
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Popup.name]: Popup,
            [Col.name]: Col,
            [Row.name]: Row,
            [SectionView.name]: SectionView,
            [ChinaMap.name]: ChinaMap,
            [AreaFilter.name]: AreaFilter,
            [SortFields.name]: SortFields,
            [HospitalList.name]: HospitalList,
        },
        setup() {
            /** 医疗机构分布信息 */
            const medicalDistributions: Ref<KeyValueTree<number>[] | undefined> = ref([])

            const fields: Ref<ISortableColumn[]> = ref([
                {
                    title: '门急诊人次',
                    prop: 'clinicNo',
                    sortType: 0,
                },
                {
                    title: '出院人次',
                    prop: 'hospitalNo',
                    sortType: 0,
                },
                {
                    title: '体检人次',
                    prop: 'examNo',
                    sortType: 0,
                },
                {
                    title: '手术人次',
                    prop: 'operation No',
                    sortType: 0,
                },
            ])

            const activeTab = ref('business')

            const show = ref(false)

            function onClickTab(event: {
                name: string | number
                title: string
                event: MouseEvent
                disabled: boolean
            }) {
                const { name, disabled } = event
                console.log(name, disabled)
                if (name === 'area') {
                    show.value = true
                }
            }

            /**
             * 业务量排序处理
             * @param column
             */
            function handleSortBusiness(column: ISortableColumn) {
                console.log(column)
            }

            const areaData = ref([
                {
                    name: '北京',
                    value: 24,
                },
                {
                    name: '河北省',
                    value: 66,
                    children: [
                        {
                            name: '石家庄市',
                            value: 22,
                        },
                    ],
                },
                {
                    name: '辽宁省',
                    value: 88,
                },
                {
                    name: '四川省',
                    value: 33,
                },
                {
                    name: '四川省',
                    value: 33,
                },
                {
                    name: '四川省',
                    value: 33,
                },
                {
                    name: '四川省',
                    value: 33,
                },
                {
                    name: '四川省',
                    value: 33,
                },
                {
                    name: '四川省',
                    value: 33,
                },
                {
                    name: '四川省',
                    value: 33,
                },
                {
                    name: '四川省',
                    value: 33,
                },
            ])

            onMounted(() => {
                getHospitalDistribution().then((res) => {
                    console.log(res)
                    if (res.success) {
                        medicalDistributions.value = res.data
                    }
                })
            })

            function onConfirmAreaFilter(data: any) {
                console.log(data)
                show.value = false
            }

            return {
                medicalDistributions,
                activeTab,
                onClickTab,
                show,
                areaData,
                fields,
                onConfirmAreaFilter,
                handleSortBusiness,
            }
        },
    })
</script>

<style lang="less">
    .is-fixed {
        position: fixed;
        top: 46px;
        left: 0;
        right: 0;
    }

    .area-popup {
        top: 90px;
    }

    .area-popup-overlay {
        top: 90px;
    }
</style>
