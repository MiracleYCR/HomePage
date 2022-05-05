import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseUrl: ''
}

class HTTP {
  constructor () {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create(defaultConfig)

  private httpInterceptorsRequest () {
    HTTP.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  private httpInterceptorsResponse () {
    HTTP.axiosInstance.interceptors.response.use(
      (config: AxiosResponse) => {
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  public httpRequestGet<T> (
    url: string,
    params: AxiosRequestConfig
  ): Promise<T> {
    return HTTP.axiosInstance
      .get(url, { params })
      .then(resp => resp.data)
      .catch()
  }

  public httpRequestPost<T> (
    url: string,
    params: AxiosRequestConfig
  ): Promise<T> {
    return HTTP.axiosInstance
      .post(url, params)
      .then(resp => resp.data)
      .catch()
  }
}

export const http = new HTTP()
