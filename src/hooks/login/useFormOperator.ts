import { useStore } from '@/store'
import { IResultOr } from '@/api/type'
import { userSignApi, userLoginApi } from '@/api/api_login'

function useFormOperator (router: any, proxy: any) {
  const store = useStore()

  // user sign in api
  function userSignin (params: any) {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  // user login api
  function userLogin (params: any) {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result } = res
      if (success) {
        store.commit('setUserStatus', result.status)
        router.push('/')
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  return {
    userSignin,
    userLogin
  }
}

export default useFormOperator
