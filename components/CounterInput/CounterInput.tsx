import { Product } from '@/types/product';
import CartItem from '@/types/cart-item';

type CounterInputProps = {
  item: CartItem;
  addItem: (b: Product) => void;
  removeItem: (b: number) => void;
  style?: string;
};
export default function CounterInput(props: CounterInputProps): JSX.Element {
  const { addItem, removeItem, item, style } = props;
  const { quantity, id } = item;
  const decrement = () => {
    removeItem(id);
  };

  const increment = () => {
    addItem(item);
  };

  return (
    <div className={style}>
      <button onClick={decrement}>-</button>
      <input type="number" value={quantity} disabled />
      <button onClick={increment}>+</button>
    </div>
  );
}
