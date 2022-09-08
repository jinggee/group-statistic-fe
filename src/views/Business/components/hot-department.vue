<!--热门科室就诊排行TOP10-->
<template>
    <div>
        <ranking-list-item
            v-for="(item, index) in data"
            :key="index"
            :title="item.name"
            :value="item.value"
            :max="72507"
            :number="index + 1"
            :isLink="false"
            color="#58DAEA"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import RankingListItem from '@/components/RankingListItem/RankingListItem.vue'

    export default defineComponent({
        name: 'hot-department',
        components: {
            [RankingListItem.name]: RankingListItem,
        },
        setup() {
            const data = ref([
                {
                    name: '内科',
                    value: 72507,
                },
                {
                    name: '传染科',
                    value: 59928,
                },
                {
                    name: '外科',
                    value: 22605,
                },
                {
                    name: '急诊科',
                    value: 21073,
                },
                {
                    name: '儿科',
                    value: 14422,
                },
                {
                    name: '妇产科',
                    value: 13603,
                },
                {
                    name: '中医科',
                    value: 10999,
                },
                {
                    name: '口腔科',
                    value: 7069,
                },
                {
                    name: '耳鼻喉科',
                    value: 7031,
                },
                {
                    name: '皮肤科',
                    value: 4433,
                },
            ])

            return { data }
        },
    })
</script>
