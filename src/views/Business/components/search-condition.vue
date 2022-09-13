<template>
    <div class="search-condition p-b-10">
        <van-dropdown-menu>
            <!--年份-->
            <van-dropdown-item v-model="selectedYear" :options="years" @change="onYearChange" />
        </van-dropdown-menu>
        <van-dropdown-menu class="border">
            <!--集团-->
            <van-dropdown-item
                v-model="selectedGroup"
                :options="groupList"
                @change="onDropdownChange"
            />
            <!--日期类型-->
            <van-dropdown-item
                v-model="selectedDageRange"
                :options="dateRange"
                @change="onDateTypeChange"
            />
            <!--月累计-->
            <van-dropdown-item
                v-if="selectedDageRange === dateTypeEnum.MONTH"
                :options="monthOptions"
                v-model="selectedMonth"
                ref="dateDropdownRef"
                @change="onDropdownChange"
            >
                <template #title>
                    <span>{{ dateTitle }}</span>
                </template>
            </van-dropdown-item>
            <!--日运营-->
            <van-dropdown-item
                v-if="selectedDageRange === dateTypeEnum.DAY"
                ref="dayDropdownRef"
                :style="{ 'flex-grow': 1.5 }"
            >
                <template #title>
                    <span>{{ dateTitle }}</span>
                </template>
                <van-tree-select
                    v-model:active-id="selectedDay"
                    v-model:main-active-index="selectedMonth"
                    :items="monthDaysOptions"
                    @click-item="onDaySelected"
                />
            </van-dropdown-item>
        </van-dropdown-menu>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, Ref, computed, onMounted } from 'vue'
    import {
        DropdownMenu,
        DropdownItem,
        DropdownItemOption,
        Cascader,
        DatetimePicker,
        TreeSelect,
        TreeSelectItem,
        TreeSelectChild,
    } from 'vant'
    import { storeToRefs } from 'pinia'
    import dateTypeEnum from '@/enums/dateType'

    import useAppStore from '@/store/app'

    export default defineComponent({
        name: 'search-condition',
        components: {
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Cascader.name]: Cascader,
            [DatetimePicker.name]: DatetimePicker,
            [TreeSelect.name]: TreeSelect,
        },
        emits: ['condition-change'],
        setup(props, ctx) {
            const dateDropdownRef = ref(null)
            const dayDropdownRef = ref(null)
            const years: Ref<DropdownItemOption[]> = ref([])
            const selectedYear = ref(new Date().getFullYear())

            const store = useAppStore()

            const { groups } = storeToRefs(store)

            const groupList = computed(() => {
                const result = [
                    {
                        text: '集团',
                        value: 0,
                    },
                ]
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

            const selectedDageRange = ref(dateTypeEnum.MONTH)

            /**
             * 月累计-日期选择下拉框
             */
            const monthOptions: Ref<DropdownItemOption[]> = ref([])
            const selectedMonth = ref(new Date().getMonth())

            /**
             * 日运行-日期选择下拉框
             */
            const monthDaysOptions: Ref<TreeSelectItem[]> = ref([])
            const selectedDay = ref(new Date().getDate())

            const dateTitle = computed(() => {
                switch (selectedDageRange.value) {
                    case dateTypeEnum.MONTH: {
                        let month: any = selectedMonth.value + 1
                        month = month < 10 ? `0${month}` : month
                        return `${selectedYear.value}-${month}`
                    }
                    case dateTypeEnum.DAY: {
                        let month: any = selectedMonth.value + 1
                        month = month < 10 ? `0${month}` : month

                        let day: any = selectedDay.value
                        day = day < 10 ? `0${day}` : day
                        return `${selectedYear.value}-${month}-${day}`
                    }
                    default:
                        return ''
                }
            })

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
                for (let month = 0; month < 12; month += 1) {
                    months.push({
                        text: `${month + 1}月`,
                        value: month,
                    })
                }
                monthOptions.value = months
            }

            function loadMonthAndDays() {
                const data: Array<TreeSelectItem> = []
                for (let i = 1; i <= 12; i += 1) {
                    const month: TreeSelectItem = {
                        text: `${i}月`,
                    }
                    const days: Array<TreeSelectChild> = []
                    const dayCount = getDaysInMonth(selectedYear.value, i)
                    for (let day = 1; day <= dayCount; day += 1) {
                        days.push({
                            id: day,
                            text: day < 10 ? `0${day}日` : `${day}日`,
                        })
                    }
                    month.children = days
                    data.push(month)
                }
                monthDaysOptions.value = data
            }

            /**
             * 查询某月的天数
             */
            function getDaysInMonth(year: number, m: any) {
                const month = parseInt(m, 10)
                const d = new Date(year, month, 0)
                return d.getDate()
            }

            function onYearChange() {
                loadMonthAndDays()
                onDropdownChange()
            }

            function onDateTypeChange(type: dateTypeEnum) {
                if (type === dateTypeEnum.MONTH) {
                    selectedMonth.value = new Date().getMonth()
                } else if (type === dateTypeEnum.DAY) {
                    const now = new Date()
                    selectedMonth.value = now.getMonth()
                    selectedDay.value = now.getDate()
                    loadMonthAndDays()
                }
                onDropdownChange()
            }

            function onDaySelected() {
                const dropdownItem = dayDropdownRef.value as any
                dropdownItem.toggle()
                onDropdownChange()
            }

            function onDropdownChange() {
                const params: SearchCondition = {
                    year: selectedYear.value,
                    group: selectedGroup.value,
                    queryType: selectedDageRange.value,
                    month: selectedMonth.value,
                    day: selectedDay.value,
                }
                // 年累计
                if (selectedDageRange.value === dateTypeEnum.YEAR) {
                    delete params.month
                    delete params.day
                } else if (selectedDageRange.value === dateTypeEnum.MONTH) {
                    // 月累计
                    delete params.day
                }
                ctx.emit('condition-change', params)
            }

            onMounted(() => {
                loadYearOptions()
                loadMonthOptions()
                onDropdownChange()
            })

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
                dayDropdownRef,
                dateTypeEnum,
                monthDaysOptions,
                selectedDay,
                dateTitle,
                onYearChange,
                onDateTypeChange,
                onDaySelected,
                onDropdownChange,
            }
        },
    })
</script>

<style lang="less" scoped>
    .search-condition {
        background-color: #fff;
    }

    .border.van-dropdown-menu {
        :deep(.van-dropdown-menu__bar) {
            height: auto;
            padding: 0 10px;

            & > div {
                border: 1px solid @border-color;
                border-radius: 20px;
                margin-right: 10px;
                padding: 3px 0;

                &:last-child {
                    flex-grow: 1.2;
                }
            }
        }

        :deep(.van-dropdown-item__option) {
            // border-bottom: 1px solid @border-color;
        }
    }
</style>
