<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.button {
  --op: 1;
  --active-op: 1;

  @apply inline-block cursor-pointer relative overflow-visible;

  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  border: 1px solid;

  border-color: var(--border-color);
  color: var(--text-color);
  background-color: var(--bg-color);
  opacity: var(--op);

  .wave {
    @apply absolute block pointer-events-none bg-no-repeat opacity-0 z-10;

    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-color: var(--active-bg-color);
    background-position: 50%;
    transition: all 0.6s;
    border-radius: inherit;
  }

  &::after {
    content: "";
    border: none;
  }

  &:not(&-disabled):not(&-loading):active {
    border-color: var(--active-border-color);
    color: var(--active-text-color);
    background-color: var(--active-bg-color);
    opacity: var(--active-op);

    .wave {
      opacity: 0.3;
      //设置初始状态
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: 0s;
    }
  }

  &-default {
    --border-color: #d9d9d9;
    --active-border-color: #0958d9;
    --text-color: rgba(0, 0, 0, 0.88);
    --active-text-color: #0958d9;
    --bg-color: #fff;
    --active-bg-color: #fff;
  }

  &-primary {
    --border-color: var(--primary-color);
    --active-border-color: #0958d9;
    --text-color: #fff;
    --active-text-color: #fff;
    --bg-color: var(--primary-color);
    --active-bg-color: #0958d9;

    &[class*="-ghost"],
    &[class*="-dashed"],
    &[class*="-link"],
    &[class*="-text"] {
      --text-color: var(--primary-color);
      --active-text-color: #0958d9;
    }

    &[class*="-ghost"],
    &[class*="-dashed"] {
      --border-color: var(--primary-color);
      --active-border-color: #0958d9;

      --bg-color: #fff;
      --active-bg-color: #fff;
    }

    &[class*="-link"],
    &[class*="-text"] {
      --border-color: #fff;
      --active-border-color: rgba(0, 0, 0, 0.15);

      --bg-color: #fff;
      --active-bg-color: rgba(0, 0, 0, 0.15);
    }
  }

  &-danger {
    --border-color: #f5222d;
    --active-border-color: #b30015;
    --text-color: #fff;
    --active-text-color: #fff;
    --bg-color: #f5222d;
    --active-bg-color: #b30015;

    &[class*="-ghost"],
    &[class*="-dashed"],
    &[class*="-link"],
    &[class*="-text"] {
      --text-color: #ff4d4f;
      --active-text-color: #d9363e;
    }

    &[class*="-ghost"],
    &[class*="-dashed"] {
      --border-color: #ff4d4f;
      --active-border-color: #d9363e;

      --bg-color: #fff;
      --active-bg-color: #fff;
    }

    &[class*="-link"],
    &[class*="-text"] {
      --border-color: transparent;
      --active-border-color: transparent;

      --bg-color: #fff;
      --active-bg-color: #fff2f0;
    }
  }

  &-disabled {
    cursor: not-allowed;

    --border-color: #d9d9d9;
    --active-border-color: #d9d9d9;
    --text-color: rgba(0, 0, 0, 0.25);
    --active-text-color: rgba(0, 0, 0, 0.25);
    --bg-color: rgba(0, 0, 0, 0.04);
    --active-bg-color: rgba(0, 0, 0, 0.04);
  }

  &-loading {
    --op: 0.65;
    --active-op: 0.65;

    &--icon {
      animation: spin 1.4s linear infinite;
      color: inherit;
      @apply w-6 h-6 text-center leading-6;
      transform-origin: center center;
    }
  }

  &-block {
    @apply w-full flex justify-center items-center;
  }

  &-dashed {
    @apply border-dashed;
  }

  &-round {
    @apply rounded-md;
  }

  &-circle {
    @apply rounded-full;
  }

  &-small {
    @apply px-2 py-1 text-sm;
  }

  &-middle {
    @apply py-2 px-6 text-base;
  }

  &-large {
    @apply py-3 px-6 text-lg;
  }
}
</style>

<template>
  <button
    class="button"
    :class="[
      {
        'button-block': block,
        'button-danger': danger,
        'button-disabled': disabled,
        'button-ghost': ghost,
        'button-loading': loading,
      },
      `button-${shape}`,
      `button-${size}`,
      `button-${type}`,
    ]"
    :disabled="disabled"
    :hover-stop-propagation="hoverStopPropagation"
    :open-type="openType"
    hover-class="none"
    @click="onClick"
    @getphonenumber="onGetPhoneNumber"
    @getrealtimephonenumber="onGetRealTimePhoneNumber"
    @error="onError"
    @opensetting="onOpenSetting"
    @launchapp="onLaunchApp"
    @chooseavatar="onChooseAvatar"
    @agreeprivacyauthorization="onAgreePrivacyAuthorization"
  >
    <div class="wave"></div>

    <div class="flex items-center justify-center gap-1">
      <div class="button-icon iconfont" :class="[icon]" v-if="icon"></div>

      <div>
        <slot></slot>
      </div>

      <div class="button-loading--icon iconloading iconfont text-base shrink-0 grow-0" v-if="loading"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { type PropType, computed } from "vue";

type ButtonSize = "small" | "middle" | "large";
type ButtonShape = "round" | "circle";
type ButtonType = "primary" | "ghost" | "dashed" | "link" | "text" | "default";
type ButtonOpenType =
  | "contact"
  | "liveActivity"
  | "getRealtimePhoneNumber"
  | "share"
  | "getUserInfo"
  | "getPhoneNumber"
  | "launchApp"
  | "openSetting"
  | "feedback"
  | "chooseAvatar"
  | "agreePrivacyAuthorization";

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },

  danger: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  ghost: {
    type: Boolean,
    default: false,
  },

  size: {
    type: String as PropType<ButtonSize>,
    default: "middle",
  },

  icon: {
    type: String,
    default: "",
  },

  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  shape: {
    type: String as PropType<ButtonShape>,
    default: "round",
  },

  type: {
    type: String as PropType<ButtonType>,
    default: "default",
  },

  /**
   * *以下为微信小程序特有属性
   */
  openType: {
    type: String as PropType<ButtonOpenType>,
    default: "",
  },

  hoverStopPropagation: {
    type: Boolean,
    default: true,
  },
});

const loadingType = computed(() => {
  if (typeof props.loading === "string") {
    return props.loading;
  }

  return "";
});

const emit = defineEmits([
  "click",
  "getphonenumber",
  "getrealtimephonenumber",
  "error",
  "opensetting",
  "launchapp",
  "chooseavatar",
  "agreeprivacyauthorization",
]);

const onClick = (e) => {
  emit("click", e);
};

const onGetPhoneNumber = (e) => {
  emit("getphonenumber", e);
};

const onGetRealTimePhoneNumber = (e) => {
  emit("getrealtimephonenumber", e);
};

const onError = (e) => {
  emit("error", e);
};

const onOpenSetting = (e) => {
  emit("opensetting", e);
};

const onLaunchApp = (e) => {
  emit("launchapp", e);
};

const onChooseAvatar = (e) => {
  emit("chooseavatar", e);
};

const onAgreePrivacyAuthorization = (e) => {
  emit("agreeprivacyauthorization", e);
};
</script>
