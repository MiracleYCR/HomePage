<template>
  <div class="login_container">
    <div class="left"></div>

    <div class="right">
      <div class="login_panel">
        <el-tabs v-model="activeName" @tab-click="onTabClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :placeholder="t('login.placePass')" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="onSignUp">
              {{ loginBtnText }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref, getCurrentInstance } from 'vue'

import useFormProperties from '../../hooks/login/useFormProperties'
import useFormOperator from '../../hooks/login/useFormOperator'

const { t } = useI18n()
const router = useRouter()
const { proxy }: any = getCurrentInstance()

const {
  rules,
  ruleForm,
  ruleFormRef
} = useFormProperties(t)

const { userSignin, userLogin } = useFormOperator(router, proxy)

const activeName = ref('login')
const loginBtnText = ref(t('login.loginBtn'))
function onTabClick (evt: any) {
  const { name } = evt.props
  loginBtnText.value = name === 'login' ? t('login.loginBtn') : t('login.signBtn')
}

function onSignUp () {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      if (activeName.value === 'sign') {
        userSignin(ruleForm)
      }
      if (activeName.value === 'login') {
        userLogin(ruleForm)
      }
    } else {
      return false
    }
  })
}
</script>

<style lang="scss">
@import url('../../assets/scss/variable.scss');

.login_container {
  height: 100vh;
  @include flex-layout(row);
  .left {
    flex:30;
    height:100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 60% center;
    background-image: url(../../assets/images/layout/bg.png);
  }
  .right {
    flex: 20;
    @include flex-layout(row, center, center);
    .login_panel {
      width: 300px;
      .el-tabs__header {
        margin-bottom: 40px;
      }
      .el-tabs__nav-scroll {
        width: 100%;
        margin: 0 auto;
        .el-tabs__nav {
          float: initial;
          text-align: center;
        }
      }
      .el-input__inner {
        height: 44px;
        line-height: 42px;
        background: #F6F6F8;
        border-radius: 40px;
        border: none;
      }
      .el-tabs__nav-wrap::after{
        display: none;
      }
      .el-tabs__item{
        font-size: 22px;
        color: #999;
        &.is-active{
          color: $orange;
        }
      }
      .el-tabs__active-bar{
        background-color:$orange;
      }
      .el-form-item__error{
        left: 15px;
      }
    }
    .login_btn {
      &.el-button {
        display: block;
        padding: 0;
        margin-top: 20px;
        width: 100%;
        border: none;
        height: 45px;
        line-height: 45px;
        border-radius: 20px;
        background-color: $orange;
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
