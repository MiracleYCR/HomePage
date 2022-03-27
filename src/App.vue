<template>
  <el-config-provider :locale="locale">
    <el-button @click="() => router.push({ name: 'Home' })">Home</el-button>
    <el-button @click="() => router.push({ name: 'Mine' })">Mine</el-button>
    <el-button @click="changeLang(zhCn)">中文</el-button>
    <el-button @click="changeLang(zhEn)">英文</el-button>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import zhEn from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const router = useRouter()

const locale = ref(zhCn)
const { locale: localeLang } = useI18n()
function changeLang (lang: any) {
  locale.value = lang
  localeLang.value = lang.name
  console.log(lang)
}

</script>

<style lang="scss">
@import "@/assets/scss/app/index.scss";

#app {
  div {
    width: 50px;
  }
}
</style>
