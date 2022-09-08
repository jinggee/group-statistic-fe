<!--专科中心-->
<template>
  <div>
    <section-view title="省级重点专科">
      <template #head-tool>
        <span class="hospital-sum">{{`${mainSpecialDept?.length ?? 0}家`}}</span>
      </template>
      <umcare-table
        :columns="columns"
        :data="mainSpecialDept"></umcare-table>
    </section-view>
    <section-view title="省级重点建设专科">
       <template #head-tool>
        <span class="hospital-sum">{{`${mainBuildDept?.length ?? 0}家`}}</span>
      </template>
      <umcare-table
        :columns="columns"
        :data="mainBuildDept"></umcare-table>
    </section-view>
    <section-view title="特色专科" class="p-b-20">
       <template #head-tool>
        <span class="hospital-sum">{{`${characteristicDept?.length ?? 0}家`}}</span>
      </template>
      <umcare-table
        :columns="columns"
        :data="characteristicDept"></umcare-table>
    </section-view>
  </div>
</template>

<script lang="ts">
import {
    defineComponent, watch, onMounted, ref,
} from 'vue'
import SectionView from '@/components/SectionView/sectionView.vue'
import UmcareTable from '@/components/Table/UmcareTable.vue'

import getSpecialDept from '@/api/resource'

export default defineComponent({
    name: 'special-center',
    props: {
    // 集团ID，空则查所有
        groupId: [String, Number],
    },
    components: {
        [SectionView.name]: SectionView,
        [UmcareTable.name]: UmcareTable,
    },
    setup(props) {
        const columns = ref([
            {
                title: '科室名称',
                prop: 'depName',
            }, {
                title: '医院',
                prop: 'hospital',
            },
        ])

        /** 省级重点专科 */
        const mainSpecialDept = ref([])
        // 重点建设专科
        const mainBuildDept = ref([])
        // 特色专科
        const characteristicDept = ref([])

        watch(() => props.groupId, (val) => {
            console.log('groupid changed')
            getDataList(val)
        })

        onMounted(() => {
            getDataList(props.groupId)
        })

        function getDataList(groupId?: string | number) {
            const params = {
                groupId,
            }
            getSpecialDept(params).then((res: any) => {
                console.log(res, 2222)
                characteristicDept.value = res.data.characteristicDept
                mainBuildDept.value = res.data.mainBuildDept
                mainSpecialDept.value = res.data.mainSpecialDept
            })
        }

        return {
            columns,
            mainSpecialDept,
            mainBuildDept,
            characteristicDept,
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
