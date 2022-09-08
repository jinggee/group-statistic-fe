import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import businessOverviewRoute from './business-overview-route'
import hospitalRoute from './hospital-location-route'
import resourceOverviewRoute from './resource-overview-route'

const routes: Array<RouteRecordRaw> = [
    businessOverviewRoute,
    hospitalRoute,
    resourceOverviewRoute,
    {
        path: '/',
        name: 'home',
        redirect: {
            name: 'BusinessOverview',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
