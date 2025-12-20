import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Contact, { generateMetadata } from '../page';

jest.mock('@/components/ContactForm/ContactForm', () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form" />,
}));

jest.mock('@/components/Footer/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock('@/components/Analytics/AnalyticsTracker', () => ({
  __esModule: true,
  default: ({ fromWebsite }: { fromWebsite: string }) => (
    <div data-testid="analytics">{fromWebsite}</div>
  ),
}));

describe('contact page', () => {
  it('renders contact form and analytics', async () => {
    const element = await Contact({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref');
    expect(getByTestId('contact-form')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Contact({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('Contact');
  });
});
