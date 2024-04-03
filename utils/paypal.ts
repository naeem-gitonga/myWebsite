import CartItem from '@/types/cart-item';
import PaypalCartItem from '@/types/paypal-cart-item';
import {
  CreateOrderActions,
  CreateOrderData,
  CreateOrderRequestBody,
  OnApproveActions,
  OnApproveData,
  OrderResponseBody,
  PayPalButtonsComponentOptions,
  PayPalNamespace,
  loadScript,
} from '@paypal/paypal-js';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';

type CartOptions = {
  setShowLoadingDots: Dispatch<SetStateAction<boolean>>;
  onSuccess: (orderData: OrderResponseBody) => void;
  purchaseUnits: PaypalCartItem[];
  clearCart: () => void;
  onError: (error: Record<string, unknown>) => void;
  cart: any;
};

export default async function loadPaypal(
  options: CartOptions
): Promise<PayPalNamespace | null> {
  const buttonContainer = document.getElementById('paypal-button-container');
  const dotsContainer = document.getElementById('dots-container');
  if (dotsContainer) {
    dotsContainer.style.visibility = 'visible';
  }
  if (buttonContainer) {
    buttonContainer.style.visibility = 'hidden';
    buttonContainer.replaceChildren();
  }
  const { setShowLoadingDots, onError, onSuccess, cart } = options;
  const buttonOptions = {
    style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'paypal',
    },
    createOrder: function (
      _data: CreateOrderData,
      actions: CreateOrderActions
    ) {
      return actions.order.create({
        purchase_units: options.purchaseUnits,
      } as unknown as CreateOrderRequestBody); // * all of the value prop for amount should be a string but we have numbers, they are coerced to strings during the request
    },
    onApprove: function (_data: OnApproveData, actions: OnApproveActions) {
      if (!actions.order) {
        return;
      }

      return actions.order.capture().then(function (
        orderData: OrderResponseBody
      ) {
        onSuccess(orderData);
        if (buttonContainer) {
          buttonContainer.style.visibility = 'hidden';
          buttonContainer.replaceChildren();
        }
        if (dotsContainer) {
          dotsContainer.style.visibility = 'visible';
        }
        window.dataLayer.push({
          event: 'product-purchased',
          item: options.cart,
          env: process.env.NEXT_PUBLIC_STAGE,
        });
      });
    },
    onError: function (err: Record<string, unknown>) {
      onError(err);
    },
  };

  let paypal: PayPalNamespace | null = null;
  try {
    paypal = (await loadScript({
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    })) as PayPalNamespace;
  } catch (error) {
    console.error('failed to load the PayPal JS SDK script', error);
  }

  if (paypal != null && paypal.Buttons && cart.length > 0) {
    try {
      await paypal
        .Buttons(buttonOptions as PayPalButtonsComponentOptions)
        .render('#paypal-button-container');
      if (dotsContainer) {
        dotsContainer.style.visibility = 'hidden';
      }
      if (buttonContainer) {
        buttonContainer.style.visibility = 'visible';
      }
      setShowLoadingDots(false); //? do this here so that after the buttons and cart items have fully loaded we show the cart
    } catch (error) {
      console.error(error);
    }
  }

  return paypal;
}

export function createCartForPaypal(
  cart: CartItem[]
): [cart: PaypalCartItem[], subtotal: number] {
  let paypalCart: PaypalCartItem[] = [];
  let subtotal = 0;
  for (const item of cart) {
    for (let i = 0; i < item.quantity; i++) {
      const currentPrice = item.promotion ? item.promotion : item.price;
      paypalCart = [
        ...paypalCart,
        {
          reference_id: `${item.id}-${i}`,
          amount: { currency_code: 'USD', value: currentPrice },
        },
      ];
      subtotal = currentPrice + subtotal;
    }
  }

  return [paypalCart, subtotal];
}

type InternalFulfillmentApiProps = {
  orderData: OrderResponseBody;
  router: AppRouterInstance;
  clearCart: () => void;
  cart: CartItem[];
};
export function callInternalFulfillmentApi(props: InternalFulfillmentApiProps) {
  const { orderData, clearCart, router, cart } = props;
  fetch(process.env.NEXT_PUBLIC_PAYPAL_API_URL as string, {
    method: 'POST',
    mode: 'cors',
    referrerPolicy: 'origin',
    body: JSON.stringify({
      email: orderData?.payment_source?.paypal?.email_address,
      firstName: orderData?.payment_source?.paypal?.name?.given_name,
      lastName: orderData?.payment_source?.paypal?.name?.surname,
      id: orderData.id,
      address: {
        // * I hate using any but I'll figure this out some other time.
        zip: (orderData.purchase_units as any)[0].shipping.address.postal_code,
        city: (orderData.purchase_units as any)[0].shipping.address
          .admin_area_2,
        state: (orderData.purchase_units as any)[0].shipping.address
          .admin_area_1,
      },
      cart,
    }),
  })
    .then((res: Response) => {
      if (res.ok) {
        clearCart();
        router.push(`/thanks?referenceId=${orderData.id}`);
        return;
      }
      throw new Error('Something broke: order cannot be sent');
    })
    .catch((e) => {
      router.push(`/thanks?referenceId=${orderData.id}&ftse=1`);
      clearCart();
      console.error(e);
    });
}
