import { createSSRApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
// pinia 持久化存储插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 注册全局组件
import { useGlobalComponents } from "@/components/index";

export function createApp() {
  const app = createSSRApp(App);

  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
  // 注册全局组件
  useGlobalComponents(app);

  return {
    app,
  };
}
