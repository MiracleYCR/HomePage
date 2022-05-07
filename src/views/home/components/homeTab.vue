<template>
  <el-tabs v-model="cityCode" @tab-click="selectCity" type="card">
    <el-tab-pane
      v-for="(item, index) in cityArr"
      :key="index"
      :label="item.cityName"
      :name="item.cityCode"
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const cityCode = ref(store.state.cityCode)

const cityArr = [
  {
    cityCode: 'hz',
    cityName: '杭州'
  },
  {
    cityCode: 'sh',
    cityName: '上海'
  },
  {
    cityCode: 'nj',
    cityName: '南京'
  },
  {
    cityCode: 'cd',
    cityName: '成都'
  },
  {
    cityCode: 'cq',
    cityName: '重庆'
  },
  {
    cityCode: 'bj',
    cityName: '北京'
  },
  {
    cityCode: 'sz',
    cityName: '苏州'
  }
]

function selectCity (tab: any) {
  const { name } = tab.props
  cityCode.value = name
  store.dispatch('getRoomList', { pageNo: 1, cityCode: name })
}
</script>

<style lang="scss" scoped>
.el-tabs {
  .el-tabs__nav-wrap {
    padding: 0 40px;
  }
  .el-tabs__header {
    border-bottom: none;
    .el-tabs__nav {
      border: none;
      padding: 10px 0;
    }
    .el-tabs__item.is-active {
      background: #00848a;
      color: #fff;
      border-bottom-color: #00848a;
    }
  }
  .el-tabs__item {
    width: 100px;
    text-align: center;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 15%);
    min-width: 120px;
    height: 48px;
    padding: 0px 7px !important;
    border: solid 0.5px #d8d8d8;
    line-height: 48px;
    box-sizing: initial;
    margin-right: 20px;
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    &:hover {
      box-shadow: 0px 3px 6px rgb(0 0 0 / 15%);
      color: inherit;
    }
    &:first-child {
      border-left: 1px solid #d8d8d8;
    }
  }
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    height: 28px;
    width: 28px;
    border: 1px solid #ccc;
    border-radius: 100%;
    top: 50%;
    margin-top: -14px;
    background: #fff;
    text-align: center;
    z-index: 10;
    line-height: 30px;
  }
}
</style>
