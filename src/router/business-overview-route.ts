/**
 * 业务概览
 */
import { RouteRecordRaw } from 'vue-router'

const businessOverviewRoute: RouteRecordRaw = {
    name: 'Business',
    path: '/business',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
        title: '业务概览',
    },
    children: [{
        name: 'BusinessOverview',
        path: 'overview',
        component: () => import('@/views/Business/business-overview.vue'),
    }],
}

export default businessOverviewRoute
