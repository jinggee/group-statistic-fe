/**
 * 资源概览
 */
import { RouteRecordRaw } from 'vue-router'

const resourceOverviewRoute: RouteRecordRaw = {
    name: 'Resource',
    path: '/resource',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
        title: '资源概览',
    },
    children: [{
        name: 'ResourceOverview',
        path: 'overview',
        component: () => import('@/views/Resource/resource-overview.vue'),
    }],
}

export default resourceOverviewRoute
