import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { LoginWxMinResult } from "@/types/login";

export const useMemberStore = defineStore(
  "member",
  () => {
    const profile = ref<LoginWxMinResult>({} as LoginWxMinResult);

    const setProfile = (val: LoginWxMinResult) => {
      profile.value = val;
    };

    const isLogin = computed(() => Boolean(profile.value.token));

    return { profile, setProfile, isLogin };
  },
  {
    // 修改为小程序存储方式
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, val) {
          uni.setStorageSync(key, val);
        },
      },
    },
  }
);
