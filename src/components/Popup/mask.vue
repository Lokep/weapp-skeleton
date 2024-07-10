<template>
  <div
    class="mask"
    hover-stop-propagation
    :style="[maskStyle, zoomStyle]"
    @tap="click"
    @touchmove.stop.prevent="() => {}"
    :class="{
      'mask-zoom': zoom,
      'mask-show': show,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 是否显示遮罩
  show: {
    type: Boolean,
    default: false,
  },
  // 层级z-index
  zIndex: {
    type: [Number, String],
    default: "",
  },
  // 用户自定义样式
  customStyle: {
    type: Object,
    default() {
      return {};
    },
  },
  // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
  zoom: {
    type: Boolean,
    default: true,
  },
  // 遮罩的过渡时间，单位为ms
  duration: {
    type: [Number, String],
    default: 300,
  },
  // 是否可以通过点击遮罩进行关闭
  maskClickAble: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["click"]);

const maskStyle = computed(() => {
  let style = {};
  style.backgroundColor = "rgba(0, 0, 0, 0.6)";

  if (props.show) {
    style.zIndex = props.zIndex;
  } else {
    style.zIndex = -1;
  }

  style.transition = `all ${props.duration / 1000}s ease-in-out`;

  // 判断用户传递的对象是否为空，不为空就进行合并
  if (Object.keys(props.customStyle).length) {
    return {
      ...style,
      ...props.customStyle,
    };
  }

  return style;
});

const zoomStyle = reactive({
  transform: "",
});
const scale = "scale(1.2, 1.2)";

watch(
  () => props.show,
  (n) => {
    if (n && props.zoom) {
      zoomStyle.transform = "scale(1, 1)";
    } else if (!n && props.zoom) {
      zoomStyle.transform = scale;
    }
  }
);

const click = () => {
  if (!props.maskClickAble) return;
  emit("click");
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: transform 0.3s;
}

.mask-show {
  opacity: 1;
}

.mask-zoom {
  transform: scale(1.2, 1.2);
}
</style>
