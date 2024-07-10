<style lang="scss" scoped>
.description {
  &-topbar {
    &--title {
      @apply overflow-hidden whitespace-nowrap text-ellipsis flex-auto font-semibold text-base leading-normal mb-4;
    }
  }
  &-item {
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.5714285714285714;
    text-align: start;

    &--label {
      &.colon::after {
        content: "：";
      }
    }
  }
}
</style>

<template>
  <Card class="description">
    <div class="description-topbar" v-if="title">
      <div class="description-topbar--title">UserName</div>
    </div>

    <div
      class="description-body grid gap-x-2 gap-y-4"
      v-if="descriptions.length"
      :style="{
        gridTemplateColumns: `repeat(${column}, 1fr)`,
      }"
    >
      <div
        class="description-item flex items-center gap-1"
        v-for="{ label, value } in descriptions"
        :key="label"
      >
        <div
          class="description-item--label flex items-center"
          :class="{
            colon: colon,
          }"
          :style="labelStyle"
        >
          {{ label }}
        </div>
        <div class="description-item--content" :style="contentStyle">
          {{ value }}
        </div>
      </div>
    </div>

    <div class="description-body flex items-center justify-center" v-else>
      <Empty description="暂无描述信息">
        <div class="w-full">
          <slot name="empty"></slot>
        </div>
      </Empty>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import Empty from "@/components/Empty/index.vue";
import type { PropType } from "vue";

const props = defineProps({
  bordered: {
    type: Boolean,
    default: false,
  },

  colon: {
    type: Boolean,
    default: false,
  },

  contentStyle: {
    type: Object,
    default: () => ({}),
  },

  labelStyle: {
    type: Object,
    default: () => ({}),
  },

  title: {
    type: String,
    default: "",
  },

  column: {
    type: Number,
    default: 3,
  },

  descriptions: {
    type: Array as PropType<Array<{ label: string; value: number | string }>>,
    default: () => [],
  },
});
</script>
