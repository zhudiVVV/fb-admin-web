
import productCategory from "@/api/productCategory";
import brand from "@/api/brand";
import product from "@/api/product";
export const apiAllList = Object.assign(productCategory, brand, product)
export default apiAllList
