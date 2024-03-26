'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ItemView.module.scss';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import imageStyles from '../SharedCss/Images.module.scss';
import PageHeader from '../PageHeader/PageHeader';
import products from '../../utils/products.json';
import { Suspense } from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import canBeParsedToInt from '@/utils/canBeparsedToInt';
import useBreakpoint from '@/hooks/useBreakpoint';
import Price from '../Price/Price';
import { Product } from '@/types/product';
import useCart from '@/hooks/useCart';

export default function Item(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {' '}
      <ItemContent />
    </Suspense>
  );
}

function ItemContent(): JSX.Element {
  const [addToCart] = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const stringId = searchParams?.get('item_id');
  const deviceSize = useBreakpoint();
  const isDesktop = deviceSize === 'lg';

  let [isNumber, id] = canBeParsedToInt(stringId as unknown as string);
  if (isNumber === false) {
    router.push('/shop');
  }

  const product = products.find((p) => p.id === id) as unknown as Product;
  const {
    imageContainer,
    itemTitleHeader,
    itemDescription,
    itemWrapper,
    addToCartButton,
    viewWrapperOverride,
    stackedItems,
    price,
    pIsbn,
    strike,
  } = styles;
  const { tenPadding, sectionHeight, viewWrapper } = sharedStyles;
  const { imageUrl, title, promotion, description, isbn, publishedOn } = product;
  if (isDesktop) {
    return (
      <div className={`${tenPadding} ${sectionHeight} ${itemWrapper}`}>
        <PageHeader headerName="item" hideLinks={false} />
        <div className={`${viewWrapper} ${viewWrapperOverride}`}>
          <div
            className={`${imageContainer} ${imageStyles[product.imageUrl]}`}
          />
          <div className={stackedItems}>
            <h2 className={itemTitleHeader}>{title}</h2>
            <Price
              price={product.price}
              priceStyle={price}
              strike={strike}
              promotion={promotion}
            />
            <AddToCartButton
              className={addToCartButton}
              product={product}
              addToCart={addToCart}
            />
          </div>
          <div className={itemDescription}>
            <p className={pIsbn}><strong>ISBN:</strong> {isbn}</p>
            <p><strong>Published Date:</strong> {publishedOn}</p>
            <div
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
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
        <Price
          price={product.price}
          priceStyle={price}
          strike={strike}
          promotion={promotion}
        />
        <AddToCartButton
          className={addToCartButton}
          product={product}
          addToCart={addToCart}
        />
        <div className={itemDescription}>
          <p className={pIsbn}><strong>ISBN:</strong> {isbn}</p>
          <p><strong>Published Date:</strong> {publishedOn}</p>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
}
