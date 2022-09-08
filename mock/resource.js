import Mock from 'mockjs'

Mock.mock(RegExp('/resource/special.*'), 'get', () => ({
    mainSpecialDept: [
        {
            depName: '骨科',
            hospital: '三六三医院',
        },
        {
            depName: '普通外科',
            hospital: '三二零一医院',
        },
        {
            depName: '麻醉科',
            hospital: '鞍钢总医院',
        },
        {
            depName: '心内科',
            hospital: '鞍钢总医院',
        },
        {
            depName: '泌尿外科',
            hospital: '鞍钢总医院',
        },
        {
            depName: '烧伤整形科',
            hospital: '鞍钢总医院',
        },
    ],
    mainBuildDept: [
        {
            depName: '普外科',
            hospital: '三六三医院',
        },
        {
            depName: '皮肤科',
            hospital: '三二零一医院',
        },
        {
            depName: '呼吸与危重科',
            hospital: '鞍钢总医院',
        },
        {
            depName: '老年病科',
            hospital: '攀钢总医院',
        },
        {
            depName: '妇产科',
            hospital: '西电医院',
        },
        {
            depName: '超声医学科',
            hospital: '鞍钢总医院',
        },
        {
            depName: '康复医学科',
            hospital: '上海中冶医院',
        },
        {
            depName: '儿童保健科',
            hospital: '咸阳彩虹医院',
        },
    ],
    characteristicDept: [
        {
            depName: '烧伤整形科',
            hospital: '上海电力医院',
        },
        {
            depName: '高原医学科',
            hospital: '四川电力医院',
        },
        {
            depName: '耳鼻喉科',
            hospital: '北京电力医院',
        },
        {
            depName: '职业病科',
            hospital: '国王脂肪院',
        },
        {
            depName: '黏液瘤科',
            hospital: '航天中心医院',
        },
    ],
}))

Mock.mock('/resource/clinic/location', 'get', () => ({
    total: 120,
    data: [
        {
            name: '河南省',
            value: 80,
        },
        {
            name: '四川省',
            value: 30,
        },
        {
            name: '辽宁省',
            value: 12,
        },
        {
            name: '北京市',
            value: 3,
        },
    ],
}))
