import { fireEvent, render, screen } from '@testing-library/react';
import CounterInput from '../CounterInput';
import type CartItem from '@/types/cart-item';
import type { Product } from '@/types/product';

const product: Product = {
  id: 1,
  title: 'Test Product',
  imageUrl: 'img',
  productUrl: '/item?item_id=1',
  price: 10,
  description: 'desc',
  promotion: 0,
  emailTemplate: '',
  isbn: '123',
  publishedOn: '2024',
  show: true,
  emailTemplateHtml: '',
  s3Url: '',
  calendlyLink: false,
  previewLink: '',
  imageUrlItemView: '/images/test.webp',
};

describe('CounterInput', () => {
  it('increments and decrements', () => {
    const addItem = jest.fn();
    const removeItem = jest.fn();
    const item = { ...product, quantity: 2 } as CartItem;
    render(
      <CounterInput item={item} addItem={addItem} removeItem={removeItem} />
    );
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('+'));
    expect(removeItem).toHaveBeenCalledWith(1);
    expect(addItem).toHaveBeenCalledWith(item);
  });
});
