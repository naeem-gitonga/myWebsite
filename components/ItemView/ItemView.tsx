'use client';
import { useSearchParams, useRouter } from 'next/navigation';

import PageHeader from '../PageHeader/PageHeader';
import { Suspense } from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import canBeParsedToInt from '@/utils/canBeparsedToInt';
import useBreakpoint from '@/hooks/useBreakpoint';
import { Product } from '@/types/product';
import useCart from '@/hooks/useCart';
import Image from 'next/image';

import styles from './ItemView.module.scss';
import { products } from '../../utils/products';
import sharedStyles from '../SharedCss/SharedCss.module.scss';
import Price from '../Price/Price';
import { imageLoader } from '@/utils/imageLoader';

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
    triangle,
    triangleText,
    triangleTextWrapper,
    center,
  } = styles;
  const { tenPadding, sectionHeight, viewWrapper } = sharedStyles;
  const {
    imageUrl,
    imageUrlItemView,
    title,
    promotion,
    description: dsc,
    isbn,
    publishedOn,
    previewLink,
  } = product;

  const image = (
    <div className={imageContainer}>
      <Image
        src={imageUrlItemView}
        alt={imageUrl}
        loader={imageLoader}
        style={{ objectFit: 'contain', maxWidth: '400px' }}
        fill
      />
      {previewLink !== '' && (
        <div className={triangle}>
          {/** For external pointing links it is better to use an a tag */}
          <a href={previewLink}>
            <div className={triangleTextWrapper}>
              <p className={triangleText}>Download</p>
              <p className={`${triangleText} ${center}`}>Sample</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );

  const description = (
    <div className={itemDescription}>
      {isbn && (
        <p className={pIsbn}>
          <strong>ISBN:</strong> {isbn}
        </p>
      )}
      {publishedOn && (
        <p>
          <strong>Published Date:</strong> {publishedOn}
        </p>
      )}
      <div dangerouslySetInnerHTML={{ __html: dsc }} />
    </div>
  );

  if (isDesktop) {
    return (
      <div className={`${tenPadding} ${sectionHeight} ${itemWrapper}`}>
        <PageHeader headerName="item" hideLinks={false} />
        <div className={`${viewWrapper} ${viewWrapperOverride}`}>
          {image}
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
          {description}
        </div>
      </div>
    );
  }

  return (
    <div className={`${tenPadding} ${sectionHeight} ${itemWrapper}`}>
      <PageHeader headerName="item" hideLinks={false} />
      <div className={viewWrapper}>
        <h2 className={itemTitleHeader}>{title}</h2>
        {image}
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
        {description}
      </div>
    </div>
  );
}
