<template>
  <view class="content bg-slate-50 h-screen">
    <image class="logo w-20 h-20 block" src="/static/logo.png" />
    <image class="logo w-20 h-20 block" :src="Logo" />
    <view class="text-area">
      <text class="title text-lg">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import Logo from "@/static/logo.png";
import { ref } from "vue";
const title = ref("Hello");
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
