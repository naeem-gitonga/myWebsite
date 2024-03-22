import AddToCartMessage from '../AddToCartMessage/AddToCartMessage';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import useModal from '@/hooks/useModal';
import { Product } from '@/types/product';

type AddToCartButtonProps = {
  className: string;
  product: Product;
  addToCart: (arg: Product) => void;
};
export default function AddToCartButton(
  props: AddToCartButtonProps
): JSX.Element {
  const { className, product, addToCart } = props;

  const [lastItemClicked, setLastItemClicked] = useState<Product | null>(null);
  const [isOpen, setModalOpen] = useModal();
  return (
    <>
      <Button
        cb={() => {
          addToCart(product);
          setLastItemClicked(product);
          setModalOpen();
          window.dataLayer.push({
            event: 'product-added-to-cart',
            item: product.title,
            env: process.env.NEXT_PUBLIC_STAGE,
          });
        }}
        className={className}
      >
        Add to Cart
      </Button>
      <Modal isOpen={isOpen} setModalOpen={setModalOpen} hideClose={false}>
        <AddToCartMessage
          setModalOpen={setModalOpen}
          lastItemClicked={lastItemClicked}
        />
      </Modal>
    </>
  );
}
