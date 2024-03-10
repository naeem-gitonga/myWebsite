'use client';
import { useState } from 'react';
import BookTile from '../BookTile/BookTile';
import sharedStyles from 'components/SharedCss/SharedCss.module.scss';
import ReturnArrow from 'components/ReturnArrow/ReturnArrow';
import PageHeader from '../PageHeader/PageHeader';
import { Book } from '@/types/book';
import styles from './ShopView.module.scss';
import useCart from '@/hooks/useCart';
import useModal from '@/hooks/useModal';
import books from '../../utils/books.json';

export default function ShopView(): JSX.Element {
  const [, setLastItemClicked] = useState<Book | null>(null);
  const [, setModalOpen] = useModal();
  const [addToCart] = useCart();
  const { viewWrapper } = sharedStyles;
  const { shopWrapper } = styles;

  return (
    <div id="shop" className={shopWrapper}>
      <PageHeader headerName="shop" hideLinks={false} />
      <div className={viewWrapper}>
        {books.map((a: Book) => {
          return (
            <BookTile
              book={a}
              key={a.id}
              addToCart={addToCart}
              openModal={setModalOpen}
              setLastItemClicked={setLastItemClicked}
            />
          );
        })}
      </div>
      <ReturnArrow />
    </div>
  );
}
