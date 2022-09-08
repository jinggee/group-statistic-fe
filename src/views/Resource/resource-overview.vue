<template>
    <div>
        <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item
                :options="groupOptions"
                v-model="selectedGroup"
                @change="onGroupSelectionChanged"
            />
        </van-dropdown-menu>
        <van-tabs title-active-color="#2979ff" v-model:active="active">
            <van-tab title="医院">
                <hospital-resource groupId="selectedGroup" />
            </van-tab>
            <van-tab title="小通诊所">
                <genertec-clinic :groupId="selectedGroup" />
            </van-tab>
            <van-tab title="专科中心">
                <special-center groupId="selectedGroup" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, Ref, onMounted } from 'vue'
    import { Tab, Tabs, DropdownMenu, DropdownItem } from 'vant'

    import { getAllGroups } from '@/api/business'

    import HospitalResource from './components/hospital-resource.vue'
    import SpecialCenter from './components/special-center.vue'
    import GenertecClinic from './components/genertec-clinic.vue'

    export default defineComponent({
        name: 'resource-overview',
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [HospitalResource.name]: HospitalResource,
            [GenertecClinic.name]: GenertecClinic,
            [SpecialCenter.name]: SpecialCenter,
        },
        setup() {
            const active = ref(0)

            const selectedGroup = ref('')

            const groupOptions: Ref<any[]> = ref([])

            function GetGroupsOptions() {
                getAllGroups().then((res: any) => {
                    console.log(res)
                    const items = res.data.data.map((n: any) => ({
                        text: n.name,
                        value: n.id,
                    }))
                    groupOptions.value = [
                        {
                            text: '集团',
                            value: '',
                        },
                        ...items,
                    ]
                })
            }

            function onGroupSelectionChanged(val: any) {
                console.log(val, 'onGroupSelectionChanged')
            }

            onMounted(() => {
                GetGroupsOptions()
            })

            return {
                active,
                groupOptions,
                selectedGroup,
                onGroupSelectionChanged,
            }
        },
    })
</script>

<style lang="less" scoped>
    :deep(.van-tabs--line .van-tabs__wrap) {
        border-bottom: 1px solid #f2f6fc;
    }
</style>
