import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { IResultOr } from '../api/type'
import { saveLanguageApi, fetchLanguageApi } from '../api/api_common'

export interface AllStateTypes {
  locale: any
  userStatus: number
}

// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storekey')

export const store = createStore<AllStateTypes>({
  state: {
    locale: null, // 语言包
    userStatus: 0 // 登录态
  },

  mutations: {
    setLanguage (state, payload) {
      state.locale = payload
      return state.locale
    },
    setUserStatus (state, payload) {
      state.userStatus = payload
      return state.userStatus
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
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}
