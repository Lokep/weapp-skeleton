<style lang="scss" scoped>
.skeleton {
  &-row {
    @apply h-4 bg-gray-200 rounded dark:bg-gray-700 w-full;

    &.long {
      @apply max-w-[360px];
    }

    &.short {
      @apply max-w-[300px];
    }

    & + & {
      @apply mt-2.5;
    }
  }
}
</style>

<template>
  <div role="status" class="skeleton max-w-sm animate-pulse">
    <div
      class="h-5 bg-gray-200 rounded dark:bg-gray-700 w-48 mb-4"
      v-if="title"
    ></div>

    <div
      class="skeleton-row"
      :class="{
        short: i % 4 === 0,
      }"
      v-for="i in row"
      :key="i"
    ></div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  /**
   * - default: default scene
   * - image: image scene
   * - list: list scene
   * - card: card scene
   * - chart: chart scene
   * -
   */
  scene: {
    type: String,
    default: "default",
  },

  title: {
    type: Boolean,
    default: true,
  },

  row: {
    type: Number,
    default: 5,
  },
});
</script>
