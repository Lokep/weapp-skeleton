<style lang="scss" scoped>
.checkbox {
  @apply inline-flex items-center gap-2;

  &-box {
    --tw-shadow-color: var(--primary-color);
    @apply w-6 h-6 border rounded-lg shadow-md overflow-hidden bg-white;
    

    &--inner {
      @apply w-full h-full relative scale-0 rounded-lg text-white text-center leading-snug font-semibold;
      background-color: var(--primary-color);
      transition: transform 0.3s ease;
    }
  }

  &-label {
    color: var(--text-color);
  }

  &-checked {

    border-color: var(--primary-color);

    .checkbox-box--inner {
      @apply scale-100;
    }
  }

  &-disabled {
    .checkbox-box--inner {
      background-color: var(--gray-3);
      border-color: var(--border-color)
    }

    .checkbox-label {
      color: var(--gray-6);
    }
  }
}
</style>

<template>
  <div
    class="checkbox"
    :class="{ 'checkbox-checked': checked, 'checkbox-disabled': disabled }"
    @click="onClickCheckbox"
  >
    <div class="checkbox-box">
      <div class="checkbox-box--inner iconfont iconselect-bold">
      </div>
    </div>
    <div class="checkbox-label text-base">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  
  value: {
    type: [String, Number, Boolean],
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change'])

const onClickCheckbox = () => {
  if (!props.disabled) {
    emit('change', props.value)
  }
}
</script>
