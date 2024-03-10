'use client';
import { useEffect, useState, useCallback } from 'react';
import PageHeader from 'components/PageHeader/PageHeader';
import sharedStyles from 'components/SharedCss/SharedCss.module.scss';
import SmallItemPreview from 'components/SmallItemPreview/SmallItemPreview';
import CartItem from '@/types/cartItem';
import PaypalCartItem from '@/types/paypalCartItem';
import LoadingDots from '../LoadingDots/LoadingDots';
import Modal from '../Modal/Modal';
import PaymentResponseMessage from '../PaymentResponseMessage/PaymentResponseMessage';

import useCart from 'hooks/useCart';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import { OrderResponseBody } from '@paypal/paypal-js';
import loadPaypal, {
  callInternalFulfillmentApi,
  createCartForPaypal,
} from '@/utils/paypal';

import styles from './CartView.module.scss';
import Link from 'next/link';

export default function CartVeiw(): JSX.Element {
  const {
    buttonsWrapper,
    cartWrapper,
    cartHeight,
    objectEnterActive,
    objectEnter,
    cartItem,
    width300Center,
    raiseBtns,
    undoLinkStyle,
  } = styles;
  const { alwaysCentered } = sharedStyles;
  const [addItem, cart, removeItem, clearCart] = useCart();
  const [isOpen, setModalOpen] = useModal();
  const router = useRouter();

  const [showLoadingDots, setShowLoadingDots] = useState(true);
  const [whichHeight, setWhichHeight] = useState<string>(cartHeight);

  const onSuccess = useCallback(
    (orderData: OrderResponseBody): void => {
      callInternalFulfillmentApi({
        orderData,
        cartHeight,
        setWhichHeight,
        router,
        clearCart,
      });
    },
    [cartHeight, router, clearCart, setModalOpen]
  );

  const onError = useCallback(
    (error: Record<string, unknown>) => {
      setModalOpen();
      setWhichHeight(cartHeight);
      console.error(error);
    },
    [cartHeight, setModalOpen]
  );

  useEffect(() => {
    if (cart.length === 0) {
      const dotsContainer = document.getElementById('dots-container');
      if (dotsContainer) {
        dotsContainer.style.visibility = 'hidden';
      }
      const buttonContainer = document.getElementById(
        'paypal-button-container'
      );
      if (buttonContainer) {
        buttonContainer.style.visibility = 'hidden';
        buttonContainer.replaceChildren();
      }
      setWhichHeight(cartHeight);
      setShowLoadingDots(false);
      return;
    }

    let paypalCart: PaypalCartItem[] = [];
    if (cart.length) {
      paypalCart = createCartForPaypal(cart);

      loadPaypal({
        setShowLoadingDots,
        purchaseUnits: paypalCart,
        onError,
        onSuccess,
        clearCart,
        cart,
      }).then(() => {
        // * adjust cart height to show footer
        if (cart.length >= 2) {
          setWhichHeight('');
        }
      });
    }
  }, [cart, cartHeight, clearCart, setModalOpen, onError, onSuccess]);

  return (
    <div id="cart" className={`${whichHeight} ${cartWrapper}`}>
      <PageHeader headerName="cart" hideLinks={cart.length !== 0} />
      <div className={showLoadingDots ? objectEnter : objectEnterActive}>
        {cart.length === 0 && (
          <h2 className={`${alwaysCentered} ${width300Center}`}>
            <Link href="/shop" className={undoLinkStyle}>Click here to add items</Link>
          </h2>
        )}
        {cart.map((item: CartItem) => {
          const { id } = item;
          return (
            <div className={cartItem} key={id}>
              <SmallItemPreview
                showCounter
                key={id}
                styles={styles}
                item={item}
                addItem={addItem}
                removeItem={removeItem}
              />
            </div>
          );
        })}
      </div>
      <div id="dots-container" className={alwaysCentered}>
        <LoadingDots />
      </div>
      <div
        id="paypal-button-container"
        className={
          showLoadingDots
            ? `${buttonsWrapper} ${objectEnter} ${raiseBtns}`
            : `${buttonsWrapper} ${objectEnterActive} ${raiseBtns}`
        }
      ></div>
      <Modal isOpen={isOpen} setModalOpen={setModalOpen} hideClose={false}>
        <PaymentResponseMessage />
      </Modal>
    </div>
  );
}
