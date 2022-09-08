/**
 * 业务概览搜索条件
 */
type SearchCondition = {
    year: number,
    group: number | string,
    /**
     * 0-日运营，1-月累计，2-年累计
     */
    queryType: number,
    month?: number,
    day?: number
}
