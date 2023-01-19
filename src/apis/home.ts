import { http } from "@/utils/http";
import {
  BannerItem,
  CategoryItem,
  HotMutilItem,
  NewItem,
  PageAndPageSizeType,
  HomeGoodsGuessLikeResult,
} from "@/types/home";

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

/**
 *首页-前台分类
 * @returns
 */
export const getHomeCategoryMutliApi = () =>
  http<CategoryItem[]>({
    method: "GET",
    url: "/home/category/mutli",
  });

/**
 * 首页-热门推荐
 * @returns
 */
export const getHomeHotMutliApi = () =>
  http<HotMutilItem[]>({
    method: "GET",
    url: "/home/hot/mutli",
  });

/**
 * 首页-新鲜好物
 * @param limit 说明：默认值为 4，指定响应数据中商品的数量
 * @returns
 */
export const getHomeNewApi = (limit = 4) =>
  http<NewItem[]>({
    method: "GET",
    url: "/home/new",
    data: {
      limit,
    },
  });

/**
 *  首页-猜你喜欢
 * @param page  示例值：1,说明：页码默认值1
 * @param pageSize  示例值：10,说明：页大小默认是10
 * @returns
 */
export const getHomeGoodsGuessLikeApi = (data: PageAndPageSizeType) =>
  http<HomeGoodsGuessLikeResult>({
    method: "GET",
    url: "/home/goods/guessLike",
    data,
  });
