import styles from './ItemTile.module.scss';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Dispatch, SetStateAction } from 'react';
import sharedStyles from 'components/SharedCss/Images.module.scss';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import Price from '../Price/Price';

type itemTileProps = {
  product: Product;
  addToCart: (arg: Product) => void;
  openModal: () => void;
  setLastItemClicked: Dispatch<SetStateAction<Product | null>>;
};

export default function ItemTile(props: itemTileProps): JSX.Element {
  const {
    tileWrapper,
    title,
    titleBox,
    imageContainer,
    infoWrapper,
    price,
    addToCartButton,
    strike,
  } = styles;

  const {
    addToCart,
    product: { title: t, imageUrl, productUrl, price: p, promotion },
  } = props;
  const product = props.product;

  return (
    <div className={tileWrapper}>
      <Link href={productUrl}>
        <div className={`${imageContainer} ${sharedStyles[imageUrl]}`} />
      </Link>
      <div className={titleBox}>
        <h2 className={title}>{t}</h2>
        <div className={infoWrapper}>
          <AddToCartButton
            className={addToCartButton}
            product={product}
            addToCart={addToCart}
          />
          <Price
            priceStyle={price}
            price={p}
            promotion={promotion}
            strike={strike}
          />
        </div>
      </div>
    </div>
  );
}
