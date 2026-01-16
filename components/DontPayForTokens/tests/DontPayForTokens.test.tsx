import { render, screen } from '@testing-library/react';
import DontPayForTokens from '../DontPayForTokens';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
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

jest.mock('@/components/ArticleDateTime/ArticleDateTime', () => ({
  __esModule: true,
  ArticleDateTime: () => <div data-testid="article-date-time" />,
}));

describe('DontPayForTokens', () => {
  it('renders the article heading and subheading', () => {
    render(<DontPayForTokens />);

    expect(screen.getByText("I Don't Pay For Tokens")).toBeInTheDocument();
    expect(
      screen.getByText('The Difference Between Using AI and Building AI')
    ).toBeInTheDocument();
  });

  it('renders the hero video and purchase link', () => {
    const { container } = render(<DontPayForTokens />);
    const video = container.querySelector('video') as HTMLVideoElement;

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute(
      'src',
      'https://d2j3yisnywcb30.cloudfront.net/pix/dont-pay.mp4'
    );
    expect(video).toHaveAttribute('controls');
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/item?item_id=5'
    );
  });
});
