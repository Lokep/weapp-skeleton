<style lang="scss" scoped>
.container {
  padding: 32rpx;

  .h1 {
    margin-top: 48px;
    margin-bottom: 32px;
    font-size: 32px;
  }

  .row {
    margin: 16px 0;
  }
}
</style>

<template>
  <div class="container">
    <h1 class="h1">{{ hooks }}</h1>

    <div class="row">useApiCheck: uni.login {{ isUniLoginAvailable }}</div>

    <div class="row">
      <div>interval: {{ counter }}</div>

      <button
        class="w-32 md:w-32 lg:w-48 bg-red-800 text-white my-2.5 p-2.5"
        @click="pause"
      >
        pause
      </button>
      <button
        class="bg-blue-400 w-32 md:w-32 lg:w-48 bg-red-800 text-white my-2.5 p-2.5"
        @click="resume"
      >
        resume
      </button>
    </div>

    <div class="row">
      <button
        class="bg-green-400 w-36 lg:w-48 bg-red-800 text-white my-2.5 p-2.5"
        @click="getLaunchOption"
      >
        getLaunchOption
      </button>
      {{ launchOption }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import useApiCheck from "@/hooks/useApiCheck";
import { useInterval } from "@/hooks/useInterval";
import useLaunchOption from "@/hooks/useLaunchOption";
import { ref } from "vue";

const hooks = ref("hooks");

const isUniLoginAvailable = useApiCheck("login");

const { counter, pause, resume } = useInterval(200, { controls: true });

const {launchOption, getLaunchOption} = useLaunchOption();
</script>
