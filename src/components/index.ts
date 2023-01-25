import { App } from "vue";
import XtxBack from "./XtxBack.vue";

export const useGlobalComponents = (app: App) => {
  app.component("XtxBack", XtxBack);
};
