<template>
    <div>
        <van-dropdown-menu>
            <!--年份-->
            <van-dropdown-item
                v-model="selectedYear"
                :options="years"
                @change="onDropdownChange"/>
        </van-dropdown-menu>
        <van-dropdown-menu class="border">
            <!--集团-->
            <van-dropdown-item
                v-model="selectedGroup"
                :options="groupList"
                @change="onDropdownChange"/>
            <!--日期类型-->
            <van-dropdown-item
                v-model="selectedDageRange"
                 :options="dateRange"
                 @change="onDropdownChange"/>
            <van-dropdown-item
                  v-if="selectedDageRange !==2"
                  :options="monthOptions"
                  v-model="selectedMonth"
                  ref="dateDropdownRef"
                  @change="onDropdownChange"/>
                  <!-- <van-datetime-picker /> -->
                 <template #title>
                    <span>{{`${selectedYear}-${selectedMonth}`}}</span>
                </template>
        </van-dropdown-menu>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, ref, Ref, computed, onMounted,
} from 'vue'
import {
    DropdownMenu,
    DropdownItem,
    DropdownItemOption,
    Cascader,
    DatetimePicker,
} from 'vant'
import { storeToRefs } from 'pinia'

import useAppStore from '@/store/app'

export default defineComponent({
    name: 'search-condition',
    components: {
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [Cascader.name]: Cascader,
        [DatetimePicker.name]: DatetimePicker,
    },
    emits: ['condition-change'],
    setup(props, ctx) {
        const dateDropdownRef = ref(null)
        const years: Ref<DropdownItemOption[]> = ref([])
        const selectedYear = ref(new Date().getFullYear())

        const store = useAppStore()

        const { groups } = storeToRefs(store)

        const groupList = computed(() => {
            const result = [{
                text: '集团',
                value: 0,
            }]
            const temp = groups.value.map((n) => ({
                text: n.name,
                value: n.id,
            }))
            result.push(...temp)
            return result
        })
        const selectedGroup = ref(0)

        const dateRange = ref([
            { text: '日运行', value: 0 },
            { text: '月累计', value: 1 },
            { text: '年累计', value: 2 },
        ])

        const selectedDageRange = ref(1)

        const monthOptions: Ref<DropdownItemOption[]> = ref([])
        const selectedMonth = ref(new Date().getMonth())

        function loadYearOptions() {
            const currentYear = selectedYear.value
            for (let i = currentYear; i >= currentYear - 20; i -= 1) {
                years.value.push({
                    text: `${i}年`,
                    value: i,
                })
            }
        }

        function loadMonthOptions() {
            const months = []
            for (let month = 1; month <= 12; month += 1) {
                months.push({
                    text: `${month}月`,
                    value: month,
                })
            }
            monthOptions.value = months
        }

        onMounted(() => {
            loadYearOptions()
            loadMonthOptions()
            onDropdownChange()
        })

        function onDropdownChange() {
            const params: SearchCondition = {
                year: selectedYear.value,
                group: selectedGroup.value,
                queryType: selectedDageRange.value,
                month: selectedMonth.value,
            }
            // 年累计
            if (selectedDageRange.value === 2) {
                delete params.month
                delete params.day
            } else if (selectedDageRange.value === 1) {
                // 月累计
                delete params.day
            }
            ctx.emit('condition-change', params)
        }

        return {
            years,
            selectedYear,
            groupList,
            selectedGroup,
            dateRange,
            selectedDageRange,
            monthOptions,
            selectedMonth,
            dateDropdownRef,
            onDropdownChange,
        }
    },
})
</script>

<style lang="less" scoped>
.border.van-dropdown-menu {
    :deep(.van-dropdown-menu__bar) {
        height: auto;
        padding: 0 20px;

        &>div {
            border: 1px solid #DCDFE6;
            border-radius: 20px;
            margin-right: 10px;
            padding: 3px 0;
        }
    }
}
</style>
