<script setup lang="ts">
import clause from "./components/clause/index.vue";
import helps from "./components/helps/index.vue";
import shipment from "./components/shipment/index.vue";
import sku from "./components/sku/index.vue";
import { toRef, ref, computed } from "vue";
import useAppStore from "@/store";
import { onLoad } from "@dcloudio/uni-app";
import { GoodsRelEvantItem, GoodsResult } from "@/types/goods";
import { getGoodsById, getGoodsRelevant } from "@/apis/goods";
import XtxBack from "@/components/XtxBack.vue";
import skeleton from "@/pages/goods/components/skeleton/index.vue";
import { GoodsSku, SkuEvent } from "@/components/vk-data-goods-sku-popup/types";
import { postMemberCart } from "@/apis/cart";

const appStore = useAppStore();
const safeArea = toRef(appStore, "safeArea");

// 返回上一页
const goBack = () => {
  uni.navigateBack({});
};

// 跳转到购物车页面
const goCart = () => {
  uni.navigateTo({ url: "/pages/cart/default" });
};

// 弹窗
const popup = ref<{
  open(): void;
  close(): void;
}>();

type Layer = "helps" | "sku" | "shipment" | "clause";
const layer = ref<Layer>("helps");

// 显示弹层
const showHalfDialog = (layerName: Layer) => {
  layer.value = layerName;
  popup.value!.open();
};
// 关闭弹层
const hideHalfDialog = () => {
  popup.value!.close();
};

// ------------------------
const goods = ref({} as GoodsResult);
const goodsRelEvants = ref<GoodsRelEvantItem[]>([]);
onLoad(async ({ id }) => {
  if (id) {
    // 获取商品xiangqing
    goods.value = await getGoodsById(id);
    // 获取同类型商品推荐
    goodsRelEvants.value = await getGoodsRelevant({ id, limit: 6 });
    // 🎯🎯🎯 基于后端返回的数据，处理成 SKU 组件所需的数据格式
    goodsSku.value = {
      _id: goods.value.id,
      name: goods.value.name,
      goods_thumb: goods.value.mainPictures[0],
      sku_list: goods.value.skus.map((item) => {
        return {
          _id: item.id,
          goods_id: goods.value.id,
          goods_name: goods.value.name,
          image: goods.value.mainPictures[0],
          price: +item.price * 100, // 注意乘 100
          sku_name_arr: item.specs.map((v) => v.valueName),
          stock: item.inventory,
        };
      }),
      spec_list: goods.value.specs.map((item) => {
        return {
          name: item.name,
          list: item.values.map((v) => ({ name: v.name })),
        };
      }),
    };
  }
});

// 轮播图页面索引
const current = ref(0);
const swiperChange = (ev: WechatMiniprogram.SwiperChange) => {
  current.value = ev.detail.current;
};

//------------- sku
// SKU 组件按钮模式，通过枚举提升代码可读性
const enum SkuMode {
  /**
   * 都显示
   */
  Both = 1,
  /**
   * 只显示购物车
   */
  Cart = 2,
  /**
   * 只显示立即购买
   */
  Buy = 3,
}

const isShowSku = ref(false);
const skuMode = ref(SkuMode.Both);
const goodsSku = ref({} as GoodsSku);

const openSkuPopup = (mode: SkuMode) => {
  // 显示什么按钮
  skuMode.value = mode;
  // 显示弹窗
  isShowSku.value = true;
};

const skuRef = ref();
// 商品规格文本
// const selectArrText = ref("");
const selectArrText = computed(() => skuRef.value?.selectArr.join(" ").trim());
// 关闭sku组件
// const onClose = () => {
//   console.log("关闭组件", skuRef.value.selectArr);
//   // 用于显示商品页选择规格
//   // selectArrText.value = skuRef.value?.selectArr.join(" ");
// };
// 加入购物车
const onAddCart = async (ev: SkuEvent) => {
  await postMemberCart({ skuId: ev._id, count: ev.buy_num });
  uni.showToast({ title: "添加成功" });
  isShowSku.value = false;
  // 用于显示商品页选择规格
  // selectArrText.value = skuRef?.value.selectArr.join(" ");
};
// 立即购买
const onBuyNow = (ev: SkuEvent) => {
  console.log("买", ev);
};
</script>

<template>
  <!-- 返回按钮组件 -->
  <XtxBack></XtxBack>

  <!-- 骨架屏 -->
  <skeleton v-if="!goods.id"></skeleton>

  <template v-else>
    <scroll-view
      scroll-y
      enhanced
      :bounces="false"
      :show-scrollbar="false"
      scroll-with-animation
      class="viewport"
      id="scrollView"
    >
      <!-- 商品信息 -->
      <view class="goods anchor" data-anchor-index="0">
        <view class="preview">
          <swiper @change="swiperChange" circular>
            <swiper-item
              v-for="(item, index) in goods.mainPictures"
              :key="index"
            >
              <image :src="item" />
            </swiper-item>
          </swiper>
          <view class="indicator">
            <text class="current">{{ current + 1 }}</text>
            <text class="split">/</text>
            <text class="total">{{ goods.mainPictures?.length }}</text>
          </view>
        </view>

        <view class="meta">
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
          <view class="brand">
            <image :src="goods.brand?.picture" />
          </view>
          <view class="name ellipsis">
            {{ goods.name }}
          </view>
          <view class="remarks">{{ goods.desc }} </view>
        </view>
        <view class="related">
          <view @tap="openSkuPopup(SkuMode.Both)" class="item arrow">
            <text class="label">选择</text>
            <text class="text ellipsis">{{
              selectArrText || "请选择商品"
            }}</text>
          </view>
          <view @tap="showHalfDialog('sku')" class="item arrow">
            <text class="label">选择</text>
            <text class="text ellipsis">白色 红外体温计 1件</text>
          </view>
          <view @tap="showHalfDialog('shipment')" class="item arrow">
            <text class="label">送至</text>
            <text class="text ellipsis">北京市顺义区京顺路9号黑马程序员</text>
          </view>
          <view @tap="showHalfDialog('clause')" class="item arrow">
            <text class="label">服务</text>
            <text class="text ellipsis">无忧退 快速退款 免费包邮</text>
          </view>
        </view>
      </view>
      <!-- 商品评价 -->
      <view class="comments panel anchor" data-anchor-index="1">
        <view class="title arrow">
          <text>评价</text>
          <navigator url="/pages/comments/index" hover-class="none" class="more"
            >好评度 70%</navigator
          >
        </view>
        <view class="comment">
          <view class="caption">
            <view class="user">
              <image
                class="avatar"
                src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_2.jpg"
              />
              <text>白月初</text>
            </view>
            <view class="rating">
              <view class="rank" style="width: 80%"></view>
            </view>
          </view>
          <view class="content">
            <view class="text"> 质量不错，灵敏度高，结构巧妙，款式也好看 </view>
            <view class="pictures">
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_1.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
            </view>
            <view class="extra">
              <text class="date">购买时间: 2020-11-11</text>
              <text class="type">黑色 公开版 128G</text>
            </view>
          </view>
        </view>
        <view class="comment">
          <view class="caption">
            <view class="user">
              <image
                class="avatar"
                src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
              />
              <text>白月初</text>
            </view>
            <view class="rating">
              <view class="rank" style="width: 60%"></view>
            </view>
          </view>
          <view class="content">
            <view class="text"> 质量不错，灵敏度高，结构巧妙，款式也好看 </view>
            <view class="pictures">
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_1.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_1.jpg"
                />
              </view>
            </view>
            <view class="extra">
              <text class="date">购买时间: 2020-11-11</text>
              <text class="type">黑色 公开版 128G</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 商品详情 -->
      <view class="detail panel anchor" data-anchor-index="2">
        <view class="title">
          <text>详情</text>
        </view>
        <view class="content">
          <view class="properties">
            <view
              class="item"
              v-for="(item, index) in goods.details?.properties"
              :key="item.name"
            >
              <text class="label">{{ item.name }}</text>
              <text class="value">{{ item.value }}</text>
            </view>
          </view>

          <image
            mode="widthFix"
            v-for="(img, index) in goods.details?.pictures"
            :key="index"
            :src="img"
          ></image>
        </view>
      </view>
      <!-- 常见问题 -->
      <view class="help arrow" @tap="showHalfDialog('helps')">
        <text class="icon-help"></text>
        <navigator hover-class="none">常见问题</navigator>
      </view>
      <!-- 推荐 -->
      <view class="recommend panel anchor" data-anchor-index="3">
        <view class="title">
          <text>推荐</text>
        </view>
        <view class="content">
          <navigator
            v-for="item in goodsRelEvants"
            :key="item.id"
            :url="`/pages/goods/index?id=${item.id}`"
            hover-class="none"
          >
            <image class="image" mode="aspectFit" :src="item.picture"></image>
            <view class="name ellipsis">{{ item.name }}</view>
            <view class="price">
              <text class="symbol">¥</text>
              <text class="number">{{ item.price }}</text>
            </view>
          </navigator>
        </view>
      </view>
    </scroll-view>

    <!-- 用户操作 -->
    <view class="toolbar">
      <view class="icons">
        <button class="collect"><text class="icon-heart"></text>收藏</button>
        <button class="contact" open-type="contact">
          <text class="icon-handset"></text>客服
        </button>
        <button class="cart" @tap="goCart">
          <text class="icon-cart"></text>购物车
        </button>
      </view>
      <view class="buttons">
        <view
          @tap="openSkuPopup(SkuMode.Cart)"
          data-button-type="cart"
          class="addcart"
        >
          加入购物车
        </view>
        <view
          @tap="openSkuPopup(SkuMode.Buy)"
          data-button-type="payment"
          class="payment"
        >
          立即购买
        </view>
      </view>
    </view>

    <uni-popup type="bottom" ref="popup" background-color="#fff">
      <view class="popup-root">
        <text @tap="hideHalfDialog" class="close icon-close"></text>
        <sku button-type="" v-if="layer === 'sku'"></sku>
        <shipment v-if="layer === 'shipment'"></shipment>
        <clause v-if="layer === 'clause'"></clause>
        <helps v-if="layer === 'helps'"></helps>
      </view>
    </uni-popup>

    <!-- sku 弹出组件 -->
    <vk-data-goods-sku-popup
      v-model="isShowSku"
      :mode="skuMode"
      :localdata="goodsSku"
      ref="skuRef"
      @add-cart="onAddCart"
      @buy-now="onBuyNow"
    ></vk-data-goods-sku-popup>
  </template>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 自定义导航栏 */
.navbar {
  width: 750rpx;
  background-color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}

.navbar .search {
  height: 40px;
  padding: 1px 110px 0 50px;
}

.navbar .search .input {
  height: 62rpx;
  border-radius: 60rpx;
  font-size: 26rpx;
  color: #8b8b8b;
  background-color: #f3f4f4;
  position: relative;
}

.navbar .search .input::before {
  position: absolute;
  left: 24rpx;
  top: 50%;

  color: #b7b7b7;
  font-size: 28rpx;
  transform: translateY(-50%);
}

.navbar .wrap {
  position: relative;
}

.navbar .back {
  position: absolute;
  left: 10px;
  top: 2px;
  z-index: 9;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  font-size: 23px;
  color: #191919;
  /* color: #fff; */
  /* background-color: rgba(0, 0, 0, 0.4); */
}

.navbar .tabs {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1rpx solid #eaeaea;
}

.navbar .tabs text {
  display: block;
  padding: 10rpx 10rpx 16rpx;
  font-size: 28rpx;
  position: relative;
}

.navbar .tabs .active {
  color: #27ba9b;
  font-weight: 500;
}

.navbar .tabs .active::after {
  content: "";
  position: absolute;
  left: 18rpx;
  right: 20rpx;
  bottom: 14rpx;
  height: 4rpx;
  background-color: #27ba9b;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
}

.panel .title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 90rpx;
  line-height: 1;
  padding: 30rpx 60rpx 30rpx 6rpx;
  position: relative;
}

.panel .title text {
  padding-left: 10rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  border-left: 4rpx solid #27ba9b;
}

.panel .title navigator {
  font-size: 24rpx;
  color: #666;
}

.arrow::after {
  position: absolute;
  top: 50%;
  right: 30rpx;

  content: "\e6c2";
  color: #ccc;
  font-family: "erabbit" !important;
  font-size: 32rpx;
  transform: translateY(-50%);
}

/* 商品信息 */
.goods {
  background-color: #fff;
}

.goods .preview {
  height: 750rpx;
  position: relative;
}

.goods .preview .indicator {
  height: 40rpx;
  padding: 0 24rpx;
  line-height: 40rpx;
  border-radius: 30rpx;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  background-color: rgba(0, 0, 0, 0.3);

  position: absolute;
  bottom: 30rpx;
  right: 30rpx;
}

.goods .indicator .current {
  font-size: 26rpx;
}

.goods .indicator .split {
  font-size: 24rpx;
  margin: 0 1rpx 0 2rpx;
}

.goods .indicator .total {
  font-size: 24rpx;
}

.goods .meta {
  position: relative;
  border-bottom: 1rpx solid #eaeaea;
}

.goods .meta .price {
  height: 130rpx;
  padding: 25rpx 30rpx 0;
  color: #fff;
  font-size: 34rpx;
  box-sizing: border-box;
  background-color: #35c8a9;
}

.goods .meta .number {
  font-size: 56rpx;
}

.goods .meta .brand {
  width: 160rpx;
  height: 80rpx;
  overflow: hidden;

  position: absolute;
  top: 26rpx;
  right: 30rpx;
}

.goods .meta .name {
  max-height: 88rpx;
  line-height: 1.4;
  margin: 20rpx;
  font-size: 32rpx;
  color: #333;
}

.goods .meta .remarks {
  line-height: 1;
  padding: 0 20rpx 30rpx;
  font-size: 24rpx;
  color: #cf4444;
}

.goods .related {
  padding-left: 20rpx;
}

.goods .related .item {
  height: 90rpx;
  padding-right: 60rpx;
  border-bottom: 1rpx solid #eaeaea;
  font-size: 26rpx;
  color: #333;
  position: relative;
  display: flex;
  align-items: center;
}

.goods .related .item:last-child {
  border-bottom: 0 none;
}

.goods .related .label {
  width: 60rpx;
  color: #898b94;
  margin: 0 16rpx 0 10rpx;
}

.goods .related .text {
  flex: 1;
  -webkit-line-clamp: 1;
}

/* 商品评论 */
.comments {
  padding-left: 20rpx;
}

.comments .comment {
  padding: 24rpx 40rpx 24rpx 10rpx;
  border-top: 1rpx solid #eaeaea;
}

.comments .caption {
  height: 60rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments .user {
  font-size: 26rpx;
  color: #333;
  display: flex;
  align-items: center;
}

.comments .caption .avatar {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
  border-radius: 50%;
}

.comments .rating {
  width: 144rpx;
  height: 24rpx;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/rating_off.png);
  background-size: contain;
}

.comments .rating .rank {
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/rating_on.png);
  background-size: 144rpx 24rpx;
}

.comments .content .text {
  line-height: 1.4;
  margin-top: 24rpx;
  font-size: 24rpx;
  color: #333;
}

.comments .pictures {
  display: flex;
  flex-wrap: wrap;
  margin: 20rpx 0 0 1rpx;
}

.comments .picture {
  width: 150rpx;
  height: 150rpx;
  margin-right: 27rpx;
}

.comments .picture:last-child {
  margin-right: 0;
}

.comments .content .extra {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 1rpx 0 0;
  font-size: 22rpx;
  color: #666;
}

/* 类似商品 */
.similar {
  margin-top: 20rpx;
}

.similar .bar {
  display: flex;
  align-items: center;
  height: 90rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
}

.similar .bar text {
  flex: 1;
  text-align: center;
  position: relative;
}

.similar .bar .active::after {
  content: "";
  display: block;
  width: 60rpx;
  height: 4rpx;
  background-color: #27ba9b;
  transform: translateX(-50%);
  position: absolute;
  left: 50%;
  bottom: -5rpx;
}

.similar .content {
  padding-top: 20rpx;
  background-color: #f4f4f4;
  white-space: nowrap;
}

.similar .content navigator {
  display: inline-block;
  width: 200rpx;
  height: 270rpx;
  padding: 15rpx 15rpx 0;
  margin-right: 15rpx;
  background-color: #fff;
  border-radius: 6rpx;
}

.similar .content navigator:first-child {
  margin-left: 15rpx;
}

.similar .content image {
  height: 172rpx;
}

.similar .content .name {
  max-height: 64rpx;
  line-height: 1.2;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333;
  -webkit-line-clamp: 1;
}

.similar .content .price {
  font-size: 18rpx;
  color: #cf4444;
}

.similar .content .number {
  font-size: 24rpx;
  margin-left: 2rpx;
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
}

.detail .content {
  margin-left: -20rpx;
}

.detail .properties {
  padding: 0 20rpx;
  margin-bottom: 30rpx;
}

.detail .properties .item {
  display: flex;
  line-height: 2;
  padding: 10rpx;
  font-size: 26rpx;
  color: #333;
  border-bottom: 1rpx dashed #ccc;
}

.detail .properties .label {
  width: 200rpx;
}

.detail .properties .value {
  flex: 1;
}

/* 常见问题 */
.help {
  display: flex;
  align-items: center;
  padding: 20rpx 0 20rpx 20rpx;
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
  position: relative;
}

.help .icon-help {
  font-size: 34rpx;
  margin-right: 6rpx;
  color: #ffa868;
}

/* 商品推荐 */
.recommend {
  padding-left: 20rpx;
}

.recommend .content {
  padding: 0 20rpx 20rpx;
  margin-left: -20rpx;
  background-color: #f4f4f4;
  overflow: hidden;
}

.recommend .content navigator {
  width: 345rpx;
  padding: 24rpx 20rpx 20rpx;
  margin: 20rpx 20rpx 0 0;
  border-radius: 10rpx;
  background-color: #fff;
  float: left;
}

.recommend navigator:nth-child(even) {
  margin-right: 0;
}

.recommend .content .image {
  height: 260rpx;
}

.recommend .content .name {
  height: 80rpx;
  margin: 10rpx 0;
  font-size: 26rpx;
  color: #262626;
}

.recommend .content .price {
  line-height: 1;
  font-size: 20rpx;
  color: #cf4444;
}

.recommend .content .number {
  font-size: 26rpx;
  margin-left: 2rpx;
}

/* 底部工具栏 */
.toolbar {
  height: 120rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar .buttons {
  display: flex;
}

.toolbar .buttons > view {
  width: 220rpx;
  text-align: center;
  line-height: 72rpx;
  font-size: 26rpx;
  color: #fff;
  border-radius: 72rpx;
}

.toolbar .buttons .addcart {
  background-color: #ffa868;
}

.toolbar .buttons .payment {
  background-color: #27ba9b;
  margin-left: 20rpx;
}

.toolbar .icons {
  padding-right: 10rpx;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
}

.toolbar .icons button {
  text-align: center;
  line-height: 1.4;
  padding: 0;
  border-radius: 0;
  font-size: 20rpx;
  color: #333;
  background-color: #fff;
}

.toolbar .icons text {
  display: block;
  font-size: 34rpx;
}
</style>
