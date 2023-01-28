import { http } from "@/utils/http";

/**
 * 模拟支付-更新订单支付状态
 * @param orderId 订单id
 */
export const getPayMock = (orderId: string) =>
  http({
    method: "GET",
    url: "/pay/mock",
    data: { orderId },
  });
