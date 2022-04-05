<template>
  <div class="header_container">
    <img class="logo" src="../../assets/images/layout/logo.png">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <el-menu-item index="orders">{{t('header.orders')}}</el-menu-item>
      <el-menu-item index="records">{{t('header.records')}}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{t('header.language')}}</template>
        <el-menu-item index="cn">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="avatar" v-if="store.state.userStatus === 1">
        <template #title>
          <img class="avatar" src="../../assets/images/layout/avatar.jpg" alt="个人中心">
        </template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="login" v-else>
        {{t('login.loginTab')}} / {{t('login.signTab')}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ref, getCurrentInstance } from 'vue'

import { useI18n } from 'vue-i18n'
import zhEn from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import { IResultOr } from '@/api/type'
import { userLogoutApi } from '@/api/api_login'
import { fetchLanguageApi } from '@/api/api_common'

// vue packages
const store = useStore()
const router = useRouter()
const { proxy }: any = getCurrentInstance()

const { t, locale: localeLang } = useI18n()

const activeIndex = ref('1')

// select nav tab
function handleSelect (key: any, keyPath: any) {
  if (key === 'cn') {
    localeLang.value = key
    store.dispatch('saveLanguage', zhCn)
  } else if (key === 'en') {
    localeLang.value = key
    store.dispatch('saveLanguage', zhEn)
  } else if (key === 'login') {
    router.push({ name: 'Login' })
  } else if (key === 'logout') {
    userLogout()
  }
}

// user logout
function userLogout () {
  userLogoutApi().then((res: IResultOr) => {
    const { success, message } = res
    if (success) {
      router.push({ name: 'Login' })
      store.commit('setUserStatus', 0)
      proxy.$message.success(message)
    } else {
      proxy.$message.error(message)
    }
  })
}

function getLanguage () {
  console.log(store.state.userStatus)
  fetchLanguageApi().then((res: IResultOr) => {
    const { success, result } = res
    if (success) {
      localeLang.value = result.name
      store.dispatch('saveLanguage', result.name === 'cn' ? zhCn : zhEn)
    }
  })
}
</script>

<style lang="scss">
.header_container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  position: relative;
  align-items: center;
  .logo{
    width: 200px;
    height: auto;
    position: absolute;
    top: 17px;
    left: 15px;
    z-index: 10;
  }
  .el-menu{
    width: inherit;
    padding: 0 25px;
    justify-content: right;
    height: 80px;
    align-items: center;
    .el-menu-item{
      height: 80px;
      font-size: 16px;
      &:last-child{
        padding-right: 0;
      }
    }
    .el-sub-menu__title{
      font-size: 16px;
    }
  }
  .avatar{
    box-shadow: rgb(235 235 235) 0px 0px 0px 2px ;
    border-radius: 50% ;
  }
}
</style>
