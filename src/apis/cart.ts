import { http } from "@/utils/http";
import { postMemberCartData } from "@/types/cart";

/**
 * 添加购物车
 * @param data 请求参数
 */
export const postMemberCart = (data: postMemberCartData) =>
  http({
    method: "POST",
    url: "/member/cart",
    data,
  });
