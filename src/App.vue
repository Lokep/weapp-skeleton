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
<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "@/static/styles/iconfont.scss";

.container {
  @apply w-full;
  @apply min-h-screen;
  background-color: #f5f6f7;
  max-width: 100vw;
}
</style>
