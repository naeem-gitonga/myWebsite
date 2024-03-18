'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ItemView.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import imageStyles from '../SharedCss/Images.module.scss';
import PageHeader from '../PageHeader/PageHeader';
import books from '../../utils/books.json';
import { Suspense } from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import canBeParsedToInt from '@/utils/canBeparsedToInt';
import useBreakpoint from '@/hooks/useBreakpoint';

export default function Item(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {' '}
      <ItemContent />
    </Suspense>
  );
}

function ItemContent(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stringId = searchParams?.get('item_id');
  const deviceSize = useBreakpoint();
  const isDesktop = deviceSize === 'lg';

  let [isNumber, id] = canBeParsedToInt(stringId as unknown as string);
  if (isNumber === false) {
    router.push('/shop');
  }
  const book = books[id - 1];
  const {
    imageContainer,
    itemTitleHeader,
    itemDescription,
    itemWrapper,
    addToCartButton,
    viewWrapperOverride,
    stackedItems,
    price,
    strike
  } = styles;
  const { tenPadding, sectionHeight, viewWrapper } = sharedStyles;
  const { imageUrl, title, promotion, description } = book;
  if (isDesktop) {
    return (
      <div className={`${tenPadding} ${sectionHeight} ${itemWrapper}`}>
        <PageHeader headerName="item" hideLinks={false} />
        <div className={`${viewWrapper} ${viewWrapperOverride}`}>
          <div className={`${imageContainer} ${imageStyles[book.imageUrl]}`} />
          <div className={stackedItems}>
            <h2 className={itemTitleHeader}>{title}</h2>
            <p className={`${price} ${promotion ? strike: ''}`}>${book.price}</p>
            <p className={price}>${promotion}</p>
            <AddToCartButton className={addToCartButton} book={book} />
          </div>
          <div
            className={itemDescription}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${tenPadding} ${sectionHeight} ${itemWrapper}`}>
      <PageHeader headerName="item" hideLinks={false} />
      <div className={viewWrapper}>
        <h2 className={itemTitleHeader}>{title}</h2>
        <div className={`${imageContainer} ${imageStyles[imageUrl]}`} />
        <p className={`${price} ${promotion ? strike: ''}`}>${book.price}</p>
        <p className={price}>${promotion}</p>
        <AddToCartButton className={addToCartButton} book={book} />
        <div
          className={itemDescription}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
