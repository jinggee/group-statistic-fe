declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>

declare interface KeyValuePair<T = any> {
    name: string,
    value: T
}

declare interface KeyValueTree<T = any> extends KeyValuePair<T> {
    id?: string
    children?: Array< KeyValueTree<T>>
}

declare interface UmcareResponse<T = any> {
    code: number,
    success: boolean,
    msg?: string
    data?: T
}

declare interface PagingData<T = any> {
    total: number,
    rows?: T[]
}

declare type GroupInfo = {
    id: number,
    name: string
}
