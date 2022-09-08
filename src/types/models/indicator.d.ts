declare interface IndicatorItem {
  code?: string,
  title: string,
  data: Array<{
    name: string,
    value: number | string
  }>
}
