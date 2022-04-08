<template>
  <div class="home_container">
    <div class="banner"></div>
    <div class="main-wrapper">
      <h2 class="title">主标题</h2>
      <p class="sub_title">副标题</p>
      <div class="home_list">
        <div class="item" v-for="i in 6" :key="i">
          <img src="../../assets/images/layout/bg.png" alt="">
          <p class="item_title">房屋标题</p>
          <p class="item_price">135</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {

  },

  asyncData ({ store, route }: any) {
    console.log(store, route)
    return store.dispatch('getRoomList')
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

  .title{
    font-size: 22px;
  }
  .sub_title{
    font-size: 16px;
    margin: 5px 0 25px 0;
  }
  .main-wrapper{
    @include main-wrapper();
  }
  .home_list {
    @include flex-layout(row, space-between, center);
    margin-left: -8px;
    margin-right: -8px;
    .item {
      width: 333px;
      overflow: hidden;
      display: inline-block;
      margin: 0 8px 25px 8px;
      cursor: pointer;
      img {
        width: 333px;
        height: 250px;
        object-fit: cover;
        border-radius: 4px;
      }
      .title {
        width: 333px;
        font-size: 18px;
        margin: 15px 0px;
        font-weight: bold;
        text-align: left;
        @include text-overflow(1)
      }
      .price {
        font-size: 16px;
        text-align: left;
      }
    }
  }
}
</style>
