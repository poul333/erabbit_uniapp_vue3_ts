/**
 * 添加购物车 请求参数
 */
export interface postMemberCartData {
  /**
   * 数量
   */
  count: number;
  /**
   * SKUID
   */
  skuId: string;
}
