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
    product: { title: t, imageUrl, productUrl, price: p, promotion },
  } = props;
  const product = props.product;
  
  return (
    <Link href={productUrl} className={tileWrapper}>
      <div className={`${imageContainer} ${sharedStyles[imageUrl]}`} />
      <div className={titleBox}>
        <h2 className={title}>{t}</h2>
        <div className={infoWrapper}>
          <AddToCartButton className={addToCartButton} product={product} />
          <Price
            priceStyle={price}
            price={p}
            promotion={promotion}
            strike={strike}
          />
        </div>
      </div>
    </Link>
  );
}
