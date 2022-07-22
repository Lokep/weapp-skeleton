<template>
  <view class="content">
    <image class="logo" src="http://www.lanniuh.com/health-web/favicon.png" />
    <view class="text-area">
      <text class="title">{{ author }} {{ app }}</text>
    </view>

    <img :src="course.contentUrl" alt="" />

    <button @click="getPackageInfo">run task</button>

    <button @click="showPiniaTable">showPinia</button>
  </view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { compose } from "@/utils/compose";
import { onShow } from "@dcloudio/uni-app";
import { ComponentInternalInstance, getCurrentInstance, Ref, ref } from "vue";
import { useAppStore } from "@/store/app";
import { go } from "@/utils/uni-app";

const store = useStore();
const appStore = useAppStore();

const { author } = storeToRefs(store);
const { app } = storeToRefs(appStore);
const course: Ref<AnyObject> = ref({});

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const showPiniaTable = proxy?.showPinia;

const getPackageInfo = () => {
  compose
    .runTask({
      url: "http://192.168.3.136/mock/161/course-center/package-rel/course/test",
      showErrMsg: true,
      showLoading: true,
      needToken: false,
    })
    .then((res) => {
      if (typeof res !== "boolean" && res.data) {
        course.value = res.data;
      }
    });
};

go('/pages/hooks/index')

onShow(() => {
  console.log("onShow");
  getPackageInfo();
});
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
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
  color: #8f8f94;
}
</style>
