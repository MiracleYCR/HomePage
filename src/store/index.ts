import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

import { IResultOr } from '../api/type'
import { fetchRoomList } from '../api/api_home'
import { saveLanguageApi } from '../api/api_common'

export interface AllStateTypes {
  locale: any
  userStatus: number
  roomList: Array<any>
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
      roomList: []
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
      }
    },

    actions: {
      saveLanguage ({ commit, state }, language: any) {
        saveLanguageApi(language.name).then((res: IResultOr) => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
            console.log('change language success')
          }
        })
      },
      getRoomList ({ commit, state }) {
        fetchRoomList().then((res: IResultOr) => {
          const { success, result } = res
          if (success) {
            commit('setRoomList', result.orders)
            console.log(result.orders)
          }
        })
      }
    }
  })
}
