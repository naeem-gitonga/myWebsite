import Button from '../Button/Button';
import styles from './BookTile.module.scss';
import Link from 'next/link';
import { Book } from '@/types/book';
import { Dispatch, SetStateAction } from 'react';
import sharedStyles from 'components/SharedCss/Images.module.scss';
import AddToCartButton from '../AddToCartButton/AddToCartButton';

type BookTileProps = {
  book: Book;
  addToCart: (arg: Book) => void;
  openModal: () => void;
  setLastItemClicked: Dispatch<SetStateAction<Book | null>>;
};

export default function BookTile(props: BookTileProps): JSX.Element {
  const {
    tileWrapper,
    title,
    titleBox,
    imageContainer,
    infoWrapper,
    price,
    addToCartButton,
  } = styles;

  const {
    book: { title: t, imageUrl, bookUrl, price: p },
  } = props;
  const book = props.book;
  return (
    <Link href={bookUrl} className={tileWrapper}>
      <div className={`${imageContainer} ${sharedStyles[imageUrl]}`} />
      <div className={titleBox}>
        <h2 className={title}>{t}</h2>
        <div className={infoWrapper}>
          <AddToCartButton className={addToCartButton} book={book} />
          <h2 className={price}>${p}</h2>
        </div>
      </div>
    </Link>
  );
}
