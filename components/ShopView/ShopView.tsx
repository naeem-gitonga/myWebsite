'use client';
import { useState } from 'react';
import ItemTile from '../ItemTile/ItemTile';
import sharedStyles from 'components/SharedCss/SharedCss.module.scss';
import ReturnArrow from 'components/ReturnArrow/ReturnArrow';
import PageHeader from '../PageHeader/PageHeader';
import { Product } from '@/types/product';
import styles from './ShopView.module.scss';
import useCart from '@/hooks/useCart';
import useModal from '@/hooks/useModal';
import { products } from '../../utils/products';

export default function ShopView(): JSX.Element {
  const [, setLastItemClicked] = useState<Product | null>(null);
  const [, setModalOpen] = useModal();
  const [addToCart] = useCart();
  const { viewWrapper } = sharedStyles;
  const { shopWrapper } = styles;

  return (
    <div id="shop" className={shopWrapper}>
      <PageHeader headerName="shop" hideLinks={false} />
      <div className={viewWrapper}>
        {products.map((product: Product) => {
          if (product.show == 'false') {
            return null;
          }
          return (
            <ItemTile
              product={product}
              key={product.id}
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
