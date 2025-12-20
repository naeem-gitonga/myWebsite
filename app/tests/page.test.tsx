import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page, { generateMetadata } from '../page';

jest.mock('@/components/HomePage/HomePageWithLoader', () => ({
  __esModule: true,
  default: () => <div data-testid="home-loader" />,
}));

describe('app root page', () => {
  it('renders home page loader', () => {
    const { getByTestId } = render(<Page />);
    expect(getByTestId('home-loader')).toBeInTheDocument();
  });

  it('generates metadata', () => {
    const metadata = generateMetadata();
    expect(metadata.title).toBe('Home | Naeem Gitonga');
    expect(metadata.openGraph?.title).toBe('Home | Naeem Gitonga');
  });
});
