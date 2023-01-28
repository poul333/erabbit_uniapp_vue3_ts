<script setup lang="ts">
import { ref, toRef } from "vue";
import useAppStore from "@/store";
import { onLoad } from "@dcloudio/uni-app";
import { getMemberOrderList } from "@/apis/order";
import { GetMemberOrderListResult } from "@/types/order";

const appStore = useAppStore();
const safeArea = toRef(appStore, "safeArea");

let swiperIndex = $ref<string | number>(0);
let adjustIndex = $ref<string | number>(0);
let cursorLeft = $ref<string>("0%");

const changeTab = (ev: any) => {
  // 获取当前 swiperItem 的索引值值
  let { index } = ev.target.dataset;
  if (ev.detail.currentItemId) index = ev.detail.currentItemId;
  // 切换不同的 swiperItem
  swiperIndex = index;
};

const onFinish = () => {
  // 控制索引值改变的顺序
  adjustIndex = swiperIndex;
};

const onTransition = (ev: WechatMiniprogram.SwiperTransition) => {
  // 获取动画相关参数
  const current = parseInt(ev.target.dataset.current);
  const dx = ev.detail.dx;

  cursorLeft = (current + dx / safeArea.value!.width) * 20 + "%";
};

// ------------------------
const orderTabs = ref([
  {
    orderState: 0,
    title: "全部",
  },
  {
    orderState: 1,
    title: "待付款",
  },
  {
    orderState: 2,
    title: "待发货",
  },
  {
    orderState: 3,
    title: "待收货",
  },
  {
    orderState: 4,
    title: "待评价",
  },
]);
const orders = ref({} as GetMemberOrderListResult);
const orderList = ref<GetMemberOrderListResult[]>([]);
onLoad(async () => {
  // orders.value = await getMemberOrderList({
  //   page: 1,
  //   pageSize: 10,
  //   orderState: 0,
  // });
  loadOrderList();
});

const activeIndex = ref(0);
const loadOrderList = async () => {
  orderList.value[activeIndex.value] = await getMemberOrderList({
    page: 1,
    pageSize: 10,
    orderState: activeIndex.value,
  });
};

// 点击切换
const changeTabs = (index: number) => {
  activeIndex.value = index;
  loadOrderList();
};

// 滑动切换
const swiperChange = (ev: WechatMiniprogram.SwiperChange) => {
  activeIndex.value = ev.detail.current;
  loadOrderList();
};
</script>

<template>
  <view class="viewport">
    <view class="tabs" @tap="changeTab">
      <text
        v-for="(item, index) in orderTabs"
        :key="item.title"
        :data-index="index"
        @tap="changeTabs(index)"
      >
        {{ item.title }}
      </text>
      <!-- 游标 -->
      <view class="cursor" :style="{ left: cursorLeft }"></view>
    </view>
    <swiper
      class="orders"
      :data-current="adjustIndex"
      :duration="200"
      :current="activeIndex"
      @change="swiperChange"
      @animationfinish="onFinish"
      @transition="onTransition"
    >
      <swiper-item v-for="(orders, index) in orderList" :key="index">
        <scroll-view enhanced scroll-y :show-scrollbar="false">
          <view class="card" v-for="item in orders.items" :key="item.id">
            <!-- 订单相关 -->
            <view class="status">
              <text class="date">{{ item.createTime }}</text>
              <!--
                🔔 常量取值
              -->
              <text>{{ item.orderState }}</text>
              <text class="icon-delete"></text>
            </view>
            <!-- 商品信息 -->
            <navigator
              v-for="sku in item.skus"
              :key="sku.id"
              class="goods"
              :url="`/pages/order/detail?id=${item.id}`"
              hover-class="none"
            >
              <view class="cover">
                <image :src="sku.image"></image>
              </view>
              <view class="meta">
                <view class="name ellipsis">{{ sku.name }}</view>
                <view class="type">{{ sku.attrsText }}</view>
              </view>
            </navigator>
            <!-- 支付信息 -->
            <view class="payment">
              <text class="quantity">共{{ item.totalNum }}件商品</text>
              <text>实付</text>
              <text class="amount">
                <text class="symbol">¥</text>{{ item.payMoney }}</text
              >
            </view>
            <!-- 订单操作 -->
            <view class="action">
              <view v-if="item.orderState >= 5" class="button primary">
                再次购买
              </view>
              <navigator
                :url="`/pages/order/detail?id=${item.id}`"
                v-if="item.orderState === 1"
                class="button primary"
              >
                去付款
              </navigator>
              <view v-if="item.orderState === 3" class="button primary">
                确认收货
              </view>
              <view v-if="item.orderState < 3" class="button">取消订单</view>
              <template v-if="item.orderState > 4">
                <view v-if="item.orderState === 5" class="button primary">
                  去评价
                </view>
                <view class="button">删除订单</view>
              </template>
            </view>
          </view>
          <!-- 样式美化 -->
          <view class="blank" v-if="orders.items.length === 0">暂无数据~</view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  margin: 0 10rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 9;
}

.tabs text {
  flex: 1;
  text-align: center;
  padding: 20rpx;
  font-size: 28rpx;
  color: #262626;
}

.tabs .cursor {
  position: absolute;
  left: 0;
  bottom: 20rpx;

  display: block;
  content: "";
  width: 20%;
  height: 4rpx;
  padding: 0 50rpx;
  background-clip: content-box;
  background-color: #27ba9b;
}

.orders {
  background-color: #f7f7f8;
}

.orders .card {
  min-height: 100rpx;
  padding: 20rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;
}

.orders .card:last-child {
  padding-bottom: 40rpx;
}

.orders .status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  color: #999;
  margin-bottom: 15rpx;
}

.orders .status .date {
  color: #666;
  flex: 1;
}

.orders .status .primary {
  color: #ff9240;
}

.orders .status .icon-delete {
  line-height: 1;
  margin-left: 10rpx;
  padding-left: 10rpx;
  border-left: 1rpx solid #e3e3e3;
}

.orders .goods {
  display: flex;
  margin-bottom: 20rpx;
}

.orders .goods .cover {
  width: 170rpx;
  height: 170rpx;
  margin-right: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
  position: relative;
}

.orders .goods .quantity {
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: 1;
  padding: 6rpx 4rpx 6rpx 8rpx;
  font-size: 24rpx;
  color: #fff;
  border-radius: 10rpx 0 0 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.orders .goods .meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.orders .goods .name {
  height: 80rpx;
  font-size: 26rpx;
  color: #444;
}

.orders .goods .type {
  line-height: 1.8;
  padding: 0 15rpx;
  margin-top: 10rpx;
  font-size: 24rpx;
  align-self: flex-start;
  border-radius: 4rpx;
  color: #888;
  background-color: #f7f7f8;
}

.orders .goods .more {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  color: #333;
}

.orders .payment {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 1;
  padding: 20rpx 0;
  text-align: right;
  color: #999;
  font-size: 28rpx;
  border-bottom: 1rpx solid #eee;
}

.orders .payment .quantity {
  font-size: 24rpx;
  margin-right: 16rpx;
}

.orders .payment .amount {
  color: #444;
  margin-left: 6rpx;
}

.orders .payment .symbol {
  font-size: 20rpx;
}

.orders .action {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  padding-top: 20rpx;
}

.orders .action .button {
  width: 200rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  margin-left: 20rpx;
  border-radius: 60rpx;
  border: 1rpx solid #ccc;
  font-size: 26rpx;
  color: #444;
}

.orders .action .primary {
  color: #27ba9b;
  border-color: #27ba9b;
}

.orders .blank {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 30rpx;
  margin-top: -40rpx;
  color: #666;
}
</style>
