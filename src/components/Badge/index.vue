<style lang="scss" scoped>
.badge {
  @apply text-sm font-medium me-2 px-2.5 py-1 rounded h-6 min-w-5 text-center inline-flex items-center justify-center;

  --base-color: v-bind("props.color");
  color: #fff;
  background-color: var(--base-color);

  &-circle {
    @apply rounded-full px-1 h-7 w-7;
  }
}
</style>

<template>
  <span class="badge" :class="`badge-${props.shape}`"><slot /></span>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "gray",
  },

  shape: {
    type: String,
    default: "round",
  },
});
</script>
