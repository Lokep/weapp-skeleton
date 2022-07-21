import { createSSRApp } from "vue";
import App from "./App.vue";

import justui from 'justui';

import { createPinia } from "pinia";

const pinia = createPinia();

export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);
  app.use(justui)
  
  return {
    app,
  };
}
