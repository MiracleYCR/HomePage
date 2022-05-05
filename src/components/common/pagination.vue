<template>
  <el-pagination
    :current-page="pageNo"
    :page-size="pageSize"
    :total="total"
    background
    layout="prev, pager, next"
    @current-change="changePage"
  />
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue'
import { useStore } from '@/store'

const store = useStore()
/* eslint-disable */
const emit = defineEmits<{
  (e: 'changePage', pageNo: number): void
}>()

const total = computed(() => store.state.total)
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)

function changePage(pageNo: number, pageSize: number) {
  emit('changePage', pageNo)
}
</script>

<style lang="less" scoped></style>
