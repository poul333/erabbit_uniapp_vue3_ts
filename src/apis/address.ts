import { http } from "@/utils/http";
import { postMemberAddressData, getMemberAddressItem } from "@/types/address";

/**
 * 新增收货地址
 * @param data 请求参数
 */
export const postMemberAddress = (data: postMemberAddressData) =>
  http({
    method: "POST",
    url: "/member/address",
    data,
  });

/**
 * 获取收货地址列表
 */
export const getMemberAddress = () =>
  http<getMemberAddressItem[]>({
    method: "GET",
    url: "/member/address",
  });

/**
 *  新增收货地址
 * @param id 修改地址的id
 * @param data 请求参数
 */
export const putMemberAddress = (id: string, data: postMemberAddressData) =>
  http({
    method: "PUT",
    url: `/member/address/${id}`,
    data,
  });

/**
 * 查询收货地址详情
 * @param id
 */
export const getMemberAddressById = (id: string) =>
  http<getMemberAddressItem>({
    method: "GET",
    url: `/member/address/${id}`,
  });

/**
 * 删除收货地址
 * @param id
 */
export const deleteMemberAddressById = (id: string) =>
  http({
    method: "DELETE",
    url: `/member/address/${id}`,
  });
