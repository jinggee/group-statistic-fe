import request from '@/utils/http'

/**
 * 查询专科中心数据
 * @param params
 * @returns
 */
export default function getSpecialDept(params: {groupId?: string | number}) {
    return request.get({
        url: '/resource/special',
        params,
    })
}

/**
 * 查询小通诊所地理分布
 * @returns
 */
export function getClinicsLocation() {
    return request.get({
        url: '/resource/clinic/location',
    })
}
