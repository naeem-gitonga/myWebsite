import { render, screen } from '@testing-library/react';
import ArticleTileView from '../ArticleTileView';

jest.mock('../../ArticleTile/ArticleTile', () => ({
  __esModule: true,
  default: () => <div data-testid="article-tile" />,
}));

jest.mock('../../PageHeader/PageHeader', () => ({
  __esModule: true,
  default: ({ headerName }: { headerName: string }) => (
    <div data-testid="page-header">{headerName}</div>
  ),
}));

jest.mock('../../ReturnArrow/ReturnArrow', () => ({
  __esModule: true,
  default: () => <div data-testid="return-arrow" />,
}));

jest.mock('@/utils/articles', () => ({
  articles: [
    { title: 'A', imageUrl: 'img-a', lengthInMinutes: 5, publishedDate: 'Jan 1', articleUrl: '/a', noTarget: true },
  ],
}));

describe('ArticleTileView', () => {
  it('renders shared header', () => {
    render(<ArticleTileView sharedHeader />);
    expect(screen.getByTestId('page-header')).toHaveTextContent('myArticles');
    expect(screen.getByTestId('article-tile')).toBeInTheDocument();
    expect(screen.getByTestId('return-arrow')).toBeInTheDocument();
  });
});
