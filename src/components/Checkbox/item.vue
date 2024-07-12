<style lang="scss" scoped>
.checkbox {
  @apply inline-flex items-center gap-2;

  &-box {
    --tw-shadow-color: var(--primary-color);
    @apply w-6 h-6 border rounded-lg shadow-md overflow-hidden bg-white;
    

    &--inner {
      @apply w-7 h-7 relative scale-0 rotate-45 rounded-full;
      background-color: var(--primary-color);
      transition: transform 0.3s ease;
      left: -2px;
      top: -2px;

      &__line {
        @apply rounded bg-white absolute;
        

        &.short {
          @apply w-0 h-0.5;
          top: 30rpx;
          left: 16rpx;
          transition: width 0.3s ease;
          transition-delay: .3s;
        }

        &.long {
          @apply h-0 w-0.5;
          top: 14rpx;
          left: 26rpx;
          transition: height 0.3s ease;
          transform: rotate(180deg);
          transition-delay: .3s;
        }
      }
    }
  }

  &-label {
    color: var(--text-color);
  }

  &-checked {

    border-color: var(--primary-color);

    .checkbox-box--inner {
      @apply scale-100 rotate-45;
    }

    .checkbox-box--inner__line {
      &.short {
        @apply w-1.5 h-0.5;
      }

      &.long {
        @apply h-2.5 w-0.5;
      }
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
      <div class="checkbox-box--inner">
        <div class="checkbox-box--inner__line short"></div>
        <div class="checkbox-box--inner__line long"></div>
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
