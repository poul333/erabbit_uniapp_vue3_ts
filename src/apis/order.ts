import { http } from "@/utils/http";
import {
  GetMemberOrderPreResult,
  PostMemberOrderData,
  PostMemberOrderResult,
} from "@/types/order";

/**
 * 获取预付订单(填写订单)
 */
export const getMemberOrderPre = () =>
  http<GetMemberOrderPreResult>({
    method: "GET",
    url: "/member/order/pre",
  });

/**
 * 提交订单
 * @param data 参数
 */
export const postMemberOrder = (data: PostMemberOrderData) =>
  http<PostMemberOrderResult>({
    method: "POST",
    url: "/member/order",
    data,
  });
