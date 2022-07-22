import { createSSRApp } from "vue";
import justui from "justui";

import { createPinia } from "pinia";
import App from "./App.vue";

import PiniaHelper, { showPiniaState }  from "@/utils/pinia-helper";

/**
 * 定义vue全局方法需要在此接口声明类型
 * 不然在使用的时候ts会提示找不到该方法
 */
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    showPinia: () => void;
  }
}

const pinia = createPinia();

pinia.use(PiniaHelper);

export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);
  app.use(justui);

  app.config.globalProperties.showPinia = showPiniaState;

  return {
    app,
  };
}
