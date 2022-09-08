<!--医院累计业务量排行-->
<template>
  <div>
    <van-tabs @click-tab="handleTabClick"  style="margin-bottom: 20px">
      <van-tab title="门急诊" />
      <van-tab title="出院" />
      <van-tab title="手术" />
      <van-tab title="体检" />
    </van-tabs>
    <ranking-list-item v-for="(item, index) in data" :key="index"
      :title="item.name"
      :value="item.value"
      :max="6677"
      :number="index + 1"
      to="/hospital/business"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
    Cell, Progress, Slider, Tabs, Tab,
} from 'vant'
import RankingListItem from '@/components/RankingListItem/RankingListItem.vue'

export default defineComponent({
    name: 'hospital-business-ranking-list',
    components: {
        [Cell.name]: Cell,
        [Progress.name]: Progress,
        [Slider.name]: Slider,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [RankingListItem.name]: RankingListItem,
    },
    setup() {
        const data = ref([{
            name: '三六三医院',
            value: 69306,
        }, {
            name: '航天中心医院',
            value: 66323,
        }, {
            name: '烟台海港医院有限公司',
            value: 49137,
        }, {
            name: '三二零一医院',
            value: 43113,
        }, {
            name: '马鞍山十七冶医院',
            value: 42950,
        }, {
            name: '北京朝阳医院',
            value: 40997,
        }, {
            name: '三六三医院',
            value: 35779,
        }, {
            name: '三六三医院',
            value: 33724,
        }, {
            name: '三六三医院',
            value: 30938,
        }, {
            name: '三六三医院',
            value: 27641,
        }])

        function handleTabClick() {
            console.log()
        }

        return { data, handleTabClick }
    },
})
</script>
