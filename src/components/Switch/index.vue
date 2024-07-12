<style lang="scss" scoped>
.switch {
  @apply rounded-full relative h-6 bg-slate-200 flex p-1 box-content min-w-14 w-fit overflow-hidden transition-all duration-300 ease-in-out cursor-pointer;

  &::after {
    border: none;
    content: "";
  }

  &:active {
    transform: scale(0.95);
  }

  &-text {
    @apply text-base text-slate-400 absolute top-0 left-0 w-full h-full flex items-center justify-center z-10;
    transition: all 0.3s ease-in-out;

    &.on {
      @apply static pl-8 -translate-x-full -left-full pr-1;
    }

    &.off {
      @apply translate-x-0 pl-8 pr-1;
    }
  }

  &-circle {
    @apply w-6 h-6 rounded-full absolute top-1 left-1 bg-white transition-all duration-300 ease-in-out z-10;
  }

  &-background {
    @apply w-full h-full absolute top-0 -left-full rounded-full transition-all duration-300 ease-in-out z-0 -translate-x-full mr-1;
    background-color: var(--primary-color);
  }

  &.checked {
    .on {
      @apply translate-x-0 pl-1 pr-7 text-white;
    }

    .off {
      @apply translate-x-full pl-7;
    }

    .switch-circle {
      @apply -translate-x-7 left-full;
    }

    .switch-background {
      @apply translate-x-0 left-0;
    }
  }
}
</style>

<template>
  <button
    class="switch"
    :class="{
      checked: isSwitchActive,
    }"
    @click="onClickSwitch"
  >
    <div class="switch-circle"></div>
    <div class="switch-text on">{{ onText }}</div>
    <div class="switch-text off">{{ offText }}</div>
    <div class="switch-background"></div>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";

type TOption = string | number | { label: string; value: string | number };

const props = defineProps({
  value: {
    type: [Boolean, Number, String],
    default: false,
  },

  options: {
    type: Array as PropType<Array<TOption>>,
    validator: (options: Array<TOption>) => {
      return options.length === 2;
    },
    default: () => [],
  },
});

const isSwitchActive = computed(() => {
  if (props.options.length === 2) {
    const [, option] = props.options;

    if (typeof option === "object") {
      return option.value === props.value;
    }

    return option === props.value;
  }
  return props.value;
});

const onText = computed(() => {
  if (props.options.length === 2) {
    const [option] = props.options;

    if (typeof option === "object") {
      return option.label; 
    }
    return option;
  }
  return "";
});

const offText = computed(() => {
  if (props.options.length === 2) {
    const [, option] = props.options;

    if (typeof option === "object") {
      return option.label; 
    }
    return option;
  }
  return "";
});

const emit = defineEmits(["update:value"]);

const onClickSwitch = () =>{
    if (props.options.length === 2) {
      const index = props.options.findIndex((option) => {
        if (typeof option === "object") {
          return option.value === props.value;
        }

        return option === props.value;
      });

      emit("update:value", index === 0 ? props.options[1] : props.options[0]);
    }

    emit("update:value", !props.value);
  }
</script>
