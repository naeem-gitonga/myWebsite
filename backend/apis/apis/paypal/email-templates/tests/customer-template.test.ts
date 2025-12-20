/** @jest-environment node */
import { customerTemplate } from '../customer-template';

describe('customerTemplate', () => {
  it('renders order details and message links', () => {
    const html = customerTemplate(
      ['<p>Link One</p>', '<p>Link Two</p>'] as any,
      'order-123',
      'Sam'
    );

    expect(html).toContain('Thank you Sam');
    expect(html).toContain('order-123');
    expect(html).toContain('Link One');
    expect(html).toContain('Link Two');
  });
});
