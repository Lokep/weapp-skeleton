<style lang="scss" scoped></style>

<template>
  <div class="empty flex flex-col items-center justify-center gap-4">
    <img
      class="h-24 mx-auto"
      mode="heightFix"
      src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      alt="Empty"
    />
    <p class="text-center text-md text-gray-400" v-if="emptyText">
      {{ emptyText }}
    </p>

    <slot>  </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  emptyText: {
    type: String,
    default: "暂无数据",
  },
});
</script>
