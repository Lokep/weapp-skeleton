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

      <button @click="pause"> pause </button>
      <button @click="resume"> resume </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useApiCheck from "@/hooks/useApiCheck";
import { useInterval } from "@/hooks/useInterval";
import { ref } from "vue";

const hooks = ref("hooks");

const isUniLoginAvailable = useApiCheck("login");

const { counter, pause, resume } = useInterval(200, { controls: true });

</script>
