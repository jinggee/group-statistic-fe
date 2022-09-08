import request from '@/utils/http'
import { QueryParams } from './model'

export function getBusinessOverview(params: QueryParams) {
    return request.get({
        url: '/business/overview',
        params,
    })
}

export function getBusinessTrend() {
    return request.get({
        url: '/business/trend',
    })
}

/**
 * 查询所有集团
 */
export function getAllGroups() {
    return request.get<UmcareResponse<GroupInfo[]>>({
        url: '/group/list',
    })
}
