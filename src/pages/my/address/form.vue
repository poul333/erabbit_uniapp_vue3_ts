<script setup lang="ts">
import {
  getMemberAddressById,
  postMemberAddress,
  putMemberAddress,
} from "@/apis/address";
import { postMemberAddressData } from "@/types/address";
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

onLoad(({ id }) => {
  uni.setNavigationBarTitle({
    title: id ? "修改地址" : "新建地址",
  });
});

const form = reactive({
  isDefault: 0,
} as postMemberAddressData);
// 收集界面展示的地址
const fullLocation = ref<string | undefined>();
const regionChange = (ev: WechatMiniprogram.PickerChange) => {
  // 收集省市区编码
  const [provinceCode, cityCode, countyCode] = ev.detail.code;
  // form.postalCode = provinceCode;
  // form.cityCode = cityCode;
  // form.countyCode = countyCode;
  // ---------使用合并对象简写
  Object.assign(form, {
    provinceCode,
    cityCode,
    countyCode,
    postalCode: ev.detail.postcode, // 邮政编码
  });
  // 收集界面展示的地址
  fullLocation.value = (ev.detail.value as string[]).join("");
};

// 是否为默认地址
// 与原生的 switch 组件和事件冲突导致类型报错，所以使用联合类型和类型断言
const isDefaultChange = (ev: WechatMiniprogram.SwitchChange | Event) => {
  form.isDefault = (ev as WechatMiniprogram.SwitchChange).detail.value ? 1 : 0;
};

const submitForm = async () => {
  // 如果有id，为修改，无id， 为新增
  if (addressId.value) {
    await putMemberAddress(addressId.value, form);
  } else {
    await postMemberAddress(form);
  }
  uni.showToast({ title: "操作成功" });
  uni.navigateBack({});
};

const addressId = ref("");
onLoad(async ({ id }) => {
  if (id) {
    addressId.value = id;
    const res = await getMemberAddressById(id);
    Object.assign(form, res);
  }
});
</script>

<template>
  <view class="viewport">
    <!-- 地址信息 -->
    <view class="form">
      <view class="form-item">
        <text class="label">姓名</text>
        <input
          v-model="form.receiver"
          placeholder-style="color: #888"
          placeholder="请填写收货人姓名"
        />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input
          v-model="form.contact"
          placeholder-style="color: #888"
          placeholder="请填写收货人手机号码"
        />
      </view>
      <view class="form-item">
        <text class="label">省/市/县 (区)</text>
        <picker @change="regionChange" mode="region">
          <view v-if="fullLocation" class="region">{{ fullLocation }}</view>
          <view v-else class="placeholder"> 请填写收货人所在城市</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input
          v-model="form.address"
          placeholder-style="color: #888"
          placeholder="街道、楼牌号信息"
        />
      </view>
      <view class="form-item">
        <text class="label">设置默认地址</text>
        <switch
          @change="isDefaultChange"
          :checked="form.isDefault === 1"
          color="#27ba9b"
        />
      </view>
    </view>
    <!-- 提交按钮 -->
    <view @tap="submitForm" class="button">{{
      addressId ? "保 存" : "新增"
    }}</view>
  </view>
</template>

<style>
page {
  background-color: #f4f4f4;
}

.form {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
}

.form .form-item {
  display: flex;
  min-height: 96rpx;
  line-height: 46rpx;
  padding: 25rpx 10rpx;
  background-color: #fff;
  font-size: 28rpx;
  border-bottom: 1rpx solid #ddd;
  position: relative;
}

.form .form-item:last-child {
  border: none;
}

.form .form-item .label {
  width: 200rpx;
  color: #333;
}

.form .form-item input {
  flex: 1;
  display: block;
  height: 46rpx;
}

.form .form-item switch {
  position: absolute;
  right: -10rpx;
  transform: scale(0.7) translateY(-8px);
}

.form .form-item picker {
  flex: 1;
}

.form .form-item .region {
  color: #333;
}

.form .form-item .placeholder {
  color: #888;
}

.button {
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
