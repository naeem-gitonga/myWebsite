import { render, screen } from '@testing-library/react';
import ReadWriteSendXml from '../ReadWriteSendXml';

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

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ReadWriteSendXml', () => {
  it('renders article heading', () => {
    render(<ReadWriteSendXml />);
    expect(
      screen.getByText(
        'XML, read, send, write: Javascript client to Express/Node.js server'
      )
    ).toBeInTheDocument();
  });
});
