<template>
  <div class="hospital-resource">
    <section-view title="医院等级构成">
      <pie-diagram />
    </section-view>
    <section-view title="在职员工分析">
      <div class="flex m-x-20">
        <!-- <indicator-card shadow
          class="f-b-50p"
          name="从业人员"
          value="33,197人">
          <template #foot>
            <div>同比：<span>+7.3%</span></div>
          </template>
        </indicator-card>
        <indicator-card shadow
          class="f-b-50p"
          name="从业人员"
          value="33,197人"/> -->
      </div>
    </section-view>
    <section-view title="床位">
    </section-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Grid, GridItem } from 'vant'

import SectionView from '@/components/SectionView/sectionView.vue'
import PieDiagram from '@/components/PieDiagram/PieDiagram.vue'
import IndicatorCard from '@/components/IndicatorCard/IndicatorCard.vue'

export default defineComponent({
    name: 'hospital-resource',
    props: {
        groupId: String,
    },
    components: {
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [SectionView.name]: SectionView,
        [PieDiagram.name]: PieDiagram,
        [IndicatorCard.name]: IndicatorCard,
    },
})
</script>

<style lang="less" scoped>
.hospital-resource {
}
</style>
