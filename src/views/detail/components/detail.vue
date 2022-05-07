<template>
  <el-carousel
    type="card"
    height="380px"
    trigger="click"
    :interval="3000"
    indicator-position="none"
  >
    <el-carousel-item v-for="(item, index) in roomDetail.imgs" :key="index">
      <img :src="item" />
    </el-carousel-item>
  </el-carousel>

  <div class="room_detail">
    <div class="detail_part">
      <h2>{{ roomDetail.title }}</h2>
      <div class="info">
        <span class="room">{{ roomDetail.room }}间卧室</span>
        <span class="bed">{{ roomDetail.bed }}张床</span>
        <span class="toilet">{{ roomDetail.toilet }}个洗手间</span>
        <span class="liver_number">可住{{ roomDetail.liveNumber }}人</span>
      </div>

      <div class="tags">
        <el-tag size="small">{{ roomDetail.remarks }}条评论</el-tag>
        <el-tag size="small" class="ml-10" type="danger" v-if="roomDetail.metro"
          >靠近地铁</el-tag
        >
        <el-tag
          size="small"
          class="ml-10"
          type="warning"
          v-if="roomDetail.parking"
          >免费停车</el-tag
        >
        <el-tag
          size="small"
          class="ml-10"
          type="success"
          v-if="roomDetail.luggage"
          >放置行李</el-tag
        >
      </div>

      <div class="owner_detail">
        <img :src="roomDetail.owner.avatar" />
        <div class="info">
          <p>房东: {{ roomDetail.owner.name }}</p>
          <p>
            <span v-if="roomDetail.owner.certify">已验证身份</span>
            <span v-if="roomDetail.info.goodOwner">超赞房东</span>
          </p>
        </div>
      </div>

      <div class="introduce">{{ roomDetail.owner.introduce }}</div>
    </div>

    <div class="form_part">
      <p class="price">
        <span>￥{{ roomDetail.price }}</span> / 晚
      </p>
      <el-form ref="orderForm " :model="orderForm">
        <el-form-item prop="personNumber" label="人数">
          <select v-model="orderForm.personNumber">
            <option v-for="item in 3" value="item" :key="item">{{
              item
            }}</option>
          </select>
        </el-form-item>

        <el-form-item prop="personNumber" label="人数">
          <el-button type="primary" @click="submitForm">预定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const roomDetail = computed(() => {
  return store.state.roomDetail
})

const orderForm = reactive({
  personNumber: 1
})

function submitForm () {}
</script>

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
