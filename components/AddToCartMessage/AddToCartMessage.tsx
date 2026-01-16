import Link from 'next/link';
import styles from './AddToCartMessage.module.scss';
import { Product } from '@/types/product';
import SmallItemPreview from '../SmallItemPreview/SmallItemPreview';
import CartItem from '@/types/cart-item';

type AddToCartMessageProps = {
  setModalOpen: () => void;
  lastItemClicked: Product | null;
};
export default function AddToCartMessage(props: AddToCartMessageProps) {
  const { setModalOpen, lastItemClicked } = props;

  if (!lastItemClicked) {
    return null;
  }

  const { title, price, description, imageUrl } = lastItemClicked;
  const { continueCheckLinksWrapper, header, psuedoLink } = styles;
  return (
    <div>
      <h2 className={header}>You&#39;ve added an item to your cart!</h2>
      {lastItemClicked && (
        <SmallItemPreview
          styles={styles}
          item={lastItemClicked as CartItem}
          showCounter={false}
        />
      )}
      <div className={continueCheckLinksWrapper}>
        <Link onClick={setModalOpen} href="/cart">
          Go to cart
        </Link>
        <Link className={psuedoLink} onClick={setModalOpen} href="/shop">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
