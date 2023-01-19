/**
 * 首页-广告区域 返回值类型
 */
export interface BannerItem {
  /**
   * 跳转链接
   */
  hrefUrl: string;
  /**
   * id
   */
  id: string;
  /**
   * banner链接
   */
  imgUrl: string;
  /**
   * 跳转类型1、页面2、H5 3、小程序（小程序使用）
   */
  type: number;
}
