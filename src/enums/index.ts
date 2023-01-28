/**
 * 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
 */
export enum OrderState {
  DaiFuKuan = 1,
  DaiFaHuo = 2,
  DaiShouHuo = 3,
  DaiPingJia = 4,
  YiWanCheng = 5,
  YiQuXiao = 6,
  QuanBu = 0,
}

/**
 * 配送时间类型，1为不限，2为工作日，3为双休或假日
 */
export enum DeliveryTimeType {
  Everyday = 1,
  Workday = 2,
  Holiday = 3,
}

/**
 * 支付方式，1为在线支付，2为货到付款
 */
export enum PayType {
  Online = 1,
  Delivery = 2,
}

/**
 * 支付渠道，1支付宝、2微信
 */
export enum PayChannel {
  AliPay = 1,
  WxPay = 2,
}
