import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'

function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {

    processConfig(config)
    return xhr(config).then( res => {
        return transformResponseData(res)
    })

}

function processConfig(config: AxiosRequestConfig): void{
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
    config.headers = flattenHeaders(config.headers, config.method)
}


function transformUrl (config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url!, params)
}

function transformRequestData (config: AxiosRequestConfig): string {
    const { data } = config
    return transformRequest(data)
}


function transformHeaders(config: AxiosRequestConfig):any {
    const {headers = {}, data} = config
    return processHeaders(headers, data)
}


function transformResponseData(res:  AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}
export default dispatchRequest