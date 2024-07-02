<style lang="scss" scoped>
.full {
  @apply w-full h-full min-h-screen;
}

.endline {
  display: flex;
  align-items: center;
  text-align: center;
  gap: 32rpx;
  font-size: 28rpx;

  padding: 32rpx;
  color: #ccc;

  &:before,
  &:after {
    flex: 1;
    content: "";
    display: block;
    height: 1px;
    margin-top: -1px;
    background-color: rgba(5, 5, 5, 0.06);
  }
}
</style>

<template>
  <div class="full overflow-hidden flex flex-col" :style="containerStyle">
    <NavigationBar
      class="shrink-0"
      v-if="showCustomNavigationBar"
      v-bind="customNavigationBar"
    />

    <div
      class="w-full flex-1 overflow-auto flex items-center justify-center"
      v-if="showNetworkError || !networkAvailable"
    >
      <Empty :empty-text="networkErrorText" />
    </div>

    <div
      class="w-full flex-1 overflow-auto flex items-center justify-center"
      v-else-if="loading"
    >
      <Loading fixed :loading-text="loadingText" />
    </div>

    <div
      class="w-full flex-1 overflow-auto flex items-center justify-center"
      v-else-if="empty"
    >
      <Empty :empty-text="emptyText" />
    </div>

    <div class="w-full flex-1 overflow-auto" v-else>
      <slot></slot>
    </div>

    <div class="endline" v-if="showEndLine">{{ endlineText }}</div>
  </div>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading/index.vue";
import Empty from "@/components/Empty/index.vue";
import NavigationBar from "@/components/NavigationBar/index.vue";
import { computed, ref } from "vue";
import { onBeforeMount } from "vue";
import { onBeforeUnmount } from "vue";

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },

  height: {
    type: String,
    default: "100%",
  },

  backgroundColor: {
    type: String,
    default: "transparent",
  },

  loading: {
    type: Boolean,
    default: false,
  },

  loadingText: {
    type: String,
    default: "加载中...",
  },

  empty: {
    type: Boolean,
    default: false,
  },

  emptyText: {
    type: String,
    default: "暂无数据",
  },

  showNetworkError: {
    type: Boolean,
    default: false,
  },

  /**
   * TODO 网络异常自动检查功能
   */
  autoCheckNetwork: {
    type: Boolean,
    default: false,
  },

  networkErrorText: {
    type: String,
    default: "网络连接异常，请检查网络设置",
  },

  showCustomNavigationBar: {
    type: Boolean,
    default: false,
  },

  customNavigationBar: {
    type: Object,
    default: () => ({}),
  },

  showEndLine: {
    type: Boolean,
    default: false,
  },

  endlineText: {
    type: String,
    default: "", // 我也是有底线哒～
  },
});

const containerStyle = computed(() => {
  const style = {
    width: props.width ?? "100%",
    height: props.height ?? "100%",
    backgroundColor: props.backgroundColor,
  };

  return style;
});

const networkAvailable = ref(true);
const networkListener = (res: UniApp.OnNetworkStatusChangeSuccess) => {
  console.log("networkListener", res);
  networkAvailable.value =
    !res.isConnected ||
    res.networkType === "none" ||
    res.networkType === "unknown"
      ? false
      : true;
};

const networkObserver = () => {
  console.log("onBeforeMount", props.autoCheckNetwork);
  if (props.autoCheckNetwork) {
    uni.onNetworkStatusChange(networkListener);
  }
};

onBeforeMount(() => {
  console.log("onBeforeMount");
  networkObserver();
});

onBeforeUnmount(() => {
  if (props.autoCheckNetwork) {
    uni.offNetworkStatusChange(networkListener);
  }
});
</script>
