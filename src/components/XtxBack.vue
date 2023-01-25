<script setup lang="ts">
const { top } = uni.getMenuButtonBoundingClientRect();

// 点击返回按钮
const goBackBtn = () => {
  // 获取页面栈信息，数组形式
  const res = getCurrentPages();
  // 如果当前只有一页，没有其他历史记录(场景：打开别人分享的页面)
  if (res.length === 1) {
    // 直接跳转到首页
    return uni.switchTab({ url: "/pages/index/index" });
  }
  // 后退一页
  uni.navigateBack({});
};
</script>

<template>
  <view
    class="back icon-left"
    :style="{ top: top + 'px' }"
    @tap="goBackBtn"
  ></view>
</template>

<style lang="scss">
.back {
  position: absolute;
  left: 50rpx;
  top: 50rpx;
  z-index: 9;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  font-size: 23px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
