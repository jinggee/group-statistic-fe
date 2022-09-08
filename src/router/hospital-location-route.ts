/**
 * 医院分布
 */
import { RouteRecordRaw } from 'vue-router'

const hospitalRoute: RouteRecordRaw = {
    name: 'Hospital',
    path: '/hospital',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
        title: '资源概览',
    },
    children: [{
        name: 'HospitalDistribution',
        path: 'distribution',
        meta: {
            title: '医院分布',
        },
        component: () => import('@/views/Hospital/hospital-distribution.vue'),
    }, {
        name: 'HospitalBusiness',
        path: 'business',
        meta: {
            title: '医院业务运行情况',
        },
        component: () => import('@/views/Hospital/hospital-business-detail.vue'),
    }],
}

export default hospitalRoute
