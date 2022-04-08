// code: '000000'表示'操作成功'；code: '000001'表示'数据已存在'；code: '000002'表示'密码不正确'；
// code: '000003'表示'手机号不正确'；code: '000004'表示'其他异常'；code: '000005'表示'登录过期'；
import { ElLoading } from 'element-plus'
import { IResultOr } from './type'
import { getQueryCookie } from '@/utils/util'
import airbnb from '@/db' // 引入数据库和对象仓库

const storeName = Object.keys(airbnb.userObjectStore)[0]

// mock接口：用户注册
export async function userSignApi (params: any) {
  let result: IResultOr

  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })

  // 是否存在相同手机号
  const hasMobile = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      const timer = setTimeout(() => {
        loading.close()
        clearTimeout(timer)
      }, 200)
      if (res) {
        res.forEach((item: any) => {
          if (item.mobile === params.mobile) {
            // 存在相同手机号
            resolve(true)
          }
        })
      }
      resolve(false)
    })
  })

  if (hasMobile) {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: '000001',
        success: false,
        message: '数据已存在',
        result: null
      })
    })
  } else {
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB
        .updateItem(storeName, Object.assign(params, { status: 0 }))
        .then(res => {
          const timer = setTimeout(() => {
            loading.close()
            clearTimeout(timer)
          }, 200)

          resolve({
            code: '000000',
            success: true,
            message: '操作成功',
            result: null
          })
        })
    })
  }
  return result
}

// mock接口：用户登录
export async function userLoginApi (params: any) {
  let result: IResultOr

  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  // 校验手机号和密码是否正确
  const correct: any = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      const timer = setTimeout(() => {
        loading.close()
        clearTimeout(timer)
      }, 200)

      if (res) {
        res.forEach((item: any) => {
          if (
            item.mobile === params.mobile &&
            item.password !== params.password
          ) {
            // 校验密码
            resolve({ code: '000002' })
          }
          if (
            item.mobile !== params.mobile &&
            item.password === params.password
          ) {
            // 校验手机号
            resolve({ code: '000003' })
          }
          if (
            item.mobile === params.mobile &&
            item.password === params.password
          ) {
            // 手机号和密码都输入正确
            resolve({ code: '000000', userId: item.userId })
          }
        })
      }
      // 其他
      resolve({ code: '000004' })
    })
  })

  if (correct.code !== '000000') {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: correct.code,
        success: false,
        message:
          correct.code === '000002'
            ? '密码不正确'
            : correct.code === '000003'
              ? '手机号不正确'
              : '不存在该用户，请先注册',
        result: null
      })
    })
  } else {
    // 手机号和密码正确后更新登录状态
    const token = new Date().getTime() + ''

    if (!import.meta.env.SSR) {
      document.cookie = `token=${token}`
    }

    const obj = {
      status: 1,
      userId: correct.userId,
      token
    }
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB
        .updateItem(storeName, Object.assign(params, obj))
        .then(res => {
          const timer = setTimeout(() => {
            loading.close()
            clearTimeout(timer)
          }, 200)

          resolve({
            code: '000000',
            success: true,
            message: '操作成功',
            result: obj
          })
        })
    })
  }
  return result
}

// mock接口：用户登出
export async function userLogoutApi () {
  let result: IResultOr

  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  // 根据用户token更改登录态为0
  const correct: any = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      const timer = setTimeout(() => {
        loading.close()
        clearTimeout(timer)
      }, 200)

      if (res) {
        res.forEach((item: any) => {
          if (!import.meta.env.SSR) {
            const cookie = document.cookie
            const token = getQueryCookie(cookie, 'token')
            if (item.token && item.token.indexOf(token) !== -1) {
              // 存在相同token
              resolve({ userId: item.userId })
            }
          }
        })
      }

      resolve({ code: '000005' })
    })
  })

  if (correct.code === '000005') {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: '000005',
        success: false,
        message: '登录过期',
        result: null
      })
    })
  } else {
    const params = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.getList(storeName, correct.userId).then(res => {
        resolve(res)
      })
    })
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB
        .updateItem(
          storeName,
          Object.assign(params, { status: 0, token: null })
        )
        .then(res => {
          const timer = setTimeout(() => {
            loading.close()
            clearTimeout(timer)
          }, 200)

          resolve({
            code: '000000',
            success: true,
            message: '操作成功',
            result: null
          })
        })
    })
  }
  return result
}
