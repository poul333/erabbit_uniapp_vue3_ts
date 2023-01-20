<script setup lang="ts">
import { reactive, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";
import { getHomePreferenceMutliApi, getHomeRecommendApi } from "@/apis/home";
import { SubType } from "@/types/home";

interface metaType {
  title: string;
  coverPath: string;
  tabs: string[];
}

const metaMap = reactive<{ [key: string]: metaType }>({
  1: {
    title: "特惠推荐",
    coverPath:
      "https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_1.jpg",
    tabs: ["价格", "折扣", "筛选"],
  },
  2: {
    title: "爆款推荐",
    coverPath:
      "https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_2.jpg",
    tabs: ["24小时热搜", "热销总榜", "人气周榜"],
  },
  3: {
    title: "一站买全",
    coverPath:
      "https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_3.jpg",
    tabs: ["搞定熊孩子", "家里不凌乱", "让音质更出众"],
  },
  5: {
    title: "新鲜好物",
    coverPath:
      "https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_4.jpg",
    tabs: ["抢先尝新", "新品预告"],
  },
});

let type = $ref("1");
let meta = $ref(metaMap[type]);

onLoad(({ type }) => {
  if (type) meta = metaMap[type];
});

// 动态更新导航栏标题
uni.setNavigationBarTitle({
  title: meta.title,
});

// ----------------------------------------------

// 统一管理推荐请求
const urlMap = [
  { type: "1", title: "特惠推荐", url: "/home/preference/mutli" },
  { type: "2", title: "爆款推荐", url: "/home/inVogue/mutli" },
  { type: "3", title: "一站买全", url: "/home/oneStop/mutli" },
  { type: "4", title: "新鲜好物", url: "/home/new/mutli" }, // 后端未提供，暂用新鲜好物url
  { type: "5", title: "新鲜好物", url: "/home/new/mutli" },
];

// 保存封面图
const bannerPicture = ref("");
// 保存tabs
const subTypes = ref<SubType[]>([]);
onLoad(async ({ type }) => {
  // 通过 type 查找对应映射的 url
  const currUrlMap = urlMap.find((v) => v.type === type)?.url;
  // 调用通用的推荐接口
  const res = await getHomeRecommendApi(currUrlMap as string, {});
  // 动态更新导航栏标题
  uni.setNavigationBarTitle({
    title: res.title,
  });
  bannerPicture.value = res.bannerPicture;
  subTypes.value = res.subTypes;

  // // '1' 表示特惠推荐
  // if (type === "1") {
  //   const res = await getHomePreferenceMutliApi({});
  //   // 动态设置页面标题
  //   uni.setNavigationBarTitle({
  //     title: res.title,
  //   });
  //   bannerPicture.value = res.bannerPicture;
  //   subTypes.value = res.subTypes;
  // } else if (type === "2") {
  //   // '2' => 爆款推荐
  //   const res = await getHomeRecommendApi("", {});
  //   uni.setNavigationBarTitle({
  //     title: res.title,
  //   });
  //   bannerPicture.value = res.bannerPicture;
  //   subTypes.value = res.subTypes;
  // }
});
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <view class="tabs">
      <text
        class="text"
        v-for="(item, index) in subTypes"
        :key="item.id"
        :class="{ active: index === 0 }"
        >{{ item.title }}</text
      >
    </view>
    <scroll-view scroll-y enhanced :show-scrollbar="false" class="scroll-view">
      <view class="goods">
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_2.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_4.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_5.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_2.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_7.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
        <navigator
          hover-class="none"
          url="/pages/goods/index"
          class="navigator"
        >
          <image
            class="thumb"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
          ></image>
          <view class="name ellipsis">肖勒超薄防水手表精钢材质 放水水功能</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">199</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
      </view>
      <view class="loading">正在加载...</view>
    </scroll-view>
  </view>
</template>

<style>
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;

  position: absolute;
  left: 0;
  top: 0;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
}

.tabs .text {
  margin: 0 20rpx;
  position: relative;
}

.tabs .active::after {
  content: "";
  width: 40rpx;
  height: 4rpx;
  transform: translate(-50%);
  background-color: #27ba9b;
  position: absolute;
  left: 50%;
  bottom: 24rpx;
}

.scroll-view {
  flex: 1;
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
}

.goods .navigator {
  width: 345rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
}

.goods .thumb {
  width: 305rpx;
  height: 305rpx;
}

.goods .name {
  height: 88rpx;
  font-size: 26rpx;
}

.goods .price {
  line-height: 1;
  color: #cf4444;
  font-size: 30rpx;
}

.goods .symbol,
.goods .decimal {
  font-size: 70%;
}
</style>
