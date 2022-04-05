import airbnb from '../db'
import { IResultOr } from './type'
import { ElLoading } from 'element-plus'

const storeName = Object.keys(airbnb.languageObjectStore)[0]

export async function saveLanguageApi (lang: any) {
  const loading = ElLoading.service({
    lock: true,
    text: '保存当前语言包',
    background: 'rgba(0, 0, 0, 0.1)'
  })

  const result: IResultOr = await airbnb.airbnbDB
    .getList(storeName, 1)
    .then(res => {
      return {
        code: '000000',
        message: '操作成功',
        result: res || null,
        success: true
      }
    })

  let updateObj = {}
  const { success } = result

  if (success) {
    updateObj = { name: lang, id: 1 }
  } else {
    updateObj = { name: lang }
  }

  const newResult: IResultOr = await airbnb.airbnbDB
    .updateItem(storeName, updateObj)
    .then(res => {
      const timer = setTimeout(() => {
        loading.close()
        clearTimeout(timer)
      }, 500)
      return {
        code: '000000',
        message: '操作成功',
        result: null,
        success: true
      }
    })

  return newResult
}

export async function fetchLanguageApi () {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  const result: IResultOr = await airbnb.airbnbDB
    .getList(storeName, 1)
    .then(res => {
      const timer = setTimeout(() => {
        loading.close()
        clearTimeout(timer)
      }, 500)
      return {
        code: '000000',
        message: '操作成功',
        result: res || null,
        success: true
      }
    })

  return result
}
