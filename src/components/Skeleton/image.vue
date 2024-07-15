<style lang="scss" scoped></style>

<template>
  <div
    class="skeleton-image animate-pulse w-fit h-fit bg-gray-300 rounded overflow-hidden relative"
  >
    <slot></slot>

    <div
      class="skeleton-image__overlay absolute inset-0 dark:bg-gray-700"
      v-if="loading"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  }
})

</script>
