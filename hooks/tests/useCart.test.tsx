import { act, renderHook } from '@testing-library/react';
import useCart, { itemCountUpdated } from '../useCart';
import type { Product } from '@/types/product';

const product: Product = {
  id: 1,
  title: 'Test Product',
  imageUrl: 'test',
  productUrl: '/item?item_id=1',
  price: 10,
  description: 'desc',
  promotion: 0,
  emailTemplate: '',
  isbn: '123',
  publishedOn: '2024-01-01',
  show: true,
  emailTemplateHtml: '',
  s3Url: '',
  calendlyLink: false,
  previewLink: '',
  imageUrlItemView: '/images/test.webp',
};

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads initial cart and updates item count', () => {
    localStorage.setItem('cart-jng', JSON.stringify([{ ...product, quantity: 2 }]));
    const counts: number[] = [];
    const sub = itemCountUpdated.subscribe((count) => counts.push(count));

    renderHook(() => useCart());

    expect(counts[counts.length - 1]).toBe(2);
    sub.unsubscribe();
  });

  it('adds, removes, and clears items', () => {
    const counts: number[] = [];
    const sub = itemCountUpdated.subscribe((count) => counts.push(count));
    const { result } = renderHook(() => useCart());

    act(() => result.current[0](product));
    act(() => result.current[0](product));
    expect(result.current[1][0].quantity).toBe(2);
    expect(counts[counts.length - 1]).toBe(2);

    act(() => result.current[2](product.id));
    expect(result.current[1][0].quantity).toBe(1);

    act(() => result.current[2](999));
    expect(result.current[1][0].quantity).toBe(1);

    act(() => result.current[2](product.id));
    expect(result.current[1]).toHaveLength(0);

    act(() => result.current[3]());
    expect(result.current[1]).toHaveLength(0);

    sub.unsubscribe();
  });
});
