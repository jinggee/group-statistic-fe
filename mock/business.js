import Mock from 'mockjs'

Mock.mock(RegExp('/business/overview.*'), 'get', () => ({
    data: [{
        title: '门急诊人次1',
        value: 766699,
        unit: '人次',
        total: 10107656,
        data: [
            { value: 1048, name: '环球医疗' },
            { value: 735, name: '通用医疗' },
            { value: 580, name: '国中健康' },
            { value: 484, name: '航天医科' }],
    },
    {
        title: '出院人次',
        value: 63389,
        unit: '人次',
        total: 995850,
        data: [
            { value: 899, name: '环球医疗' },
            { value: 322, name: '通用医疗' },
            { value: 91, name: '国中健康' },
            { value: 44, name: '航天医科' }],
    },
    {
        title: '手术人次',
        value: 4232,
        unit: '人次',
        total: 63622,
        data: [
            { value: 3039, name: '环球医疗' },
            { value: 1067, name: '通用医疗' },
            { value: 211, name: '国中健康' },
            { value: 108, name: '航天医科' }],
    },
    {
        title: '体检人次',
        value: 79439,
        unit: '人次',
        total: 1174532,
        data: [
            { value: 5600, name: '环球医疗' },
            { value: 3800, name: '通用医疗' },
            { value: 1000, name: '国中健康' },
            { value: 1800, name: '航天医科' }],
    }],
}))

Mock.mock('/group/list', 'get', () => ({
    success: true,
    data: [
        { id: 1, name: '环球医疗' },
        { id: 2, name: '通用医疗' },
        { id: 3, name: '国中健康' },
        { id: 4, name: '航天医科' },
    ],
}))
