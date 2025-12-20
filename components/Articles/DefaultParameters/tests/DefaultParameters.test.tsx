import { render, screen } from '@testing-library/react';
import DefaultParameters from '../DefaultParameters';

jest.mock('@/components/LazyImage/LazyImage', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

jest.mock('@/components/PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

jest.mock('@/components/ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('@/components/Tags/Tags', () => ({
  __esModule: true,
  default: () => <div data-testid="tags" />,
}));

jest.mock('@/components/ArticleDateTime/ArticleDateTime', () => ({
  __esModule: true,
  ArticleDateTime: () => <div data-testid="article-date-time" />,
}));

describe('DefaultParameters', () => {
  it('renders article heading', () => {
    render(<DefaultParameters />);
    expect(
      screen.getByText(/default parameters slowing me down/i)
    ).toBeInTheDocument();
  });
});
