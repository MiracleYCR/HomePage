<template>
  <div class="home_container">
    {{t('message.home')}}
  </div>
</template>

<script setup lang="ts">
import { h, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'

const { proxy }: any = getCurrentInstance()

const { t } = useI18n()

proxy.$message({
  message: h('p', null, [
    h('span', null, 'message can be '),
    h('i', { style: 'color: teal' }, 'VNode')
  ])
})

</script>

<style lang="scss">

</style>
