<template>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
    >
        <hospital-card
            v-for="item in list"
            :key="item.name"
            :logo="item.logo"
            :name="item.name"
            :updateType="item.updateType"
            :grade="item.grade"
        />
    </van-list>
</template>

<script lang="ts">
    import { defineComponent, ref, Ref } from 'vue'
    import { List } from 'vant'
    import HospitalCard from '@/components/HospitalCard/HospitalCard.vue'

    import { getHospitalList } from '@/api/hospital'

    export default defineComponent({
        name: 'hospital-list',
        components: {
            [List.name]: List,
            [HospitalCard.name]: HospitalCard,
        },
        setup() {
            const list: Ref<any[]> = ref([])
            const loading = ref(false)
            const finished = ref(false)
            const error = ref(false)

            function onLoad() {
                getHospitals()
            }

            function getHospitals() {
                // const params = {}
                getHospitalList()
                    .then((res) => {
                        if (res.success && res.data) {
                            list.value.push(...res.data)
                        }
                        if (list.value.length > 50) {
                            finished.value = true
                        }
                    })
                    .finally(() => {
                        loading.value = false
                    })
            }

            return {
                list,
                loading,
                finished,
                error,
                onLoad,
            }
        },
    })
</script>
