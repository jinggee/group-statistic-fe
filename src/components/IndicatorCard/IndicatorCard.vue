<template>
  <div :class="{'selected-card': isSelected}" class="indicator-card-root">
    <div class="indicator-card">
      <div class="indicator-card-head">
        <slot name="head">
          {{ name }}
        </slot>
      </div>
      <div class="indicator-card-content">
        <slot>{{ value }}</slot>
      </div>
      <div class="indicator-card-foot">
        <slot name="foot">{{ summary }}</slot>
      </div>
    </div>
    <div class="indicator-card-border"
      :class="{'card-shadow':shadow}"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GridItem } from 'vant'

export default defineComponent({
    name: 'indicator-card',
    props: {
        name: String,
        value: String,
        summary: String,
        isSelected: Boolean,
        shadow: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        [GridItem.name]: GridItem,
    },
})
</script>

<style lang="less" scoped>

.indicator-card {
  width: 100%;
  height: 100%;
  text-align: left;
  .indicator-card-head {
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .indicator-card-content {
    color: @theme-color;
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .indicator-card-foot {
    color: @text-color-second;
    font-size: 12px;
  }
}

/**边框样式 */
.indicator-card-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

/**选中边框样式 */
.selected-card {
  /**角标 */
  &::after {
    position: absolute;
    right: 1px;
    bottom: 1px;
    width: 0;
    height: 0;
    content: "";
    border: 16px solid;
    border-color: transparent #3d6cec #3d6cec transparent;
    border-bottom-right-radius: 2px;
  }

  &::before {
    position: absolute;
    right: 5px;
    bottom: 8px;
    z-index: 1;
    width: 10px;
    height: 5px;
    content: '';
    background: transparent;
    border: 2px solid white;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-55deg);
    -ms-transform: rotate(-55deg);
    transform: rotate(-55deg);
  }
  .indicator-card-border {
    border: 1px solid @theme-color;
  }
}

.card-shadow.indicator-card-border {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

</style>
