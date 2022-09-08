declare type AlignType = 'left' | 'center' | 'right'

declare enum SortType {
    Normal,
    Asc,
    Desc
}

declare interface IUmcareTableColumn {
    title?: string
    prop: string
    // 列宽，可以是100px, 或者50%
    width?: string
    // 默认剧中
    align?: AlignType
  }

  declare interface ISortableColumn extends IUmcareTableColumn {
    sortType: number
  }
