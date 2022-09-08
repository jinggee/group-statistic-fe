<template>
  <div>
    <van-sticky offset-top="46px">
      <van-notice-bar
        left-icon="volume-o"
        color="#CCC"
        background="#E8F0F3">
        {{ notify }}
      </van-notice-bar>
      <search-condition @condition-change="onConditionChanged"/>
    </van-sticky>
    <section-view title="总览">
      <business-summary v-bind="queryCondition"/>
    </section-view>
    <section-view title="业务量趋势">
      <business-trend v-bind="queryCondition"/>
    </section-view>
    <section-view title="各医院累计业务量排行TOP10">
      <hospital-business-ranking-list v-bind="queryCondition"/>
    </section-view>
    <section-view title="热门科室就诊排行TOP10">
      <hot-department v-bind="queryCondition"/>
    </section-view>
    <section-view title="手术占比">
      <surgery-ratio v-bind="queryCondition"/>
    </section-view>
    <section-view title="核心医院数据接入情况">
      <core-hospital-join-condition v-bind="queryCondition"/>
    </section-view>
    <section-view title="各医疗企业核心医院数据接入情况">
      <business-core-data-join-condition v-bind="queryCondition"/>
    </section-view>
  </div>
</template>

<script lang="ts">
import {
    DropdownMenu,
    DropdownItem,
    NoticeBar,
    Sticky,
    Circle,
    Grid,
    GridItem,
} from 'vant'
import { defineComponent, ref, Ref } from 'vue'
import SectionView from '@/components/SectionView/sectionView.vue'
// import Summary from './components/summary.vue'
import BusinessSummary from '@/components/BusinessSummary/BusinessSummary.vue'
import BusinessTrend from './components/business-trend.vue'
import HospitalBusinessRankingList from './components/hospital-business-ranking-list.vue'
import HotDepartment from './components/hot-department.vue'
import SurgeryRatio from './components/surgery-ratio.vue'
import CoreDataJoinCondition from './components/business-core-data-join-condition.vue'
import CoreHospitalJoinCondition from './components/core-hospital-join-condition.vue'
import SearchCondition from './components/search-condition.vue'

export default defineComponent({
    components: {
        [NoticeBar.name]: NoticeBar,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [Sticky.name]: Sticky,
        [Circle.name]: Circle,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [SearchCondition.name]: SearchCondition,
        [BusinessSummary.name]: BusinessSummary,
        [BusinessTrend.name]: BusinessTrend,
        [SectionView.name]: SectionView,
        [HospitalBusinessRankingList.name]: HospitalBusinessRankingList,
        [HotDepartment.name]: HotDepartment,
        [SurgeryRatio.name]: SurgeryRatio,
        [CoreDataJoinCondition.name]: CoreDataJoinCondition,
        [CoreHospitalJoinCondition.name]: CoreHospitalJoinCondition,
    },
    setup() {
        const notify: Ref<string> = ref('通视界（医疗）试用版，医疗机构逐步接入中')

        const queryCondition: Ref<SearchCondition | undefined> = ref(undefined)

        function onConditionChanged(data: SearchCondition) {
            console.log('sasas111', data)
            queryCondition.value = data
        }

        return {
            notify,
            queryCondition,
            onConditionChanged,
        }
    },
})
</script>

<style lang="less">
</style>
