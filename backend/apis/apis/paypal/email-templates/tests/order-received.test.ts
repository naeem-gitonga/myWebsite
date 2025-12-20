/** @jest-environment node */
import { orderReceived } from '../order-received';

describe('orderReceived', () => {
  it('renders consult messaging when consult is purchased', () => {
    const html = orderReceived('order-1', 'Naeem', true);

    expect(html).toContain('Check your calendar');
    expect(html).not.toContain('Check PayPal');
  });

  it('renders non-consult messaging otherwise', () => {
    const html = orderReceived('order-2', 'Naeem', false);

    expect(html).toContain('Check PayPal');
    expect(html).toContain('order-2');
  });
});
