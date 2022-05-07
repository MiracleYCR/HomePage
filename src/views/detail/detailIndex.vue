<template>
  <Detail></Detail>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Detail from './components/detail.vue'

export default defineComponent({
  components: {
    Detail
  },

  setup () {},

  asyncData ({ store, route }: any) {
    return store.dispatch('getRoomDetail', { id: 1 })
  }
})
</script>

<style lang="scss" scoped></style>
