<style lang="scss" scoped>
.navbar {
  position: relative;
}
.nav-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 1000;
}

.home-icon,
.back-icon {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
}

.back-icon {
  border-right: 1rpx solid #ededed;
  font-size: 28rpx;
}

.nav-title,
.nav-icon {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  font-size: 0;
  font-weight: bold;
}

.nav-title__text {
  color: var(--333333, #333);
  text-align: center;
  font-family: "PingFang SC";
  font-size: 28rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 52rpx; /* 144.444% */
}
</style>

<template>
  <div
    class="nav"
    :style="{
      height: `${statusBarHeight + navigationHeight}px`,
    }"
  >
    <div
      class="nav-wrap"
      :style="{
        height: `${totalHeight}px`,
        background: background,
      }"
    >
      <div class="statusBarHeight" :style="customStatusBarStyle"></div>

      <div class="navbar items-center" :style="customNavBarStyle">
        <div
          class="navbar-leftbar items-center pl-6"
          v-if="leftbarMode === 'custom'"
        >
          <slot name="leftbar"></slot>
        </div>

        <div
          class="navbar-leftbar items-center"
          v-else-if="leftbar.length"
          :style="customLeftbarStyle"
        >
          <div
            v-for="(item, index) in leftbar"
            :key="index"
            :class="item.classnames"
            @click="item.event"
          ></div>
        </div>

        <div class="nav-title">
          <text class="nav-title__text" :style="titleStyle">{{ title }}</text>
          <div :style="titleStyle">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type App from "@/types/app.d";
import { computed, reactive, ref } from "vue";
import { onBeforeMount } from "vue";
import type { CSSProperties } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  background: {
    type: String,
    default: "white",
  },

  statusBarStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  navBarStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  leftbar: {
    type: Array as PropType<Array<App.ILeftbarItem>>,
    default: () => [],
  },

  leftbarStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },

  leftbarMode: {
    type: String,
    default: "default",
    validator: (value: string) => ["default", "custom"].includes(value),
  },

  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
});

onBeforeMount(() => {
  init();
});

const statusBarHeight = ref(22);
const navigationHeight = ref(44);
const menuButtonBounding = reactive({
  height: 44,
  right: 16,
  top: 16,
  width: 120,
});

const init = () => {
  const { statusBarHeight: s = 22 } = uni.getSystemInfoSync();
  const { height, right, top, width } = uni.getMenuButtonBoundingClientRect();

  statusBarHeight.value = s;

  menuButtonBounding.right = right;
  menuButtonBounding.top = top;
  menuButtonBounding.width = width;
  menuButtonBounding.height = height;
};

const totalHeight = computed(
  () => statusBarHeight.value + navigationHeight.value
);
const customStatusBarStyle = computed(() => ({
  height: `${statusBarHeight.value}px`,
  ...props.statusBarStyle,
}));

const customNavBarStyle = computed(() => ({
  height: `${navigationHeight.value}px`,
  ...props.navBarStyle,
}));

const customLeftbarStyle = computed(() => ({
  height: `${menuButtonBounding.height - 1}px`,
  lineHeight: `${menuButtonBounding.height - 1}px`,
  marginLeft: `calc(100vw - ${menuButtonBounding.right}px)`,
  marginTop: `${menuButtonBounding.top - statusBarHeight.value}px`,
  width: `${props.leftbar.length == 1 ? 30 : 70}px`,
  borderRadius: `${menuButtonBounding.height / 2}px`,
  border: `1rpx solid #ededed`,
}));
</script>
