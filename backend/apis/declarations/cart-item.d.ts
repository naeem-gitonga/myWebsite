import { Product } from './product';

export default interface CartItem extends Product {
  quantity: number;
}
