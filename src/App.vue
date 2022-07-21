<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
page {
  background-color: #fff;
}

@import '@/static/styles/common.scss';
@import '@/static/styles/iconfont.scss';
@import 'justui/packages/index.scss';
</style>
