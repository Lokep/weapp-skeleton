<style lang="scss" scoped>
.radio {
  @apply flex items-center gap-2 min-w-16;

  &-group {
    @apply flex flex-wrap items-center gap-3;
  }

  &-box {
    @apply w-6 h-6  rounded-full shadow-md overflow-hidden;
    border: 1rpx solid var(--border-color);
    background-color: var(--primary-color);

    &--inner {
      @apply w-full h-full bg-white rounded-full;
      transition: transform 0.3s ease;
    }
  }

  &-checked {
    .radio-box {
      border-color: var(--primary-color);
    }

    .radio-box--inner {
      transform: scale(0.3);
    }
  }

  &-disabled {
    .radio-label {
      color: var(--gray-6);
    }
    
    .radio-box {
      background-color: var(--gray-3);
      border-color: var(--border-color)
    }
  }

  &-label {
    color: var(--text-color);
  }
}
</style>

<template>
  <div class="radio-group flex flex-wrap items-center gap-3">
    <div
      class="radio"
      :class="{
        'radio-checked': value === props.value,
        'radio-disabled': props.disabled,
      }"
      v-for="{ label, value } in options"
      :key="value"
      @click="() => updateValue(value)"
    >
      <div class="radio-box">
        <div class="radio-box--inner"></div>
      </div>
      <div class="radio-label text-base">{{ label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  value: {
    type: [String, Number],
    default: "",
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  options: {
    type: Array as PropType<{ label: string; value: string | number }[]>,
    default: () => [],
  },
});

const emit = defineEmits(["update:value", 'change']);

const updateValue = (value: string | number) => {
  if (!props.disabled) {
    emit("update:value", value);
    emit("change", value);
  }
};
</script>
