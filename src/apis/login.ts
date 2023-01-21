import { http } from "@/utils/http";
import { LoginWxMinResult } from "@/types/login";

/**
 *  小程序登录
 * @param data
 * @returns
 */
export const postLoginWxMinApi = (data: any) =>
  http<LoginWxMinResult>({
    method: "POST",
    url: "/login/wxMin",
    data,
  });

/**
 * 小程序登录_内测版
 * @param phoneNumber
 * @returns
 */
export const postLoginWxMinSimpleApi = (phoneNumber: string) =>
  http<LoginWxMinResult>({
    method: "POST",
    url: "/login/wxMin/simple",
    data: {
      phoneNumber,
    },
  });
