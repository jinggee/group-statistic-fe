<!--核心医院数据接入情况-->
<template>
  <div class="core-hospital-join-condition">
    <div class="join-condition-item">
      <span class="title">接入机构</span>
      <div class="value">
        <span>54</span>
        <span>个</span>
      </div>
    </div>
    <div class="join-condition-item">
      <span class="title">覆盖率</span>
      <div class="value">
        <span>81</span>
        <span>%</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'core-hospital-join-condition',
    setup() {
        return {
        }
    },
})
</script>
<style lang="less" scoped>
.core-hospital-join-condition {
  padding: 5px 25px 10px;
  display: flex;
  align-items: center;

  .join-condition-item {
    flex-grow: 1;
    .title {
      font-size: 14px;
    }
    .value {
      margin-top: 10px;
      font-size: 1.5rem;

      span:nth-child(2) {
        font-size: 1rem;
        margin-left: 5px;
      }

      font-weight: bold;
      color: #1989fa;
    }

    &:nth-child(1) {
      border-right: 1px solid #DCDFE6;
    }
  }
}
</style>
