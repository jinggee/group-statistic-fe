<template>
  <div class="hospital-info">
    <div class="hospital-info-logo">
      <van-image height="50" width="50" :src="logo"/>
    </div>
    <div class="hospital-info-content">
      <div class="name m-b-5">{{name}}</div>
      <div class="tags">
        <van-tag
          size="medium"
          style="margin-right: 10px"
          type="primary">{{updateType == 1? '日更新':'月更新'}}</van-tag>
        <van-tag
          size="medium"
          style="margin-right: 10px"
          type="warning">{{grade}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Image, Tag } from 'vant'

export default defineComponent({
    name: 'hospital-card',
    props: {
        logo: String,
        name: {
            type: String,
            Required: true,
        },
        updateType: {
            type: [String, Number],
        },
        grade: {
            type: String,
        },
    },
    components: {
        [Image.name]: Image,
        [Tag.name]: Tag,
    },
})
</script>

<style lang="less" scoped>
.hospital-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 20px 20px;

  .hospital-info-logo {
    border: 1px solid #DCDFE6;
    height: 50px;
  }
  .hospital-info-content {
    margin-left: 8px;

    .name {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
