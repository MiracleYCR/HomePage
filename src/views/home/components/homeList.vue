<template>
  <HomeTab />

  <div class="home_list">
    <div
      class="item"
      v-for="(item, index) in store.state.roomList"
      :key="index"
      @click="goToDetail(item)"
    >
      <img :src="item.pictureUrl" alt="" />
      <p class="item_title">{{ item.title }}</p>
      <p class="item_price">￥{{ item.price }}元</p>
    </div>
  </div>

  <Pagination @changePage="onChangePage"></Pagination>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import HomeTab from './homeTab.vue'
import Pagination from '@/components/common/pagination.vue'

const store = useStore()
const router = useRouter()

function goToDetail (item: any) {
  const { id } = item
  router.push({
    path: `/roomDetail/${id}`
  })
}

function onChangePage (pageNo: number) {
  store.dispatch('getRoomList', { pageNo })
}
</script>

<style lang="scss" scoped>
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
    .item_title {
      width: 333px;
      font-size: 18px;
      margin: 15px 0px;
      font-weight: bold;
      text-align: left;
      @include text-overflow(1);
    }
    .item_price {
      font-size: 16px;
      text-align: left;
    }
  }
}
</style>
