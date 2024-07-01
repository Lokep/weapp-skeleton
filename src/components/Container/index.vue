<style lang="scss" scoped>
.full {
  @apply w-full h-full;
}
</style>

<template>
  <div class="full overflow-hidden">
    <NavigationBar v-if="showCustomNavigationBar" v-bind="customNavigationBar" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar/index.vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },

  height: {
    type: String,
    default: '100%'
  },

  backgroundColor: {
    type: String,
    default: 'transparent'
  },

  loading: {
    type: Boolean,
    default: false
  },

  loadingText: {
    type: String,
    default: '加载中...'
  },

  empty: {
    type: Boolean,
    default: false  
  },

  emptyText: {
    type: String,
    default: '暂无数据'
  },

  showNetworkError: {
    type: Boolean,
    default: false
  },

  autoCheckNetwork: {
    type: Boolean,
    default: false
  },

  networkErrorText: {
    type: String,
    default: '网络连接异常，请检查网络设置'
  },

  showCustomNavigationBar: {
    type: Boolean,
    default: false
  },

  customNavigationBar: {
    type: Object,
    default: () => ({
    })
  },

  showEndLine: {
    type: Boolean,
    default: false
  },
})

</script>
