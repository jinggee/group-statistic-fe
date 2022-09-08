import Mock, { Random } from 'mockjs'

Mock.mock(RegExp('/hospital/overview.*'), 'get', () => ({
    update: '2022-7-25',
    name: '三六三医院',
    orgType: '除中医医疗机构外的其他医疗机构',
    orgNature: '中央事业单位',
    sponsor: '通用技术集团医疗健康有限公司',
    location: '北京',
    bedNum: 1000,
    employeeNum: 1444,
    grade: '三级',
    series: [
        {
            name: '门诊',
            data: [30010, 45625, 31212, 19991, 76661],
        },
        {
            name: '出院',
            data: [13000, 24565, 13122, 21999, 9666],
        },
        {
            name: '手术',
            data: [5000, 7565, 9122, 7999, 5666],
        },
        {
            name: '体检',
            data: [8000, 6565, 7122, 9999, 7666],
        },
    ],
}))

Mock.mock('/hospital/list', 'get', {
    success: true,
    'data|10': [{
        logo: Random.dataImage('60x60'),
        name: '@ctitle(3,7)医院',
        updateType: 1,
        grade: Random.pick(['三级医院', '二级医院', '一级/未评级']),
    }],
})

const data = Mock.mock({
    success: true,
    'data|34': [
        {
            'name|1': Random.pick(['北京', '河北', '河南', '辽宁', '吉林', '湖北', '山西', '陕西', '四川', '江苏', '甘肃', '广西', '湖南', '安徽'], 1, 20),
            'value|1-100': 100,
            'children|3-20': [{
                name: Random.city(false),
                'value|1-100': 100,
            }],
        },
    ],
})

Mock.mock('/hospital/distribution', 'get', () => data)
