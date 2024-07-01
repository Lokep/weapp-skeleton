<template>
  <div class="overflow-hidden">
    <image class="logo w-20 h-20 block" src="/static/logo.png" />
    <image class="logo w-20 h-20 block" :src="Logo" />
    <view class="text-area">
      <text class="title text-lg">{{ title }}</text>
    </view>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@/static/logo.png";
import { onPullDownRefresh, onReady } from "@dcloudio/uni-app";
import { ref } from "vue";

const title = ref("Hello");

onReady(() => {
  console.log("onLoad");
});

onPullDownRefresh(() => {
  console.log("onPullDownRefresh");
})
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  /* height: 200rpx;
  width: 200rpx; */
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: $a;
}
</style>
