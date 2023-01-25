import { http } from "@/utils/http";
import {
  GoodsResult,
  GoodsRelevantData,
  GoodsRelEvantItem,
} from "@/types/goods";

/**
 * 商品详情
 * @param id
 */
export const getGoodsById = (id: string) =>
  http<GoodsResult>({
    method: "GET",
    url: "/goods",
    data: { id },
  });

/**
 * 同类推荐(也支持猜你喜欢)
 * @param data  请求参数
 */
export const getGoodsRelevant = (data: GoodsRelevantData) =>
  http<GoodsRelEvantItem[]>({
    method: "GET",
    url: "/goods/relevant",
    data,
  });
