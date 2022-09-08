<template>
    <div class="infinity-scroll">
        <van-list></van-list>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { List } from 'vant'

export default defineComponent({
  name: 'infinity-scroll',
  props: {
    sortFields: {
      type: Array,
    },
  },
  components: {
    [List.name]: List,
  },
  setup() {
    return {}
  },
})
</script>
