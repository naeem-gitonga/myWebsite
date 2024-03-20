import useCart from '@/hooks/useCart';
import AddToCartMessage from '../AddToCartMessage/AddToCartMessage';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import useModal from '@/hooks/useModal';
import { Book } from '@/types/book';

type AddToCartButtonProps = {
  className: string;
  book: Book;
};
export default function AddToCartButton(
  props: AddToCartButtonProps
): JSX.Element {
  const { className, book } = props;
  const [addToCart] = useCart();
  const [lastItemClicked, setLastItemClicked] = useState<Book | null>(null);
  const [isOpen, setModalOpen] = useModal();
  return (
    <>
      <Button
        cb={() => {
          addToCart(book);
          setLastItemClicked(book);
          setModalOpen();
          window.dataLayer.push({
            event: 'product-added-to-cart',
            item: book.title,
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
