<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item>

      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
/**
 * 通用搜索组件
 */
import { defineComponent } from 'vue'
import { DropdownItem, DropdownMenu } from 'vant'

export default defineComponent({
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  // todo
})
</script>
