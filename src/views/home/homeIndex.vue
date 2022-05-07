<template>
  <div class="home_container">
    <div class="banner"></div>
    <div class="main-wrapper">
      <h2 class="title">主标题</h2>
      <p class="sub_title">副标题</p>

      <HomeList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store/index'
import HomeList from './components/homeList.vue'

export default defineComponent({
  components: {
    HomeList
  },

  setup () {
    const store = useStore()

    return {
      store
    }
  },

  asyncData ({ store, route }: any) {
    const { pageNo } = store.state
    return store.dispatch('getRoomList', { pageNo })
  }
})
</script>

<style lang="scss" scoped>
.home_container {
  .banner {
    width: 100%;
    height: 530px;
    background: url(../../assets/images/home/banner.jpg) no-repeat;
    background-size: cover;
    background-position: center;
  }

  .title {
    font-size: 22px;
  }
  .sub_title {
    font-size: 16px;
    margin: 5px 0 25px 0;
  }

  .main-wrapper {
    @include main-wrapper();
  }
}
</style>
