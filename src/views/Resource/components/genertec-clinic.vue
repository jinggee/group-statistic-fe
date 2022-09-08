<!--小通诊所-->
<template>
  <div>
    <section-view title="小通诊所地理分布">
      <template #head-tool>
        <span class="hospital-sum">{{`${total}家`}}</span>
      </template>
      <china-map title="分布在15个省23个市" :data="mapData"/>
    </section-view>
    <section-view title="小通诊所列表">
      <umcare-table
        :columns="columns"
        :data="genericClinics"></umcare-table>
    </section-view>

  </div>
</template>

<script lang="ts">
import {
    defineComponent, ref, onMounted,
} from 'vue'

import { getClinicsLocation } from '@/api/resource'
import SectionView from '@/components/SectionView/sectionView.vue'
import UmcareTable from '@/components/Table/UmcareTable.vue'
import ChinaMap from '@/components/ChinaMap/china-map.vue'

export default defineComponent({
    name: 'genertec-clinic',
    props: {
        groupId: [String, Number],
    },
    components: {
        [SectionView.name]: SectionView,
        [UmcareTable.name]: UmcareTable,
        [ChinaMap.name]: ChinaMap,
    },
    setup() {
        const columns = ref([{
            title: '诊所名称',
            prop: 'name',
            width: '50%',
            // align: 'center',
        }, {
            title: '所在省份',
            prop: 'province',
            width: '25%',
            // align: 'center',
        }, {
            title: '所在城市',
            prop: 'city',
            width: '25%',
            // align: 'center',
        }])

        const total = ref(0)
        const mapData = ref([])

        function getClinics() {
            getClinicsLocation().then((res: any) => {
                console.log(res)
                total.value = res.data.total
                mapData.value = res.data.data
            })
        }

        onMounted(() => {
            getClinics()
        })

        const genericClinics = ref([])

        return {
            columns,
            total,
            mapData,
            genericClinics,
        }
    },
})
</script>

<style lang="less" scoped>
.hospital-sum {
  font-size: 18px;
  font-weight: bold;
  color: @text-color;
}
</style>
