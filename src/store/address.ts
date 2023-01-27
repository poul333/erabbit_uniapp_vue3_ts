import { getMemberAddressItem } from "@/types/address";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAddressStore = defineStore(
  "address",
  () => {
    // 选中的收货地址
    const selectAddress = ref({} as getMemberAddressItem);

    // 修改收货地址
    const changeSelectAddress = (address: getMemberAddressItem) => {
      selectAddress.value = address;
    };

    return {
      selectAddress,
      changeSelectAddress,
    };
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
