import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

import { IResultOr, IRoomListParams, IRoomDetailParams } from '../api/type'
import { fetchRoomList } from '../api/api_home'
import { saveLanguageApi } from '../api/api_common'
import { fetchRoomDetail } from '../api/api_detail'

export interface AllStateTypes {
  locale: any
  userStatus: number
  roomList: Array<any>
  pageNo: number
  pageSize: number
  total: number
  cityCode: string
  roomDetail: any
}

// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storekey')

export function useStore () {
  return baseUseStore(key)
}

export function createSSRStore () {
  return createStore<AllStateTypes>({
    state: {
      locale: null, // 语言包
      userStatus: 0, // 登录态
      roomList: [],
      pageNo: 1,
      pageSize: 6,
      total: 0,
      cityCode: 'hz',
      roomDetail: {}
    },

    mutations: {
      setLanguage (state, payload) {
        state.locale = payload
        return state.locale
      },
      setUserStatus (state, payload) {
        state.userStatus = payload
        return state.userStatus
      },
      setRoomList (state, payload) {
        state.roomList = payload
        return state.roomList
      },
      setRoomDetail (state, payload) {
        state.roomDetail = payload
        return state.roomDetail
      }
    },

    actions: {
      // 保存语言设置
      saveLanguage ({ commit, state }, language: any) {
        saveLanguageApi(language.name).then((res: IResultOr) => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
            console.log('change language success')
          }
        })
      },

      // 获取房屋列表
      getRoomList ({ commit, state }, payload: IRoomListParams) {
        const params = {
          pageNo: payload.pageNo,
          pageSize: state.pageSize,
          cityCode: payload.cityCode || state.cityCode
        }
        state.pageNo = payload.pageNo
        return new Promise(resolve => {
          fetchRoomList(params).then((res: IResultOr) => {
            const { success, result } = res
            if (success) {
              commit('setRoomList', result.orders.data)
              state.total = result.total
              resolve(true)
            }
          })
        })
      },

      // 获取房屋详情
      getRoomDetail ({ commit, state }, payload: IRoomDetailParams) {
        return new Promise(resolve => {
          fetchRoomDetail(payload).then((res: IResultOr) => {
            const { success, result } = res
            console.log(result)

            if (success) {
              commit('setRoomDetail', result)
              resolve(true)
            }
          })
        })
      }
    }
  })
}
