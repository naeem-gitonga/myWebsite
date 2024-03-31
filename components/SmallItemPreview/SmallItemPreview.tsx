import sharedStyles from 'components/SharedCss/Images.module.scss';
import CounterInput from '../CounterInput/CounterInput';
import CartItem from '@/types/cart-item';
import { Product } from '@/types/product';

type SmallItemPreviewProps = {
  styles: {
    readonly [key: string]: string;
  };
  item: CartItem;
  addItem?: (b: Product) => void;
  removeItem?: (b: number) => void;
  showCounter: boolean;
};

export default function SmallItemPreview(
  props: SmallItemPreviewProps
): JSX.Element {
  const { styles, item, addItem, removeItem, showCounter } = props;
  const {
    imageContainer,
    itemDescription,
    smallItemPreviewWrapper,
    imageWrapper,
    quantity,
  } = styles;
  const { title, price, imageUrl, promotion } = item;
  return (
    <div className={smallItemPreviewWrapper}>
      <div className={imageWrapper}>
        <div className={`${imageContainer} ${sharedStyles[imageUrl]}`} />
      </div>
      <div className={itemDescription}>
        <p>{title}</p>
        <p>${promotion ? promotion : price}</p>
        {showCounter && (
          <CounterInput
            style={quantity}
            item={item}
            addItem={addItem as (b: Product) => void}
            removeItem={removeItem as (b: number) => void}
          />
        )}
      </div>
    </div>
  );
}
