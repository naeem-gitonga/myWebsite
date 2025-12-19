import type CartItem from '@/types/cart-item';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createCartForPaypal, callInternalFulfillmentApi } from '../paypal';

jest.mock('@paypal/paypal-js', () => ({
  loadScript: jest.fn(),
}));

import { loadScript } from '@paypal/paypal-js';
import loadPaypal from '../paypal';

const cartItem: CartItem = {
  id: 1,
  title: 'Test',
  imageUrl: 'img',
  productUrl: '/item?item_id=1',
  price: 10,
  description: 'desc',
  promotion: 5,
  emailTemplate: '',
  isbn: '123',
  publishedOn: '2024',
  show: true,
  emailTemplateHtml: '',
  s3Url: '',
  calendlyLink: false,
  previewLink: '',
  imageUrlItemView: '/images/test.webp',
  quantity: 2,
};

describe('paypal utils', () => {
  const flushPromises = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

  beforeEach(() => {
    jest.clearAllMocks();
    (window as any).dataLayer = { push: jest.fn() };
    document.body.innerHTML = `
      <div id="paypal-button-container"></div>
      <div id="dots-container"></div>
    `;
  });

  it('creates paypal cart and subtotal', () => {
    const [paypalCart, subtotal] = createCartForPaypal([cartItem]);
    expect(paypalCart).toHaveLength(2);
    expect(subtotal).toBe(10);
    expect(paypalCart[0].reference_id).toBe('1-0');
  });

  it('calls fulfillment api and navigates on success', async () => {
    const push = jest.fn();
    const clearCart = jest.fn();
    const router = { push } as unknown as AppRouterInstance;
    const fetchSpy = jest.fn().mockResolvedValue({ ok: true } as Response);
    global.fetch = fetchSpy as typeof fetch;
    process.env.NEXT_PUBLIC_PAYPAL_API_URL = 'https://api.example.com';

    const orderData = {
      id: 'order-1',
      payer: { email_address: 'a@b.com', name: { given_name: 'A', surname: 'B' } },
      purchase_units: [
        { shipping: { address: { postal_code: '12345', admin_area_2: 'C', admin_area_1: 'ST' } } },
      ],
    } as any;

    callInternalFulfillmentApi({ orderData, clearCart, router, cart: [cartItem] });
    await flushPromises();

    expect(fetchSpy).toHaveBeenCalled();
    expect(clearCart).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/thanks?referenceId=order-1');
  });

  it('handles fulfillment api failures', async () => {
    const push = jest.fn();
    const clearCart = jest.fn();
    const router = { push } as unknown as AppRouterInstance;
    const fetchSpy = jest.fn().mockResolvedValue({ ok: false } as Response);
    global.fetch = fetchSpy as typeof fetch;
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    process.env.NEXT_PUBLIC_PAYPAL_API_URL = 'https://api.example.com';

    const orderData = {
      id: 'order-2',
      payer: { email_address: 'a@b.com', name: { given_name: 'A', surname: 'B' } },
      purchase_units: [
        { shipping: { address: { postal_code: '12345', admin_area_2: 'C', admin_area_1: 'ST' } } },
      ],
    } as any;

    callInternalFulfillmentApi({ orderData, clearCart, router, cart: [cartItem] });
    await flushPromises();

    expect(push).toHaveBeenCalledWith('/thanks?referenceId=order-2&ftse=1');
    expect(clearCart).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('loads paypal and renders buttons', async () => {
    const render = jest.fn().mockResolvedValue(undefined);
    const buttons = jest.fn().mockReturnValue({ render });
    (loadScript as jest.Mock).mockResolvedValue({ Buttons: buttons });

    const setShowLoadingDots = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();

    await loadPaypal({
      setShowLoadingDots,
      onSuccess,
      onError,
      purchaseUnits: [{ reference_id: '1-0', amount: { currency_code: 'USD', value: 10 } }],
      clearCart: jest.fn(),
      cart: [cartItem],
    });

    const options = buttons.mock.calls[0][0];
    const create = jest.fn().mockResolvedValue('order');
    const capture = jest.fn().mockResolvedValue({ id: 'order-1' });

    await options.createOrder({}, { order: { create } });
    await options.onApprove({}, { order: { capture } });
    options.onApprove({}, {});
    options.onError({ code: 'ERR' });

    expect(create).toHaveBeenCalled();
    expect(capture).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith({ code: 'ERR' });
    expect(setShowLoadingDots).toHaveBeenCalledWith(false);
  });

  it('handles loadScript failures', async () => {
    (loadScript as jest.Mock).mockRejectedValue(new Error('load fail'));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await loadPaypal({
      setShowLoadingDots: jest.fn(),
      onSuccess: jest.fn(),
      onError: jest.fn(),
      purchaseUnits: [],
      clearCart: jest.fn(),
      cart: [],
    });

    expect(result).toBeNull();
    expect(errorSpy).toHaveBeenCalled();
  });
});
