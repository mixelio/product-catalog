import {Product} from "../types/Product";
import {Phone} from "../types/Phone";
import {Tablet} from "../types/Tablet";
import {Accessory} from "../types/Accessory";

export const getSomeProduct = (
  product: Product,
  productsOnlyType: Phone[] | Tablet[] | Accessory[],
) => {
  return productsOnlyType.filter(item => item.category === productsOnlyType[0].category).find(item => product.itemId === item.id) ?? null;
 }