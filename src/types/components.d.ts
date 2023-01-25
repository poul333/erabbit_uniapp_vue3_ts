import XtxBack from "@/components/XtxBack.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    XtxBack: typeof XtxBack;
  }
}
