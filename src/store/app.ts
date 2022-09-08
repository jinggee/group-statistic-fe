import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

import { getAllGroups } from '@/api/business'

const useAppStore = defineStore('app', () => {
    /**
    *集团列表
    */
    const groups: Ref<GroupInfo[]> = ref([])

    function queryGroups() {
        getAllGroups().then((res) => {
            console.log(1212, res)
            if (res.success && res.data) {
                groups.value = res.data
            } else {
                groups.value = []
            }
        })
    }

    return {
        groups,
        queryGroups,
    }
})

export default useAppStore
