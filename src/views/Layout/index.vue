<template>
    <div>
        <van-sticky>
            <van-nav-bar title="通视界(医疗)" left-arrow @click="onClickLeft" />
        </van-sticky>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
        <van-tabbar route placeholder>
            <van-tabbar-item icon="home-o" replace to="/business/overview">
                业务概览
            </van-tabbar-item>
            <van-tabbar-item icon="search" replace to="/resource/overview">
                资源概览
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" replace to="/hospital/distribution">
                医院分布
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script lang="ts">
    import { Tabbar, TabbarItem, NavBar, Sticky } from 'vant'
    import { defineComponent } from 'vue'
    import { useRouter } from 'vue-router'
    import useAppStore from '@/store/app'

    export default defineComponent({
        name: 'main-layout',
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [NavBar.name]: NavBar,
            [Sticky.name]: Sticky,
        },
        setup() {
            const router = useRouter()
            const store = useAppStore()

            store.queryGroups()
            const onClickLeft = () => window.history.back()
            return {
                onClickLeft,
            }
        },
    })
</script>
