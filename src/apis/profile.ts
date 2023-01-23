import { http } from "@/utils/http";
import { MemberProfileResult } from "@/types/profile";

/**
 * 获取个人信息
 * @returns
 */
export const getMemberProfile = () =>
  http<MemberProfileResult>({
    url: "/member/profile",
    method: "GET",
  });
