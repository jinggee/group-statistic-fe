import request from '@/utils/http'
import { QueryParams } from './model'

export function getBusinessOverviewByHospital(params: QueryParams) {
    return request.get({
        url: '/hospital/overview',
        params,
    })
}

enum UpdateType {
    realtime = 1,
    day,
    month
}

type HospitalCardInfo = {
    logo?: string,
    name: string,
    updateType: UpdateType,
    grade: string
}

export function getHospitalList() {
    return request.get<UmcareResponse<HospitalCardInfo[]>>({
        url: '/hospital/list',
    })
}

export function getHospitalDistribution() {
    return request.get<UmcareResponse<KeyValueTree<number>[]>>({
        url: '/hospital/distribution',
    })
}
