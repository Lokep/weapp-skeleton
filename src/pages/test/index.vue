<style lang="scss" scoped></style>

<template>
  <Container
    showCustomNavigationBar
    :customNavigationBar="{
      title: '测试页面',
    }"
    empty
    autoCheckNetwork
  >
    safsdaflk
  </Container>
</template>

<script setup lang="ts">
import axios from "@/libs/request/index";
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";

const init = async () => {
  try {
    await axios({ url: "", delay: 5000, showLoading: true, showSuccess: true },  [
      (config, next) => {
        console.log("request interceptor", config);
        return next();
      }
    ]);
    await axios({ url: "234234" });
  } catch (error) {
    // console.log(error)
  }
};

onShow(async () => {
  console.log("onShow");
  await init();
  console.log("onShow end");
});

onPullDownRefresh(async () => {
  console.log("onPullDownRefresh");
  await init();
  console.log("onPullDownRefresh end");
  uni.stopPullDownRefresh();
});
</script>
