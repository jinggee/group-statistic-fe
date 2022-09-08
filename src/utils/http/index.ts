/* eslint-disable prefer-promise-reject-errors */
// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import type { AxiosResponse } from 'axios'
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
import { Toast } from 'vant'
import type { AxiosTransform, CreateAxiosOptions } from './axios/axiosTransform'
import VAxios from './axios/Axios'
import type { RequestOptions } from '@/types/axios'

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
    /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
    transformRequestHook: (res: AxiosResponse<UmcareResponse>, options: RequestOptions) => {
    // const { t } = useI18n()
        const { isTransformResponse, isReturnNativeResponse } = options
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        if (isReturnNativeResponse) {
            return res
        }
        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformResponse) {
            return res.data
        }
        // 错误的时候返回

        const { data } = res
        if (!data) {
            // return '[HTTP] Request has no return value';
            throw new Error('sys.api.apiRequestFailed')
        }
        //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
        const { code, msg, success } = data
        const result = data.data

        if (success) {
            return data
        }
        Toast.fail(msg || '接口调用失败')

        throw new Error(msg)
    },
    /**
   * @description: 请求拦截器处理
   */
    requestInterceptors: (config, options) => {
    // 请求之前处理config
    // const token = getToken()
        console.log(config, options)
        return config
    },

    /**
   * @description: 响应拦截器处理
   */
    responseInterceptors: (res: AxiosResponse<UmcareResponse<any>>) => res,

    /**
   * @description: 响应错误处理
   */
    responseInterceptorsCatch: (error: any) => {
        if (error.isAxiosError) {
            return Promise.reject({ ...error, errMessage: error.message })
        }
        return Promise.reject({ ...error, errMessage: '服务异常，请稍后尝试！' })
    },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new VAxios(
        {
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
            // authentication schemes，e.g: Bearer
            // authenticationScheme: 'Bearer',
            timeout: 10 * 1000,
            // 基础接口地址
            baseURL: '/',

            headers: { 'Content-Type': ContentTypeEnum.JSON },
            // 如果是form-data格式
            // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
            // 数据处理方式
            transform,

            ...(opt || {}),
        },
    )
}
const defHttp = createAxios()
export default defHttp
