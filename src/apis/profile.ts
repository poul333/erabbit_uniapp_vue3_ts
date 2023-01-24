import { http } from "@/utils/http";
import { GetMemberProfileResult, PutMemberProfileData } from "@/types/profile";

/**
 * 获取个人信息
 * @returns
 */
export const getMemberProfile = () =>
  http<GetMemberProfileResult>({
    url: "/member/profile",
    method: "GET",
  });

/**
 * 个人信息-修改
 * @returns
 */
export const putMemberProfile = (data: PutMemberProfileData) =>
  http<GetMemberProfileResult>({
    url: "/member/profile",
    method: "PUT",
    data,
  });
