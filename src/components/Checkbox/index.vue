<style lang="scss" scoped></style>

<template>
  <div class="checkbox-group flex flex-wrap items-center gap-3">
    <CheckboxItem
      v-for="item in options"
      :key="item.value"
      :checked="value.includes(item.value)"
      :value="item.value"
      :disabled="disabled"
      @change="updateValue"
    >
      {{ item.label }}
    </CheckboxItem>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import CheckboxItem from "./item.vue";
import { nextTick } from "vue";

const props = defineProps({
  value: {
    type: Array as PropType<Array<string | number>>,
    default: () => [],
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

const emit = defineEmits(["update:value", "change"]);

const updateValue = (value: string | number) => {
  const index = props.value.findIndex((item) => item === value)

  if (index === -1) {
    emit('update:value', [...props.value, value])
    nextTick(() => {
      emit('change', [...props.value, value])
    })
  }else {
    const newValue = [...props.value]

    newValue.splice(index, 1)
    emit('update:value', newValue)
    nextTick(() => {
      emit('change', newValue)
    })
  }
}
</script>
