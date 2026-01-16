import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Demo, { metadata } from '../page';

jest.mock('@/components/SpeechAvatar/SpeechAvatar', () => ({
  __esModule: true,
  default: () => <div data-testid="speech-avatar" />,
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

jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

describe('demo page', () => {
  it('renders speech avatar and analytics', async () => {
    const element = await Demo({
      searchParams: Promise.resolve({ fromWebsite: 'ref' }),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('ref');
    expect(getByTestId('speech-avatar')).toBeInTheDocument();
  });

  it('defaults fromWebsite to direct', async () => {
    const element = await Demo({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('analytics')).toHaveTextContent('direct');
  });

  it('renders page header with correct name', async () => {
    const element = await Demo({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('page-header')).toHaveTextContent('demo');
  });

  it('renders footer', async () => {
    const element = await Demo({
      searchParams: Promise.resolve({}),
    } as any);
    const { getByTestId } = render(element);
    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it('has correct metadata', () => {
    expect(metadata.title).toBe('Demo');
    expect(metadata.description).toBe(
      'Speech avatar demo showcasing video presentation.'
    );
  });
});
