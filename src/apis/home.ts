import { http } from "@/utils/http";
import { BannerItem } from "@/types/home";

/**
 * 首页-广告区域
 * @param distributionSite  说明：广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @returns
 */
export const getHomeBannerApi = (distributionSite = 1) =>
  http<BannerItem[]>({
    method: "GET",
    url: "/home/banner",
    data: { distributionSite },
  });
