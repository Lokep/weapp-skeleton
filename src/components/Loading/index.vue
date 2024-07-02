<style lang="scss" scoped>
@import "three-dots/scss/_index.scss";

.loading {
  @apply w-16 h-16 flex items-center justify-center bg-white;

  &-fixed {
    @apply fixed top-0 left-0 right-0 bottom-0 z-50 m-auto;
  }

  &-shadow {
    @apply shadow;
  }

  &-text {
    @apply  text-gray-500 text-center;
  }
}
</style>

<template>
  <div
    class="loading flex-col gap-6"
    :class="[
      {
        'loading-fixed': fixed,
        'loading-shadow': shadow,
      },
    ]"
    :style="{
      background: backgroundColor,
    }"
  >
    <div :class="[`dot-${[type]}`]"></div>
    <div class="loading-text text-md" v-if="loadingText">{{ loadingText }}</div>
  </div>
</template>

<script setup lang="ts">
enum LoadingType {
  elastic = "elastic",
  pulse = "pulse",
  flashing = "flashing",
  collision = "collision",
  revolution = "revolution",
  carousel = "carousel",
  typing = "typing",
  windmill = "windmill",
  bricks = "bricks",
  floating = "floating",
  fire = "fire",
  spin = "spin",
  falling = "falling",
  stretching = "stretching",

  gathering = "gathering",
  hourglass = "hourglass",
  overtaking = "overtaking",
  shuttle = "shuttle",
  bouncing = "bouncing",
  rolling = "rolling",
}

defineProps({
  type: {
    type: String,
    default: LoadingType.windmill,
  },

  fixed: {
    type: Boolean,
    default: false,
  },

  backgroundColor: {
    type: String,
    default: "transparent",
  },

  shadow: {
    type: Boolean,
    default: false,
  },

  loadingText: {
    type: String,
    default: "",
  },
});
</script>
