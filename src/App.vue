<template>
  <el-config-provider :locale="store.state.locale">
    <HeaderComp v-show="showHeaderAndFooter" />

    <div class="content_container">
      <router-view></router-view>
    </div>

    <FooterComp v-show="showHeaderAndFooter" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import HeaderComp from './components/layout/header.vue'
import FooterComp from './components/layout/footer.vue'

const route = useRoute()
const store = useStore()

const showHeaderAndFooter = computed(() => {
  return route.fullPath.indexOf('login') === -1
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .content_container {
    min-height: calc(100vh - 402px);
  }
}
</style>
