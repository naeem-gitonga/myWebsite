import styles from './ItemTile.module.scss';
import Link from 'next/link';
import { Book } from '@/types/book';
import { Dispatch, SetStateAction } from 'react';
import sharedStyles from 'components/SharedCss/Images.module.scss';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import Price from '../Price/Price';

type itemTileProps = {
  book: Book;
  addToCart: (arg: Book) => void;
  openModal: () => void;
  setLastItemClicked: Dispatch<SetStateAction<Book | null>>;
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
    book: { title: t, imageUrl, bookUrl, price: p, promotion },
  } = props;
  const book = props.book;
  return (
    <Link href={bookUrl} className={tileWrapper}>
      <div className={`${imageContainer} ${sharedStyles[imageUrl]}`} />
      <div className={titleBox}>
        <h2 className={title}>{t}</h2>
        <div className={infoWrapper}>
          <AddToCartButton className={addToCartButton} book={book} />
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
