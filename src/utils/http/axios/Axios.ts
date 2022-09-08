/* eslint-disable no-param-reassign */
import axios from 'axios'
import { isFunction } from '@/utils/is'
import type {
    AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError,
} from 'axios'
import { ContentTypeEnum } from '@/enums/httpEnum'
import qs from 'qs'
import type { CreateAxiosOptions } from './axiosTransform'
import type { RequestOptions, UploadFileParams } from '@/types/axios'

export default class VAxios {
  private axiosInstance: AxiosInstance

  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
      this.options = options
      this.axiosInstance = axios.create(options)
      // 设置拦截器
      this.setupInterceptors()
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
      this.axiosInstance = axios.create(config)
  }

  private getTransform() {
      const { transform } = this.options
      return transform
  }

  getAxios(): AxiosInstance {
      return this.axiosInstance
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
      if (!this.axiosInstance) {
          return
      }
      this.createAxios(config)
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
      if (!this.axiosInstance) {
          return
      }
      Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  private setupInterceptors() {
      const { transform } = this.options
      if (!transform) {
          return
      }
      const {
          requestInterceptors,
          responseInterceptors,
          requestInterceptorsCatch,
          responseInterceptorsCatch,
      } = transform

      // 请求拦截
      this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
          if (requestInterceptors && isFunction(requestInterceptors)) {
              config = requestInterceptors(config, this.options)
          }
          return config
      })
      // 请求错误拦截
      requestInterceptorsCatch
      && isFunction(requestInterceptorsCatch)
      && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)
      // 响应拦截
      this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
          if (responseInterceptors && isFunction(responseInterceptors)) {
              res = responseInterceptors(res)
          }
          return res
      }, undefined)
      // 响应错误拦截
      responseInterceptorsCatch
      && isFunction(responseInterceptorsCatch)
      && this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
      const formData = new window.FormData()
      const customFilename = params.name || 'file'

      if (params.filename) {
          formData.append(customFilename, params.file, params.filename)
      } else {
          formData.append(customFilename, params.file)
      }

      if (params.data) {
          Object.keys(params.data).forEach((key) => {
              const value = params.data![key]
              if (Array.isArray(value)) {
                  value.forEach((item) => {
                      formData.append(`${key}[]`, item)
                  })
                  return
              }

              formData.append(key, params.data![key])
          })
      }

      return this.axiosInstance.request<T>({
          ...config,
          method: 'POST',
          data: formData,
          headers: {
              'Content-type': ContentTypeEnum.FORM_DATA,
              ignoreCancelToken: true,
          },
      })
  }

  supportFormData(config: AxiosRequestConfig) {
      const headers = config.headers || this.options.headers
      const contentType = headers?.['Content-Type'] || headers?.['content-type']

      if (
          contentType !== ContentTypeEnum.FORM_URLENCODED
      || !Reflect.has(config, 'data')
      || config.method?.toUpperCase() === 'GET'
      ) {
          return config
      }

      return {
          ...config,
          data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
      }
  }

  public get<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
      return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
      return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
      return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
      return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
      let conf: CreateAxiosOptions = JSON.parse(JSON.stringify(config))
      const transform = this.getTransform()

      const { requestOptions } = this.options

      const opt: RequestOptions = { ...requestOptions, ...options }

      const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
      if (beforeRequestHook && isFunction(beforeRequestHook)) {
          conf = beforeRequestHook(conf, opt)
      }
      conf.requestOptions = opt

      conf = this.supportFormData(conf)

      return new Promise((resolve, reject) => {
          this.axiosInstance
              .request<any, AxiosResponse<UmcareResponse>>(conf)
              .then((res: AxiosResponse<UmcareResponse>) => {
                  if (transformRequestHook && isFunction(transformRequestHook)) {
                      try {
                          const ret = transformRequestHook(res, opt)
                          resolve(ret)
                      } catch (err) {
                          reject(err || new Error('request error!'))
                      }
                      return
                  }
                  resolve(res as unknown as Promise<T>)
              })
              .catch((e: Error | AxiosError) => {
                  if (requestCatchHook && isFunction(requestCatchHook)) {
                      reject(requestCatchHook(e, opt))
                      return
                  }
                  if (axios.isAxiosError(e)) {
                      // rewrite error message from axios in here
                  }
                  reject(e)
              })
      })
  }
}
