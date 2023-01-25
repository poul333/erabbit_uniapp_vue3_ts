/**
 * 商品信息
 */
export interface GoodsResult {
  /**
   * 品牌信息
   */
  brand: Brand;
  /**
   * 所属分类，多级以数组形式体现，如[一级分类，二级分类，三级分类]
   */
  categories: Category[];
  /**
   * 收藏数量
   */
  collectCount: number;
  /**
   * 评价数量
   */
  commentCount: number;
  /**
   * 备注
   */
  desc: string;
  /**
   * 商品详情
   */
  details: Details;
  /**
   * 折扣
   */
  discount: number;
  evaluationInfo: null;
  /**
   * 24小时热销
   */
  hotByDay: HotByDay[];
  /**
   * id
   */
  id: string;
  /**
   * 库存
   */
  inventory: number;
  isCollect: null;
  /**
   * 是否为预售商品
   */
  isPreSale: boolean;
  /**
   * 主图图片集合
   */
  mainPictures: string[];
  /**
   * 主图视频集合
   */
  mainVideos: string[];
  /**
   * 商品名称
   */
  name: string;
  /**
   * 原价
   */
  oldPrice: string;
  /**
   * 当前价格
   */
  price: string;
  recommends: null;
  /**
   * 销量
   */
  salesCount: number;
  /**
   * 同类商品
   */
  similarProducts: SimilarProduct[];
  /**
   * sku集合
   */
  skus: Skus[];
  /**
   * 可选规格集合备注：规格集合一定要和skus集合下的specs 顺序保持一致
   */
  specs: ResultSpec[];
  /**
   * spu编码
   */
  spuCode: string;
  /**
   * 用户收货地址列表
   */
  userAddresses: null;
  /**
   * 主图视频比例,1为1:1/16:9，2为3:4
   */
  videoScale: number;
}

/**
 * 品牌信息
 */
export interface Brand {
  desc: null;
  /**
   * 品牌id
   */
  id: string;
  /**
   * logo
   */
  logo: string;
  /**
   * 品牌名称
   */
  name: string;
  /**
   * 品牌英文名称
   */
  nameEn: string;
  /**
   * 图片
   */
  picture: string;
  place: null;
  type: null;
}

/**
 * 分类信息
 */
export interface Category {
  /**
   * 分类id
   */
  id: string;
  layer: number;
  /**
   * 分类名称
   */
  name: string;
  parent: null | Parent;
}

export interface Parent {
  id: string;
  layer: number;
  name: string;
  parent: null;
}

/**
 * 商品详情
 */
export interface Details {
  /**
   * 商品详情图片集合
   */
  pictures: string[];
  /**
   * 商品属性集合
   */
  properties: Property[];
}

/**
 * 属性信息
 */
export interface Property {
  /**
   * 属性名称
   */
  name: string;
  /**
   * 属性值
   */
  value: string;
}

/**
 * 商品信息
 */
export interface HotByDay {
  /**
   * 备注
   */
  desc: string;
  /**
   * 折扣
   */
  discount: null;
  /**
   * id
   */
  id: string;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 销量
   */
  orderNum: number;
  /**
   * 商品图片链接
   */
  picture: string;
  /**
   * 价格
   */
  price: string;
}

/**
 * 商品信息
 */
export interface SimilarProduct {
  /**
   * 备注
   */
  desc: string;
  /**
   * 折扣
   */
  discount: null;
  /**
   * id
   */
  id: string;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 销量
   */
  orderNum: number;
  /**
   * 商品图片链接
   */
  picture: string;
  /**
   * 价格
   */
  price: string;
}

/**
 * sku信息
 */
export interface Skus {
  /**
   * sku_id
   */
  id: string;
  /**
   * 库存
   */
  inventory: number;
  /**
   * 旧价格
   */
  oldPrice: string;
  /**
   * sku图片
   */
  picture?: string;
  /**
   * 价格
   */
  price: string;
  /**
   * sku编码
   */
  skuCode: string;
  /**
   * 规格集合(和详情中specs的顺序一定要保持一致)
   */
  specs: SkusSpec[];
}

/**
 * 规格信息
 */
export interface SkusSpec {
  /**
   * 规格名称
   */
  name: string;
  /**
   * 可选值名称
   */
  valueName: string;
}

/**
 * 可选规格信息
 */
export interface ResultSpec {
  id: string;
  /**
   * 规格名称
   */
  name: string;
  /**
   * 可选值集合
   */
  values: Value[];
}

/**
 * 可选值信息
 */
export interface Value {
  /**
   * 是否可售
   */
  available?: boolean;
  /**
   * 可选值备注
   */
  desc: string;
  /**
   * 可选值名称
   */
  name: string;
  /**
   * 可选值图片链接
   */
  picture: null | string;
}

/**
 * 同类推荐 请求参数
 */
export type GoodsRelevantData = {
  /**
   * 	说明：商品ID（传入代表查询相关商品，不传代表查询猜你喜欢）
   */
  id?: string;
  /**
   * 说明：数量限制
   */
  limit?: number;
};

/**
 * 同类推荐 返回数据信息
 */
export interface GoodsRelEvantItem {
  /**
   * 备注
   */
  desc: string;
  /**
   * 折扣信息
   */
  discount: number | null;
  /**
   * id
   */
  id: string;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品图片
   */
  picture: string;
  /**
   * 商品价格
   */
  price: string;
}
