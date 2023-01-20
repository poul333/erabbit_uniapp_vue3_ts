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

/**
 * 首页-前台分类 返回值类型
 */
export type CategoryItem = {
  /**
   * 展示图标
   */
  icon: string;
  /**
   * id
   */
  id: string;
  /**
   * 分类名称
   */
  name: string;
};

/**
 * 首页-热门推荐 返回值类型
 */
export interface HotMutilItem {
  /**
   * 说明
   */
  alt: string;
  /**
   * id
   */
  id: string;
  /**
   * 图片集合
   */
  pictures: string[];
  /**
   * 跳转地址
   */
  target: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 推荐类型
   */
  type: string;
}

/**
 * 首页-新鲜好物 返回值类型
 */
export interface NewItem {
  /**
   * 备注
   */
  desc: string;
  /**
   * id
   */
  id: string;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品图片链接
   */
  picture: string;
  /**
   * 价格
   */
  price: number;
}

/**
 * 分页参数
 */
export type PageAndPageSizeType = {
  page?: number;
  pageSize?: number;
};

/**
 * 猜你喜欢 返回值类型
 */
export interface HomeGoodsGuessLikeResult {
  /**
   * 总条数
   */
  counts: number;
  /**
   * 当前页数据
   */
  items: GuessItem[];
  /**
   * 当前页数
   */
  page: number;
  /**
   * 总页数
   */
  pages: number;
  /**
   * 每页条数
   */
  pageSize: number;
}

export interface GuessItem {
  /**
   * 商品描述
   */
  desc: string;
  /**
   * 商品折扣
   */
  discount: number;
  /**
   * id
   */
  id: string;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品已下单数量
   */
  orderNum: number;
  /**
   * 商品图片
   */
  picture: string;
  /**
   * 商品价格
   */
  price: number;
}
