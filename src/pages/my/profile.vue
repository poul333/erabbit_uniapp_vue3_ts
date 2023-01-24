<script setup lang="ts">
import { toRef, ref } from "vue";
import useAppStore from "@/store";
import { onLoad } from "@dcloudio/uni-app";
import { getMemberProfile, putMemberProfile } from "@/apis/profile";
import { Gender, GetMemberProfileResult } from "@/types/profile";
import { useMemberStore } from "@/store/member";

const appStore = useAppStore();
const safeArea = toRef(appStore, "safeArea");

const goBack = () => {
  uni.navigateBack({});
};

const chooseImage = () => {
  uni.chooseImage({});
};

const MemberProfile = ref({} as GetMemberProfileResult);
onLoad(async () => {
  MemberProfile.value = await getMemberProfile();
  // 同步修改头像和昵称
  memberStore.profile.avatar = MemberProfile.value.avatar;
  memberStore.profile.nickname = MemberProfile.value.nickname;
});

const memberStore = useMemberStore();

// 修改头像
const changeAvatar = async () => {
  const res = (await uni.chooseImage({ count: 1 })) as any;
  // 小程序不是通过 request 上传文件， 而是通过 uploadFile 进行上传
  uni.uploadFile({
    // 上传图片
    url: "/member/profile/avatar",
    name: "file",
    filePath: res.tempFilePaths[0],
    success: (ures) => {
      console.log(ures);
      // 更新用户头像
      MemberProfile.value.avatar = res.tempFilePaths[0];
      // 更新 pinia 中存储的头像
      memberStore.profile.avatar = res.tempFilePaths[0];
      // 提示
      uni.showToast({ icon: "success", title: "更换头像成功" });
    },
  });
};

const submitForm = async () => {
  // 获取后端修改所需字段
  const { birthday, gender, nickname, profession } = MemberProfile.value;
  // 🔔 数组按下标解构 省 市 区 的编码
  const [provinceCode, cityCode, countyCode] = fullLocationCode;
  await putMemberProfile({
    birthday,
    gender,
    nickname,
    profession,
    provinceCode,
    cityCode,
    countyCode,
  });
  uni.showToast({ title: "修改成功", icon: "success" });
  // 修改 pinia 中昵称
  memberStore.profile.nickname = nickname;
  // 后退一页
  uni.navigateBack({});
};

// 修改性别
const genderChange = (ev: WechatMiniprogram.RadioGroupChange) => {
  MemberProfile.value.gender = ev.detail.value as Gender;
};

// 修改生日
const birthdayChange = (ev: WechatMiniprogram.PickerChange) => {
  MemberProfile.value.birthday = ev.detail.value as string;
};

let fullLocationCode: string[] = [];
const fullLocationChange = (ev: WechatMiniprogram.PickerChange) => {
  // 用于界面展示的 省市区的名称，仅本地展示，不用于网络请求
  // PS: string[] 能兼容 [string, string, string] 类型
  MemberProfile.value.fullLocation = (ev.detail.value as string[]).join("");
  // 用于接口参数的 省市区的编码
  fullLocationCode = ev.detail.code;
};
</script>

<template>
  <view class="viewport">
    <view class="navbar" :style="{ paddingTop: safeArea?.top + 'px' }">
      <view class="back icon-left" @tap="goBack"></view>
      <view class="title">个人信息</view>
    </view>
    <scroll-view scroll-y>
      <!-- 头像 -->
      <view @tap="changeAvatar" class="avatar">
        <image
          @tap="chooseImage"
          :src="MemberProfile.avatar"
          mode="'aspectFit'"
        />
        <text>点击修改头像</text>
      </view>
      <!-- 用户信息 -->
      <view class="form">
        <view class="form-item">
          <text class="label">账号</text>
          <text>{{ MemberProfile.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input v-model="MemberProfile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="genderChange">
            <label class="radio">
              <radio
                value="男"
                color="#27ba9b"
                :checked="MemberProfile.gender === '男'"
              />
              男
            </label>
            <label class="radio">
              <radio
                value="女"
                color="#27ba9b"
                :checked="MemberProfile.gender === '女'"
              />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">出生日期</text>
          <picker
            @change="birthdayChange"
            mode="date"
            start="1950-09-01"
            end="2023-09-01"
          >
            <view>{{ MemberProfile.birthday || "请选择日期" }}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker @change="fullLocationChange" mode="region">
            <view>{{ MemberProfile.fullLocation || "请选择城市" }}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input v-model="MemberProfile.profession" placeholder="请填写职业" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <view @tap="submitForm" class="button">保 存</view>
    </scroll-view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 392rpx;
  background-repeat: no-repeat;
}

.navbar .title {
  height: 40px;
  line-height: 32px;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
}

.navbar .back {
  position: absolute;
  left: 20rpx;
  top: 22px;
  font-size: 23px;
  z-index: 9;
  color: #fff;
}

.avatar {
  text-align: center;
  padding: 20rpx 0 40rpx;
}

.avatar image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
}

.avatar text {
  display: block;
  padding-top: 20rpx;
  line-height: 1;
  font-size: 26rpx;
  color: #fff;
}

.form {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
}

.form .form-item {
  display: flex;
  height: 96rpx;
  line-height: 46rpx;
  padding: 25rpx 10rpx;
  background-color: #fff;
  font-size: 28rpx;
  border-bottom: 1rpx solid #ddd;
}

.form .form-item:last-child {
  border: none;
}

.form .form-item .label {
  width: 180rpx;
  color: #333;
}

.form .form-item input {
  flex: 1;
  display: block;
  height: 46rpx;
}

.form .form-item .radio {
  display: inline-block;
  height: 46rpx;
  margin-right: 20rpx;
  vertical-align: middle;
}

.form .form-item radio {
  transform: scale(0.7) translateY(-2px);
}

.form .form-item picker {
  flex: 1;
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
