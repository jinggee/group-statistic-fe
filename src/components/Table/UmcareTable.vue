<template>
  <div class="umcare-table">
    <table>
      <thead>
        <tr :style="{ background: '#E7EFFE' }">
          <th v-for="col in columns"
            :key="`${col.prop}-colum`"
            :style="{
              width: col.width ? col.width : `${100/(columns?.length||1)}%`,
              textAlign: col.align || 'left',
              padding: '10px 10px'
            }">{{col.title}}</th>
        </tr>
      </thead>
      <tbody v-if="data">
        <tr v-for="(row, index) in data"
          :key="`row-${index}`"
          :style="{
            background: stripe? (index % 2 ? '#ECF5FC' : '#F3F7FD') : 'transparent',
          }">
          <td v-for="col in columns"
            :style="{
              textAlign: col.align || 'left',
              padding: '10px 10px'
            }"
            :key="`row-cell-${col.prop}`">{{row[col.prop]}}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="!data || data?.length === 0" >
      <van-empty description="暂无数据"
        image-size="80" style="padding:0"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Empty } from 'vant'

const props = {
    columns: Array as PropType<IUmcareTableColumn[]>,
    data: Array as PropType<any[]>,
    // 是否带斑马纹的表格，默认true
    stripe: {
        type: Boolean,
        default: true,
    },
}

export default defineComponent({
    name: 'umcare-table',
    props,
    components: {
        [Empty.name]: Empty,
    },
})
</script>

<style lang="less" scoped>
.umcare-table {
  background-color: #fff;
  font-size: 14px;
  margin: 0 10px 0 20px;
  table {
    width: 100%;
    border-spacing: 1px 0;
  }
}
</style>
