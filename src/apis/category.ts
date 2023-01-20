import { CategoryTopItem } from "@/types/category";
import { http } from "@/utils/http";

/**
 *  一级分类列表
 * @returns
 */
export const getCategoryTopApi = () =>
  http<CategoryTopItem[]>({
    method: "GET",
    url: "/category/top",
  });
