<style lang="scss" scoped>

$color: rgb(5, 5, 5);

.divider {
  @apply w-full text-sm flex items-center min-h-5 my-3;

  &.flex-col {
    @apply inline-flex w-auto my-0 mx-3 min-h-6;
  }

  &-hairline {
    flex: 1;
    border-color: rgba($color, 0.06);

    border-bottom-width: 1px;
    border-right-width: 0;
    border-style: solid;

    &--dashed {
      border-bottom-style: dashed;
    }

    .flex-col & {
      border-bottom-width: 0;
      border-right-width: 1px;
    }
  }

  &-slot {
    color: rgba($color, 0.5);
  }
}
</style>

<template>
  <div
    class="divider"
    :class="{
      'flex-col': type === 'vertical',
    }"
  >
    <div
      class="divider-hairline"
      :class="{
        'divider-hairline--dashed': dashed,
      }"
    ></div>
    <div class="shrink-0 mx-2 empty:hidden divider-slot"><slot></slot></div>
    <div class="divider-hairline" :class="{
        'divider-hairline--dashed': dashed,
      }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  dashed: {
    type: Boolean,
    default: false,
  },

  type: {
    type: String,
    default: "horizontal", // vertical or horizontal
  },
});
</script>
