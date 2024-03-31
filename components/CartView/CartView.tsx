'use client';
import { useEffect, useState, useCallback } from 'react';
import PageHeader from 'components/PageHeader/PageHeader';
import sharedStyles from 'components/SharedCss/SharedCss.module.scss';
import SmallItemPreview from 'components/SmallItemPreview/SmallItemPreview';
import CartItem from '@/types/cart-item';
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
import roundToTwoDecimalPlaces from '@/utils/roundTonearestTwoDecimal';

export default function CartVeiw(): JSX.Element {
  const {
    buttonsWrapper,
    cartWrapper,
    cartHeight,
    cartItems,
    objectEnterActive,
    objectEnterActive2,
    objectEnter,
    cartItem,
    width300Center,
    raiseBtns,
    undoLinkStyle,
    itemWrapper,
    totalAndPay,
    subTotal,
  } = styles;
  const { alwaysCentered } = sharedStyles;

  const [addItem, cart, removeItem, clearCart] = useCart();
  const [isOpen, setModalOpen] = useModal();
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(0);
  const [showLoadingDots, setShowLoadingDots] = useState(true);

  const onSuccess = useCallback(
    (orderData: OrderResponseBody): void => {
      callInternalFulfillmentApi({
        orderData,
        router,
        clearCart,
        cart,
      });
    },
    [router, clearCart, cart]
  );

  const onError = useCallback(
    (error: Record<string, unknown>) => {
      setModalOpen();
      console.error(error);
    },
    [setModalOpen]
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
      setShowLoadingDots(false);
      return;
    }

    if (cart.length) {
      const [paypalCart, x] = createCartForPaypal(cart);
      setSubtotal(roundToTwoDecimalPlaces(+x.toFixed(2)));
      loadPaypal({
        setShowLoadingDots,
        purchaseUnits: paypalCart,
        onError,
        onSuccess,
        clearCart,
        cart,
      });
    }
  }, [cart, cartHeight, clearCart, setModalOpen, onError, onSuccess]);

  return (
    <div id="cart" className={cartWrapper}>
      <PageHeader headerName="cart" hideLinks={cart.length !== 0} />
      <div
        className={
          showLoadingDots
            ? `${objectEnter} ${itemWrapper}`
            : `${objectEnterActive}  ${itemWrapper}`
        }
      >
        <div className={cartItems}>
          {' '}
          {cart.length === 0 && (
            <h2 className={`${alwaysCentered} ${width300Center}`}>
              <Link href="/shop" className={undoLinkStyle}>
                Click here to add items
              </Link>
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
        <div className={totalAndPay}>
          {cart.length !== 0 && (
            <p className={subTotal}>
              <span>Subtotal: </span>${subtotal}
            </p>
          )}
          <div
            id="paypal-button-container"
            className={
              showLoadingDots
                ? `${buttonsWrapper} ${objectEnter} ${raiseBtns}`
                : `${buttonsWrapper} ${objectEnterActive2} ${raiseBtns}`
            }
          ></div>
        </div>
      </div>
      <div id="dots-container" className={alwaysCentered}>
        <LoadingDots />
      </div>
      <Modal isOpen={isOpen} setModalOpen={setModalOpen} hideClose={false}>
        <PaymentResponseMessage />
      </Modal>
    </div>
  );
}
